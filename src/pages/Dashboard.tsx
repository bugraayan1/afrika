import React, { useState } from 'react';
import { 
  CircularProgress,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { Refresh as RefreshIcon, MoreVert as MoreVertIcon, FilterList as FilterIcon } from '@mui/icons-material';
import DashboardCard from '../components/DashboardCard';
import ProjectCard from '../components/ProjectCard';
import { useDashboard } from '../hooks/useDashboard';
import { getStatusConfig } from '../utils/statusColors';
import { Project, Agent, Transfer } from '../types';
import MetricCard from '../components/MetricCard';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { projects, agents, transfers, loading, error, refresh } = useDashboard();
  const navigate = useNavigate();

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = (status: string | null = null) => {
    setStatusFilter(status);
    setFilterAnchor(null);
  };

  const filteredProjects = projects.filter(project => 
    !statusFilter || project.status === statusFilter
  );

  const handleViewDetails = (project: Project) => {
    console.log('Detayları görüntüle:', project);
  };

  const handleGenerateReport = (project: Project) => {
    console.log('Rapor oluştur:', project);
  };

  const handleAgentClick = (agentId: string) => {
    console.log('Ajana gidiliyor:', agentId);
    navigate(`/agents/${agentId}`);
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
        <Typography variant="h4">Gösterge Paneli</Typography>
        <div>
          <Button
            startIcon={<FilterIcon />}
            onClick={handleFilterClick}
            variant="outlined"
            size="small"
          >
            Filtrele
          </Button>
          <Menu
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={() => handleFilterClose()}
          >
            <MenuItem onClick={() => handleFilterClose(null)}>Tümü</MenuItem>
            <MenuItem onClick={() => handleFilterClose('active')}>Aktif</MenuItem>
            <MenuItem onClick={() => handleFilterClose('pending')}>Beklemede</MenuItem>
            <MenuItem onClick={() => handleFilterClose('completed')}>Tamamlandı</MenuItem>
          </Menu>
        </div>
        <IconButton onClick={refresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </div>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard
              project={project}
              onViewDetails={handleViewDetails}
              onGenerateReport={handleGenerateReport}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Toplam Proje"
            value={projects.length}
            trend={5}
            type="projects"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Aktif Ajanlar"
            value={agents.filter(a => a.status === 'online').length}
            total={agents.length}
            type="agents"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Bu Ay Yapılan Transferler"
            value={transfers.filter(t => 
              new Date(t.date).getMonth() === new Date().getMonth()
            ).length}
            type="transfers"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Aktif Projeler">
            {projects.map((project) => (
              <ListItem key={project.id}>
                <ListItemText
                  primary={project.name}
                  secondary={`${project.country} - ${project.progress}%`}
                />
                <Chip
                  label={getStatusConfig(project.status).label}
                  color={getStatusConfig(project.status).color}
                  size="small"
                />
              </ListItem>
            ))}
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard title="Ajan Durumu">
            {agents.map((agent) => (
              <ListItem 
                key={agent.id}
                onClick={() => handleAgentClick(agent.id)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemText
                  primary={agent.name}
                  secondary={`Son aktivite: ${agent.lastActive}`}
                />
                <Chip
                  label={getStatusConfig(agent.status).label}
                  color={getStatusConfig(agent.status).color}
                  size="small"
                />
              </ListItem>
            ))}
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard title="Son Transferler">
            {transfers.map((transfer) => (
              <ListItem key={transfer.id}>
                <ListItemText
                  primary={transfer.technology}
                  secondary={`${transfer.country} - ${transfer.date}`}
                />
                <Chip
                  label={getStatusConfig(transfer.status).label}
                  color={getStatusConfig(transfer.status).color}
                  size="small"
                />
              </ListItem>
            ))}
          </DashboardCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard; 