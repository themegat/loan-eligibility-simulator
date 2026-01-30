import { Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  value: string;
};

const LoanResultItem = ({ title, value }: Props) => {
  return (
    <Stack direction="row" gap={2}>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Stack>
  );
};

export default LoanResultItem;
