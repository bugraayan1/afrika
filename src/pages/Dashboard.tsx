import React from 'react';
import { 
  CircularProgress,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  IconButton,
  Typography,
  Grid
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import DashboardCard from '../components/DashboardCard';
import ProjectCard from '../components/ProjectCard';
import { useDashboard } from '../hooks/useDashboard';
import { getStatusColor } from '../utils/statusColors';
import { Project, Agent, Transfer } from '../types';

const Dashboard: React.FC = () => {
  const { projects, agents, transfers, loading, error, refresh } = useDashboard();

  const handleViewDetails = (project: Project) => {
    console.log('View details:', project);
  };

  const handleGenerateReport = (project: Project) => {
    console.log('Generate report:', project);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">Dashboard</Typography>
        <IconButton onClick={refresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </div>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard
              project={project}
              onViewDetails={handleViewDetails}
              onGenerateReport={handleGenerateReport}
            />
          </Grid>
        ))}
      </Grid>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <DashboardCard title="Aktif Projeler">
          {projects.map((project) => (
            <ListItem key={project.id}>
              <ListItemText
                primary={project.name}
                secondary={`${project.country} - ${project.progress}%`}
              />
              <Chip
                label={project.status}
                color={getStatusColor(project.status)}
                size="small"
              />
            </ListItem>
          ))}
        </DashboardCard>

        <DashboardCard title="Agent Durumu">
          {agents.map((agent) => (
            <ListItem key={agent.id}>
              <ListItemText
                primary={agent.name}
                secondary={`Son aktivite: ${agent.lastActive}`}
              />
              <Chip
                label={agent.status}
                color={getStatusColor(agent.status)}
                size="small"
              />
            </ListItem>
          ))}
        </DashboardCard>

        <DashboardCard title="Son Transferler">
          {transfers.map((transfer) => (
            <ListItem key={transfer.id}>
              <ListItemText
                primary={transfer.technology}
                secondary={`${transfer.country} - ${transfer.date}`}
              />
              <Chip
                label={transfer.status}
                color={getStatusColor(transfer.status)}
                size="small"
              />
            </ListItem>
          ))}
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard; 