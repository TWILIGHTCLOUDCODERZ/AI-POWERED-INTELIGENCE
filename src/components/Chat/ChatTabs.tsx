import React from 'react';
import { Database, Cpu, DollarSign, Code2, Loader2 } from 'lucide-react';
import { Tab } from '../../types/chat';

interface ChatTabsProps {
  activeTab: Tab['id'];
  onTabChange: (tabId: Tab['id']) => void;
  loadingStates: Record<Tab['id'], boolean>;
  contentAvailable: Record<Tab['id'], boolean>;
}

export function ChatTabs({ activeTab, onTabChange, loadingStates, contentAvailable }: ChatTabsProps) {
  const tabs: Tab[] = [
    { id: 'description', label: 'Description', icon: <Database size={18} /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu size={18} /> },
    { id: 'costs', label: 'Cost Estimation', icon: <DollarSign size={18} /> },
    { id: 'terraform', label: 'Terraform', icon: <Code2 size={18} /> },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isLoading = loadingStates[tab.id];
        const isAvailable = contentAvailable[tab.id];
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => isAvailable && onTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium 
              transition-all duration-300 group
              ${isActive
                ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10'
                : isAvailable
                  ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  : 'text-gray-400 cursor-not-allowed'
              }
            `}
            disabled={!isAvailable}
            title={!isAvailable ? 'Content is being generated...' : ''}
          >
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg backdrop-blur-sm">
                <Loader2 size={18} className="animate-spin text-blue-500" />
              </div>
            )}

            {/* Content Available Indicator */}
            {isAvailable && !isActive && (
              <div className="absolute right-1 top-1 w-2 h-2 bg-green-500 rounded-full" />
            )}

            {/* Tab Icon & Label */}
            <span className={`transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}>
              {tab.icon}
            </span>
            <span className={`transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}>
              {tab.label}
            </span>

            {/* Bottom Border Animation */}
            <div
              className={`
                absolute bottom-0 left-0 h-0.5 bg-blue-500
                transition-all duration-300 ease-out
                ${isActive ? 'w-full' : 'w-0'}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}