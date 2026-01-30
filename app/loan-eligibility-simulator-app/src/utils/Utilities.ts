export const formatOption = (value: string) => {
  const split = value
    .split("_")
    .map((item) => item?.at(0)?.toUpperCase() + item.slice(1));
  return split.join(" ");
};
