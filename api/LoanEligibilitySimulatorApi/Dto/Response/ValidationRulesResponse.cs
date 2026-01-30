using System;

namespace LoanEligibilitySimulatorApi.Dto.Response;

public abstract class RangeValidationRule
{
    public double Min { get; set; }
    public double Max { get; set; }
    public bool Required { get; set; }
    public string? ErrorMessage { get; set; }
}

public abstract class MinimumValidationRule
{
    public double Min { get; set; }
    public bool Required { get; set; }
    public string? ErrorMessage { get; set; }
}

public class Age : RangeValidationRule
{
    public required string ErrorMessage { get; set; }
}

public class CreditScore : RangeValidationRule
{
    public required string ErrorMessage { get; set; }
}

public class RequestedAmount : RangeValidationRule { }

public class LoanTerm : RangeValidationRule { }

public class MonthlyIncome : MinimumValidationRule { }

public class MonthlyExpenses : MinimumValidationRule { }

public class EmploymentDuration : MinimumValidationRule { }

public class EmploymentStatus
{
    public bool Required { get; set; }
    public required List<string> Options { get; set; }
    public required string ErrorMessage { get; set; }
}

public class PersonalInfo
{
    public Age? Age { get; set; }
    public EmploymentStatus? EmploymentStatus { get; set; }
    public EmploymentDuration? EmploymentDuration { get; set; }
}

public class FinancialInfo
{
    public MonthlyIncome? MonthlyIncome { get; set; }
    public MonthlyExpenses? MonthlyExpenses { get; set; }
    public CreditScore? CreditScore { get; set; }
}

public class LoanDetails
{
    public RequestedAmount? RequestedAmount { get; set; }
    public LoanTerm? LoanTerm { get; set; }
}

public class ValidationRulesResponse
{
    public PersonalInfo? PersonalInfo { get; set; }
    public FinancialInfo? FinancialInfo { get; set; }
    public LoanDetails? LoanDetails { get; set; }
}