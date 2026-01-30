# Loan Eligibility Simulator App

A React + Vite frontend application for the Loan Eligibility Simulator. Provides a user-friendly interface for loan eligibility assessment and interest rate calculations.

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** (for version control)

## Project Structure

```
loan-eligibility-simulator-app/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── FinancialInfo.tsx
│   │   ├── LoanDetails.tsx
│   │   ├── LoanResultItem.tsx
│   │   ├── PersonalInfo.tsx
│   │   ├── ProductSelect.tsx
│   │   └── inputs/              # Input components
│   ├── hooks/
│   │   └── useLoans.ts          # Custom hook for loan API calls
│   ├── models/
│   │   └── StepData.ts          # Data models
│   ├── pages/
│   │   └── Loan.tsx             # Main loan simulator page
│   ├── sections/
│   │   ├── LoanForm.tsx         # Form section
│   │   └── LoanResult.tsx       # Results section
│   ├── store/
│   │   ├── baseApi.ts           # RTK Query base API
│   │   ├── loansApi.ts          # Loans API slice
│   │   └── index.ts             # Redux store configuration
│   ├── types/
│   │   └── globals.d.ts         # Global type definitions
│   ├── utils/
│   │   └── Utilities.ts         # Utility functions
│   ├── App.tsx                  # Main App component
│   ├── App.css                  # Global styles
│   ├── main.tsx                 # Entry point
│   └── index.css                # Base styles
├── public/                      # Static assets
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── index.html                  # HTML template
```

## Quick Start

### 1. Install Dependencies

Navigate to the app directory:

```bash
cd app/loan-eligibility-simulator-app
```

Install dependencies:

```bash
npm install
```

### 2. Run Development Server

Start the development server:

```bash
npm run dev
```

The app will open in your browser at:

- **http://localhost:5173** (default Vite port)

### 3. Build for Production

Create a production build:

```bash
npm run build
```

Optimized static assets will be generated in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Technology Stack

- **React** 18.x - UI library
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **RTK Query** - Data fetching and caching
- **Material-UI (MUI)** - Component library and styling
- **ESLint** - Code linting

## API Integration

The app communicates with the Loan Eligibility Simulator API via RTK Query. API configuration is defined in:

- `src/store/baseApi.ts` - Base API configuration
- `src/store/loansApi.ts` - Loans-specific API endpoints

By default, the app expects the API to be available at `http://localhost:5005/api` during development. This can be configured in `openapi-config.ts`.

## Environment Configuration

Configuration variables can be managed through:

- `openapi-config.ts` - API configuration
- `vite.config.ts` - Build and dev server settings
- `tsconfig.json` - TypeScript compiler options
