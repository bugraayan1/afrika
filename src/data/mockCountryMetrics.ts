import { CountryMetrics } from '../types';

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
  // ... diğer ülke verileri
]; 