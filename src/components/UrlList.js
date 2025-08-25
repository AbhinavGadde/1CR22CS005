import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Button } from '@mui/material';

export default function UrlList({ items }) {
  if (!items.length) return <Typography color="text.secondary">No URLs yet. Create one above.</Typography>;

  const toIso = (ms) => new Date(ms).toISOString();

  return (
    <Stack spacing={2}>
      {items.map((it) => (
        <Card key={it.shortcode} variant="outlined">
          <CardContent>
            <Typography variant="h6">{window.location.origin}/{it.shortcode}</Typography>
            <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>{it.longUrl}</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip label={`Created: ${it.createdAt}`} />
              <Chip label={`Expires: ${new Date(it.expiry).toISOString()}`} />
              <Chip label={`Clicks: ${it.clicks}`} />
            </Stack>
            <details>
              <summary>Click details</summary>
              {it.clickData.length === 0 && <Typography variant="body2" color="text.secondary">No clicks yet.</Typography>}
              {it.clickData.map((c, i) => (
                <Typography key={i} variant="body2">
                  {i + 1}. {c.timestamp} — source: {c.source} — location: {c.location}
                </Typography>
              ))}
            </details>
            <Button sx={{ mt: 1 }} size="small" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${it.shortcode}`)}>Copy Short URL</Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
