// src/hooks/useTheme.ts
import { useEffect, useState } from "react";

export default function useTheme(): [string, (theme: string) => void] {
  // Ambil dari localStorage jika ada, jika tidak pakai "system"
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || saved === "light" ? saved : "system";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
