import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/country-analysis">
          Ülke Analizi
        </Button>
        <Button color="inherit" component={Link} to="/agents">
          Agent İzleme
        </Button>
        <Button color="inherit" component={Link} to="/transfer">
          Teknoloji Transfer
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 