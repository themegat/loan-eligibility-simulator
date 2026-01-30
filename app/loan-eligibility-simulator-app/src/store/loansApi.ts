import { baseSplitApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiLoansEligibility: build.mutation<
      PostApiLoansEligibilityApiResponse,
      PostApiLoansEligibilityApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Loans/eligibility`,
        method: "POST",
        body: queryArg.eligibilityRequest,
      }),
    }),
    getApiLoansProducts: build.query<
      GetApiLoansProductsApiResponse,
      GetApiLoansProductsApiArg
    >({
      query: () => ({ url: `/api/Loans/products` }),
    }),
    postApiLoansCalculateRate: build.mutation<
      PostApiLoansCalculateRateApiResponse,
      PostApiLoansCalculateRateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Loans/calculate-rate`,
        method: "POST",
        body: queryArg.calculateRateRequest,
      }),
    }),
    getApiLoansValidationRules: build.query<
      GetApiLoansValidationRulesApiResponse,
      GetApiLoansValidationRulesApiArg
    >({
      query: () => ({ url: `/api/Loans/validation-rules` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as loansApi };
export type PostApiLoansEligibilityApiResponse =
  /** status 200 OK */ EligibilityResponse;
export type PostApiLoansEligibilityApiArg = {
  eligibilityRequest: EligibilityRequest;
};
export type GetApiLoansProductsApiResponse =
  /** status 200 OK */ ProductsResponse;
export type GetApiLoansProductsApiArg = void;
export type PostApiLoansCalculateRateApiResponse =
  /** status 200 OK */ CalculateRateResponse;
export type PostApiLoansCalculateRateApiArg = {
  calculateRateRequest: CalculateRateRequest;
};
export type GetApiLoansValidationRulesApiResponse =
  /** status 200 OK */ ValidationRulesResponse;
export type GetApiLoansValidationRulesApiArg = void;
export type EligibilityResult = {
  isEligible?: boolean;
  approvalLikelihood?: number | string;
  riskCategory: string;
  decisionReason: string;
};
export type RecommendedLoan = {
  maxAmount?: number | string;
  recommendedAmount?: number | string;
  interestRate?: number | string;
  monthlyPayment?: number | string;
  totalRepayment?: number | string;
};
export type AffordabilityAnalysis = {
  disposableIncome?: number | string;
  debtToIncomeRatio?: number | string;
  loanToIncomeRatio?: number | string;
  affordabilityScore?: null | string;
};
export type EligibilityResponse = {
  eligibilityResult: EligibilityResult;
  recommendedLoan: RecommendedLoan;
  affordabilityAnalysis: AffordabilityAnalysis;
};
export type PersonalInfoRequest = {
  age?: number | string;
  employmentStatus: string;
  employmentDuration?: number | string;
};
export type FinancialInfoRequest = {
  monthlyIncome?: number | string;
  monthlyExpenses?: number | string;
  existingDebt?: number | string;
  creditScore?: number | string;
};
export type LoanDetailsRequest = {
  requestedAmount?: number | string;
  loanTerm?: number | string;
  loanPurpose: string;
};
export type EligibilityRequest = {
  personalInfo: PersonalInfoRequest;
  financialInfo: FinancialInfoRequest;
  loanDetails: LoanDetailsRequest;
};
export type InterestRateRange = {
  min?: number | string;
  max?: number | string;
};
export type Product = {
  id: string;
  name: string;
  description: string;
  minAmount?: number | string;
  maxAmount?: number | string;
  minTerm?: number | string;
  maxTerm?: number | string;
  interestRateRange: InterestRateRange;
  purposes: string[];
};
export type ProductsResponse = {
  products: Product[];
};
export type PaymentSchedule = {
  month?: number | string;
  payment?: number | string;
  principal?: number | string;
  interest?: number | string;
  balance?: number | string;
};
export type CalculateRateResponse = {
  interestRate?: number | string;
  monthlyPayment?: number | string;
  totalInterest?: number | string;
  totalRepayment?: number | string;
  paymentSchedules: PaymentSchedule[];
};
export type CalculateRateRequest = {
  loanAmount?: number | string;
  loanTerm?: number | string;
  creditScore?: number | string;
  loanType: string;
};
export type Age = {
  errorMessage: string;
  min?: number | string;
  max?: number | string;
  required?: boolean;
};
export type EmploymentStatus = {
  required?: boolean;
  options: string[];
  errorMessage: string;
};
export type EmploymentDuration = {
  min?: number | string;
  required?: boolean;
  errorMessage?: null | string;
};
export type PersonalInfo = {
  age?: null | Age;
  employmentStatus?: null | EmploymentStatus;
  employmentDuration?: null | EmploymentDuration;
};
export type MonthlyIncome = {
  min?: number | string;
  required?: boolean;
  errorMessage?: null | string;
};
export type MonthlyExpenses = {
  min?: number | string;
  required?: boolean;
  errorMessage?: null | string;
};
export type CreditScore = {
  errorMessage: string;
  min?: number | string;
  max?: number | string;
  required?: boolean;
};
export type FinancialInfo = {
  monthlyIncome?: null | MonthlyIncome;
  monthlyExpenses?: null | MonthlyExpenses;
  creditScore?: null | CreditScore;
};
export type RequestedAmount = {
  min?: number | string;
  max?: number | string;
  required?: boolean;
  errorMessage?: null | string;
};
export type LoanTerm = {
  min?: number | string;
  max?: number | string;
  required?: boolean;
  errorMessage?: null | string;
};
export type LoanDetails = {
  requestedAmount?: null | RequestedAmount;
  loanTerm?: null | LoanTerm;
};
export type ValidationRulesResponse = {
  personalInfo?: null | PersonalInfo;
  financialInfo?: null | FinancialInfo;
  loanDetails?: null | LoanDetails;
};
export const {
  usePostApiLoansEligibilityMutation,
  useGetApiLoansProductsQuery,
  usePostApiLoansCalculateRateMutation,
  useGetApiLoansValidationRulesQuery,
} = injectedRtkApi;
