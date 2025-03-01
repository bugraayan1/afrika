// Interface'i direkt burada tanımlayalım
interface TransferProgress {
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

export const mockTransferProgress: TransferProgress[] = [
  {
    id: "1",
    projectId: "1",
    stage: "uygulama",
    completionRate: 65,
    startDate: "2024-01-15",
    estimatedEndDate: "2024-06-30",
    milestones: [
      {
        title: "Başlangıç Toplantısı",
        dueDate: "2024-01-20",
        status: "tamamlandı"
      },
      {
        title: "Eğitim Programı",
        dueDate: "2024-03-15",
        status: "tamamlandı"
      },
      {
        title: "Pilot Uygulama",
        dueDate: "2024-05-01",
        status: "devam_ediyor"
      }
    ]
  },
  {
    id: "2",
    projectId: "2",
    stage: "eğitim",
    completionRate: 35,
    startDate: "2024-02-01",
    estimatedEndDate: "2024-08-30",
    milestones: [
      {
        title: "Proje Planlaması",
        dueDate: "2024-02-10",
        status: "tamamlandı"
      },
      {
        title: "Eğitmen Eğitimi",
        dueDate: "2024-03-30",
        status: "devam_ediyor"
      },
      {
        title: "Saha Uygulaması",
        dueDate: "2024-07-15",
        status: "beklemede"
      }
    ]
  }
]; 