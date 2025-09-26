import { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  ArrowLeft,
  PlayCircle,
  Building2,
  User,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  Download,
  Settings,
  Palette,
  Upload,
  Plus,
  Save
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

// Simple Progress component for the tutorial
const Progress = ({ value = 0, className = "" }: { value?: number; className?: string }) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  content: React.ReactNode;
  tip?: string;
  videoUrl?: string;
}

const Tutorial = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleStartCreating = () => {
    navigate('/invoice');
  };

  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: "Getting Started",
      description: "Learn the basics of creating your first invoice with Invonest",
      icon: PlayCircle,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">Welcome to Invonest!</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Invonest is a powerful, free invoice generator that helps freelancers and small businesses create professional invoices in multiple languages. 
              This tutorial will guide you through the entire process of creating your first invoice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium mb-2">Professional Templates</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose from beautiful, customizable invoice templates</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                  <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium mb-2">Easy Customization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customize colors, add your logo, and set your preferences</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
                  <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium mb-2">Instant PDF</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Download your invoice as a PDF with one click</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">💡 Pro Tip</h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Take your time to fill out all the information accurately. Complete invoices look more professional and help ensure faster payments.
            </p>
          </div>
        </div>
      ),
      tip: "You can create unlimited invoices for free with Invonest!"
    },
    {
      id: 2,
      title: "Setting Up Your Business Information",
      description: "Add your company details and upload your logo",
      icon: Building2,
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Your Business Information</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by adding your business information in the "From" section. This appears as the sender on your invoice.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Upload className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Upload Your Logo (Optional)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the upload area in the invoice header to add your company logo. Supports PNG, JPG, and other image formats.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Building2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Company Details</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Name:</strong> Your business or personal name</li>
                    <li>• <strong>Email:</strong> Your business email address</li>
                    <li>• <strong>Address:</strong> Your business address</li>
                    <li>• <strong>Phone:</strong> Your contact phone number</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">📝 Note</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Your business information will be saved in your browser for future invoices, so you only need to enter it once.
            </p>
          </div>
        </div>
      ),
      tip: "A professional logo makes your invoices look more credible and memorable."
    },
    {
      id: 3,
      title: "Adding Client Information",
      description: "Enter your client's details in the Bill To section",
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Client Information</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add your client's information in the "Bill To" section. This ensures your invoice reaches the right person and department.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Required Information
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Client name or company name
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Email address for sending the invoice
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-4 w-4 text-gray-400" />
                    Billing address (recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <Circle className="h-4 w-4 text-gray-400" />
                    Phone number (optional)
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Best Practices</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Use the official company name</li>
                  <li>• Include department if applicable</li>
                  <li>• Double-check email addresses</li>
                  <li>• Include full billing address for international clients</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Pro Tip</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Keep a record of your regular clients' information to speed up future invoice creation.
            </p>
          </div>
        </div>
      ),
      tip: "Accurate client information helps ensure your invoice gets processed quickly."
    },
    {
      id: 4,
      title: "Setting Invoice Details",
      description: "Configure invoice number, dates, and currency",
      icon: Calendar,
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Invoice Configuration</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Set up the essential details for your invoice including numbering, dates, and currency.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium">Invoice Number</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Invonest automatically generates unique invoice numbers, but you can customize them.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  <strong>Example:</strong> INV-2025-001
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h4 className="font-medium">Important Dates</h4>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• <strong>Issue Date:</strong> Today's date</li>
                  <li>• <strong>Due Date:</strong> Payment deadline</li>
                </ul>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  You can show/hide dates using the eye icons
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-medium">Currency</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Choose from 25+ currencies including USD, EUR, GBP, IQD, and more.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Currency symbols adapt to your language
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">⏰ Payment Terms Tip</h4>
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              Standard payment terms are 30 days, but you can adjust based on your agreement with the client. Net 15 or Net 7 are common for faster payments.
            </p>
          </div>
        </div>
      ),
      tip: "Consistent invoice numbering helps with bookkeeping and tracking payments."
    },
    {
      id: 5,
      title: "Adding Items and Services",
      description: "List the products or services you're billing for",
      icon: Plus,
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Invoice Items</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add all the products or services you want to bill for. Each item can have detailed descriptions and pricing.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    For Each Item, Include:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>Name:</strong> Clear, concise item name</li>
                    <li><strong>Description:</strong> Additional details (optional)</li>
                    <li><strong>Quantity:</strong> How many units</li>
                    <li><strong>Unit Price:</strong> Price per unit</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Examples</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
                      <div className="font-medium">Website Design</div>
                      <div className="text-gray-600 dark:text-gray-400">5-page responsive website</div>
                      <div className="text-gray-500 text-xs">Qty: 1 × $1,500 = $1,500</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
                      <div className="font-medium">Consulting Hours</div>
                      <div className="text-gray-600 dark:text-gray-400">Business strategy consultation</div>
                      <div className="text-gray-500 text-xs">Qty: 8 × $150 = $1,200</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-3">Managing Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Adding Items</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Click "Add Item" to add more rows</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">×</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Removing Items</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Click the × icon to remove items</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🎯 Best Practice</h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              Be specific in your item descriptions. Instead of "Design work," use "Logo design with 3 revisions" or "Homepage wireframe and mockup."
            </p>
          </div>
        </div>
      ),
      tip: "Clear item descriptions help clients understand exactly what they're paying for."
    },
    {
      id: 6,
      title: "Customizing Your Invoice",
      description: "Choose colors, add discounts, and personalize your invoice",
      icon: Palette,
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Invoice Customization</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Make your invoice unique with custom colors, themes, and additional options.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  Color Themes
                </h4>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {[
                    { name: 'Ocean Blue', color: '#3B82F6' },
                    { name: 'Forest Green', color: '#10B981' },
                    { name: 'Royal Purple', color: '#8B5CF6' },
                    { name: 'Sunset Orange', color: '#F97316' },
                    { name: 'Cherry Red', color: '#EF4444' },
                    { name: 'Deep Teal', color: '#14B8A6' },
                    { name: 'Warm Pink', color: '#EC4899' },
                    { name: 'Electric Indigo', color: '#6366F1' },
                  ].map((theme, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: theme.color }}
                      />
                      <div className="text-xs text-gray-600 dark:text-gray-400">{theme.name.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Choose a color theme that matches your brand or personal preference.
                </p>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Discount Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Percentage Discount</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Apply a percentage discount (e.g., 10% off total)
                    </p>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                      Example: $1,000 - 10% = $900
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Fixed Amount Discount</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deduct a fixed amount from the total
                    </p>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                      Example: $1,000 - $100 = $900
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">🎨 Design Tip</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Consistent branding across all your invoices helps build professional credibility. Choose colors that match your business branding.
            </p>
          </div>
        </div>
      ),
      tip: "Professional-looking invoices can help you get paid faster and build trust with clients."
    },
    {
      id: 7,
      title: "Preview and Download",
      description: "Review your invoice and download as PDF",
      icon: Download,
      content: (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Final Steps</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Before sending your invoice, always preview it to make sure everything looks perfect.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-medium">Preview Your Invoice</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Check all information is accurate</li>
                    <li>• Verify calculations are correct</li>
                    <li>• Ensure professional appearance</li>
                    <li>• Review contact details</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Download className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-medium">Download as PDF</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• High-quality PDF generation</li>
                    <li>• Optimized for printing</li>
                    <li>• Professional formatting</li>
                    <li>• Ready to email to clients</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Invoice Quality Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>All required fields completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Client information is accurate</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Items and pricing are correct</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Due date is reasonable</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Professional appearance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Logo uploaded (if applicable)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Currency is correct</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Contact information included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">🚀 You're Ready!</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Congratulations! You now know how to create professional invoices with Invonest. Your invoices will help you get paid faster and look more professional.
            </p>
          </div>
        </div>
      ),
      tip: "Always double-check your invoice before sending it to avoid delays in payment."
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const currentTutorialStep = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <Layout onBackToLanding={handleBackToLanding}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            How to Create an Invoice with Invonest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn how to create professional invoices step by step. This comprehensive tutorial will guide you through every feature and help you master the art of invoicing.
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tutorial Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tutorialSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isCurrent = index === currentStep;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isCurrent 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 ${
                            isCompleted 
                              ? 'text-green-600 dark:text-green-400' 
                              : isCurrent 
                                ? 'text-primary' 
                                : 'text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <step.icon className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${
                              isCurrent ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {step.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="min-h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <currentTutorialStep.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Step {currentStep + 1} of {tutorialSteps.length}
                      </Badge>
                      <CardTitle className="text-xl">{currentTutorialStep.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {currentTutorialStep.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markStepComplete(currentTutorialStep.id)}
                    disabled={completedSteps.includes(currentTutorialStep.id)}
                  >
                    {completedSteps.includes(currentTutorialStep.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentTutorialStep.content}
                  
                  {currentTutorialStep.tip && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">💡 Quick Tip</h4>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                        {currentTutorialStep.tip}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </div>
              </div>

              {currentStep === tutorialSteps.length - 1 ? (
                <Button
                  onClick={handleStartCreating}
                  className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  Start Creating
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={currentStep === tutorialSteps.length - 1}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Now that you know how to use Invonest, you're ready to create professional invoices that get you paid faster. Start with your first invoice today!
          </p>
          <Button
            onClick={handleStartCreating}
            size="lg"
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FileText className="h-5 w-5" />
            Create Your First Invoice
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorial;