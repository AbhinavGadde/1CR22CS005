import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUrlMapping, recordClick } from '../utils/storage';
import { logEvent } from '../utils/logger';
import { Alert, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const [state, setState] = React.useState({ status: 'checking', message: '' });

  useEffect(() => {
    const data = getUrlMapping(shortcode);
    if (!data) {
      setState({ status: 'error', message: 'Invalid short link.' });
      logEvent('REDIRECT_INVALID', { shortcode });
      return;
    }
    if (Date.now() > data.expiry) {
      setState({ status: 'error', message: 'This link has expired.' });
      logEvent('REDIRECT_EXPIRED', { shortcode });
      return;
    }
    logEvent('REDIRECT_HIT', { shortcode, referrer: document.referrer || 'direct' });
    recordClick(shortcode, document.referrer || 'direct');
    window.location.replace(data.longUrl);
  }, [shortcode]);

  if (state.status === 'checking') {
    return <Typography>Redirecting...</Typography>;
  }

  return (
    <Box>
      <Alert severity="error" sx={{ mb: 2 }}>{state.message}</Alert>
      <Button variant="contained" component={Link} to="/">Go Home</Button>
    </Box>
  );
}
