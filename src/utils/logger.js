// Custom logging middleware equivalent (client-side).
// Stores logs in localStorage and exposes a hook-like function to log events.
export function logEvent(event, details = {}) {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  const entry = { timestamp: new Date().toISOString(), event, details };
  logs.push(entry);
  localStorage.setItem('logs', JSON.stringify(logs));
}

// Optional helper to read logs (for debugging via UI if needed).
export function getLogs() {
  return JSON.parse(localStorage.getItem('logs') || '[]');
}
