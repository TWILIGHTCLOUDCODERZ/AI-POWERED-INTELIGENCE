import React from 'react';
import { Code2, GitBranch, Terminal } from 'lucide-react';

export function DevelopmentTools() {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Terminal size={18} className="text-indigo-400" />
        Development Tools & Testing
      </h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          {
            icon: <GitBranch size={16} />,
            title: 'GitHub Copilot',
            description: 'AI-powered code completion and testing assistance',
            features: [
              'Automated test generation',
              'Code suggestions',
              'Documentation help',
              'Best practices enforcement'
            ]
          },
          {
            icon: <Code2 size={16} />,
            title: 'Visual Studio',
            description: 'Primary IDE for development and deployment',
            features: [
              'Integrated debugging',
              'Azure deployment tools',
              'IntelliSense support',
              'Git integration'
            ]
          },
          {
            icon: <Terminal size={16} />,
            title: 'Development Workflow',
            description: 'Streamlined development process',
            features: [
              'Automated testing',
              'CI/CD pipelines',
              'Code review',
              'Quality checks'
            ]
          }
        ].map((tool, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                {tool.icon}
              </div>
              <h4 className="text-sm font-medium text-white">{tool.title}</h4>
            </div>
            <p className="text-xs text-white/70 mb-3">{tool.description}</p>
            <ul className="space-y-1">
              {tool.features.map((feature, i) => (
                <li key={i} className="text-xs text-white/60 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}