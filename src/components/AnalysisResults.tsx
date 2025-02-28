import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider 
} from '@mui/material';
import { 
  LightbulbOutlined, 
  RecommendOutlined 
} from '@mui/icons-material';
import type { Analysis } from '../types';

interface AnalysisResultsProps {
  analysis: Analysis | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {analysis.country} Analiz Sonuçları
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {new Date(analysis.timestamp || analysis.date).toLocaleString('tr-TR')}
      </Typography>

      <Box className="mt-6">
        <Typography variant="h6" gutterBottom>
          Tespit Edilen Problemler
        </Typography>
        <List>
          {analysis.findings.map((finding: string, index: number) => (
            <ListItem key={index}>
              <ListItemIcon>
                <LightbulbOutlined />
              </ListItemIcon>
              <ListItemText primary={finding} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider className="my-4" />

      <Box>
        <Typography variant="h6" gutterBottom>
          Önerilen Çözümler
        </Typography>
        <List>
          {analysis.recommendations.map((recommendation: string, index: number) => (
            <ListItem key={index}>
              <ListItemIcon>
                <RecommendOutlined />
              </ListItemIcon>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AnalysisResults; 