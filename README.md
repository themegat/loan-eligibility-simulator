# Loan Eligibility Simulator

A full-stack application for simulating loan eligibility and calculating interest rates. Run the complete solution locally with Docker.

## Repository Contents

This repository contains:

- **API**: C# ASP.NET Web API (containerized, Release publish)
- **App**: React + Vite (built to static assets and served via Nginx)
- **Reverse proxy**: Nginx routes:
  - `/` → frontend
  - `/api/*` → API service inside the Compose network

The goal is to run the full solution locally with a single entry URL.

## Prerequisites

Install the following:

- **Docker Desktop** (Windows/macOS) or **Docker Engine** (Linux)
- **Docker Compose v2** (docker compose ...)

### Verify Installation

```bash
docker --version
docker compose version
```

## Quick Start

From the repository root:

```bash
docker compose up --build
```

Then open the app in your browser:

- **Frontend**: http://localhost:8080
- **API** (via proxy): http://localhost:8080/api/...

### Stop the Application

```bash
docker compose down
```

## Project Structure

```
├── api/                          # ASP.NET Core Web API
│   ├── loan-eligibility-simulator.sln
│   └── LoanEligibilitySimulatorApi/
│       ├── Program.cs
│       ├── Controller/
│       ├── Service/
│       ├── Dto/
│       └── LoanEligibilitySimulatorApi.csproj
├── app/                          # React + Vite Frontend
│   └── loan-eligibility-simulator-app/
│       ├── src/
│       ├── package.json
│       ├── vite.config.ts
│       └── index.html
└── docker-compose.yml            # Orchestration configuration
```

## Architecture

The solution uses Docker Compose to orchestrate two services:

1. **API Service**: Runs the ASP.NET Core application
2. **Frontend Service**: Builds and serves the React app via Nginx

All services communicate over a shared Docker Compose network, providing a seamless local development experience accessible via a single entry point.
