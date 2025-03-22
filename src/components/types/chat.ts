export type CloudProvider = 'AWS' | 'GCP' | 'Azure';

export interface Message {
  role: 'user' | 'assistant';
  content: {
    description?: string;
    diagram?: string;
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