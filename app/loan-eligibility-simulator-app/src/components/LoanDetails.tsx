import { Stack, Typography } from "@mui/material";
import type { LoanDetails } from "../store/loansApi";
import { useForm } from "react-hook-form";
import TextInput from "./inputs/TextInput";
import { useEffect } from "react";
import useUtilities from "../hooks/useUtilities";

type Props = {
  values?: {
    requestedAmount: string;
    loanTerm: string;
  };
  validations: LoanDetails;
  onChange?: (
    errors: boolean,
    requestedAmount: number,
    loanTerm: number,
  ) => void;
};

const LoanDetailsComponent = ({ values, validations, onChange }: Props) => {
  const { isMobile, isTablet } = useUtilities();

  const { control, trigger, watch, formState } = useForm({
    defaultValues: {
      requestedAmount: values?.requestedAmount ?? "",
      loanTerm: values?.loanTerm ?? "",
    },
  });

  useEffect(() => {
    onChange?.(
      !formState.isValid,
      Number(watch("requestedAmount")),
      Number(watch("loanTerm")),
    );
  }, [watch, formState]);

  return (
    <Stack gap={isMobile ? 2 : 5} direction={isMobile ? "column" : "row"}>
      <Stack maxWidth={isMobile || isTablet ? "100%" : "40%"}>
        <Typography variant="h6" gutterBottom>
          Lastly please provide details about the loan that you want to apply
          for.
        </Typography>
      </Stack>
      <Stack minWidth={isTablet ? "50%" : "30%"} gap={2}>
        <TextInput
          type="number"
          name="requestedAmount"
          label="Requested Amount"
          control={control}
          required={validations.requestedAmount?.required}
          errorMessage={validations.requestedAmount?.errorMessage ?? ""}
          min={Number(validations.requestedAmount?.min)}
          max={Number(validations.requestedAmount?.max)}
          onChange={() => {
            setTimeout(() => {
              trigger("requestedAmount");
            });
          }}
        />
        <TextInput
          type="number"
          name="loanTerm"
          label="Loan Term"
          control={control}
          required={validations.loanTerm?.required}
          errorMessage={validations.loanTerm?.errorMessage ?? ""}
          min={Number(validations.loanTerm?.min)}
          max={Number(validations.loanTerm?.max)}
          onChange={() => {
            setTimeout(() => {
              trigger("loanTerm");
            });
          }}
        />
      </Stack>
    </Stack>
  );
};

export default LoanDetailsComponent;
