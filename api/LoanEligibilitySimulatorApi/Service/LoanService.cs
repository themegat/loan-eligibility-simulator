using System;
using LoanEligibilitySimulatorApi.Dto.Response;
using LoanEligibilitySimulatorApi.Dto.Request;

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

    public Task<EligibilityResponse> GetLoanEligibility(EligibilityRequest request)
    {
        var age = request.PersonalInfo.Age;
        var employmentStatus = (request.PersonalInfo.EmploymentStatus ?? "").Trim();
        var employmentDurationMonths = request.PersonalInfo.EmploymentDuration;

        var income = Math.Max(0, request.FinancialInfo.MonthlyIncome);
        var expenses = Math.Max(0, request.FinancialInfo.MonthlyExpenses);
        var existingDebtPayment = Math.Max(0, request.FinancialInfo.ExistingDebt); // assume this is monthly debt servicing
        var creditScore = request.FinancialInfo.CreditScore;

        var requestedAmount = Math.Max(0, request.LoanDetails.RequestedAmount);
        var termMonths = Math.Clamp(request.LoanDetails.LoanTerm, 6, 84);
        var purpose = (request.LoanDetails.LoanPurpose ?? "").Trim();

        var disposableIncome = income - expenses - existingDebtPayment;
        var dti = income > 0 ? existingDebtPayment / income : 1.0;           // debt-to-income (monthly)
        var lti = income > 0 ? requestedAmount / (income * 12.0) : 99.0;     // loan-to-income (annual)

        // --- Risk / pricing model (mocked but realistic-ish) ---
        var baseApr = ScoreToApr(creditScore);
        baseApr += EmploymentToAprAdjustment(employmentStatus, employmentDurationMonths);
        baseApr += PurposeToAprAdjustment(purpose);
        baseApr += AgeToAprAdjustment(age);
        baseApr = Clamp(baseApr, 6.0, 29.0);

        // --- Determine max affordable payment & max loan offer ---
        // Allow up to 35% of disposable income for repayment, but cap at 20% of gross income.
        var affordablePayment = Math.Max(0, disposableIncome * 0.35);
        affordablePayment = Math.Min(affordablePayment, income * 0.20);

        var monthlyRate = baseApr / 12.0 / 100.0;
        var maxAffordablePrincipal = RoundMoney(PrincipalFromPayment(affordablePayment, monthlyRate, termMonths));

        // Lender-style caps (mocked):
        // - cap by LTI: 6x annual income (can tweak)
        // - cap by absolute ceiling for a “simulator”
        var annualIncome = income * 12.0;
        var ltiCap = annualIncome * 6.0;
        var absoluteCap = 1_000_000.0;

        var maxAmount = RoundMoney(Math.Max(0, Math.Min(maxAffordablePrincipal, Math.Min(ltiCap, absoluteCap))));

        // --- Eligibility rules (mocked thresholds) ---
        var isEligible = true;
        string decisionReason = "Meets affordability and risk criteria.";

        if (income <= 0)
        {
            isEligible = false;
            decisionReason = "No verifiable monthly income provided.";
        }
        else if (disposableIncome <= 0)
        {
            isEligible = false;
            decisionReason = "Insufficient disposable income after expenses and existing debt.";
        }
        else if (dti > 0.45)
        {
            isEligible = false;
            decisionReason = "Debt-to-income ratio is too high.";
        }
        else if (creditScore < 520)
        {
            isEligible = false;
            decisionReason = "Credit score is below the minimum threshold.";
        }
        else if (IsHighRiskEmployment(employmentStatus) && employmentDurationMonths < 6)
        {
            isEligible = false;
            decisionReason = "Employment stability is insufficient for approval.";
        }

        // If eligible but requested > max offer, still eligible but limited by offer
        if (isEligible && requestedAmount > maxAmount && maxAmount > 0)
        {
            decisionReason = "Eligible, but requested amount exceeds affordability-based maximum.";
        }

        // --- Risk category & approval likelihood ---
        var riskCategory = RiskCategory(creditScore, dti, disposableIncome, employmentStatus, employmentDurationMonths);
        var approvalLikelihood = ApprovalLikelihoodPercent(isEligible, creditScore, dti, disposableIncome, employmentStatus, employmentDurationMonths);

        // --- Recommend an amount ---
        // Recommended is min(requested, maxAmount) then apply a haircut by risk
        var haircut = RiskHaircut(riskCategory);
        var recommendedAmount = isEligible
            ? RoundMoney(Math.Min(requestedAmount, maxAmount) * haircut)
            : 0.0;

        // Ensure recommended doesn’t exceed maxAmount
        if (recommendedAmount > maxAmount) recommendedAmount = maxAmount;

        // Monthly payment & total repayment for the recommended offer
        var monthlyPayment = (isEligible && recommendedAmount > 0)
            ? RoundMoney(CalcAmortizedPayment(recommendedAmount, monthlyRate, termMonths))
            : 0.0;

        var totalRepayment = (isEligible && monthlyPayment > 0)
            ? RoundMoney(monthlyPayment * termMonths)
            : 0.0;

        // --- Affordability score label ---
        var affordabilityScore = AffordabilityLabel(disposableIncome, dti, recommendedAmount, income);

        var response = new EligibilityResponse
        {
            EligibilityResult = new EligibilityResult
            {
                IsEligible = isEligible,
                ApprovalLikelihood = approvalLikelihood,
                RiskCategory = riskCategory,
                DecisionReason = decisionReason
            },
            RecommendedLoan = new RecommendedLoan
            {
                MaxAmount = maxAmount,
                RecommendedAmount = recommendedAmount,
                InterestRate = RoundMoney(baseApr),
                MonthlyPayment = monthlyPayment,
                TotalRepayment = totalRepayment
            },
            AffordabilityAnalysis = new AffordabilityAnalysis
            {
                DisposableIncome = RoundMoney(disposableIncome),
                DebtToIncomeRatio = Math.Round(dti, 4),
                LoanToIncomeRatio = Math.Round(lti, 4),
                AffordabilityScore = affordabilityScore
            }
        };

        return Task.FromResult(response);
    }

    // ---------------- Helpers ----------------

    private static double ScoreToApr(int score)
    {
        score = Math.Clamp(score, 300, 850);

        if (score >= 780) return 9.0;
        if (score >= 740) return 10.5;
        if (score >= 700) return 12.5;
        if (score >= 660) return 14.5;
        if (score >= 620) return 17.0;
        if (score >= 580) return 20.0;
        if (score >= 540) return 23.0;
        return 26.0;
    }

    private static double EmploymentToAprAdjustment(string employmentStatus, int durationMonths)
    {
        // Normalize
        var s = employmentStatus.ToLowerInvariant();

        // base adjustment by status
        double adj =
            s.Contains("permanent") ? -0.5 :
            s.Contains("contract") ? 0.75 :
            s.Contains("self") ? 1.25 :
            s.Contains("student") ? 2.0 :
            s.Contains("unemploy") ? 4.0 :
            0.5; // unknown -> slightly higher risk

        // stability bonus/penalty by duration
        if (durationMonths >= 24) adj -= 0.75;
        else if (durationMonths >= 12) adj -= 0.25;
        else if (durationMonths < 6) adj += 0.75;

        return adj;
    }

    private static bool IsHighRiskEmployment(string employmentStatus)
    {
        var s = (employmentStatus ?? "").ToLowerInvariant();
        return s.Contains("unemploy") || s.Contains("student");
    }

    private static double PurposeToAprAdjustment(string purpose)
    {
        var p = (purpose ?? "").ToLowerInvariant();

        if (p.Contains("debt")) return 0.5;
        if (p.Contains("education")) return 0.25;
        if (p.Contains("medical")) return 0.25;
        if (p.Contains("home") || p.Contains("renovat")) return -0.25;
        if (p.Contains("vehicle") || p.Contains("car")) return 0.0;
        if (p.Contains("business")) return 0.75;
        if (p.Contains("travel")) return 1.0;

        return 0.25; // default slight risk
    }

    private static double AgeToAprAdjustment(int age)
    {
        if (age <= 0) return 1.0;
        if (age < 21) return 1.5;
        if (age < 25) return 0.75;
        if (age <= 60) return 0.0;
        return 0.5; // older -> mild risk bump
    }

    private static string RiskCategory(int creditScore, double dti, double disposableIncome, string employmentStatus, int durationMonths)
    {
        var s = (employmentStatus ?? "").ToLowerInvariant();
        var employmentRisk =
            s.Contains("permanent") ? 0 :
            s.Contains("contract") ? 1 :
            s.Contains("self") ? 2 :
            s.Contains("unemploy") ? 3 :
            1;

        int points = 0;

        if (creditScore < 540) points += 4;
        else if (creditScore < 580) points += 3;
        else if (creditScore < 620) points += 2;
        else if (creditScore < 660) points += 1;

        if (dti > 0.50) points += 4;
        else if (dti > 0.45) points += 3;
        else if (dti > 0.35) points += 2;
        else if (dti > 0.25) points += 1;

        if (disposableIncome < 0) points += 4;
        else if (disposableIncome < 2000) points += 2;
        else if (disposableIncome < 6000) points += 1;

        points += employmentRisk;
        if (durationMonths < 6) points += 2;
        else if (durationMonths < 12) points += 1;

        return points switch
        {
            <= 2 => "Low",
            <= 5 => "Medium",
            <= 8 => "High",
            _ => "Very High"
        };
    }

    private static int ApprovalLikelihoodPercent(bool isEligible, int creditScore, double dti, double disposableIncome, string employmentStatus, int durationMonths)
    {
        if (!isEligible) return Math.Clamp(15, 0, 100);

        int score = 50;

        // credit score impact
        score += creditScore switch
        {
            >= 780 => 30,
            >= 740 => 25,
            >= 700 => 20,
            >= 660 => 12,
            >= 620 => 6,
            >= 580 => 0,
            _ => -10
        };

        // DTI impact
        if (dti < 0.20) score += 15;
        else if (dti < 0.30) score += 8;
        else if (dti < 0.40) score += 2;
        else score -= 8;

        // disposable income
        if (disposableIncome > 12000) score += 10;
        else if (disposableIncome > 6000) score += 6;
        else if (disposableIncome > 2000) score += 2;

        // employment stability
        var s = (employmentStatus ?? "").ToLowerInvariant();
        if (s.Contains("permanent")) score += 6;
        else if (s.Contains("contract")) score += 2;
        else if (s.Contains("self")) score -= 2;

        if (durationMonths >= 24) score += 5;
        else if (durationMonths >= 12) score += 2;

        return Math.Clamp(score, 0, 100);
    }

    private static double RiskHaircut(string riskCategory) =>
        riskCategory switch
        {
            "Low" => 1.00,
            "Medium" => 0.95,
            "High" => 0.85,
            "Very High" => 0.75,
            _ => 0.90
        };

    private static string AffordabilityLabel(double disposableIncome, double dti, double recommendedAmount, double income)
    {
        if (income <= 0) return "Poor";
        if (disposableIncome <= 0) return "Poor";
        if (dti > 0.45) return "Poor";

        if (disposableIncome > 12000 && dti < 0.25) return "Excellent";
        if (disposableIncome > 6000 && dti < 0.35) return "Good";
        if (disposableIncome > 2000 && dti < 0.40) return "Fair";
        return "Fair";
    }

    private static double PrincipalFromPayment(double payment, double monthlyRate, int termMonths)
    {
        if (termMonths <= 0 || payment <= 0) return 0;

        if (monthlyRate <= 0)
            return payment * termMonths;

        var factor = 1 - Math.Pow(1 + monthlyRate, -termMonths);
        return payment * (factor / monthlyRate);
    }

    private static double CalcAmortizedPayment(double principal, double monthlyRate, int termMonths)
    {
        if (termMonths <= 0) return 0;
        if (principal <= 0) return 0;

        if (monthlyRate <= 0)
            return principal / termMonths;

        var factor = Math.Pow(1 + monthlyRate, -termMonths);
        return principal * (monthlyRate / (1 - factor));
    }

    private static double RoundMoney(double value) =>
        Math.Round(value, 2, MidpointRounding.AwayFromZero);

    private static double Clamp(double v, double min, double max) =>
        Math.Max(min, Math.Min(max, v));

    public Task<CalculateRateResponse> CalculateInterestRate(CalculateRateRequest request)
    {
        var loanAmount = GetDoubleProperty(request, defaultValue: 150_000.00,
            "LoanAmount", "RequestedAmount", "Amount", "Principal");
        var termMonths = (int)Math.Round(GetDoubleProperty(request, defaultValue: 24,
            "TermMonths", "LoanTerm", "Term", "Months"));
        termMonths = Math.Clamp(termMonths, 1, 600);

        var annualRatePct = GetDoubleProperty(request, defaultValue: 12.5,
            "InterestRate", "AnnualInterestRate", "Apr", "Rate");
        annualRatePct = Math.Max(0, annualRatePct);

        var monthlyRate = annualRatePct / 12.0 / 100.0;
        var baseMonthlyPayment = RoundMoney(CalcAmortizedPayment(loanAmount, monthlyRate, termMonths));

        var balance = RoundMoney(loanAmount);
        var paymentSchedules = new List<PaymentSchedule>(capacity: termMonths);
        var totalInterest = 0.0;
        var totalRepayment = 0.0;

        for (int month = 1; month <= termMonths; month++)
        {
            var interest = RoundMoney(balance * monthlyRate);
            var payment = baseMonthlyPayment;
            var principal = RoundMoney(payment - interest);

            if (principal > balance)
            {
                principal = balance;
                payment = RoundMoney(principal + interest);
            }

            balance = RoundMoney(balance - principal);

            totalInterest += interest;
            totalRepayment += payment;

            paymentSchedules.Add(new PaymentSchedule
            {
                Month = month,
                Payment = payment,
                Principal = principal,
                Interest = interest,
                Balance = balance
            });
        }

        if (paymentSchedules.Count > 0)
        {
            var last = paymentSchedules[^1];
            if (last.Balance != 0)
            {
                var adjustment = last.Balance;
                last.Principal = RoundMoney(last.Principal + adjustment);
                last.Payment = RoundMoney(last.Principal + last.Interest);
                last.Balance = 0;
                paymentSchedules[^1] = last;

                totalRepayment = RoundMoney(paymentSchedules.Sum(p => p.Payment));
                totalInterest = RoundMoney(paymentSchedules.Sum(p => p.Interest));
            }
        }

        var schedule = new CalculateRateResponse
        {
            InterestRate = annualRatePct,
            MonthlyPayment = baseMonthlyPayment,
            TotalInterest = RoundMoney(totalInterest),
            TotalRepayment = RoundMoney(totalRepayment),
            PaymentSchedules = paymentSchedules
        };

        return Task.FromResult(schedule);
    }

    private static double GetDoubleProperty(object? obj, double defaultValue, params string[] propertyNames)
    {
        if (obj is null) return defaultValue;

        var type = obj.GetType();
        foreach (var name in propertyNames)
        {
            var prop = type.GetProperty(name);
            if (prop is null) continue;

            var raw = prop.GetValue(obj);
            if (raw is null) continue;

            try
            {
                return raw switch
                {
                    double d => d,
                    float f => f,
                    decimal m => (double)m,
                    int i => i,
                    long l => l,
                    short s => s,
                    uint ui => ui,
                    ulong ul => ul,
                    string str when double.TryParse(str, out var parsed) => parsed,
                    _ => Convert.ToDouble(raw)
                };
            }
            catch
            {
                // Ignore and keep searching.
            }
        }

        return defaultValue;
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

