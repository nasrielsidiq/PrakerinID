export const getDateIndonesia = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const formatted = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return formatted;
};
