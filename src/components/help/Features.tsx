import React from 'react';
import { Zap, Database, Cpu, DollarSign, Code2, Shield, Download } from 'lucide-react';

export function Features() {
  return (
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
  );
}