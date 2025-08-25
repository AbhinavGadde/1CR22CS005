// Local storage helpers for URL mappings + analytics
const DB_KEY = 'urlDB';

export function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
}
export function setDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function saveUrlMapping(shortcode, data) {
  const db = getDB();
  db[shortcode] = data;
  setDB(db);
}

export function getUrlMapping(shortcode) {
  const db = getDB();
  return db[shortcode];
}

export function getAllUrlsArray() {
  const db = getDB();
  // convert to array sorted by createdAt desc
  return Object.values(db).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function shortcodeExists(code) {
  const db = getDB();
  return !!db[code];
}

export function recordClick(shortcode, source = 'direct') {
  const db = getDB();
  if (db[shortcode]) {
    db[shortcode].clicks += 1;
    db[shortcode].clickData.push({
      timestamp: new Date().toISOString(),
      source,
      location: 'Unknown'
    });
    setDB(db);
  }
}
