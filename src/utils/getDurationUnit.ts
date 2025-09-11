export const getDurationUnit = (unit: string) => {
  switch (unit) {
    case "day":
      return "Hari";
    case "month":
      return "Bulan";
    case "year":
      return "Tahun";
    default:
      return unit;
  }
};
