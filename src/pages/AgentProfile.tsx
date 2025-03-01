import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Grid, 
  Chip,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper
} from '@mui/material';
import { mockAgents } from '../data/mockAgents';

const AgentProfile: React.FC = () => {
  const { id } = useParams();
  console.log('Agent ID:', id); // Debug için log ekleyelim
  const agent = mockAgents.find(a => a.id === id);

  if (!agent) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Ajan bulunamadı
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={agent.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5">{agent.name}</Typography>
                <Typography color="textSecondary">{agent.expertise}</Typography>
                <Chip
                  label={agent.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                  color={agent.status === 'online' ? 'success' : 'default'}
                  sx={{ mt: 1 }}
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>Konum</Typography>
              <Typography paragraph>{agent.location}</Typography>
              
              <Typography variant="subtitle2" gutterBottom>Son Aktivite</Typography>
              <Typography paragraph>{agent.lastActive}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Özgeçmiş</Typography>
                <Typography paragraph>{agent.description}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Uzmanlık Alanları</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {agent.specialization.map((spec, index) => (
                    <Chip key={index} label={spec} />
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Diller & Teknolojiler</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {agent.languages.map((lang, index) => (
                    <Chip key={index} label={lang} variant="outlined" />
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>İstatistikler</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="h4" color="primary">{agent.experience}</Typography>
                    <Typography color="textSecondary">Yıl Deneyim</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4" color="primary">{agent.successRate}%</Typography>
                    <Typography color="textSecondary">Başarı Oranı</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4" color="primary">{agent.completedProjects}</Typography>
                    <Typography color="textSecondary">Tamamlanan Proje</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentProfile; 