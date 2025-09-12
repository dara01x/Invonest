import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, Server, Users, Cookie, Baby, FileText, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const sections = [
    {
      icon: Shield,
      title: t('informationWeCollect'),
      content: t('informationWeCollectDesc')
    },
    {
      icon: Server,
      title: t('localDataProcessing'),
      content: t('localDataProcessingDesc')
    },
    {
      icon: Lock,
      title: t('noDataStorage'),
      content: t('noDataStorageDesc')
    },
    {
      icon: Eye,
      title: t('analyticsAndTracking'),
      content: t('analyticsAndTrackingDesc')
    },
    {
      icon: Users,
      title: t('thirdPartyServices'),
      content: t('thirdPartyServicesDesc')
    },
    {
      icon: Shield,
      title: t('dataSecurity'),
      content: t('dataSecurityDesc')
    },
    {
      icon: Users,
      title: t('userRights'),
      content: t('userRightsDesc')
    },
    {
      icon: Cookie,
      title: t('cookies'),
      content: t('cookiesDesc')
    },
    {
      icon: Baby,
      title: t('childrenPrivacy'),
      content: t('childrenPrivacyDesc')
    },
    {
      icon: FileText,
      title: t('changesPolicy'),
      content: t('changesPolicyDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir={language === 'en' ? 'ltr' : 'rtl'}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo + Back Button */}
            <div className={`flex items-center ${language === 'en' ? 'space-x-4' : 'gap-4'}`}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-10 w-10"
              >
                <ArrowLeft className={`h-5 w-5 ${language !== 'en' ? 'scale-x-[-1]' : ''}`} />
                <span className="sr-only">Go back</span>
              </Button>
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
            </div>

            {/* Controls */}
            <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'}`}>
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl scale-110"></div>
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-2xl backdrop-blur-sm p-3 sm:p-4">
                <Shield className="h-full w-full text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('privacyPolicyTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('privacyPolicySubtitle')}
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            <span className="font-medium">{t('effectiveDate')}:</span> September 12, 2025
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-xl sm:text-2xl`}>
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Contact Section */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-xl sm:text-2xl`}>
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <span>{t('contactUs')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                {t('contactUsDesc')}
              </p>
              <div className="space-y-3">
                <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-muted-foreground`}>
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">+964 750 192 0671</span>
                </div>
                <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-muted-foreground`}>
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">Daramistefa30@gmail.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button 
            onClick={() => navigate('/')}
            className={`
              h-12 px-8 text-base gap-3
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
              font-medium tracking-wide
              rounded-lg
              shadow-sm
            `}
          >
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-800/40 dark:to-purple-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative flex items-center gap-3">
              <ArrowLeft className={`h-4 w-4 relative z-10 group-hover:-translate-x-0.5 transition-transform duration-300 ${language !== 'en' ? 'scale-x-[-1] order-last' : ''}`} />
              <span className="relative z-10 tracking-wide">{t('home')}</span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-6 sm:py-8 mt-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${language === 'en' ? '' : ''}`} dir={language === 'en' ? 'ltr' : 'rtl'}>
            <p className="text-sm text-muted-foreground">
              © 2025 {t('appTitle')}. {t('allRightsReserved')}
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              {t('madeBy')} <span className="font-medium">Dara Mustafa</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
