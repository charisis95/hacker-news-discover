# HN Discover

A simple, responsive Hacker News search app. Search stories through the Hacker News Algolia API and keep a temporary reading list while the app is open.

## Features

- Debounced Hacker News story search
- Loading, error, empty, and success states
- Save and remove stories from a reading list
- Responsive layout for mobile, tablet, and desktop
- Accessible keyboard-friendly controls

## Technology

- Vite
- React
- TypeScript
- Component-scoped CSS

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

No environment variables are required. Story data is loaded from the public Hacker News Algolia API.

## Project structure

```text
src/
  components/   Reusable UI components and their styles/types
  hooks/        Hacker News search logic
  screens/      Page-level composition and styles
  types/        Shared API and story types
  App.tsx
  main.tsx
  index.css
```

The app has no authentication or user roles.
