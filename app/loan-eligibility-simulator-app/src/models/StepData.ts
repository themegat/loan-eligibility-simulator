export interface StepData {
  step0?: {
    errors: boolean;
    name?: string;
    purpose?: string;
  };
  step1?: {
    errors: boolean;
    age?: number;
    employmentStatus?: string;
    employmentDuration?: number;
  };
  step2?: {
    errors: boolean;
    monthlyIncome?: number;
    monthlyExpenses?: number;
    creditScore?: number;
  };
  step3?: {
    errors: boolean;
    requestedAmount?: number;
    loanTerm?: number;
  };
}
