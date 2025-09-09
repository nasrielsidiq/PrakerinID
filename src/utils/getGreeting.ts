export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour <= 10) {
    return "Selamat Pagi.";
  } else if (hour >= 11 && hour <= 14) {
    return "Selamat Siang.";
  } else if (hour >= 15 && hour <= 17) {
    return "Selamat Sore.";
  } else {
    return "Selamat Malam.";
  }
}
