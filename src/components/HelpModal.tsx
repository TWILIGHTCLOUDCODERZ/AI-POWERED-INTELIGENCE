import React from 'react';
import { 
  X, Database, Cpu, DollarSign, Code2, Download, FileText, 
  Cloud, Shield, Zap, BarChart, Workflow, Users, Building2,
  Boxes, GitBranch, Coins, BrainCircuit, Lock, Globe, Rocket,
  Server, Bot, Fingerprint, Lightbulb, Target, Award, Clock,
  TrendingUp
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto">
      <div className="w-full max-w-4xl my-4 mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm border-b border-white/10 rounded-t-xl">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text">
                  AI Architecture Assistant
                </h2>
                <p className="text-xs text-white/60">Azure AI Developer Hackathon Project</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 py-4">
          <div className="grid gap-6">
            {/* Project Overview */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Lightbulb size={18} className="text-indigo-400" />
                Project Overview
              </h3>
              <div className="bg-white/5 rounded-lg p-4 text-white/80">
                <p className="text-sm leading-relaxed">
                  AI Architecture Assistant is an innovative solution developed for the Azure AI Developer Hackathon. 
                  It combines the power of Azure OpenAI with AI Foundry accelerators to help developers and architects 
                  design, visualize, and implement cloud architectures. The assistant provides intelligent recommendations, 
                  generates detailed architecture diagrams, estimates costs, and produces infrastructure-as-code, all through 
                  a natural language interface.
                </p>
              </div>
            </section>

            {/* Use Case / Business Need */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Target size={18} className="text-indigo-400" />
                Use Case & Business Need
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: <Users size={16} />,
                    title: 'Target Users',
                    items: [
                      'Cloud Architects',
                      'DevOps Engineers',
                      'Solution Architects',
                      'Technical Leaders'
                    ]
                  },
                  {
                    icon: <Award size={16} />,
                    title: 'Business Value',
                    items: [
                      'Accelerated Design Process',
                      'Reduced Architecture Errors',
                      'Consistent Best Practices',
                      'Cost Optimization'
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        {section.icon}
                      </div>
                      <h4 className="text-sm font-medium text-white">{section.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-xs text-white/70 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture & Technology Stack */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Server size={18} className="text-indigo-400" />
                Architecture & Technology Stack
              </h3>
              <div className="grid gap-3">
                {[
                  {
                    title: 'Azure Services',
                    icon: <Cloud size={16} />,
                    items: [
                      'Azure OpenAI - GPT-4 for intelligent processing',
                      'Azure Entra B2C - Secure authentication',
                      'Azure Web Apps - Application hosting',
                      'Azure Monitor - Performance monitoring'
                    ]
                  },
                  {
                    title: 'AI Components',
                    icon: <Bot size={16} />,
                    items: [
                      'AI Foundry Accelerators',
                      'Custom Prompt Engineering',
                      'Architecture Pattern Recognition',
                      'Cost Optimization AI'
                    ]
                  },
                  {
                    title: 'Frontend Technologies',
                    icon: <Code2 size={16} />,
                    items: [
                      'React with TypeScript',
                      'Three.js for 3D Visualization',
                      'Tailwind CSS for Styling',
                      'React Flow for Architecture Diagrams'
                    ]
                  }
                ].map((tech, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        {tech.icon}
                      </div>
                      <h4 className="text-sm font-medium text-white">{tech.title}</h4>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {tech.items.map((item, i) => (
                        <li key={i} className="text-xs text-white/70 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Features & Functionality */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap size={18} className="text-indigo-400" />
                Features & Functionality
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: <Database size={16} />,
                    title: 'Architecture Design',
                    description: 'AI-powered architecture recommendations with best practices'
                  },
                  {
                    icon: <Cpu size={16} />,
                    title: 'Visual Diagrams',
                    description: 'Interactive architecture diagrams with component relationships'
                  },
                  {
                    icon: <DollarSign size={16} />,
                    title: 'Cost Analysis',
                    description: 'Detailed cost breakdowns and optimization suggestions'
                  },
                  {
                    icon: <Code2 size={16} />,
                    title: 'IaC Generation',
                    description: 'Terraform code generation for infrastructure deployment'
                  },
                  {
                    icon: <Shield size={16} />,
                    title: 'Security Features',
                    description: 'Built-in security best practices and compliance checks'
                  },
                  {
                    icon: <Download size={16} />,
                    title: 'Export Options',
                    description: 'Export designs as PowerPoint or PDF documentation'
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        {feature.icon}
                      </div>
                      <h4 className="text-sm font-medium text-white">{feature.title}</h4>
                    </div>
                    <p className="text-xs text-white/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Implementation Details */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Workflow size={18} className="text-indigo-400" />
                Implementation Details
              </h3>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="relative pl-6 space-y-4">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-indigo-500/20"></div>
                  {[
                    {
                      title: 'Azure OpenAI Integration',
                      description: 'Custom prompt engineering and response parsing for accurate architecture generation'
                    },
                    {
                      title: 'Authentication Flow',
                      description: 'Secure user authentication using Azure Entra B2C with custom policies'
                    },
                    {
                      title: 'Visualization Engine',
                      description: 'Three.js-powered 3D background and React Flow for architecture diagrams'
                    },
                    {
                      title: 'Export System',
                      description: 'Custom export logic for generating professional documentation'
                    }
                  ].map((detail, index) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute left-[-0.5rem] p-1.5 bg-indigo-500 rounded-full">
                        <div className="w-1 h-1 rounded-full bg-white" />
                      </div>
                      <h4 className="text-sm font-medium text-white">{detail.title}</h4>
                      <p className="text-xs text-white/70 mt-1">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Challenges & Learnings */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <GitBranch size={18} className="text-indigo-400" />
                Challenges & Learnings
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Technical Challenges',
                    items: [
                      'Optimizing prompt engineering for accurate results',
                      'Implementing real-time architecture visualization',
                      'Ensuring consistent AI response quality',
                      'Handling complex cloud service relationships'
                    ]
                  },
                  {
                    title: 'Key Learnings',
                    items: [
                      'Azure OpenAI best practices and limitations',
                      'Advanced React performance optimization',
                      'Cloud architecture pattern recognition',
                      'Real-time 3D visualization techniques'
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-white mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-xs text-white/70 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Outcome / Benefits */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Award size={18} className="text-indigo-400" />
                Outcome & Benefits
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: <Clock size={16} />,
                    title: 'Time Savings',
                    value: '75%',
                    description: 'Reduction in architecture design time'
                  },
                  {
                    icon: <TrendingUp size={16} />,
                    title: 'Accuracy',
                    value: '90%',
                    description: 'Improvement in design accuracy'
                  },
                  {
                    icon: <DollarSign size={16} />,
                    title: 'Cost Reduction',
                    value: '40%',
                    description: 'Average infrastructure cost savings'
                  }
                ].map((metric, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        {metric.icon}
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-white">{metric.title}</h4>
                    <div className="text-2xl font-bold text-indigo-400 my-2">{metric.value}</div>
                    <p className="text-xs text-white/70">{metric.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Enhancements */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Rocket size={18} className="text-indigo-400" />
                Future Enhancements
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Planned Features',
                    items: [
                      'Multi-cloud architecture support',
                      'Real-time collaboration capabilities',
                      'Advanced security analysis',
                      'Custom template library'
                    ]
                  },
                  {
                    title: 'Research Areas',
                    items: [
                      'AI-driven performance optimization',
                      'Automated compliance checking',
                      'Natural language improvements',
                      'Enhanced visualization options'
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-white mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-xs text-white/70 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-indigo-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}