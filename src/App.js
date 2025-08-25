import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import RedirectPage from './pages/RedirectPage';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/:shortcode" element={<RedirectPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}
