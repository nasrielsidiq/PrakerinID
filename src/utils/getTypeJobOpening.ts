export const getTypeJobOpening = (type: string) => {
  switch (type) {
    case "full_time":
      return "Penuh waktu";
    case "part_time":
      return "Paruh waktu";
    default:
      return "";
  }
};
