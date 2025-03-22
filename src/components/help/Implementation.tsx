import React from 'react';
import { Workflow } from 'lucide-react';

export function Implementation() {
  return (
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
  );
}