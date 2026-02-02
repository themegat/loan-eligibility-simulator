import { Button, Stack, StepContent, type SxProps } from "@mui/material";
import {
  useGetApiLoansProductsQuery,
  useGetApiLoansValidationRulesQuery,
  type EligibilityResponse,
} from "../store/loansApi";
import { useState } from "react";
import PersonalInfoComponent from "../components/PersonalInfo";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FinancialInfoComponent from "../components/FinancialInfo";
import LoanDetailsComponent from "../components/LoanDetails";
import type { StepData } from "../models/StepData";
import ProductSelectComponent from "../components/ProductSelect";
import useLoans from "../hooks/useLoans";
import useUtilities from "../hooks/useUtilities";

const buttonStyle: SxProps = {
  width: 30,
};

type Props = {
  setStepsData: React.Dispatch<React.SetStateAction<StepData | null>>;
  setEligibilityResponse: React.Dispatch<
    React.SetStateAction<EligibilityResponse | null>
  >;
};

const LoanForm = ({ setStepsData, setEligibilityResponse }: Props) => {
  const { isMobile } = useUtilities();

  const { determineEligibility } = useLoans();
  const { data: loansProducts } = useGetApiLoansProductsQuery();
  const { data: validationRules } = useGetApiLoansValidationRulesQuery();
  const [activeStep, setActiveStep] = useState(0);
  const [stepData, setStepData] = useState<StepData>({
    step0: {
      errors: true,
    },
    step1: {
      errors: true,
    },
    step2: {
      errors: true,
    },
    step3: {
      errors: true,
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleProductSelectChange = (
    errors: boolean,
    name: string,
    purpose: string,
  ) => {
    setStepData({
      ...stepData,
      step0: {
        errors,
        name,
        purpose,
      },
    });
  };

  const handlePersonalInfoChange = (
    errors: boolean,
    age: number,
    employmentStatus: string,
    employmentDuration: number,
  ) => {
    setStepData({
      ...stepData,
      step1: {
        errors,
        age,
        employmentStatus,
        employmentDuration,
      },
    });
  };

  const handleFinancialInfoChange = (
    errors: boolean,
    monthlyIncome: number,
    monthlyExpenses: number,
    creditScore: number,
  ) => {
    setStepData({
      ...stepData,
      step2: {
        errors,
        monthlyIncome,
        monthlyExpenses,
        creditScore,
      },
    });
  };

  const handleLoanDetailsChange = (
    errors: boolean,
    requestedAmount: number,
    loanTerm: number,
  ) => {
    setStepData({
      ...stepData,
      step3: {
        errors,
        requestedAmount,
        loanTerm,
      },
    });
  };

  const handleDetermineEligibility = () => {
    determineEligibility(stepData).then((response) => {
      setEligibilityResponse(response);
      setStepsData(stepData);
    });
  };

  const buttonGroupStyle: SxProps = {
    gap: 2,
    marginTop: isMobile ? 2 : 0,
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Stack>
      <Stack>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Select a product</StepLabel>
            <StepContent>
              {loansProducts && (
                <ProductSelectComponent
                  values={{
                    name: stepData.step0?.name,
                    purpose: stepData.step0?.purpose,
                  }}
                  products={loansProducts.products ?? []}
                  onChange={handleProductSelectChange}
                />
              )}
              <Stack sx={buttonGroupStyle}>
                <Button
                  sx={buttonStyle}
                  variant="contained"
                  disabled={stepData?.step0?.errors}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Stack>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Personal Info</StepLabel>
            <StepContent>
              {validationRules?.personalInfo && (
                <PersonalInfoComponent
                  values={{
                    age: stepData.step1?.age?.toString() ?? "",
                    employmentStatus: stepData.step1?.employmentStatus ?? "",
                    employmentDuration:
                      stepData.step1?.employmentDuration?.toString(),
                  }}
                  onChange={handlePersonalInfoChange}
                  validations={validationRules?.personalInfo}
                />
              )}
              <Stack sx={buttonGroupStyle}>
                <Button
                  variant="outlined"
                  sx={buttonStyle}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  disabled={stepData?.step1?.errors}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Stack>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Finacial Info</StepLabel>
            <StepContent>
              {validationRules?.financialInfo && (
                <FinancialInfoComponent
                  values={{
                    monthlyIncome:
                      stepData.step2?.monthlyIncome?.toString() ?? "",
                    monthlyExpenses:
                      stepData.step2?.monthlyExpenses?.toString() ?? "",
                    creditScore: stepData.step2?.creditScore?.toString() ?? "",
                  }}
                  onChange={handleFinancialInfoChange}
                  validations={validationRules?.financialInfo}
                />
              )}
              <Stack sx={buttonGroupStyle}>
                <Button
                  variant="outlined"
                  sx={buttonStyle}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  disabled={stepData?.step2?.errors}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Stack>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Loan Details</StepLabel>
            <StepContent>
              {validationRules?.loanDetails && (
                <LoanDetailsComponent
                  values={{
                    requestedAmount:
                      stepData.step3?.requestedAmount?.toString() ?? "",
                    loanTerm: stepData.step3?.loanTerm?.toString() ?? "",
                  }}
                  onChange={handleLoanDetailsChange}
                  validations={validationRules?.loanDetails}
                />
              )}
              <Stack sx={buttonGroupStyle}>
                <Button
                  variant="outlined"
                  sx={buttonStyle}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  disabled={stepData?.step3?.errors}
                  onClick={handleDetermineEligibility}
                >
                  Check Eligibility
                </Button>
              </Stack>
            </StepContent>
          </Step>
        </Stepper>
      </Stack>
    </Stack>
  );
};

export default LoanForm;
