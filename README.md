# Widgetify - Testimonial Widgets

A collection of testimonial widgets built with Next.js and React.

## Features

- **Wall**: A testimonial wall for your site
- **Flash**: Flash testimonials popup
- **Float**: Floating testimonial widget
- **InlineSlider**: Inline slider for testimonials
- **List**: List view for testimonials
- **Grid**: Grid layout for testimonials
- **ReviewBlock**: A block to show average review rating
- **VideoWall**: A wall of videos that auto-scrolls
- **Photoset**: A review slider with a photo gallery
- **ProofPanel**: A modern review panel with source tabs and overall rating
- **CardDeck**: A deck of testimonial cards with interactive swapping
- **AnimatedWall**: A visually animated testimonial wall

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── [widget]/          # Individual widget pages
├── Components/            # React components
├── hooks/                 # Custom React hooks
├── services/              # API and utility services
└── assets/                # Static assets
```

## Migration from Create React App

This project has been migrated from Create React App to Next.js with the following changes:

- Replaced React Router with Next.js App Router
- Updated navigation hooks (`useNavigate` → `useRouter`)
- Moved pages to `src/app/` directory structure
- Updated package.json with Next.js dependencies
- Removed CRA-specific files and configurations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- Next.js 14
- React 19
- Styled Components
- React Icons
- Axios
