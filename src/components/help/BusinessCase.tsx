import React from 'react';
import { Target, Users, Award } from 'lucide-react';

export function BusinessCase() {
  return (
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
  );
}