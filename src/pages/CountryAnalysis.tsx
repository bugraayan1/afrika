import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography,
  CircularProgress
} from '@mui/material';
import CountrySelector from '../components/CountrySelector';
import MinistryList from '../components/MinistryList';
import AnalysisResults from '../components/AnalysisResults';
import { countryService } from '../services/api';
import type { Analysis } from '../types';

const steps = ['Ülke Seçimi', 'Bakanlık Seçimi', 'Analiz Sonuçları'];

const CountryAnalysis: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (activeStep === 1) {
      // Analiz başlat
      setLoading(true);
      try {
        const response = await countryService.analyzeCountry(selectedCountry, selectedMinistries);
        setAnalysis(response.data.data);
        setActiveStep(activeStep + 1);
      } catch (err) {
        setError('Analiz sırasında bir hata oluştu');
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCountry('');
    setSelectedMinistries([]);
    setAnalysis(null);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        );
      case 1:
        return (
          <MinistryList
            country={selectedCountry}
            selectedMinistries={selectedMinistries}
            onMinistryChange={setSelectedMinistries}
          />
        );
      case 2:
        return <AnalysisResults analysis={analysis} />;
      default:
        return 'Bilinmeyen adım';
    }
  };

  return (
    <Box className="p-6 max-w-4xl mx-auto">
      <Paper className="p-6">
        <Typography component="h1" variant="h4" className="mb-6">
          Ülke Teknoloji İhtiyaç Analizi
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {loading ? (
          <Box className="flex justify-center items-center py-12">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && (
              <Typography color="error" className="mb-4">
                {error}
              </Typography>
            )}

            <Box className="mb-6">{getStepContent(activeStep)}</Box>

            <Box className="flex justify-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Geri
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleReset}>
                    Yeni Analiz
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !selectedCountry) ||
                      (activeStep === 1 && selectedMinistries.length === 0)
                    }
                  >
                    {activeStep === steps.length - 2 ? 'Analizi Başlat' : 'İleri'}
                  </Button>
                )}
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default CountryAnalysis; 