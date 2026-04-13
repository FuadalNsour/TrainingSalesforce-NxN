# NxN Salesforce Training Portal

A premium dark-theme interactive training portal built with React, Next.js, and TypeScript.

## Features

- ✨ 5 interactive chapters with story-based sections
- 🔄 Dynamic lifecycle viewer with 11 stages
- 📊 Reusable component library
- 📝 Content-driven JSON structure
- 🎨 Dark premium branding (black/white/green)
- 📱 Responsive design

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

## Project Structure

```
nxn-training-portal/
├── app/              # Next.js app routes
├── components/       # Reusable React components
├── data/            # Chapter and content JSON files
├── lib/             # Types, utilities, constants
└── public/          # Static assets
```

## Building Content

Chapter content is defined in `data/chapters/*.json`. Edit these files to update training material without modifying code.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Data:** JSON content model

## Available Routes

- `/` - Landing page
- `/dashboard` - Learning dashboard with progress
- `/chapters/[chapterId]` - Individual chapter pages
- `/lifecycle` - Interactive lifecycle viewer
- `/labs` - Lab scenarios (coming soon)
- `/demo` - Demo mode (coming soon)
- `/trainer` - Trainer view (coming soon)

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- AWS Amplify
- Self-hosted Node.js server
- Docker container

## License

© 2026 7X NxN Salesforce Training Portal. All rights reserved.
