import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: number;
  trend?: number;
  total?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
          {total && <Typography variant="caption" color="textSecondary"> / {total}</Typography>}
        </Typography>
        {trend && (
          <Typography 
            color={trend > 0 ? "success.main" : "error.main"} 
            sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
          >
            {trend > 0 ? <TrendingUp /> : <TrendingDown />}
            {Math.abs(trend)}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard; 