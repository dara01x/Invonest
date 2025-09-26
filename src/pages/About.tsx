import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Zap, Shield, Star, Heart, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Super Fast",
      description: "Generate professional invoices in under 2 minutes with our intuitive interface"
    },
    {
      icon: Shield,
      title: "100% Free Forever",
      description: "No hidden costs, no watermarks, no limitations. Completely free with no signup required"
    },
    {
      icon: Star,
      title: "Multi-Language Support",
      description: "Create invoices in English, Arabic, and Kurdish with perfect RTL/LTR formatting"
    },
    {
      icon: Heart,
      title: "Privacy Focused",
      description: "All data processing happens locally in your browser. We don't store any of your information"
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
                <User className="h-full w-full text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About Invonest
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional invoice generator that's 100% free forever
          </p>
        </div>

        {/* What is Invonest Section */}
        <div className="space-y-6 sm:space-y-8 mb-12">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">What is Invonest?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Invonest is a modern, free invoice generator designed to help businesses and freelancers create professional invoices quickly and easily. 
                Built with privacy in mind, all invoice creation happens locally in your browser - no data is ever sent to external servers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">What Problem Does It Solve?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Many invoice generators are expensive, require subscriptions, or compromise your data privacy. Invonest solves these problems by providing 
                a completely free, privacy-focused solution that works entirely in your browser. Whether you're a small business in Iraq, a freelancer 
                working with international clients, or anyone who needs professional invoices, Invonest makes it simple and secure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-lg sm:text-xl`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{feature.title}</span>
                  </CardTitle>
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

        {/* Who Built It Section */}
        <div className="mb-12">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-xl sm:text-2xl`}>
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/20">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <span>Who Built It?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                Invonest was built by <strong>Dara Mustafa</strong>, a passionate developer from Duhok, Iraq. 
                With a focus on creating tools that solve real-world problems, Dara designed Invonest to be the invoice generator 
                he wished existed - completely free, privacy-focused, and supporting multiple languages including Kurdish.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Having experienced the challenges of finding good, affordable business tools in the region, 
                Dara made Invonest completely free and open to everyone, ensuring that businesses of all sizes can create professional invoices.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info Section */}
        <div className="mb-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-xl sm:text-2xl`}>
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                Have questions or suggestions? We'd love to hear from you!
              </p>
              <div className="space-y-3">
                <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-muted-foreground`}>
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">invonest01x@gmail.com</span>
                </div>
                <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-muted-foreground`}>
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Duhok, Iraq</span>
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
              © 2025 {t('appTitle')}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              Made by <span className="font-medium">Dara Mustafa</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}