import React from 'react';
import { BrainCircuit, X } from 'lucide-react';

interface HelpHeaderProps {
  onClose: () => void;
}

export function HelpHeader({ onClose }: HelpHeaderProps) {
  return (
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
  );
}