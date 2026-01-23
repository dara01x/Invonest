import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs: FAQItem[] = [
    {
      category: "General",
      question: "What is Invonest?",
      answer: "Invonest is a free, open-source invoice generator that allows freelancers, small businesses, and entrepreneurs to create professional invoices quickly and easily. All invoice generation happens locally in your browser, ensuring complete privacy and security."
    },
    {
      category: "General",
      question: "Is Invonest really free?",
      answer: "Yes! Invonest is 100% free forever with no hidden costs, no subscription fees, no watermarks, and no limits on the number of invoices you can create. We believe everyone should have access to professional invoicing tools."
    },
    {
      category: "General",
      question: "Do I need to create an account?",
      answer: "No account creation required! Invonest works instantly in your browser without any signup, email verification, or personal information. Just open the site and start creating invoices."
    },
    {
      category: "Privacy & Security",
      question: "Is my data safe?",
      answer: "Absolutely! All invoice creation and processing happens locally in your web browser. No data is sent to our servers or stored in any cloud database. Your client information, business details, and invoice data remain completely private and under your control."
    },
    {
      category: "Privacy & Security",
      question: "Do you store my invoices?",
      answer: "No. We don't store any invoices or business data. Everything is processed locally in your browser. Once you close your browser or clear your cache, the data is gone. We recommend downloading your invoices immediately for your records."
    },
    {
      category: "Privacy & Security",
      question: "Can I use Invonest offline?",
      answer: "You need an internet connection to initially load the website, but once loaded, the invoice creation functionality works locally in your browser. However, you'll need internet to download updates or access help resources."
    },
    {
      category: "Features",
      question: "What languages does Invonest support?",
      answer: "Invonest currently supports three languages: English (with left-to-right text), Arabic (with right-to-left text), and Kurdish/Sorani (with right-to-left text). You can switch between languages instantly, and your invoice will be formatted correctly for the chosen language."
    },
    {
      category: "Features",
      question: "Can I customize my invoices?",
      answer: "Yes! Invonest offers multiple customization options including different themes, adding your logo, customizing colors, adjusting fonts, and including custom fields. You can create invoices that match your brand identity."
    },
    {
      category: "Features",
      question: "What file format are invoices saved in?",
      answer: "Invoices are generated as PDF files, which is the industry standard for professional invoicing. PDFs ensure your invoice looks the same on any device and can't be easily edited, maintaining document integrity."
    },
    {
      category: "Features",
      question: "Can I add my logo to invoices?",
      answer: "Yes! You can upload your business logo to appear on your invoices. The logo will be displayed professionally at the top of your invoice, giving it a branded, polished look."
    },
    {
      category: "Usage",
      question: "How do I create an invoice?",
      answer: "Creating an invoice is simple: 1) Click 'Create Invoice' or 'Get Started', 2) Fill in your business information, 3) Add client details, 4) Enter line items with descriptions and amounts, 5) Customize the design if desired, and 6) Download your PDF invoice. The entire process takes less than 2 minutes."
    },
    {
      category: "Usage",
      question: "Can I save invoice templates?",
      answer: "Currently, invoice data is stored in your browser's local storage, so your last invoice details will be available when you return. However, for permanent templates, we recommend saving a completed invoice as a PDF template that you can reference for future invoices."
    },
    {
      category: "Usage",
      question: "How do I add tax or discounts?",
      answer: "When creating your invoice, you can add tax rates (VAT, sales tax, etc.) that will be automatically calculated and displayed. You can also add discounts either as a percentage or fixed amount. The invoice will show the subtotal, tax, discount, and final total clearly."
    },
    {
      category: "Usage",
      question: "Can I add multiple items to an invoice?",
      answer: "Yes! You can add unlimited line items to your invoice. Each item can have its own description, quantity, rate, and amount. You can also organize items with categories or sections if needed."
    },
    {
      category: "Usage",
      question: "How do I send invoices to clients?",
      answer: "After generating your PDF invoice, you can send it to clients via: 1) Email attachment (the most common method), 2) File sharing services like Dropbox or Google Drive, 3) Project management platforms, or 4) Physical mail for printed invoices. The PDF format ensures compatibility with all methods."
    },
    {
      category: "Payment",
      question: "Does Invonest process payments?",
      answer: "No, Invonest is an invoice generation tool, not a payment processor. You'll need to specify your payment methods (bank transfer, PayPal, etc.) on the invoice and handle payments separately through your chosen payment platform."
    },
    {
      category: "Payment",
      question: "Can I add payment instructions to invoices?",
      answer: "Yes! There's a dedicated section where you can add payment terms, accepted payment methods, bank details, PayPal information, or any other payment instructions your clients need to pay you."
    },
    {
      category: "Payment",
      question: "How do I track if an invoice has been paid?",
      answer: "Invonest generates invoices but doesn't track payments. We recommend using a simple spreadsheet or accounting software to track which invoices have been paid. You can include invoice numbers on your invoices to make tracking easier."
    },
    {
      category: "Technical",
      question: "What browsers are supported?",
      answer: "Invonest works on all modern web browsers including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, and Opera. We recommend using the latest version of your browser for the best experience."
    },
    {
      category: "Technical",
      question: "Does Invonest work on mobile devices?",
      answer: "Yes! Invonest is fully responsive and works on smartphones and tablets. However, for the best experience and easier data entry, we recommend using a desktop or laptop computer."
    },
    {
      category: "Technical",
      question: "Why can't I see my invoice after refreshing?",
      answer: "Invoice data is temporarily stored in your browser's local storage. If you clear your browser cache, use private/incognito mode, or switch browsers, your unsaved data will be lost. Always download your invoices immediately after creating them."
    },
    {
      category: "Business",
      question: "Is Invonest suitable for my business?",
      answer: "Invonest is perfect for freelancers, consultants, contractors, small businesses, startups, and anyone who needs to create professional invoices. Whether you're a designer, developer, writer, photographer, or service provider, Invonest has you covered."
    },
    {
      category: "Business",
      question: "Can I use Invonest for international clients?",
      answer: "Absolutely! Invonest supports multiple currencies and languages, making it ideal for working with international clients. You can create invoices in your client's language and currency for better clarity and professionalism."
    },
    {
      category: "Business",
      question: "Are invoices from Invonest legally valid?",
      answer: "Yes, as long as your invoice contains all legally required information for your jurisdiction (business name, tax ID, client details, services, amounts, etc.), it's legally valid. The format (PDF) and tool used don't affect legal validity—the content does."
    },
    {
      category: "Business",
      question: "Can I use Invonest for tax purposes?",
      answer: "Yes! PDF invoices generated by Invonest serve as official business records for tax purposes. Keep copies of all your invoices for your tax records. Consult with a tax professional for specific tax requirements in your country."
    },
    {
      category: "Support",
      question: "How do I report a bug or suggest a feature?",
      answer: "We welcome feedback! You can report bugs or suggest features by contacting us at invonest01x@gmail.com. Please include as much detail as possible about the issue or feature request."
    },
    {
      category: "Support",
      question: "Is there a tutorial or guide?",
      answer: "Yes! Visit our Tutorial page for a step-by-step guide on creating your first invoice. We also have a Blog with articles about invoicing best practices, freelancing tips, and business advice."
    },
    {
      category: "Support",
      question: "Can I contribute to Invonest?",
      answer: "We appreciate community contributions! If you're a developer interested in contributing, or if you'd like to help translate Invonest into additional languages, please reach out to us at invonest01x@gmail.com."
    },
    {
      category: "Troubleshooting",
      question: "My PDF isn't downloading. What should I do?",
      answer: "Try these solutions: 1) Check if your browser is blocking pop-ups or downloads, 2) Make sure you have enough storage space on your device, 3) Try a different browser, 4) Clear your browser cache and try again, 5) Check your browser's download settings and permissions."
    },
    {
      category: "Troubleshooting",
      question: "The text is displaying incorrectly. Why?",
      answer: "This might be a language/text direction issue. Make sure you've selected the correct language for your invoice. For Arabic and Kurdish, the text should automatically display right-to-left. If issues persist, try refreshing the page or clearing your browser cache."
    },
    {
      category: "Troubleshooting",
      question: "I lost my invoice data. Can you recover it?",
      answer: "Unfortunately, no. Since all data is processed locally in your browser and we don't store any information on our servers, we cannot recover lost data. This is a privacy trade-off—your data is completely private, but you're responsible for saving your invoices by downloading them."
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <Layout>
      <div className="min-h-screen bg-background" dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className={`h-4 w-4 ${language === 'en' ? 'mr-2' : 'ml-2'} ${language !== 'en' ? 'scale-x-[-1]' : ''}`} />
            Back to Home
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Invonest, invoicing, and managing your freelance business
            </p>
          </div>

          {/* Quick Navigation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Items by Category */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.findIndex(f => f === faq);
                    const isOpen = openItems.includes(globalIndex);

                    return (
                      <Card
                        key={globalIndex}
                        className="cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-lg">
                            <span>{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        {isOpen && (
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <Card className="bg-primary/5 border-primary/20 mt-12">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Feel free to reach out to us directly, and we'll be happy to help.
              </p>
              <Button size="lg" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
