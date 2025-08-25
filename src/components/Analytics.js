import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function Analytics({ items }) {
  const total = items.length;
  const clicks = items.reduce((acc, x) => acc + (x.clicks || 0), 0);
  const expired = items.filter((x) => Date.now() > x.expiry).length;

  return (
    <Paper sx={{ p: 2 }} variant="outlined">
      <Typography variant="subtitle1">Summary</Typography>
      <Typography variant="body2">Total short URLs: {total}</Typography>
      <Typography variant="body2">Total clicks: {clicks}</Typography>
      <Typography variant="body2">Expired links: {expired}</Typography>
    </Paper>
  );
}
