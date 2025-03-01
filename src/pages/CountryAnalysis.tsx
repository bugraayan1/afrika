import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CountrySelector from '../components/CountrySelector';
import MinistryList from '../components/MinistryList';
import AnalysisResults from '../components/AnalysisResults';
import { countryService } from '../services/api';
import type { Analysis } from '../types';
import { mockCountryMetrics } from '../data/mockCountryMetrics';

const steps = ['Ülke Seçimi', 'Bakanlık Seçimi', 'Analiz Sonuçları'];

const CountryAnalysis: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const country = mockCountryMetrics[0]; // Örnek olarak ilk ülkeyi gösteriyoruz

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
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={country.flag} sx={{ width: 60, height: 60, mr: 2 }} />
          <Typography variant="h4">{country.countryName}</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">Başarılı Transferler</Typography>
              <Typography variant="h3">{country.successfulTransfers}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">Devam Eden Projeler</Typography>
              <Typography variant="h3">{country.ongoingProjects}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">Teknoloji Hazırlık Skoru</Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={country.techReadinessScore}
                  size={80}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6">{country.techReadinessScore}%</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Öncelikli Alanlar</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {country.priorityAreas.map((area: string, index: number) => (
                  <Chip key={index} label={area} />
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Yerel Partnerler</Typography>
              <List>
                {country.localPartners.map((partner: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={partner} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

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