import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Afrika Teknoloji Transferi</Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Anasayfa
            </Button>
            <Button color="inherit" component={Link} to="/transfer-progress">
              Transfer Takibi
            </Button>
            <Button color="inherit" component={Link} to="/country-analysis">
              Ülke Analizi
            </Button>
            <Button color="inherit" component={Link} to="/about">
              Hakkında
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 