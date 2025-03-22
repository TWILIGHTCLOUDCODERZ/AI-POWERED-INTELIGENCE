export const prompts = {
  architectureDescription: (prompt: string, provider: string) => `
As a cloud architecture expert, provide a detailed analysis of the following requirements for ${provider}. Format your response in this exact structure:

# Architecture Overview
[A clear, concise overview of the architecture in 2-3 sentences]

# Key Components
[List each major component with a bullet point and brief description]

# Design Considerations
## Scalability
[Explain scalability approach with specific details]

## Security
[Describe security measures with implementation details]

## Reliability
[Outline reliability features and failover strategies]

# Service Details
| Service Name | Purpose | Key Features | Tier/SKU |
|--------------|---------|--------------|----------|
[Detailed service table with specific configurations]

Requirements: ${prompt}

Important formatting rules:
1. Use proper markdown table alignment
2. Keep table rows concise but informative
3. Include specific service tiers where applicable
4. Ensure consistent spacing and formatting`,

  costEstimation: (services: string, provider: string) => `
Provide a detailed cost estimation for the following ${provider} architecture. Format your response exactly like this:

# Cost Overview
[Brief summary of total estimated costs and key factors]

# Detailed Cost Breakdown
| Service | Configuration | Monthly Cost (USD) | Annual Cost (USD) | Notes |
|---------|--------------|-------------------|------------------|-------|
[Detailed cost table with specific configurations]

# Cost Optimization Recommendations
1. [First recommendation with specific savings potential]
2. [Second recommendation with implementation details]
3. [Third recommendation with ROI analysis]

# Assumptions
- [List key assumptions made for the estimation]
- [Include usage patterns and scaling factors]
- [Note any excluded costs]

Services: ${services}`,

  terraformMain: (services: string, provider: string) => `
Generate the main.tf file for ${provider} with these services: ${services}

Important: Respond ONLY with the main.tf content, no other text.
Include:
- Provider configuration
- Resource definitions with best practices
- Tags and naming conventions
- Security settings
- Resource dependencies

Use HCL format with proper indentation.`,

  terraformVariables: (services: string, provider: string) => `
Generate the variables.tf file for ${provider} with these services: ${services}

Important: Respond ONLY with the variables.tf content, no other text.
Include variables for:
- Resource naming
- Environment settings
- Service configuration
- Tags
- Security parameters

Use HCL format with:
- Detailed descriptions
- Type constraints
- Default values where appropriate
- Validation rules`,

  terraformOutputs: (services: string, provider: string) => `
Generate the outputs.tf file for ${provider} with these services: ${services}

Important: Respond ONLY with the outputs.tf content, no other text.
Include outputs for:
- Resource IDs
- Connection strings
- Endpoints
- Access keys
- Other important values

Use HCL format with:
- Clear descriptions
- Sensitive data handling
- Proper value references`,

  deploySteps: (services: string, provider: string) => `
Generate deployment instructions for ${provider} Terraform configuration with these services: ${services}

Format the response exactly like this:

# Prerequisites
[List required tools and versions]

# Authentication Setup
[Provider-specific authentication steps]

# Deployment Steps
1. [First step with command]
2. [Second step with command]
3. [Third step with command]

# Verification
[How to verify the deployment]

# Cleanup
[How to destroy resources]

# Troubleshooting
[Common issues and solutions]`
};