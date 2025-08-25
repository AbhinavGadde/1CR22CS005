import React, { useEffect, useState } from 'react';
import { Typography, Divider } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import Analytics from '../components/Analytics';
import { getAllUrlsArray } from '../utils/storage';
import { logEvent } from '../utils/logger';

export default function ShortenerPage() {
  const [items, setItems] = useState([]);

  const refresh = () => {
    setItems(getAllUrlsArray());
  };

  useEffect(() => {
    logEvent('PAGE_VIEW', { page: 'Shortener' });
    refresh();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Create Short URLs</Typography>
      <UrlForm onCreated={refresh} />
      <Divider sx={{ my: 3 }} />
      <Analytics items={items} />
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" sx={{ mb: 1 }}>Your Links</Typography>
      <UrlList items={items} />
    </div>
  );
}
