import React from 'react';
import { Server, Cloud, Bot, Code2 } from 'lucide-react';

export function TechnologyStack() {
  return (
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
  );
}