import { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { renderMarkdown } from "@/lib/markdown";

// Blog post type
interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags: string[];
}

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "how-to-create-professional-invoices",
    title: "How to Create Professional Invoices for Freelancers",
    description: "Tips on writing clear invoices, essential elements to include, and best practices for freelancers.",
    date: "2025-09-26",
    tags: ["Freelancing", "Invoicing", "Best Practices"],
    content: `Creating professional invoices is crucial for freelancers who want to get paid on time and maintain a good reputation. Here are some tips to help you craft clear and effective invoices:

## 1. Include Essential Elements
- Your name or business name and contact information
- Client's name and contact information
- Unique invoice number
- Invoice date and due date
- Detailed list of services provided
- Payment terms and methods
- Total amount due

## 2. Write Clear Descriptions
Be specific about the work you've done. Avoid vague terms and provide enough detail so your client knows exactly what they're paying for.

## 3. Use Consistent Formatting
A clean, consistent layout makes your invoice look professional and easy to read. Use templates or invoicing tools to maintain consistency.

## 4. Set Clear Payment Terms
State your payment terms upfront, including due dates and any late fees. This helps avoid confusion and encourages timely payments.

## 5. Double-Check for Accuracy
Review your invoice for errors before sending. Mistakes can delay payment and make you look unprofessional.

By following these best practices, you'll create invoices that help you get paid faster and build trust with your clients.`
  },
  {
    id: "top-5-invoice-templates",
    title: "Top 5 Invoice Templates for Freelancers and Small Businesses",
    description: "Discover the best invoice templates for different needs, including hourly and flat-rate options.",
    date: "2025-09-26",
    tags: ["Templates", "Small Business", "Invoicing"],
    content: `Choosing the right invoice template can make billing easier and more professional. Here are the top 5 invoice templates for freelancers and small businesses:

## 1. Hourly Invoice Template
Perfect for tracking billable hours. Includes columns for date, description, hours worked, rate, and total.

## 2. Flat-Rate Invoice Template
Ideal for projects with a fixed price. Clearly lists the project scope and agreed-upon amount.

## 3. Recurring Invoice Template
Useful for ongoing services. Automatically generates invoices at regular intervals.

## 4. Itemized Invoice Template
Breaks down services or products into individual line items for clarity.

## 5. Multilingual Invoice Template
Essential for global clients. Allows you to send invoices in different languages.

Each template has its benefits. Choose the one that fits your business model and client needs best.`
  },
  {
    id: "automate-invoice-generation-invonest",
    title: "How to Automate Your Invoice Generation with Invonest",
    description: "A step-by-step guide to using Invonest's features for automated invoice creation.",
    date: "2025-09-26",
    tags: ["Automation", "Invonest", "Productivity"],
    content: `Automating your invoice generation saves time and reduces errors. Here's how you can use Invonest to streamline your invoicing process:

## 1. Set Up Your Profile
Enter your business details, payment terms, and preferred invoice template in Invonest.

## 2. Add Your Clients
Store client information for quick access and easy invoice creation.

## 3. Create and Save Invoice Templates
Customize templates for different types of work (hourly, flat-rate, etc.).

## 4. Use Automated Numbering
Invonest automatically generates unique invoice numbers, so you don't have to track them manually.

## 5. Schedule Recurring Invoices
For ongoing projects, set up recurring invoices to be sent automatically at set intervals.

## 6. Track Payments
Monitor which invoices have been paid and send reminders for overdue payments.

By leveraging Invonest's automation features, you can focus more on your work and less on paperwork.`
  },
  {
    id: "multilingual-invoices-global-freelancers",
    title: "Why Multilingual Invoices are Essential for Global Freelancers",
    description: "Learn why multilingual invoices matter and how Invonest makes it easy for freelancers working with international clients.",
    date: "2025-09-26",
    tags: ["Global", "Multilingual", "International"],
    content: `As a global freelancer, you may work with clients who speak different languages. Here's why multilingual invoices are important:

## 1. Build Trust with Clients
Sending invoices in your client's language shows professionalism and respect, making it easier to build strong relationships.

## 2. Avoid Misunderstandings
Clear communication reduces the risk of payment delays due to confusion over invoice details.

## 3. Expand Your Client Base
Offering multilingual invoices can help you attract clients from new regions and markets.

## 4. How Invonest Helps
Invonest allows you to create invoices in multiple languages with just a few clicks, making it simple to serve a global audience.

Multilingual invoicing is a small step that can make a big difference in your freelance business.`
  },
  {
    id: "avoid-invoice-mistakes-get-paid-faster",
    title: "How to Avoid Common Invoice Mistakes and Get Paid Faster",
    description: "Avoid errors that delay payments and learn how to make your invoicing process smooth and efficient.",
    date: "2025-09-26",
    tags: ["Mistakes", "Payment", "Efficiency"],
    content: `Invoice mistakes can slow down payments and hurt your reputation. Here's how to avoid common errors and get paid faster:

## 1. Double-Check Client Details
Make sure names, addresses, and contact information are correct.

## 2. Use Clear Descriptions
Be specific about the work done and avoid vague terms.

## 3. Set Realistic Payment Terms
Give clients enough time to pay, but don't be too lenient. Clearly state due dates and late fees.

## 4. Number Your Invoices
Unique invoice numbers help you and your clients track payments easily.

## 5. Follow Up Promptly
Send reminders for overdue invoices and keep communication professional.

By following these tips, you'll reduce errors and improve your chances of getting paid on time.`
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleBackToLanding = () => {
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (selectedPost) {
    return (
      <Layout onBackToLanding={handleBackToLanding}>
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
          
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedPost.date)}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>
            
            <div className="prose max-w-none text-gray-700 dark:text-gray-300">
              {renderMarkdown(selectedPost.content)}
            </div>
          </article>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onBackToLanding={handleBackToLanding}>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Invonest Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tips, guides, and insights for freelancers and small businesses to master their invoicing and grow their business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPost(post)}
                  className="w-full justify-between group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <p className="text-gray-600 dark:text-gray-400">
            More blog posts coming soon! Stay tuned for more tips and insights.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;