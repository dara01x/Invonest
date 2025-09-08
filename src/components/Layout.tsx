import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, ArrowLeft, Home } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
  onBackToLanding?: () => void;
}

export const Layout = ({ children, onBackToLanding }: LayoutProps) => {
  const { t, dir } = useLanguage();
  const isMobile = useIsMobile();

  const ActionButtons = () => (
    <>
      {onBackToLanding && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToLanding}
          className="
            group relative overflow-hidden
            gap-2 px-4 py-2 h-10
            bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950
            border-2 border-blue-200 dark:border-blue-700
            hover:border-blue-300 dark:hover:border-blue-600
            hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20
            transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-95
            ring-0 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-2
            text-blue-700 dark:text-blue-300
            hover:text-blue-800 dark:hover:text-blue-200
            font-medium
          "
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative flex items-center gap-2">
            <Home className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110 duration-300" />
            <span className={`font-semibold transition-all duration-300 ${!isMobile ? 'hidden sm:inline' : 'hidden'}`}>
              {t('home')}
            </span>
          </div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </Button>
      )}
      <ThemeToggle />
      <LanguageSelector />
    </>
  );

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Top Navigation */}
      <header className="border-b border-border/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800 shadow-sm">
                  <img 
                    src="/logo/Icon.png" 
                    alt="Invonest Logo" 
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform hover:scale-110 duration-300"
                  />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                  {t('appTitle')}
                </h1>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <ActionButtons />
            </div>

            {/* Mobile Menu */}
            <div className="flex sm:hidden flex-shrink-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="
                      group relative overflow-hidden
                      h-10 w-10 p-0
                      bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950
                      border-2 border-blue-200 dark:border-blue-700
                      hover:border-blue-300 dark:hover:border-blue-600
                      hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20
                      transition-all duration-300 ease-in-out
                      hover:scale-105 active:scale-95
                      ring-0 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-2
                      text-blue-700 dark:text-blue-300
                      hover:text-blue-800 dark:hover:text-blue-200
                    "
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Menu className="h-5 w-5 relative z-10 transition-transform group-hover:rotate-180 duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[280px] sm:w-[320px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-l-2 border-blue-200 dark:border-blue-700"
                >
                  <div className="flex flex-col gap-6 mt-8">
                    <div className="space-y-4">
                      {onBackToLanding && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={onBackToLanding}
                          className="
                            group relative overflow-hidden w-full justify-start
                            gap-3 px-4 py-3 h-12
                            bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950
                            border-2 border-blue-200 dark:border-blue-700
                            hover:border-blue-300 dark:hover:border-blue-600
                            hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20
                            transition-all duration-300 ease-in-out
                            hover:scale-105 active:scale-95
                            ring-0 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-2
                            text-blue-700 dark:text-blue-300
                            hover:text-blue-800 dark:hover:text-blue-200
                            font-medium
                          "
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative flex items-center gap-3">
                            <Home className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 duration-300" />
                            <span className="font-semibold text-base">{t('home')}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                        </Button>
                      )}
                      
                      <div className="w-full">
                        <ThemeToggle fullWidth={true} />
                      </div>
                      
                      <div className="w-full">
                        <LanguageSelector fullWidth={true} />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};