import { Stack, Typography } from "@mui/material";
import type { PersonalInfo } from "../store/loansApi";
import { useForm } from "react-hook-form";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import { useEffect } from "react";

type Props = {
  values?: {
    age?: string;
    employmentStatus?: string;
    employmentDuration?: string;
  };
  validations: PersonalInfo;
  onChange?: (
    errors: boolean,
    age: number,
    employmentStatus: string,
    employmentDuration: number,
  ) => void;
};

const PersonalInfoComponent = ({ values, validations, onChange }: Props) => {
  const empStatusIndex =
    validations.employmentStatus?.options.findIndex(
      (option) => option === values?.employmentStatus,
    ) ?? -1;

  const { control, trigger, watch, formState } = useForm({
    defaultValues: {
      age: values?.age ?? "",
      employmentStatus: empStatusIndex >= 0 ? empStatusIndex : {},
      employmentDuration: values?.employmentDuration ?? "",
    },
  });

  useEffect(() => {
    const empStatusIndex = watch("employmentStatus") as number;
    onChange?.(
      !formState.isValid,
      Number(watch("age")),
      validations.employmentStatus?.options[empStatusIndex] ?? "",
      Number(watch("employmentDuration")),
    );
  }, [watch, formState]);

  return (
    <Stack gap={5} direction="row">
      <Stack maxWidth={"40%"}>
        <Typography variant="h6" gutterBottom>
          Next please tell us a little about yourself and your employment
        </Typography>
      </Stack>
      <Stack minWidth={"30%"} gap={2}>
        <TextInput
          type="number"
          name="age"
          label="Age"
          control={control}
          required={validations.age?.required}
          errorMessage={validations.age?.errorMessage}
          min={Number(validations.age?.min)}
          max={Number(validations.age?.max)}
          onChange={() => {
            setTimeout(() => {
              trigger("age");
            });
          }}
        />
        <SelectInput
          name="employmentStatus"
          label="Employment Status"
          control={control}
          required={validations.employmentStatus?.required}
          errorMessage={validations.employmentStatus?.errorMessage}
          options={validations.employmentStatus?.options ?? []}
        />
        <TextInput
          type="number"
          name="employmentDuration"
          label="Employment Duration"
          control={control}
          required={validations.employmentDuration?.required}
          errorMessage={validations.employmentDuration?.errorMessage ?? ""}
          min={Number(validations.employmentDuration?.min)}
          onChange={() => {
            setTimeout(() => {
              trigger("employmentDuration");
            });
          }}
        />
      </Stack>
    </Stack>
  );
};

export default PersonalInfoComponent;
