import { Stack, Typography } from "@mui/material";
import type { Product } from "../store/loansApi";
import { useForm } from "react-hook-form";
import SelectInput from "./inputs/SelectInput";
import { useCallback, useEffect } from "react";
import useUtilities from "../hooks/useUtilities";

type Props = {
  values?: {
    name?: string;
    purpose?: string;
  };
  products: Product[];
  onChange?: (errors: boolean, name: string, purpose: string) => void;
};

const ProductSelectComponent = ({ products, onChange, values }: Props) => {
  const purposeOptions = useCallback(
    (index: number) => {
      return products[index].purposes ?? [];
    },
    [products],
  );
  const { isMobile, isTablet } = useUtilities();

  const nameIndex = products.findIndex(
    (product) => product.name === values?.name,
  );
  let purposeIndex = -1;
  if (nameIndex >= 0 && values?.purpose) {
    purposeIndex = purposeOptions(nameIndex).findIndex(
      (purpose) => purpose === values?.purpose,
    );
  }
  const { control, watch, formState } = useForm({
    defaultValues: {
      name: nameIndex >= 0 ? nameIndex : {},
      purpose: purposeIndex >= 0 ? purposeIndex : {},
    },
  });

  const options = products.map((product) => product.name ?? "");

  useEffect(() => {
    const nameIndex = watch("name") as number;
    if (nameIndex >= 0) {
      const purposeOpts = purposeOptions(nameIndex);
      const purposeIndex = watch("purpose") as number;
      onChange?.(
        !formState.isValid,
        options[nameIndex] ?? "",
        purposeOpts[purposeIndex] ?? "",
      );
    }
  }, [watch, formState]);

  return (
    <Stack gap={isMobile ? 2 : 5} direction={isMobile ? "column" : "row"}>
      <Stack maxWidth={isMobile || isTablet ? "100%" : "40%"}>
        <Typography variant="h6" gutterBottom>
          To begin please tell us about the loan you want to apply for
        </Typography>
      </Stack>
      <Stack minWidth={isTablet ? "50%" : "30%"} gap={2}>
        <SelectInput
          name="name"
          label="Loan Type"
          control={control}
          required={true}
          errorMessage={"Please select an loan type"}
          options={options}
        />
        {Number(watch("name")) >= 0 && (
          <SelectInput
            name="purpose"
            label="Loan Purpose"
            control={control}
            required={true}
            errorMessage={"Please select an purpose for the loan"}
            options={purposeOptions(Number(watch("name")))}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ProductSelectComponent;
