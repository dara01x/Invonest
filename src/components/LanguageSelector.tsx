import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackLanguageChange } from "@/lib/analytics";
import type { Language } from "@/lib/i18n";

const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'ar' as Language, name: 'العربية' },
  { code: 'ckb' as Language, name: 'کوردی' },
];

export const LanguageSelector = ({ fullWidth = false }: { fullWidth?: boolean }) => {
  const { language, changeLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  
  const handleLanguageChange = (newLanguage: Language) => {
    trackLanguageChange(language, newLanguage);
    changeLanguage(newLanguage);
  };
  
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`
            group relative overflow-hidden
            gap-3 px-4 py-2 ${fullWidth ? 'w-full justify-start h-12' : 'h-10'}
            bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-950/30 dark:to-cyan-950/30 backdrop-blur-sm
            border border-emerald-200/30 dark:border-emerald-700/30
            hover:border-emerald-300/50 dark:hover:border-emerald-600/50
            hover:shadow-emerald dark:hover:shadow-cyan
            transition-all duration-300 ease-in-out
            hover:scale-[1.02] active:scale-[0.98]
            ring-0 focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2
            text-emerald-700 dark:text-emerald-300
            hover:text-emerald-900 dark:hover:text-emerald-100
            font-medium
            rounded-lg
          `}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-cyan-100/50 dark:from-emerald-800/30 dark:to-cyan-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative flex items-center gap-3">
            <Languages className={`${fullWidth ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-transform group-hover:rotate-12 duration-300`} />
            <span className={`font-semibold transition-all duration-300 ${fullWidth ? 'text-base' : (!isMobile ? 'hidden sm:inline' : 'hidden')}`}>
              {currentLanguage?.name}
            </span>
            <ChevronDown className={`${fullWidth ? 'h-4 w-4 ml-auto' : 'h-3 w-3'} opacity-70 transition-transform group-data-[state=open]:rotate-180 duration-300`} />
          </div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="
          w-[200px] sm:w-[220px] 
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
          border border-emerald-200/50 dark:border-emerald-700/50
          shadow-xl shadow-emerald/20 dark:shadow-emerald/30
          rounded-xl p-2
          animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          duration-200
        "
        sideOffset={8}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              group/item
              gap-3 px-4 py-3 rounded-lg
              cursor-pointer transition-all duration-200
              hover:scale-[1.01] active:scale-[0.99]
              font-medium
              ${
                language === lang.code 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-colored' 
                  : 'bg-transparent hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-cyan-50/50 dark:hover:from-emerald-900/30 dark:hover:to-cyan-900/30 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300'
              }
            `}
          >
            <span className="text-sm sm:text-base transition-all duration-200">
              {lang.name}
            </span>
            {language === lang.code && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};