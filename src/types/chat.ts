export type CloudProvider = 'AWS' | 'GCP' | 'Azure';

export interface Message {
  role: 'user' | 'assistant';
  content: {
    description?: string;
    architecture?: string;
    costs?: string;
    terraform?: string;
  };
  provider?: string;
}

export interface Tab {
  id: 'description' | 'architecture' | 'costs' | 'terraform';
  label: string;
  icon: React.ReactNode;
}

export interface ArchitectureNode {
  id: string;
  type: string;
  data: {
    label: string;
    description: string;
    icon: string;
    category: 'compute' | 'storage' | 'network' | 'security' | 'database' | 'integration';
  };
  position: { x: number; y: number };
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  type: 'default' | 'step' | 'smoothstep';
  animated?: boolean;
  label?: string;
  style?: object;
}