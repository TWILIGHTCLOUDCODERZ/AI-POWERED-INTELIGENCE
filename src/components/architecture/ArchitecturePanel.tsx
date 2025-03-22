import React from 'react';
import { ArchitectureFlow } from './ArchitectureFlow';
import { parseArchitectureDescription } from '../../utils/architecture-parser';

interface ArchitecturePanelProps {
  description: string;
  provider: string;
}

export function ArchitecturePanel({ description, provider }: ArchitecturePanelProps) {
  const { nodes, edges } = parseArchitectureDescription(description, provider);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Architecture Overview</h3>
        <p className="text-sm text-blue-700">
          This diagram represents the cloud architecture design. Components are interactive and can be
          moved around. Use the controls to zoom and pan, and the minimap for navigation.
        </p>
      </div>
      
      <ArchitectureFlow initialNodes={nodes} initialEdges={edges} />
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        {Object.entries(groupNodesByCategory(nodes)).map(([category, count]) => (
          <div key={category} className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-600 capitalize">{category}</div>
            <div className="text-2xl font-bold text-blue-600">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupNodesByCategory(nodes: any[]) {
  return nodes.reduce((acc, node) => {
    const category = node.data.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
}