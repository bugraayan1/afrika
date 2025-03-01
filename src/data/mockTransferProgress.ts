import { TransferProgress } from '../types';

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
  // ... diğer transfer progress verileri
]; 