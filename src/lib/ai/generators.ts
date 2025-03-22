import { rateLimiter } from './rate-limiter';
import { openAIClient } from './openai-client';
import { prompts } from './prompts';

async function safeGenerateContent(prompt: string): Promise<string> {
  try {
    return await rateLimiter.enqueue(async () => {
      try {
        return await openAIClient.generateContent(prompt);
      } catch (error: any) {
        console.error('API Error:', error);
        return `**Error**: ${error.message}. Please try again.`;
      }
    });
  } catch (error: any) {
    console.error('Generation Error:', error);
    return `**Error**: ${error.message}. Please try again.`;
  }
}

export async function generateArchitectureDescription(prompt: string, provider: string) {
  return safeGenerateContent(prompts.architectureDescription(prompt, provider));
}

export async function generateArchitectureDiagram(services: string, provider: string) {
  // Parse the services description to extract components and their relationships
  const components = services
    .split('\n')
    .filter(line => line.includes('|'))
    .map(line => {
      const parts = line.split('|').map(part => part.trim());
      return {
        name: parts[1] || '',
        type: parts[2] || '',
        features: parts[3] || ''
      };
    })
    .filter(component => component.name);

  // Create a structured format for the WorkflowDiagram component
  const diagramData = components
    .map(component => {
      const features = component.features.split(',').map(f => f.trim()).join('\n');
      return `| ${component.name} | ${features} |`;
    })
    .join('\n');

  return diagramData;
}

export async function estimateCosts(services: string, provider: string) {
  return safeGenerateContent(prompts.costEstimation(services, provider));
}

export async function generateTerraformCode(services: string, provider: string) {
  try {
    const [main, variables, outputs, deploySteps] = await Promise.all([
      safeGenerateContent(prompts.terraformMain(services, provider)),
      safeGenerateContent(prompts.terraformVariables(services, provider)),
      safeGenerateContent(prompts.terraformOutputs(services, provider)),
      safeGenerateContent(prompts.deploySteps(services, provider))
    ]);

    return `# Terraform Configuration Overview
This configuration sets up a complete ${provider} infrastructure using Terraform.

# Main Configuration (main.tf)
\`\`\`hcl
${main}
\`\`\`

# Variables (variables.tf)
\`\`\`hcl
${variables}
\`\`\`

# Outputs (outputs.tf)
\`\`\`hcl
${outputs}
\`\`\`

${deploySteps}`;
  } catch (error: any) {
    console.error('Error generating Terraform code:', error);
    return `**Error**: Failed to generate Terraform configuration. Please try again.`;
  }
}