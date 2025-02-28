import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import type { Analysis } from '../types';

// jsPDF için tür genişletmesi
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
  lastAutoTable: {
    finalY: number;
  };
}

export const generateAnalysisPDF = (analysis: Analysis) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Başlık
  doc.setFontSize(20);
  doc.text(`${analysis.country} Teknoloji İhtiyaç Analizi`, 20, 20);

  // Tarih
  doc.setFontSize(12);
  doc.text(
    `Analiz Tarihi: ${new Date(analysis.timestamp || analysis.date).toLocaleString('tr-TR')}`,
    20,
    30
  );

  // Problemler
  doc.setFontSize(16);
  doc.text('Tespit Edilen Problemler', 20, 45);
  
  doc.autoTable({
    startY: 50,
    head: [['No', 'Problem']],
    body: analysis.findings.map((finding, index) => [
      index + 1,
      finding
    ]),
  });

  // Öneriler
  doc.setFontSize(16);
  doc.text('Önerilen Çözümler', 20, doc.lastAutoTable.finalY + 15);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [['No', 'Öneri']],
    body: analysis.recommendations.map((recommendation, index) => [
      index + 1,
      recommendation
    ]),
  });

  // PDF'i indir
  doc.save(`${analysis.country}-analiz-${new Date().toISOString()}.pdf`);
}; 