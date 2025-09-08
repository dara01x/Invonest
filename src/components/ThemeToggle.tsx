import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ThemeToggle = ({ fullWidth = false }: { fullWidth?: boolean }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClasses = `
    group relative overflow-hidden
    gap-3 px-4 py-2 ${fullWidth ? 'w-full justify-start h-12' : 'h-10'}
    bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm
    border border-blue-200/30 dark:border-blue-700/30
    hover:border-blue-300/50 dark:hover:border-blue-600/50
    hover:shadow-colored dark:hover:shadow-purple
    transition-all duration-300 ease-in-out
    hover:scale-[1.02] active:scale-[0.98]
    ring-0 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2
    text-blue-700 dark:text-blue-300
    hover:text-blue-900 dark:hover:text-blue-100
    font-medium
    rounded-lg
  `;

  if (!mounted) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className={buttonClasses}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-800/30 dark:to-purple-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-3">
          <Sun className={`${fullWidth ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-transform group-hover:rotate-12 duration-300`} />
          <span className={`font-semibold transition-all duration-300 ${fullWidth ? 'text-base' : (!isMobile ? 'hidden sm:inline' : 'hidden')}`}>
            Light Mode
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={buttonClasses}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-800/30 dark:to-purple-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center gap-3">
        {theme === "dark" ? (
          <>
            <Sun className={`${fullWidth ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-transform group-hover:rotate-180 duration-500`} />
            <span className={`font-semibold transition-all duration-300 ${fullWidth ? 'text-base' : (!isMobile ? 'hidden sm:inline' : 'hidden')}`}>
              Light Mode
            </span>
          </>
        ) : (
          <>
            <Moon className={`${fullWidth ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-transform group-hover:-rotate-12 duration-300`} />
            <span className={`font-semibold transition-all duration-300 ${fullWidth ? 'text-base' : (!isMobile ? 'hidden sm:inline' : 'hidden')}`}>
              Dark Mode
            </span>
          </>
        )}
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};