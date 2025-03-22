import React from 'react';
import { Lightbulb } from 'lucide-react';

export function ProjectOverview() {
  return (
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
  );
}