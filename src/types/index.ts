export interface Project {
  id: string;
  name: string;
  country: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
}

export interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastActive: string;
  expertise: string;
  specialization: string[];
  experience: number;
  successRate: number;
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

export interface TransferProgress {
  id: string;
  projectId: string;
  stage: 'başlangıç' | 'eğitim' | 'uygulama' | 'değerlendirme';
  completionRate: number;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  milestones: {
    title: string;
    dueDate: string;
    status: 'beklemede' | 'devam_ediyor' | 'tamamlandı';
  }[];
}

export interface CountryMetrics {
  countryName: string;
  flag: string;
  successfulTransfers: number;
  ongoingProjects: number;
  techReadinessScore: number;
  priorityAreas: string[];
  localPartners: string[];
  implementationChallenges: string[];
} 