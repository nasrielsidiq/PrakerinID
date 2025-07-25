'use client'

import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
  const [, setTheme] = useTheme();

  return (
    <div className="flex gap-2">
      <button onClick={() => {setTheme("light"); localStorage.setItem("theme", "light")}} className="p-2 bg-gray-200">Light</button>
      <button onClick={() => {setTheme("dark"); localStorage.setItem("theme", "dark")}} className="p-2 bg-gray-800 text-white">Dark</button>
      <button onClick={() => {setTheme("system"); localStorage.setItem("theme", "system")}} className="p-2 bg-blue-500 text-white">System</button>
    </div>
  );
}
