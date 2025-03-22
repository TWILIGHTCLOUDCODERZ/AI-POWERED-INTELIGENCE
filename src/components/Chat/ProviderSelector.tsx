import React from 'react';
import { Cloud } from 'lucide-react';
import { CloudProvider } from '../../types/chat';

interface ProviderSelectorProps {
  selectedProvider: CloudProvider;
  onProviderChange: (provider: CloudProvider) => void;
}

export function ProviderSelector({ selectedProvider, onProviderChange }: ProviderSelectorProps) {
  const providers: CloudProvider[] = ['AWS', 'GCP', 'Azure'];

  return (
    <div className="flex gap-2">
      {providers.map((provider) => (
        <button
          key={provider}
          onClick={() => onProviderChange(provider)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedProvider === provider
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Cloud size={18} />
          {provider}
        </button>
      ))}
    </div>
  );
}