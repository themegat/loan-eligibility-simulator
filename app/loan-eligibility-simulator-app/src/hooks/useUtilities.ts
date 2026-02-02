import { useMediaQuery, useTheme } from "@mui/material";

const useUtilities = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const formatOption = (value: string) => {
    const split = value
      .split("_")
      .map((item) => item?.at(0)?.toUpperCase() + item.slice(1));
    return split.join(" ");
  };

  return { formatOption, isMobile, isTablet, isDesktop };
};

export default useUtilities;
