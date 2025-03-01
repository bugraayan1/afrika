import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { mockTransferProgress } from '../data/mockTransferProgress';

const TransferProgress: React.FC = () => {
  const stages = ['başlangıç', 'eğitim', 'uygulama', 'değerlendirme'];
  const transfer = mockTransferProgress[0]; // Örnek olarak ilk transferi gösteriyoruz

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Teknoloji Transfer Takibi
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Stepper activeStep={stages.indexOf(transfer.stage)}>
              {stages.map((label) => (
                <Step key={label}>
                  <StepLabel>{label.toUpperCase()}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              İlerleme Durumu
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Tamamlanma Oranı
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={transfer.completionRate} 
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="h4" sx={{ mt: 1 }}>
                %{transfer.completionRate}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Kilometre Taşları
            </Typography>
            <List>
              {transfer.milestones.map((milestone: { 
                title: string; 
                dueDate: string; 
                status: 'beklemede' | 'devam_ediyor' | 'tamamlandı' 
              }, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={milestone.title}
                    secondary={`Tarih: ${milestone.dueDate}`}
                  />
                  <Chip
                    label={milestone.status}
                    color={
                      milestone.status === 'tamamlandı' ? 'success' :
                      milestone.status === 'devam_ediyor' ? 'warning' : 'default'
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransferProgress;