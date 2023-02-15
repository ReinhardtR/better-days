import { type LucideIcon, Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { capitalize } from "~/utils";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export function Footer() {
  return (
    <footer className="mt-16 flex items-center justify-center border-t border-t-slate-200 dark:border-t-slate-700">
      <div className="container flex items-center justify-between p-8">
        <p className="text-md font-semibold text-slate-500 dark:text-slate-400">
          Better Days
        </p>
        <ThemeMenu />
      </div>
    </footer>
  );
}

type Theme = "light" | "dark" | "system";

const themeIcons: { [key in Theme]: LucideIcon } = {
  light: Sun,
  dark: Moon,
  system: Laptop,
};

function ThemeMenu() {
  const { setTheme, theme } = useTheme();

  if (!theme) return null;

  const ThemeIcon = themeIcons[theme as Theme] ?? themeIcons.system;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ThemeIcon className="mr-2 h-4 w-4" />
          <span>{capitalize(theme)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(themeIcons).map(([themeName, ThemeIcon]) => (
          <DropdownMenuItem key={themeName} onClick={() => setTheme(themeName)}>
            <ThemeIcon className="mr-2 h-4 w-4" />
            <span>{capitalize(themeName)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
