import { Stack, Typography } from "@mui/material";
import type { FinancialInfo } from "../store/loansApi";
import { useForm } from "react-hook-form";
import TextInput from "./inputs/TextInput";
import { useEffect } from "react";

type Props = {
  values?: {
    monthlyIncome?: string;
    monthlyExpenses?: string;
    creditScore?: string;
  };
  validations: FinancialInfo;
  onChange?: (
    errors: boolean,
    monthlyIncome: number,
    monthlyExpenses: number,
    creditScore: number,
  ) => void;
};

const FinancialInfoComponent = ({ values, validations, onChange }: Props) => {
  const { control, trigger, watch, formState } = useForm({
    defaultValues: {
      monthlyIncome: values?.monthlyIncome ?? "",
      monthlyExpenses: values?.monthlyExpenses ?? "",
      creditScore: values?.creditScore ?? "",
    },
  });

  useEffect(() => {
    onChange?.(
      !formState.isValid,
      Number(watch("monthlyIncome")),
      Number(watch("monthlyExpenses")),
      Number(watch("creditScore")),
    );
  }, [watch, formState]);

  return (
    <Stack gap={5} direction="row">
      <Stack maxWidth={"40%"}>
        <Typography variant="h6" gutterBottom>
          We're almost done, next please let us know a little about your
          financial situation
        </Typography>
      </Stack>
      <Stack minWidth={"30%"} gap={2}>
        <TextInput
          type="number"
          name="monthlyIncome"
          label="Monthly Income"
          control={control}
          required={validations.monthlyIncome?.required}
          errorMessage={validations.monthlyIncome?.errorMessage ?? ""}
          min={Number(validations.monthlyIncome?.min)}
          onChange={() => {
            setTimeout(() => {
              trigger("monthlyIncome");
            });
          }}
        />
        <TextInput
          type="number"
          name="monthlyExpenses"
          label="Monthly Expenses"
          control={control}
          required={validations.monthlyExpenses?.required}
          errorMessage={validations.monthlyExpenses?.errorMessage ?? ""}
          min={Number(validations.monthlyExpenses?.min)}
          onChange={() => {
            setTimeout(() => {
              trigger("monthlyExpenses");
            });
          }}
        />
        <TextInput
          type="number"
          name="creditScore"
          label="Credit Score"
          control={control}
          required={validations.creditScore?.required}
          errorMessage={validations.creditScore?.errorMessage ?? ""}
          min={Number(validations.creditScore?.min)}
          onChange={() => {
            setTimeout(() => {
              trigger("creditScore");
            });
          }}
        />
      </Stack>
    </Stack>
  );
};

export default FinancialInfoComponent;
