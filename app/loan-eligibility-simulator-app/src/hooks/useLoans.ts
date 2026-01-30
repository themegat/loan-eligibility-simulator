import type { StepData } from "../models/StepData";
import {
  usePostApiLoansCalculateRateMutation,
  usePostApiLoansEligibilityMutation,
} from "../store/loansApi";

const useLoans = () => {
  const [apiPostEligibility] = usePostApiLoansEligibilityMutation();
  const [apiCalculateRate] = usePostApiLoansCalculateRateMutation();

  const calculatePaymentSchedule = (data: StepData) => {
    return apiCalculateRate({
      calculateRateRequest: {
        loanType: data.step0?.name ?? "",
        loanAmount: data.step3?.requestedAmount ?? 0,
        loanTerm: data.step3?.loanTerm ?? 0,
        creditScore: data.step2?.creditScore ?? 0,
      },
    }).unwrap();
  };

  const determineEligibility = (data: StepData) => {
    const existingDebt = 5000;
    return apiPostEligibility({
      eligibilityRequest: {
        personalInfo: {
          age: data.step1?.age ?? 0,
          employmentStatus: data.step1?.employmentStatus ?? "",
          employmentDuration: data.step1?.employmentDuration ?? 0,
        },
        financialInfo: {
          monthlyIncome: data.step2?.monthlyIncome ?? 0,
          monthlyExpenses: data.step2?.monthlyExpenses ?? 0,
          existingDebt: existingDebt,
          creditScore: data.step2?.creditScore ?? 0,
        },
        loanDetails: {
          requestedAmount: data.step3?.requestedAmount ?? 0,
          loanTerm: data.step3?.loanTerm ?? 0,
          loanPurpose: data.step0?.purpose ?? "",
        },
      },
    }).unwrap();
  };

  return { determineEligibility, calculatePaymentSchedule };
};

export default useLoans;
