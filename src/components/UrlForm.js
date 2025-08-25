import React, { useState } from 'react';
import { Box, TextField, Grid, IconButton, Button, Alert, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { saveUrlMapping, shortcodeExists } from '../utils/storage';
import { logEvent } from '../utils/logger';

const urlRegex = /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/.*)?$/i;
const codeRegex = /^[a-zA-Z0-9]{3,15}$/';

function createRow() {
  return { longUrl: '', validity: 30, shortcode: '' };
}

export default function UrlForm({ onCreated }) {
  const [rows, setRows] = useState([createRow()]);
  const [error, setError] = useState(null);

  const addRow = () => {
    if (rows.length >= 5) return setError('You can shorten up to 5 URLs at a time.');
    setRows([...rows, createRow()]);
  };

  const removeRow = (idx) => {
    const next = rows.filter((_, i) => i !== idx);
    setRows(next.length ? next : [createRow()]);
  };

  const onChange = (idx, field, value) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r));
    setRows(next);
  };

  const validateRow = (row) => {
    if (!urlRegex.test(row.longUrl.trim())) return 'Invalid URL (must start with http/https).';
    const validity = Number(row.validity);
    if (!Number.isInteger(validity) || validity <= 0) return 'Validity must be a positive integer (minutes).';
    if (row.shortcode && !/^[a-zA-Z0-9]{3,15}$/.test(row.shortcode)) return 'Custom shortcode must be 3–15 alphanumeric characters.';
    if (row.shortcode && shortcodeExists(row.shortcode)) return `Shortcode "${row.shortcode}" already exists.`;
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const now = Date.now();

    for (let i = 0; i < rows.length; i++) {
      const err = validateRow(rows[i]);
      if (err) { setError(`Row ${i + 1}: ${err}`); return; }
    }

    rows.forEach((row) => {
      const code = row.shortcode || Math.random().toString(36).slice(2, 7);
      const createdAt = new Date().toISOString();
      const expiry = now + Number(row.validity) * 60 * 1000;
      const record = {
        longUrl: row.longUrl.trim(),
        shortcode: code,
        createdAt,
        expiry,
        clicks: 0,
        clickData: []
      };
      saveUrlMapping(code, record);
      logEvent('URL_SHORTENED', { shortcode: code, longUrl: record.longUrl, expiry });
    });

    logEvent('BATCH_CREATE', { count: rows.length });
    setRows([createRow()]);
    if (onCreated) onCreated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {rows.map((row, idx) => (
        <Grid container spacing={2} alignItems="center" key={idx} sx={{ mb: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField label="Original URL" fullWidth value={row.longUrl} onChange={(e) => onChange(idx, 'longUrl', e.target.value)} />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField type="number" label="Validity (min)" fullWidth value={row.validity} onChange={(e) => onChange(idx, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField label="Custom Shortcode (optional)" fullWidth value={row.shortcode} onChange={(e) => onChange(idx, 'shortcode', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={1} sx={{ textAlign: 'right' }}>
            <Tooltip title="Remove row"><span>
              <IconButton aria-label="remove" onClick={() => removeRow(idx)} disabled={rows.length === 1}>
                <DeleteIcon />
              </IconButton>
            </span></Tooltip>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addRow}>Add URL</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">Shorten</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
