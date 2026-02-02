import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useUtilities from "../../hooks/useUtilities";
type Props = {
  name: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  //   control: Control<FieldValues, unknown, FieldValues> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  onChange?: () => void;
  options: string[];
};

const SelectInput = ({
  name,
  label,
  onChange,
  required,
  errorMessage,
  control,
  options,
}: Props) => {
  const { formatOption } = useUtilities();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            error={!!fieldState.error || field.value < 0}
            id={name}
            labelId={`${name}-label`}
            label={label}
            onInput={() => {
              onChange?.();
            }}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={index}>
                {formatOption(option)}
              </MenuItem>
            ))}
          </Select>
          <Typography
            alignSelf="start"
            marginLeft={2}
            variant="caption"
            color="error"
            gutterBottom
          >
            {fieldState.error || field.value < 0 ? errorMessage : ""}
          </Typography>
        </FormControl>
      )}
    />
  );
};

export default SelectInput;
