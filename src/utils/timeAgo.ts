export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "tahun", seconds: 31536000 }, // 365 * 24 * 60 * 60
    { label: "bulan", seconds: 2592000 }, // 30 * 24 * 60 * 60
    { label: "minggu", seconds: 604800 }, // 7 * 24 * 60 * 60
    { label: "hari", seconds: 86400 }, // 24 * 60 * 60
    { label: "jam", seconds: 3600 }, // 60 * 60
    { label: "menit", seconds: 60 },
    { label: "detik", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label} yang lalu`;
    }
  }

  return "baru saja";
}
