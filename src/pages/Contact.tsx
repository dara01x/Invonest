import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
  company: string; // Honeypot field
}

export default function Contact() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    company: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field
    if (formData.company) {
      console.warn('Bot detected - honeypot field filled');
      return;
    }
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link
      const subject = encodeURIComponent(`Contact Form: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:invonest01x@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setIsSubmitted(true);
      toast({
        title: "Thank you for contacting us!",
        description: "Your email client should open with your message. Please send the email to complete your submission.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '', company: '' });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Mail className="h-full w-full text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question or suggestion? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-xl sm:text-2xl`}>
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Send className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Thank you for contacting us!</h3>
                    <p className="text-muted-foreground">
                      Your email client should have opened with your message. Please send the email to complete your submission.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4"
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Honeypot field - hidden from users */}
                    <div style={{ display: 'none' }}>
                      <Label htmlFor="company">Company (leave blank)</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        rows={6}
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full h-12 text-base gap-3
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
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      {/* Background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-800/40 dark:to-purple-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Content */}
                      <div className="relative flex items-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span className="relative z-10 tracking-wide">Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className={`h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300 ${language !== 'en' ? 'scale-x-[-1] order-last' : ''}`} />
                            <span className="relative z-10 tracking-wide">Send Message</span>
                          </>
                        )}
                      </div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-lg sm:text-xl`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground break-all">invonest01x@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-lg sm:text-xl`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Duhok, Iraq</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className={`flex items-center ${language === 'en' ? 'space-x-3' : 'gap-3'} text-lg sm:text-xl`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>Response Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We typically respond to messages within 24-48 hours during weekdays.
                </p>
              </CardContent>
            </Card>
          </div>
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