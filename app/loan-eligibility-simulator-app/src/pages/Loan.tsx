import { Stack, Typography } from "@mui/material";
import LoanForm from "../sections/LoanForm";
import { useState } from "react";
import type { EligibilityResponse } from "../store/loansApi";
import LoanResult from "../sections/LoanResult";
import type { StepData } from "../models/StepData";

const LoansPage = () => {
  const [eligibilityResponse, setEligibilityResponse] =
    useState<EligibilityResponse | null>(null);
  const [stepsData, setStepsData] = useState<StepData | null>(null);

  return (
    <Stack>
      <Stack>
        <Typography variant="h4" gutterBottom>
          Loan Eligibility Simulator
        </Typography>
      </Stack>
      {!eligibilityResponse ? (
        <LoanForm
          setStepsData={setStepsData}
          setEligibilityResponse={setEligibilityResponse}
        />
      ) : (
        <LoanResult
          stepsData={stepsData}
          eligibilityResponse={eligibilityResponse}
        />
      )}
    </Stack>
  );
};

export default LoansPage;
