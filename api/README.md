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
│   ├── ProductsResponse.cs         # Loan product DTOs
│   ├── EligibilityResponse.cs       # Eligibility assessment DTOs
│   ├── CalculateRateResponse.cs     # Payment schedule DTOs
│   └── ValidationRulesResponse.cs   # Validation rule DTOs
├── Service/
│   └── LoanService.cs              # Business logic
├── Program.cs                       # Application startup
├── appsettings.json                # Configuration
└── LoanEligibilitySimulatorApi.csproj
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

## Available Endpoints

### Get Available Loan Products
```
GET /api/loans/products
```
Returns a list of available loan products with terms and interest rate ranges.

**Response**: `ProductsResponse`
```json
{
  "products": [
    {
      "id": "personal_loan",
      "name": "Personal Loan",
      "description": "Flexible personal financing",
      "minAmount": 5000.00,
      "maxAmount": 300000.00,
      "minTerm": 6,
      "maxTerm": 60,
      "interestRateRange": {
        "min": 10.5,
        "max": 18.5
      },
      "purposes": ["debt_consolidation", "home_improvement", "education", "medical", "other"]
    }
  ]
}
```

### Get Loan Eligibility Assessment
```
GET /api/loans/eligibility
```
Returns eligibility results, recommended loan amount, and affordability analysis.

**Response**: `EligibilityResponse`
```json
{
  "eligibilityResult": {
    "isEligible": true,
    "approvalLikelihood": 85,
    "riskCategory": "low",
    "decisionReason": "Strong income-to-expense ratio"
  },
  "recommendedLoan": {
    "maxAmount": 180000.00,
    "recommendedAmount": 150000.00,
    "interestRate": 12.5,
    "monthlyPayment": 7089.50,
    "totalRepayment": 170148.00
  },
  "affordabilityAnalysis": {
    "disposableIncome": 10000.00,
    "debtToIncomeRatio": 20,
    "loanToIncomeRatio": 60,
    "affordabilityScore": "good"
  }
}
```

### Calculate Interest Rate & Payment Schedule
```
GET /api/loans/calculate-rate
```
Returns interest rate, monthly payment, and detailed payment schedule.

**Response**: `CalculateRateResponse`
```json
{
  "interestRate": 12.5,
  "monthlyPayment": 7089.50,
  "totalInterest": 20148.00,
  "totalRepayment": 170148.00,
  "paymentSchedules": [
    {
      "month": 1,
      "payment": 7089.50,
      "principal": 5527.17,
      "interest": 1562.33,
      "balance": 144472.83
    }
  ]
}
```

### Get Validation Rules
```
GET /api/loans/validation-rules
```
Returns validation rules for loan application form fields (age, income, credit score, etc.).

**Response**: `ValidationRulesResponse`
```json
{
  "personalInfo": {
    "age": {
      "min": 18,
      "max": 65,
      "required": true,
      "errorMessage": "Age must be between 18 and 65"
    },
    "employmentStatus": {
      "required": true,
      "options": ["employed", "self_employed", "unemployed", "retired"],
      "errorMessage": "Please select your employment status"
    }
  },
  "financialInfo": {
    "monthlyIncome": {
      "min": 5000.00,
      "required": true,
      "errorMessage": "Minimum monthly income of R5,000 required"
    },
    "creditScore": {
      "min": 300,
      "max": 850,
      "required": false,
      "errorMessage": "Credit score must be between 300 and 850"
    }
  },
  "loanDetails": {
    "requestedAmount": {
      "min": 5000.00,
      "max": 300000.00,
      "required": true,
      "errorMessage": "Loan amount must be between R5,000 and R300,000"
    }
  }
}
```

## Development

### Build the Project
```bash
dotnet build
```

### Run Tests (if available)
```bash
dotnet test
```

### Development Configuration

The API uses `appsettings.Development.json` for development environment settings. Modify as needed for your local setup.

### Code Structure

- **Controllers**: Handle HTTP requests and route them to services
- **Services**: Contain business logic for loan calculations and eligibility
- **DTOs**: Define data transfer objects for API responses
- **Data Layer**: Contains seed data for products, validation rules, and sample calculations

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

## Contributing

When adding new features:
1. Add corresponding DTOs in `Dto/` folder
2. Implement business logic in `Service/LoanService.cs`
3. Add controller endpoints in `Controller/LoansController.cs`
4. Document endpoints in this README

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

## License

[Your License Here]

## Support

For issues or questions, please contact the development team.
