export interface Project {
  id: string;
  name: string;
  country: string;
  status: string;
  progress: number;
}

export interface Agent {
  id: string;
  name: string;
  status: string;
  lastActive: string;
  expertise: string;
  specialization: string[];
  experience: number; // yıl cinsinden
  successRate: number; // yüzde cinsinden
  completedProjects: number;
  location: string;
  languages: string[];
  description: string;
  avatar: string;
}

export interface Transfer {
  id: string;
  technology: string;
  country: string;
  date: string;
  status: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  status: string;
  lastActive: string;
}

export interface Ministry {
  id: string;
  name: string;
  country: string;
}

export interface Analysis {
  id: string;
  country: string;
  ministry: string;
  date: string;
  timestamp: string;
  findings: string[];
  recommendations: string[];
} 