import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Cloud, Database, Shield, Network, Server, Webhook } from 'lucide-react';

const icons = {
  compute: Server,
  storage: Cloud,
  network: Network,
  security: Shield,
  database: Database,
  integration: Webhook,
};

function CustomNodeComponent({ data }: { data: any }) {
  const Icon = icons[data.category] || Cloud;

  return (
    <div className="group">
      <div className="px-4 py-3 shadow-lg rounded-xl bg-white border-2 border-blue-200 min-w-[180px] transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1">
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 !bg-blue-400 hover:!bg-blue-500 transition-colors" 
        />
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
            <Icon size={24} className="text-blue-500 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {data.label}
            </div>
            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
              {data.description}
            </div>
          </div>
        </div>
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 !bg-blue-400 hover:!bg-blue-500 transition-colors" 
        />
      </div>
    </div>
  );
}

export const CustomNode = memo(CustomNodeComponent);