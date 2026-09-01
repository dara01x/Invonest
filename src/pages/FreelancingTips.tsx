import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, Target, TrendingUp, Shield, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useSEO } from "@/components/SEO";

export default function FreelancingTips() {
  useSEO({
    title: 'Freelancing Tips for Getting Paid on Time',
    description: 'Field-tested advice on setting rates, screening clients, writing contracts, managing scope and keeping cash flow steady as an independent freelancer.',
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
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Essential Freelancing Tips for Success
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Build a thriving freelance business with these proven strategies and best practices
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground leading-relaxed">
                Freelancing offers incredible freedom and flexibility, but it also comes with unique challenges. Success requires more than 
                just technical skills—you need business acumen, discipline, and strategic thinking. Whether you're just starting out or 
                looking to level up your freelance career, these tips will help you build a sustainable and profitable business.
              </p>
              <p className="text-foreground leading-relaxed">
                From finding clients to managing finances, setting rates to maintaining work-life balance, this comprehensive guide covers 
                everything you need to thrive as a freelancer in today's competitive marketplace.
              </p>
            </CardContent>
          </Card>

          {/* Finding and Attracting Clients */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Finding and Attracting Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-lg">Build a Strong Online Presence</h4>
                  <p className="text-muted-foreground mb-3">
                    Your online presence is your digital storefront. Create a professional website showcasing your portfolio, testimonials, 
                    and services. Optimize your LinkedIn profile and consider maintaining profiles on freelance platforms like Upwork or Fiverr 
                    to increase visibility.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Create a portfolio website with your best work</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Maintain active social media profiles in your industry</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Share valuable content to demonstrate expertise</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Collect and display client testimonials prominently</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-lg">Network Strategically</h4>
                  <p className="text-muted-foreground mb-3">
                    Networking isn't just about collecting business cards—it's about building genuine relationships. Attend industry events, 
                    join online communities, and engage with potential clients where they spend time. Focus on providing value first, and 
                    business will follow.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Join relevant industry groups and forums</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Attend virtual and in-person networking events</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Offer help and advice without expecting immediate returns</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Follow up with connections regularly</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-lg">Leverage Referrals</h4>
                  <p className="text-muted-foreground mb-3">
                    Happy clients are your best marketing tool. Referrals convert at higher rates and often lead to better long-term 
                    relationships. Make it easy for satisfied clients to recommend you by providing excellent service and asking for 
                    referrals at the right moment.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Ask for referrals after successful project completion</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Create a referral program with incentives</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Make it easy with referral templates or links</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Thank and acknowledge those who refer you</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Rates */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Setting Rates and Pricing Your Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Pricing is one of the biggest challenges freelancers face. Charge too little and you'll struggle to make ends meet. 
                Charge too much and you might scare away clients. Finding the sweet spot requires research, confidence, and strategic thinking.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Research Market Rates</h4>
                  <p className="text-muted-foreground">
                    Understand what others in your field and location charge. Use platforms like Glassdoor, PayScale, and freelance 
                    marketplace rate guides. Consider your experience level, specialization, and the value you provide when setting rates.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Calculate Your Minimum Rate</h4>
                  <p className="text-muted-foreground">
                    Add up your monthly expenses (rent, utilities, food, insurance, taxes, software, etc.) and divide by the number of 
                    billable hours you can realistically work. This is your absolute minimum—your actual rate should be higher to account 
                    for non-billable time, growth, and profit.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Value-Based vs. Hourly Pricing</h4>
                  <p className="text-muted-foreground mb-3">
                    Consider moving beyond hourly rates to value-based pricing for certain projects. Instead of charging for time, 
                    charge based on the value you deliver to the client. A logo that takes 5 hours but generates millions in brand 
                    value is worth more than just your hourly rate.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Tip: Use project-based pricing for defined scopes and retainer agreements for ongoing work.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Don't Undervalue Your Work</h4>
                  <p className="text-muted-foreground">
                    Many freelancers, especially beginners, undercharge out of fear of losing clients. Remember that low prices attract 
                    price-sensitive clients who are often the most difficult to work with. Charging fair rates attracts clients who value 
                    quality and professionalism.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Review and Raise Rates Regularly</h4>
                  <p className="text-muted-foreground">
                    As you gain experience and build your portfolio, your rates should increase. Review your pricing annually and adjust 
                    for inflation, increased expertise, and market changes. Inform existing clients of rate increases with advance notice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managing Finances */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Financial Management for Freelancers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Financial stability is crucial for long-term freelance success. Without proper financial management, even high-earning 
                freelancers can struggle. Implement these practices to keep your finances healthy:
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Separate Business and Personal Finances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Open a dedicated business bank account and use it exclusively for freelance income and expenses. This makes 
                      accounting easier, looks more professional, and simplifies tax preparation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Build an Emergency Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Freelance income fluctuates. Aim to save 3-6 months of expenses in an emergency fund. Start small—even $500-$1000 
                      provides cushion for slow months or unexpected expenses.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Track Every Expense</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Keep records of all business expenses—software subscriptions, equipment, office supplies, travel, etc. Many are 
                      tax-deductible. Use accounting software or apps to automate tracking.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Set Aside Money for Taxes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Freelancers are responsible for their own taxes. Set aside 25-30% of each payment for taxes. Consider making 
                      quarterly estimated tax payments to avoid penalties and year-end surprises.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Invoice Promptly and Follow Up</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Send invoices immediately upon project completion or on agreed dates. Follow up on overdue invoices professionally 
                      but firmly. Late payments hurt cash flow—don't be afraid to send reminders.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Consider Insurance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Look into health insurance, liability insurance, and disability insurance. While they're expenses, they protect 
                      you from catastrophic financial losses. Many freelancer associations offer group rates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Time Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Time Management and Productivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                As a freelancer, you're responsible for managing your own time. Without a boss or structured schedule, it's easy to 
                either overwork or procrastinate. Develop systems and habits that keep you productive without burning out:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Badge className="mt-1" variant="outline">1</Badge>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Create a Schedule and Stick to It</h4>
                    <p className="text-muted-foreground">
                      Set regular working hours even though you could work anytime. This creates structure, helps clients know when 
                      you're available, and prevents work from bleeding into personal time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge className="mt-1" variant="outline">2</Badge>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Use Time-Tracking Tools</h4>
                    <p className="text-muted-foreground">
                      Track how long tasks actually take. This helps with accurate project estimates, identifies time-wasters, and 
                      provides data for billing hourly clients. Tools like Toggl, Clockify, or Harvest make this easy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge className="mt-1" variant="outline">3</Badge>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Batch Similar Tasks</h4>
                    <p className="text-muted-foreground">
                      Group similar activities together—respond to all emails at once, schedule all client calls on specific days, 
                      handle administrative tasks in blocks. Context switching wastes time and energy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge className="mt-1" variant="outline">4</Badge>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Learn to Say No</h4>
                    <p className="text-muted-foreground">
                      Not every project is worth your time. Saying yes to low-paying or misaligned work means saying no to better 
                      opportunities. Be selective—your time is your most valuable asset.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge className="mt-1" variant="outline">5</Badge>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Take Regular Breaks</h4>
                    <p className="text-muted-foreground">
                      Productivity isn't about working more hours—it's about working smart. Take regular breaks, use techniques like 
                      Pomodoro (25 minutes work, 5 minutes rest), and schedule real time off to recharge.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Development */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Continuous Learning and Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                The freelance landscape constantly evolves. To stay competitive and command higher rates, invest in continuous learning:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-foreground">Stay Current with Industry Trends:</span>
                    <span className="text-muted-foreground ml-2">
                      Subscribe to industry publications, follow thought leaders, attend webinars and conferences
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-foreground">Develop New Skills:</span>
                    <span className="text-muted-foreground ml-2">
                      Take online courses, earn certifications, learn complementary skills that add value
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-foreground">Specialize and Niche Down:</span>
                    <span className="text-muted-foreground ml-2">
                      Generalists compete on price; specialists command premiums. Find your niche and become the expert
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-foreground">Build Your Personal Brand:</span>
                    <span className="text-muted-foreground ml-2">
                      Share your knowledge through blogs, videos, or social media. Teaching establishes authority
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
                Ready to Streamline Your Freelance Business?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start with professional invoicing. Create beautiful, multilingual invoices in minutes with Invonest.
              </p>
              <Button size="lg" onClick={() => navigate('/invoice')}>
                Create Free Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
