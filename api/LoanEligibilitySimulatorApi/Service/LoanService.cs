using System;
using LoanEligibilitySimulatorApi.Dto;

namespace LoanEligibilitySimulatorApi.Service;

public class LoanService
{
    public Task<ProductsResponse> GetAvailableProducts()
    {
        var products = new ProductsResponse
        {
            Products = new List<Product>
            {
                new Product
                {
                    Id = "personal_loan",
                    Name = "Personal Loan",
                    Description = "Flexible personal financing for various needs",
                    MinAmount = 5000.00,
                    MaxAmount = 300000.00,
                    MinTerm = 6,
                    MaxTerm = 60,
                    InterestRateRange = new InterestRateRange { Min = 10.5, Max = 18.5 },
                    Purposes = new List<string> { "debt_consolidation", "home_improvement", "education", "medical", "other" }
                },
                new Product
                {
                    Id = "vehicle_loan",
                    Name = "Vehicle Finance",
                    Description = "Financing for new and used vehicles",
                    MinAmount = 50000.00,
                    MaxAmount = 1500000.00,
                    MinTerm = 12,
                    MaxTerm = 72,
                    InterestRateRange = new InterestRateRange { Min = 8.5, Max = 15.0 },
                    Purposes = new List<string> { "new_vehicle", "used_vehicle" }
                }
            }
        };

        return Task.FromResult(products);
    }

    public Task<EligibilityResponse> GetLoanEligibility()
    {
        var eligibility = new EligibilityResponse
        {
            EligibilityResult = new EligibilityResult
            {
                IsEligible = true,
                ApprovalLikelihood = 85,
                RiskCategory = "low",
                DecisionReason = "Strong income-to-expense ratio and manageable existing debt"
            },
            RecommendedLoan = new RecommendedLoan
            {
                MaxAmount = 180000.00,
                RecommendedAmount = 150000.00,
                InterestRate = 12.5,
                MonthlyPayment = 7089.50,
                TotalRepayment = 170148.00
            },
            AffordabilityAnalysis = new AffordabilityAnalysis
            {
                DisposableIncome = 10000.00,
                DebtToIncomeRatio = 20,
                LoanToIncomeRatio = 60,
                AffordabilityScore = "good"
            }
        };

        return Task.FromResult(eligibility);
    }

    public Task<CalculateRateResponse> CalculateInterestRate()
    {
        var schedule = new CalculateRateResponse
        {
            InterestRate = 12.5,
            MonthlyPayment = 7089.50,
            TotalInterest = 20148.00,
            TotalRepayment = 170148.00,
            PaymentSchedules = new List<PaymentSchedule>
            {
                new PaymentSchedule
                {
                    Month = 1,
                    Payment = 7089.50,
                    Principal = 5527.17,
                    Interest = 1562.33,
                    Balance = 144472.83
                },
                new PaymentSchedule
                {
                    Month = 2,
                    Payment = 7089.50,
                    Principal = 5584.89,
                    Interest = 1504.61,
                    Balance = 138887.94
                }
            }
        };

        return Task.FromResult(schedule);
    }

    public Task<ValidationRulesResponse> GetValidationRules()
    {
        return Task.FromResult(GetValidationRulesData());
    }

    private static ValidationRulesResponse GetValidationRulesData()
        => new()
        {
            PersonalInfo = new()
            {
                Age = new()
                {
                    Min = 18,
                    Max = 65,
                    Required = true,
                    ErrorMessage = "Age must be between 18 and 65"
                },
                EmploymentStatus = new()
                {
                    Required = true,
                    Options = new() { "employed", "self_employed", "unemployed", "retired" },
                    ErrorMessage = "Please select your employment status"
                },
                EmploymentDuration = new()
                {
                    Min = 3,
                    Required = true,
                    ErrorMessage = "Minimum 3 months employment required"
                }
            },
            FinancialInfo = new()
            {
                MonthlyIncome = new()
                {
                    Min = 5000.00,
                    Required = true,
                    ErrorMessage = "Minimum monthly income of R5,000 required"
                },
                MonthlyExpenses = new()
                {
                    Min = 0,
                    Required = true,
                    ErrorMessage = "Please enter your monthly expenses"
                },
                CreditScore = new()
                {
                    Min = 300,
                    Max = 850,
                    Required = false,
                    ErrorMessage = "Credit score must be between 300 and 850"
                }
            },
            LoanDetails = new()
            {
                RequestedAmount = new()
                {
                    Min = 5000.00,
                    Max = 300000.00,
                    Required = true,
                    ErrorMessage = "Loan amount must be between R5,000 and R300,000"
                },
                LoanTerm = new()
                {
                    Min = 6,
                    Max = 60,
                    Required = true,
                    ErrorMessage = "Loan term must be between 6 and 60 months"
                }
            }
        };
}

