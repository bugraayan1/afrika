import { useState, useEffect } from 'react';
import { Project, Agent, Transfer } from '../types';
import { mockAgents } from '../data/mockAgents';

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-Öğrenme Platformu",
    country: "Nijerya",
    status: "active",
    progress: 75
  },
  {
    id: "2",
    name: "Sağlık Sistemi",
    country: "Kenya",
    status: "pending",
    progress: 45
  }
];

// mockAgents artık data/mockAgents.ts'den geliyor

const mockTransfers: Transfer[] = [
  {
    id: "1",
    technology: "Yapay Zeka Çözümleri",
    country: "Güney Afrika",
    date: "2024-02-28",
    status: "completed"
  },
  {
    id: "2",
    technology: "Blockchain",
    country: "Gana",
    date: "2024-02-27",
    status: "pending"
  }
];

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProjects(mockProjects);
      setAgents(mockAgents);
      setTransfers(mockTransfers);
      setError(null);
    } catch (err) {
      setError('Veri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    error,
    projects,
    agents,
    transfers,
    refresh: () => fetchData() // Burada fonksiyonu çağırmak yerine referansını döndürüyoruz
  };
}; 