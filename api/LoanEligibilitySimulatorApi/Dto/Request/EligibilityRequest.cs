using System;

namespace LoanEligibilitySimulatorApi.Dto.Request;

public class PersonalInfoRequest
{
    public int Age { get; set; }
    public required string EmploymentStatus { get; set; }
    public int EmploymentDuration { get; set; }
}

public class FinancialInfoRequest
{
    public double MonthlyIncome { get; set; }
    public double MonthlyExpenses { get; set; }
    public double ExistingDebt { get; set; }
    public int CreditScore { get; set; }
}

public class LoanDetailsRequest
{
    public double RequestedAmount { get; set; }
    public int LoanTerm { get; set; }
    public required string LoanPurpose { get; set; }
}

public class EligibilityRequest
{
    public required PersonalInfoRequest PersonalInfo { get; set; }
    public required FinancialInfoRequest FinancialInfo { get; set; }
    public required LoanDetailsRequest LoanDetails { get; set; }
}
