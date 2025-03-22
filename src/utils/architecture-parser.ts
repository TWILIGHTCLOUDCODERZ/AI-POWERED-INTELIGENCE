import { ArchitectureNode, ArchitectureEdge } from '../types/chat';

export function parseArchitectureDescription(description: string, provider: string) {
  const lines = description.split('\n');
  const nodes: ArchitectureNode[] = [];
  const edges: ArchitectureEdge[] = [];
  let currentY = 50;
  let currentX = 50;
  let lastNodeId = '';

  lines.forEach((line, index) => {
    if (line.includes('|')) {
      const [_, name, purpose] = line.split('|').map(s => s.trim());
      if (!name) return;

      const category = determineCategory(name, purpose);
      const nodeId = `node-${index}`;
      
      nodes.push({
        id: nodeId,
        type: 'custom',
        data: {
          label: name,
          description: purpose,
          icon: getIconForCategory(category),
          category,
        },
        position: { x: currentX, y: currentY },
      });

      if (lastNodeId) {
        edges.push({
          id: `edge-${lastNodeId}-${nodeId}`,
          source: lastNodeId,
          target: nodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#93c5fd', strokeWidth: 2 },
        });
      }

      lastNodeId = nodeId;
      currentY += 150;
      
      // Create new column after every 3 nodes
      if (index % 3 === 2) {
        currentX += 300;
        currentY = 50;
      }
    }
  });

  return { nodes, edges };
}

function determineCategory(name: string, purpose: string): ArchitectureNode['data']['category'] {
  const text = `${name} ${purpose}`.toLowerCase();
  
  if (text.includes('database') || text.includes('storage') || text.includes('cache')) {
    return 'database';
  }
  if (text.includes('network') || text.includes('gateway') || text.includes('load balancer')) {
    return 'network';
  }
  if (text.includes('security') || text.includes('auth') || text.includes('firewall')) {
    return 'security';
  }
  if (text.includes('api') || text.includes('queue') || text.includes('event')) {
    return 'integration';
  }
  if (text.includes('server') || text.includes('function') || text.includes('container')) {
    return 'compute';
  }
  return 'storage';
}

function getIconForCategory(category: string): string {
  const icons: Record<string, string> = {
    compute: 'Server',
    storage: 'Cloud',
    network: 'Network',
    security: 'Shield',
    database: 'Database',
    integration: 'Webhook',
  };
  return icons[category] || 'Cloud';
}