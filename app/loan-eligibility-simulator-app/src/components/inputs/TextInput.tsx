import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
type Props = {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
  //   control: Control<FieldValues, unknown, FieldValues> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  onChange?: () => void;
};

const TextInput = ({
  name,
  label,
  onChange,
  required,
  errorMessage,
  control,
  min,
  max,
  type,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required, min: min, max: max }}
      render={({ field, fieldState }) => (
        <TextField
          type={type}
          {...field}
          error={required && (!!fieldState.error || field.value === "")}
          id={name}
          label={label}
          variant="outlined"
          helperText={fieldState.error ? errorMessage : ""}
          onInput={() => {
            onChange?.();
          }}
        />
      )}
    />
  );
};

export default TextInput;
