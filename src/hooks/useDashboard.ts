import { useState, useEffect } from 'react';
import { Project, Agent, Transfer } from '../types';

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

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    status: "online",
    lastActive: "2 dakika önce"
  },
  {
    id: "2",
    name: "Ayşe Kaya",
    status: "offline",
    lastActive: "1 saat önce"
  },
  {
    id: "3",
    name: "Mehmet Demir",
    status: "online",
    lastActive: "5 dakika önce"
  },
  {
    id: "4",
    name: "Fatma Öztürk",
    status: "offline",
    lastActive: "3 saat önce"
  }
];

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

  useEffect(() => {
    // Simüle edilmiş API çağrısı
    const fetchData = async () => {
      try {
        setLoading(true);
        // API çağrısını simüle etmek için timeout kullanıyoruz
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

    fetchData();
  }, []);

  const refresh = () => {
    setLoading(true);
    // Yenileme simülasyonu
    setTimeout(() => {
      setProjects(mockProjects);
      setAgents(mockAgents);
      setTransfers(mockTransfers);
      setLoading(false);
    }, 1000);
  };

  return {
    loading,
    error,
    projects,
    agents,
    transfers,
    refresh
  };
}; 