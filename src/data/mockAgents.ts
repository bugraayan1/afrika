import { Agent } from '../types';

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    status: "online",
    lastActive: "2 dakika önce",
    expertise: "Sağlık Teknolojileri",
    specialization: ["AI Diagnostics", "Medical Imaging", "Healthcare Analytics"],
    experience: 8,
    successRate: 95,
    completedProjects: 24,
    location: "Ankara",
    languages: ["Türkçe", "İngilizce", "Python", "TensorFlow"],
    description: "Tıbbi görüntüleme ve teşhis sistemleri konusunda uzman. IBM Watson sertifikalı sağlık teknolojileri danışmanı.",
    avatar: "/avatars/agent1.jpg"
  },
  {
    id: "2",
    name: "Ayşe Kaya",
    status: "online",
    lastActive: "5 dakika önce",
    expertise: "Fintech",
    specialization: ["Blockchain", "Smart Contracts", "Payment Systems"],
    experience: 6,
    successRate: 92,
    completedProjects: 18,
    location: "İstanbul",
    languages: ["Türkçe", "İngilizce", "Solidity", "JavaScript"],
    description: "Blockchain tabanlı finansal sistemler konusunda uzman. Ethereum ve Hyperledger sertifikalı geliştirici.",
    avatar: "/avatars/agent2.jpg"
  },
  {
    id: "3",
    name: "Mehmet Demir",
    status: "offline",
    lastActive: "1 saat önce",
    expertise: "Tarım Teknolojileri",
    specialization: ["IoT Sensors", "Precision Agriculture", "Drone Technology"],
    experience: 7,
    successRate: 88,
    completedProjects: 15,
    location: "İzmir",
    languages: ["Türkçe", "İngilizce", "Python", "C++"],
    description: "Akıllı tarım sistemleri ve IoT sensör ağları konusunda uzman. Drone haritalama sistemleri geliştiricisi.",
    avatar: "/avatars/agent3.jpg"
  },
  {
    id: "4",
    name: "Zeynep Arslan",
    status: "online",
    lastActive: "15 dakika önce",
    expertise: "Eğitim Teknolojileri",
    specialization: ["E-Learning", "Adaptive Learning", "Educational Analytics"],
    experience: 5,
    successRate: 94,
    completedProjects: 21,
    location: "Ankara",
    languages: ["Türkçe", "İngilizce", "Almanca", "React", "Python"],
    description: "Adaptif öğrenme sistemleri ve eğitim analitiği konusunda uzman. Google Certified Educator.",
    avatar: "/avatars/agent4.jpg"
  },
  {
    id: "5",
    name: "Can Özkan",
    status: "online",
    lastActive: "1 dakika önce",
    expertise: "Siber Güvenlik",
    specialization: ["Network Security", "Penetration Testing", "Security Analytics"],
    experience: 9,
    successRate: 96,
    completedProjects: 32,
    location: "İstanbul",
    languages: ["Türkçe", "İngilizce", "Python", "Go", "Rust"],
    description: "Siber güvenlik sistemleri ve güvenlik analizi konusunda uzman. CISSP ve CEH sertifikalı.",
    avatar: "/avatars/agent5.jpg"
  }
]; 