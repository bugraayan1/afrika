import React from 'react';
import { Card, CardContent, Typography, Button, LinearProgress, Box } from '@mui/material';
import { Visibility, Assessment } from '@mui/icons-material';

interface Project {
  id: string;
  name: string;
  country: string;
  status: string;
  progress: number;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  onGenerateReport: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails, onGenerateReport }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {project.country}
        </Typography>
        <Box sx={{ my: 2 }}>
          <LinearProgress variant="determinate" value={project.progress} />
          <Typography variant="body2" color="textSecondary" align="right">
            {project.progress}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            startIcon={<Visibility />}
            variant="outlined"
            size="small"
            onClick={() => onViewDetails(project)}
          >
            Detaylar
          </Button>
          <Button
            startIcon={<Assessment />}
            variant="contained"
            size="small"
            onClick={() => onGenerateReport(project)}
          >
            Rapor
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard; 