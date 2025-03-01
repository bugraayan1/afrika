// Interface'i direkt burada tanımlayalım
interface CountryMetrics {
  countryName: string;
  flag: string;
  successfulTransfers: number;
  ongoingProjects: number;
  techReadinessScore: number;
  priorityAreas: string[];
  localPartners: string[];
  implementationChallenges: string[];
}

export const mockCountryMetrics: CountryMetrics[] = [
  {
    countryName: "Nijerya",
    flag: "/flags/nigeria.png",
    successfulTransfers: 12,
    ongoingProjects: 5,
    techReadinessScore: 72,
    priorityAreas: ["Yapay Zeka", "Fintech", "E-ticaret"],
    localPartners: ["Lagos Tech Hub", "Nigerian IT Development Agency"],
    implementationChallenges: [
      "Altyapı eksiklikleri",
      "Teknik eğitim ihtiyacı"
    ]
  },
  {
    countryName: "Kenya",
    flag: "/flags/kenya.png",
    successfulTransfers: 8,
    ongoingProjects: 3,
    techReadinessScore: 68,
    priorityAreas: ["Tarım Teknolojileri", "Mobil Ödeme", "Yenilenebilir Enerji"],
    localPartners: ["iHub Kenya", "Kenya ICT Authority"],
    implementationChallenges: [
      "İnternet altyapısı",
      "Nitelikli işgücü eksikliği"
    ]
  },
  {
    countryName: "Gana",
    flag: "/flags/ghana.png",
    successfulTransfers: 6,
    ongoingProjects: 4,
    techReadinessScore: 65,
    priorityAreas: ["Dijital Bankacılık", "E-devlet", "Akıllı Tarım"],
    localPartners: ["Ghana Tech Lab", "Ghana Digital Centers"],
    implementationChallenges: [
      "Düzenleyici çerçeve eksikliği",
      "Teknoloji adaptasyonu"
    ]
  }
]; 