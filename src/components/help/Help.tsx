import React from 'react';
import { HelpHeader } from './HelpHeader';
import { ProjectOverview } from './ProjectOverview';
import { BusinessCase } from './BusinessCase';
import { TechnologyStack } from './TechnologyStack';
import { Features } from './Features';
import { Implementation } from './Implementation';
import { DevelopmentTools } from './DevelopmentTools';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface HelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Help({ isOpen, onClose }: HelpProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto">
      <div className="w-full max-w-4xl my-4 mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
        <HelpHeader onClose={onClose} />
        <div className="px-6 py-4">
          <div className="grid gap-6">
            <ProjectOverview />
            <BusinessCase />
            <ArchitectureDiagram />
            <TechnologyStack />
            <DevelopmentTools />
            <Features />
            <Implementation />
          </div>
        </div>
      </div>
    </div>
  );
}