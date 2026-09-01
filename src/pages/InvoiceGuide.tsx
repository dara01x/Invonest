import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, FileText, DollarSign, Calendar, Users, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useSEO } from "@/components/SEO";

export default function InvoiceGuide() {
  useSEO({
    title: 'The Complete Invoicing Guide',
    description: 'What every invoice must contain, how to number and date them, which payment terms to use, and how to follow up on late payments without damaging the relationship.',
  });

  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background" dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Complete Guide to Professional Invoicing
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about creating, sending, and managing professional invoices for your freelance or small business
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">What is an Invoice?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                An invoice is a formal document sent by a seller to a buyer that itemizes and records a transaction between the two parties. 
                It serves as both a request for payment and a legal record of the sale. For freelancers and small businesses, invoices are 
                essential for maintaining cash flow, tracking income, and managing finances professionally.
              </p>
              <p className="text-foreground leading-relaxed">
                A well-crafted invoice does more than just request payment—it reflects your professionalism, helps build trust with clients, 
                and ensures you get paid on time. This comprehensive guide will walk you through everything you need to know about creating 
                and managing professional invoices.
              </p>
            </CardContent>
          </Card>

          {/* Essential Elements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Essential Invoice Elements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Every professional invoice should include these critical elements to be complete and legally valid:
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Your Business Information</h4>
                      <p className="text-sm text-muted-foreground">
                        Include your full business name, address, phone number, email, and website. If you're registered, 
                        add your business registration number or tax ID.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Client Information</h4>
                      <p className="text-sm text-muted-foreground">
                        Include the client's name, company name (if applicable), address, and contact information. 
                        This ensures the invoice reaches the right person.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Unique Invoice Number</h4>
                      <p className="text-sm text-muted-foreground">
                        Every invoice needs a unique identification number for tracking and reference. Use a consistent 
                        numbering system like INV-001, INV-002, or include the year: 2025-001.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Invoice and Due Dates</h4>
                      <p className="text-sm text-muted-foreground">
                        Clearly state when the invoice was issued and when payment is due. Common terms include 
                        "Due upon receipt," "Net 15," or "Net 30" (payment due within 15 or 30 days).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">5</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Detailed Description of Services</h4>
                      <p className="text-sm text-muted-foreground">
                        List each service or product with a clear description, quantity, rate, and amount. 
                        Be specific to avoid confusion about what's being billed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">6</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Payment Terms and Methods</h4>
                      <p className="text-sm text-muted-foreground">
                        Specify how clients can pay you (bank transfer, PayPal, card, etc.) and include all 
                        necessary payment details like account numbers or payment links.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">7</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Subtotal, Taxes, and Total Amount</h4>
                      <p className="text-sm text-muted-foreground">
                        Show the subtotal of all items, any applicable taxes or fees, and the final total amount due. 
                        Clearly indicate the currency if working with international clients.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">8</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Additional Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        Include a thank you message, late payment fees policy, or any other relevant information 
                        for the client.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of Invoices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Types of Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Different business situations require different invoice types. Understanding which to use ensures you're 
                billing appropriately and professionally:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Standard Invoice</h4>
                  <p className="text-muted-foreground">
                    The most common type, used for one-time transactions. Includes all essential elements and is sent 
                    after work is completed or goods are delivered.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Recurring Invoice</h4>
                  <p className="text-muted-foreground">
                    For ongoing services billed at regular intervals (weekly, monthly, quarterly). Common for retainer 
                    clients, subscriptions, or maintenance contracts.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Proforma Invoice</h4>
                  <p className="text-muted-foreground">
                    A preliminary invoice sent before work begins or goods are delivered. It's an estimate or quote 
                    that shows what the client will be charged. Not a payment request.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Credit Invoice (Credit Note)</h4>
                  <p className="text-muted-foreground">
                    Used to correct errors or provide refunds. It cancels all or part of a previous invoice and shows 
                    a negative amount that reduces what the client owes.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Interim Invoice</h4>
                  <p className="text-muted-foreground">
                    For large projects, bill in stages or milestones. Each interim invoice covers a portion of the 
                    total work, helping maintain cash flow during long projects.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Invoicing Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Send Promptly
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Send invoices immediately after completing work or on agreed billing dates. Delays in invoicing 
                      lead to delays in payment. Set up reminders or automate recurring invoices to stay consistent.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Be Clear and Specific
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use clear descriptions that clients can understand. Instead of "Web work," write "Homepage redesign 
                      with responsive mobile optimization." Specificity prevents disputes and speeds up approval.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Make Payment Easy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Offer multiple payment methods and include clickable payment links when possible. The easier 
                      you make it for clients to pay, the faster you'll receive payment.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Professional Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use consistent branding, clean layouts, and professional templates. Your invoice is a reflection 
                      of your business—make it count. Include your logo and use a readable font.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-500" />
                Common Invoicing Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">×</span>
                  <div>
                    <span className="font-semibold text-foreground">Missing Information:</span>
                    <span className="text-muted-foreground ml-2">
                      Incomplete invoices get delayed. Always double-check that all required fields are filled.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">×</span>
                  <div>
                    <span className="font-semibold text-foreground">Unclear Payment Terms:</span>
                    <span className="text-muted-foreground ml-2">
                      If you don't specify when payment is due, clients may pay whenever it's convenient for them.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">×</span>
                  <div>
                    <span className="font-semibold text-foreground">No Follow-up System:</span>
                    <span className="text-muted-foreground ml-2">
                      Not tracking invoices or sending reminders means lost revenue. Set up a follow-up schedule.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">×</span>
                  <div>
                    <span className="font-semibold text-foreground">Inconsistent Numbering:</span>
                    <span className="text-muted-foreground ml-2">
                      Random invoice numbers make tracking difficult. Use a sequential system and stick to it.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">×</span>
                  <div>
                    <span className="font-semibold text-foreground">Poor Record Keeping:</span>
                    <span className="text-muted-foreground ml-2">
                      Not saving copies of invoices creates tax headaches and makes dispute resolution impossible.
                    </span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Create Professional Invoices?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use Invonest's free invoice generator to create professional invoices in minutes. 
                No signup required, completely free forever.
              </p>
              <Button size="lg" onClick={() => navigate('/invoice')}>
                Create Your First Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
