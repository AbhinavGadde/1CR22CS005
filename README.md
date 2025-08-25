# URL Shortener (Frontend Only)

React + Material UI client-side URL shortener that satisfies the given evaluation specs.

## ✅ Features
- React app running on **http://localhost:3000**
- **Mandatory logging** via a custom logging middleware (no console.log): stored in `localStorage.logs`
- Shorten **up to 5 URLs concurrently**
- **Uniqueness** of shortcodes (auto-generated or custom)
- **Default validity** = 30 minutes (if unspecified)
- **Custom shortcodes** (validated to be alphanumeric and 3–15 chars)
- **Client-side routing & redirection**: `/:shortcode` redirects to long URL if not expired
- **Analytics** per short URL: creation time, expiry time, total clicks, and click details (timestamp, source, coarse location placeholder)
- **Robust error handling** and user-friendly messages (MUI Alerts)
- **Material UI** only (no other CSS libs)

> Storage is purely **client-side** (localStorage). This is intentional per the assignment.

## 🚀 Quick Start

```bash
npm install
npm start
```

The app will run at: **http://localhost:3000**

## 🧭 How It Works
- All data lives in `localStorage.urlDB`.
- Logs are written to `localStorage.logs` through the custom `logEvent` function (see `src/utils/logger.js`).
- Visiting `http://localhost:3000/abc12` triggers the redirect page which records a click and forwards to the long URL (if not expired).

## 🧪 Notes for Reviewers
- No console logging is used for application events.
- All validations happen client-side before writing to storage:
  - Valid URL (basic pattern)
  - Validity integer (defaults to 30 minutes)
  - Custom shortcode (alphanumeric 3–15) and **unique**
- Redirection, analytics updates, and error states are handled entirely in the client.
