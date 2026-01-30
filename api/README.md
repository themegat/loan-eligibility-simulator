# Loan Eligibility Simulator API

A .NET-based REST API for simulating loan eligibility assessment and providing loan product information with validation rules.

## Prerequisites

- **.NET 10.0** or higher
- **Visual Studio 2022** or **VS Code** with C# extension (optional)
- **Git** (for version control)

## Project Structure

```
LoanEligibilitySimulatorApi/
├── Controller/
│   └── LoansController.cs          # API endpoints
├── Dto/
│   ├── Request/
│   │   ├── CalculateRateRequest.cs   # Request model for rate calculation
│   │   └── EligibilityRequest.cs     # Request model for eligibility check
│   └── Response/
│       ├── CalculateRateResponse.cs  # Payment schedule response
│       ├── EligibilityResponse.cs    # Eligibility assessment response
│       ├── ProductsResponse.cs       # Loan products response
│       └── ValidationRulesResponse.cs # Validation rules response
├── Service/
│   └── LoanService.cs              # Business logic
├── Properties/
│   └── launchSettings.json         # Launch configuration
├── Program.cs                       # Application startup and configuration
├── appsettings.json                # Configuration settings
├── appsettings.Development.json    # Development configuration
├── LoanEligibilitySimulatorApi.csproj # Project file
└── LoanEligibilitySimulatorApi.http # HTTP request examples
```

## Quick Start

### 1. Install Dependencies

Navigate to the API project directory:
```bash
cd api/LoanEligibilitySimulatorApi
```

Restore NuGet packages:
```bash
dotnet restore
```

### 2. Run the API

```bash
dotnet run
```

The API will start on:
- **HTTP**: `http://localhost:5005`
- **HTTPS**: `https://localhost:7290`

### 3. Access OpenAPI Documentation

Once running, visit:
- **Development**: `http://localhost:5005/openapi/v1.json`

## Configuration

### appsettings.json
Contains basic application configuration. Extends with environment-specific settings via `appsettings.{Environment}.json`.

### Environment Variables
Set `ASPNETCORE_ENVIRONMENT` to:
- `Development` - for development with detailed error messages
- `Production` - for production deployment

## Building for Production

```bash
dotnet publish -c Release -o ./publish
```

Output will be in the `./publish` directory for deployment.

## Technology Stack

- **.NET 10.0** - Framework
- **ASP.NET Core** - Web framework
- **OpenAPI/Swagger** - API documentation
- **C# 13** - Language

## Troubleshooting

### Port Already in Use
If port 5005 is already in use, change it in `Properties/launchSettings.json`:
```json
"applicationUrl": "http://localhost:YOUR_PORT"
```

### HTTPS Certificate Issues
Development HTTPS uses a self-signed certificate. For testing, use HTTP or trust the certificate:
```bash
dotnet dev-certs https --trust
```

### Build Errors
Ensure you have the correct .NET version:
```bash
dotnet --version
```
