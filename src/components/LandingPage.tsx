import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Globe,
  Zap, 
  Download, 
  Palette, 
  Shield, 
  Check, 
  Star,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Menu,
  Mail,
  Phone,
  PlayCircle,
  X
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const { t, language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Globe,
      title: t('multiLanguage'),
      description: t('multiLanguageDesc')
    },
    {
      icon: Zap,
      title: t('superFast'),
      description: t('superFastDesc')
    },
    {
      icon: Shield,
      title: t('freeForeverFeature'),
      description: t('freeForeverDesc')
    },
    {
      icon: Download,
      title: t('instantPdf'),
      description: t('instantPdfDesc')
    },
    {
      icon: Palette,
      title: t('beautifulThemes'),
      description: t('beautifulThemesDesc')
    },
    {
      icon: Star,
      title: t('professionalDesign'),
      description: t('professionalDesignDesc')
    }
  ];

  const steps = [
    {
      number: 1,
      title: t('step1Title'),
      description: t('step1Desc')
    },
    {
      number: 2,
      title: t('step2Title'),
      description: t('step2Desc')
    },
    {
      number: 3,
      title: t('step3Title'),
      description: t('step3Desc')
    }
  ];

  return (
    <div className="min-h-screen bg-background bg-colorful-pattern">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo + App Name */}
            <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'}`}>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 p-1">
                <img 
                  src="./logo/Icon.png" 
                  alt="Invonest Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground leading-none">{t('appTitle')}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${language === 'en' ? 'space-x-8' : 'gap-8'}`}>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t('features')}
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t('howItWorks')}
              </a>
              <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t('contact')}
              </a>
            </nav>

            {/* Desktop Controls */}
            <div className={`hidden sm:flex items-center ${language === 'en' ? 'space-x-3 lg:space-x-4' : 'gap-3 lg:gap-4'}`}>
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                onClick={onGetStarted}
                className={`
                  hidden lg:inline-flex h-11 px-6 items-center gap-3
                  group relative overflow-hidden
                  bg-gradient-to-r from-blue-50/70 to-purple-50/70 dark:from-blue-950/50 dark:to-purple-950/50 backdrop-blur-sm
                  border-2 border-blue-300/40 dark:border-blue-600/40
                  hover:border-blue-400/60 dark:hover:border-blue-500/60
                  hover:shadow-purple dark:hover:shadow-blue
                  transition-all duration-300 ease-in-out
                  hover:scale-[1.03] active:scale-[0.98]
                  ring-0 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2
                  text-blue-800 dark:text-blue-200
                  hover:text-blue-900 dark:hover:text-blue-100
                  font-semibold tracking-wide
                  rounded-lg
                  shadow-sm
                `}
              >
                {/* Enhanced animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-800/40 dark:to-purple-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <span className="relative z-10 tracking-wide">{t('makeInvoice')}</span>
                  <ArrowRight className={`${language === 'en' ? '' : 'order-first'} h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5 duration-300`} />
                </div>
                
                {/* Enhanced shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="flex sm:hidden items-center gap-3">
              <LanguageSelector />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <span className="text-lg font-semibold">{t('appTitle')}</span>
                    </div>
                    <nav className="flex-1 flex flex-col gap-4 p-4">
                      <a 
                        href="#features" 
                        className="text-lg font-medium py-3 px-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t('features')}
                      </a>
                      <a 
                        href="#how-it-works" 
                        className="text-lg font-medium py-3 px-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t('howItWorks')}
                      </a>
                      <a 
                        href="/blog" 
                        className="text-lg font-medium py-3 px-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Blog
                      </a>
                      <a 
                        href="/about" 
                        className="text-lg font-medium py-3 px-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        About
                      </a>
                      <a 
                        href="#contact" 
                        className="text-lg font-medium py-3 px-2 hover:bg-accent rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t('contact')}
                      </a>
                      <div className="mt-4 pt-4 border-t">
                        <ThemeToggle />
                      </div>
                    </nav>
                    <div className="p-4 border-t">
                      <Button 
                        onClick={() => {
                          onGetStarted();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`
                          w-full h-12 gap-3
                          group relative overflow-hidden
                          bg-gradient-to-r from-blue-50/70 to-purple-50/70 dark:from-blue-950/50 dark:to-purple-950/50 backdrop-blur-sm
                          border-2 border-blue-300/40 dark:border-blue-600/40
                          hover:border-blue-400/60 dark:hover:border-blue-500/60
                          hover:shadow-purple dark:hover:shadow-blue
                          transition-all duration-300 ease-in-out
                          hover:scale-[1.02] active:scale-[0.98]
                          ring-0 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2
                          text-blue-800 dark:text-blue-200
                          hover:text-blue-900 dark:hover:text-blue-100
                          font-semibold tracking-wide text-base
                          rounded-lg
                          shadow-sm
                        `}
                      >
                        {/* Enhanced animated background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-800/40 dark:to-purple-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Content */}
                        <div className="relative flex items-center gap-3">
                          <span className="relative z-10 tracking-wide">{t('makeInvoice')}</span>
                          <ArrowRight className={`${language === 'en' ? '' : 'order-first'} h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5 duration-300`} />
                        </div>
                        
                        {/* Enhanced shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* App Logo */}
            <div className="mb-8 sm:mb-10 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl sm:rounded-3xl blur-xl scale-110"></div>
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-2xl backdrop-blur-sm p-2 sm:p-3">
                  <img 
                    src="./logo/Icon.png" 
                    alt="Invonest Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8 sm:mb-10 flex justify-center">
              <Badge variant="secondary" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm">
                <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {t('freeForever')}
              </Badge>
            </div>
            
            <h1 className="mb-8 sm:mb-10 lg:mb-12 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight text-center">
              <span className="block mb-4 sm:mb-6 lg:mb-8">{t('landingTitlePart1')}</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
                  {t('landingTitlePart2')}
                </span>
              </span>
            </h1>
            
            <p className="mb-8 sm:mb-10 lg:mb-12 text-lg sm:text-xl lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
              {t('landingSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 lg:mb-20">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className={`
                  w-full sm:w-auto h-14 sm:h-14 px-8 sm:px-10 text-lg sm:text-lg min-h-[56px] gap-3
                  group relative overflow-hidden
                  bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/60 dark:to-purple-950/60 backdrop-blur-sm
                  border-2 border-blue-400/50 dark:border-blue-500/50
                  hover:border-blue-500/70 dark:hover:border-blue-400/70
                  hover:shadow-2xl hover:shadow-purple/30 dark:hover:shadow-blue/30
                  transition-all duration-500 ease-in-out
                  hover:scale-[1.05] active:scale-[0.98]
                  ring-0 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2
                  text-blue-900 dark:text-blue-100
                  hover:text-blue-950 dark:hover:text-blue-50
                  font-semibold tracking-wide
                  rounded-xl
                  shadow-lg
                `}
              >
                {/* Enhanced animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/60 to-purple-300/60 dark:from-blue-700/50 dark:to-purple-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <PlayCircle className={`${language === 'en' ? '' : 'order-last'} h-5 w-5 sm:h-5 sm:w-5 relative z-10 group-hover:rotate-90 transition-transform duration-500`} />
                  <span className="relative z-10 tracking-wide">{t('startCreating')}</span>
                </div>
                
                {/* Enhanced shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.25] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Button>
              <div className="text-sm text-muted-foreground space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{t('noCreditCard')}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{t('readyInMinutes')}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Language Showcase */}
            <div className="relative mx-auto max-w-6xl mt-12 sm:mt-16 lg:mt-20">
              <div className="rounded-xl sm:rounded-2xl border bg-card/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-2xl">
                <div className="mb-6 sm:mb-8 text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2 sm:mb-3">{t('languageShowcaseTitle')}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{t('languageShowcaseSubtitle')}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                        <span className="text-lg sm:text-2xl font-bold">EN</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{t('englishLang')}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{t('leftToRight')}</p>
                      <div className="rounded-md sm:rounded-lg bg-white/50 dark:bg-gray-800/50 p-2 sm:p-4 text-xs">
                        <div className="font-medium">Professional Invoice</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg" dir="rtl">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                        <span className="text-lg sm:text-2xl font-bold">ع</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{t('arabicLang')}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{t('rightToLeft')}</p>
                      <div className="rounded-md sm:rounded-lg bg-white/50 dark:bg-gray-800/50 p-2 sm:p-4 text-xs">
                        <div className="font-medium">فاتورة احترافية</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border-2 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:col-span-2 lg:col-span-1" dir="rtl">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
                        <span className="text-lg sm:text-2xl font-bold">ک</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{t('kurdishLang')}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{t('rightToLeft')}</p>
                      <div className="rounded-md sm:rounded-lg bg-white/50 dark:bg-gray-800/50 p-2 sm:p-4 text-xs">
                        <div className="font-medium">پسوڵەکا پیشەیی</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>{t('automaticDirection')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>{t('culturalFormatting')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>{t('nativeFonts')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full border-2 hover:border-primary/20 transition-colors">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className={`
                w-full sm:w-auto h-12 sm:h-12 px-8 sm:px-10 text-base sm:text-base gap-3
                group relative overflow-hidden
                bg-gradient-to-r from-blue-50/70 to-purple-50/70 dark:from-blue-950/50 dark:to-purple-950/50 backdrop-blur-sm
                border-2 border-blue-300/40 dark:border-blue-600/40
                hover:border-blue-400/60 dark:hover:border-blue-500/60
                hover:shadow-purple dark:hover:shadow-blue
                transition-all duration-400 ease-in-out
                hover:scale-[1.02] active:scale-[0.98]
                ring-0 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2
                text-blue-800 dark:text-blue-200
                hover:text-blue-900 dark:hover:text-blue-100
                font-medium tracking-wide
                rounded-lg
                shadow-sm
              `}
            >
              {/* Enhanced animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-800/40 dark:to-purple-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              
              {/* Content */}
              <div className="relative flex items-center gap-3">
                <span className="relative z-10 tracking-wide">{t('startCreating')}</span>
                <ArrowRight className={`${language === 'en' ? '' : 'order-first'} h-4 w-4 sm:h-4 sm:w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-400`} />
              </div>
              
              {/* Enhanced shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t bg-muted/30 py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className={`flex items-center ${language === 'en' ? 'space-x-4' : 'gap-4'}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 p-1">
                  <img 
                    src="./logo/Icon.png" 
                    alt="Invonest Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="font-bold text-foreground">{t('appTitle')}</span>
              </div>
              <p className="text-sm text-muted-foreground pr-4">
                {t('footerDescription')}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{t('product')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors block py-1">{t('features')}</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors block py-1">{t('howItWorksTitle')}</a></li>
                <li><a href="/blog" className="hover:text-foreground transition-colors block py-1">Blog</a></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors text-left py-1">{t('newInvoice')}</button></li>
                <li><a href="/about" className="hover:text-foreground transition-colors block py-1">About Us</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors block py-1">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy-policy" className="hover:text-foreground transition-colors block py-1">{t('privacyPolicy')}</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors block py-1">Terms & Conditions</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{t('languages')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="py-1">{t('englishLang')} (LTR)</li>
                <li className="py-1">{t('arabicLang')} (RTL)</li>
                <li className="py-1">{t('kurdishLang')} (RTL)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{t('contact')}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">+964 750 192 0671</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">invonest01x@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className={`text-center ${language === 'en' ? 'sm:text-left' : 'sm:text-right'}`} dir={language === 'en' ? 'ltr' : 'rtl'}>
              <p className="text-xs sm:text-sm text-muted-foreground">
                © 2025 {t('appTitle')}. {t('allRightsReserved')}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {t('madeBy')} <span className="font-medium">Dara Mustafa</span>
              </p>
            </div>
            <div className={`flex items-center ${language === 'en' ? 'space-x-4' : 'gap-4'}`}>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
