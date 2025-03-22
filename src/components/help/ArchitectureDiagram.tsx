import React from 'react';
import { Server, Database, Lock, ArrowRight, Users, Cpu, DollarSign, FileCode, Download, CheckCircle2 } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Server size={18} className="text-indigo-400" />
        System Architecture & Integration
      </h3>

      {/* Environment Setup */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
          <Lock size={16} className="text-indigo-400" />
          Required Environment Variables
        </h4>
        <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-white/70">
          <pre className="whitespace-pre-wrap">
{`# Azure OpenAI Configuration
VITE_AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
VITE_AZURE_OPENAI_KEY=your-api-key

# Azure B2C Configuration
VITE_AZURE_B2C_CLIENT_ID=your-client-id
VITE_AZURE_B2C_AUTHORITY=https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/policy-name
VITE_AZURE_B2C_KNOWN_AUTHORITY=https://your-tenant.b2clogin.com
VITE_AZURE_B2C_REDIRECT_URI=http://localhost:5173/`}
          </pre>
        </div>
      </div>

      {/* User Workflow Steps */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-medium text-white mb-4">Detailed User Workflow</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <Users className="text-indigo-400" />,
              title: "1. Input Requirements",
              steps: [
                "Sign in or continue as guest",
                "Select cloud provider (AWS/Azure/GCP)",
                "Describe architecture requirements",
                "Submit for processing"
              ]
            },
            {
              icon: <Cpu className="text-indigo-400" />,
              title: "2. AI Processing",
              steps: [
                "Natural language processing",
                "Pattern recognition",
                "Best practices analysis",
                "Multi-component generation"
              ]
            },
            {
              icon: <CheckCircle2 className="text-indigo-400" />,
              title: "3. Generated Results",
              steps: [
                "Interactive architecture diagram",
                "Detailed cost breakdown",
                "Infrastructure as Code",
                "Export documentation"
              ]
            }
          ].map((phase, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  {phase.icon}
                </div>
                <h5 className="text-sm font-medium text-white">{phase.title}</h5>
              </div>
              <ul className="space-y-2">
                {phase.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-center gap-2 text-xs text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
              {/* User Interaction Flow Banner */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[600px] bg-indigo-500/10 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/20 shadow-xl">
                <h5 className="text-sm font-medium text-white mb-3 text-center">User Interaction Flow</h5>
                <div className="flex items-center justify-between px-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Users size={20} className="text-indigo-400" />
                    </div>
                    <span className="text-xs text-white/70">Requirements</span>
                  </div>
                  <ArrowRight size={20} className="text-indigo-400" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Cpu size={20} className="text-indigo-400" />
                    </div>
                    <span className="text-xs text-white/70">Processing</span>
                  </div>
                  <ArrowRight size={20} className="text-indigo-400" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <CheckCircle2 size={20} className="text-indigo-400" />
                    </div>
                    <span className="text-xs text-white/70">Results</span>
                  </div>
                </div>
              </div>

              {/* Architecture Components */}
              <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Frontend Layer */}
                <g className="transition-opacity duration-300 hover:opacity-80">
                  <rect x="300" y="20" width="200" height="60" rx="8" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <text x="400" y="55" textAnchor="middle" fill="#E0E7FF" fontSize="14">React Frontend Application</text>
                </g>

                {/* API Layer */}
                <g className="transition-opacity duration-300 hover:opacity-80">
                  <rect x="150" y="120" width="500" height="70" rx="8" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <text x="400" y="155" textAnchor="middle" fill="#E0E7FF" fontSize="14">Azure OpenAI Integration Layer</text>
                  <text x="400" y="175" textAnchor="middle" fill="#A5B4FC" fontSize="12">Prompt Engineering & Response Processing</text>
                </g>

                {/* Service Layer */}
                <g className="transition-opacity duration-300 hover:opacity-80">
                  <rect x="50" y="230" width="200" height="60" rx="8" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <text x="150" y="265" textAnchor="middle" fill="#E0E7FF" fontSize="14">Architecture Generation</text>

                  <rect x="300" y="230" width="200" height="60" rx="8" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <text x="400" y="265" textAnchor="middle" fill="#E0E7FF" fontSize="14">Cost Estimation Engine</text>

                  <rect x="550" y="230" width="200" height="60" rx="8" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <text x="650" y="265" textAnchor="middle" fill="#E0E7FF" fontSize="14">IaC Code Generation</text>
                </g>

                {/* Authentication Layer */}
                <g className="transition-opacity duration-300 hover:opacity-80">
                  <rect x="150" y="330" width="500" height="70" rx="8" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <text x="400" y="365" textAnchor="middle" fill="#E0E7FF" fontSize="14">Azure B2C Authentication</text>
                  <text x="400" y="385" textAnchor="middle" fill="#A5B4FC" fontSize="12">Secure User Management & Access Control</text>
                </g>

                {/* Connections */}
                <path d="M 400 80 L 400 120" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M 400 190 L 150 230" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M 400 190 L 400 230" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M 400 190 L 650 230" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M 150 290 L 400 330" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M 400 290 L 400 330" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M 650 290 L 400 330" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Output Types */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Server size={20} />,
              title: "Architecture Design",
              description: "Interactive system diagram with components and relationships"
            },
            {
              icon: <DollarSign size={20} />,
              title: "Cost Analysis",
              description: "Detailed cost breakdown and optimization recommendations"
            },
            {
              icon: <FileCode size={20} />,
              title: "Infrastructure Code",
              description: "Generated Terraform code for deployment"
            },
            {
              icon: <Download size={20} />,
              title: "Documentation",
              description: "Exportable PDF and PowerPoint documentation"
            }
          ].map((output, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  {output.icon}
                </div>
                <h5 className="text-sm font-medium text-white">{output.title}</h5>
              </div>
              <p className="text-xs text-white/70">{output.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}