export const formatDate = (date?: Date) => {
  return date?.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" });
};
