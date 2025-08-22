import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Button variant={"outline"} size={"icon"} onClick={() => setTheme(nextTheme)}>
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
