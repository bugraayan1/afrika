export interface Project {
  id: string;
  name: string;
  country: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
}

export interface AgentStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'working';
  lastActive: string;
}

export interface Transfer {
  id: string;
  technology: string;
  country: string;
  date: string;
  status: 'success' | 'failed' | 'in_progress';
}

export interface Ministry {
  id: string;
  name: string;
  url: string;
}

export interface Analysis {
  id: string;
  country: string;
  findings: string[];
  recommendations: string[];
  timestamp: string;
} 