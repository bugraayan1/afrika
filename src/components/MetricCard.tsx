import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress,
  Icon
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  SwapHoriz
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: number;
  total?: number;
  trend?: number;
  type: 'projects' | 'agents' | 'transfers';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  total, 
  trend,
  type 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'projects':
        return <Assignment />;
      case 'agents':
        return <People />;
      case 'transfers':
        return <SwapHoriz />;
      default:
        return <Assignment />;
    }
  };

  const getProgress = () => {
    if (total) {
      return (value / total) * 100;
    }
    return trend ? (trend > 0 ? trend : 100 + trend) : 100;
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: 'primary.light',
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {getIcon()}
          </Box>
          <Typography color="textSecondary" variant="h6">
            {title}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ mb: 1 }}>
          {value}
          {total && (
            <Typography component="span" variant="h6" color="textSecondary">
              /{total}
            </Typography>
          )}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {trend && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: trend > 0 ? 'success.main' : 'error.main'
            }}>
              {trend > 0 ? <TrendingUp /> : <TrendingDown />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={getProgress()} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      </CardContent>
    </Card>
  );
};

export default MetricCard; 