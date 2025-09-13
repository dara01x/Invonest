import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { currencies } from "@/lib/types";
import type { Invoice, InvoiceItem } from "@/lib/types";
import { generateInvoicePDF } from "@/lib/pdfGenerator";
import { formatNumber } from "@/lib/utils";
import { trackInvoiceGeneration, trackPDFDownload } from "@/lib/analytics";
import { formatPhoneInput, formatInvoiceNumber } from "@/lib/utils";
import { 
  Eye, FileDown, Plus, X, Upload, 
  Building2, User, Settings, Palette, ChevronRight
} from "lucide-react";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSave?: (invoice: Partial<Invoice>) => void;
}

export const InvoiceForm = ({ invoice, onSave }: InvoiceFormProps) => {
  const { t, dir, language } = useLanguage();
  const isMobile = useIsMobile();
  
  // Form state
  const [formData, setFormData] = useState({
    invoiceNo: invoice?.invoiceNo || `INV-${Date.now().toString().slice(-6)}`,
    currency: invoice?.currency || 'USD',
    issueDate: invoice?.issueDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: invoice?.notes || '',
    title: 'Invoice'
  });

  const [sellerInfo, setSellerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    mobile: '',
    fax: '',
    email: ''
  });

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    mobile: '',
    fax: '',
    email: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      name: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      lineTotal: 0,
    }
  ]);

  const [sidebarSettings, setSidebarSettings] = useState({
    colorTheme: 'blue',
    discountType: 'none',
    discountValue: 0,
    currency: 'USD'
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const colorThemes = [
    { name: t('oceanBlue'), value: 'blue', color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
    { name: t('forestGreen'), value: 'green', color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #047857)' },
    { name: t('royalPurple'), value: 'purple', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
    { name: t('sunsetOrange'), value: 'orange', color: '#F97316', gradient: 'linear-gradient(135deg, #F97316, #EA580C)' },
    { name: t('cherryRed'), value: 'red', color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)' },
    { name: t('deepTeal'), value: 'teal', color: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A6, #0F766E)' },
    { name: t('warmPink'), value: 'pink', color: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899, #DB2777)' },
    { name: t('electricIndigo'), value: 'indigo', color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)' },
    { name: t('midnight'), value: 'dark', color: '#1F2937', gradient: 'linear-gradient(135deg, #1F2937, #111827)' },
    { name: 'Golden Hour', value: 'gold', color: '#D97706', gradient: 'linear-gradient(135deg, #D97706, #B45309)' },
    { name: 'Ocean Breeze', value: 'cyan', color: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)' },
    { name: 'Emerald Dream', value: 'emerald', color: '#059669', gradient: 'linear-gradient(135deg, #059669, #047857)' }
  ];

  const getCurrentThemeColor = () => {
    return colorThemes.find(theme => theme.value === sidebarSettings.colorTheme)?.color || '#3B82F6';
  };

  const getCurrentThemeGradient = () => {
    return colorThemes.find(theme => theme.value === sidebarSettings.colorTheme)?.gradient || 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      lineTotal: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.lineTotal = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    
    // Calculate discount based on type and value
    let discountAmount = 0;
    if (sidebarSettings.discountType === 'percentage' && sidebarSettings.discountValue > 0) {
      discountAmount = subtotal * (sidebarSettings.discountValue / 100);
    } else if (sidebarSettings.discountType === 'fixed' && sidebarSettings.discountValue > 0) {
      discountAmount = sidebarSettings.discountValue;
    }
    
    const grandTotal = subtotal - discountAmount;
    
    return { subtotal, discountAmount, grandTotal };
  };

  const { subtotal, discountAmount, grandTotal } = calculateTotals();

  const handleDownloadPDF = async () => {
    try {
      const invoiceData: Invoice = {
        id: '1',
        ...formData,
        sellerId: '1',
        customerId: '1',
        items,
        summary: {
          subtotal,
          discountTotal: discountAmount,
          shippingFee: 0,
          rounding: 0,
          grandTotal,
        },
        status: 'draft',
        payments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Track analytics events
      trackInvoiceGeneration(language, formData.currency);
      trackPDFDownload(invoiceData.id, language);
      
      await generateInvoicePDF(invoiceData, language, sellerInfo, buyerInfo, getCurrentThemeColor(), logoUrl, getCurrentThemeGradient());
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getInvoiceData = (): Invoice => {
    return {
      id: '1',
      ...formData,
      sellerId: '1',
      customerId: '1',
      items,
      summary: {
        subtotal,
        discountTotal: discountAmount,
        shippingFee: 0,
        rounding: 0,
        grandTotal,
      },
      status: 'draft',
      payments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file (PNG, JPG, GIF, etc.)');
      }
    }
  };

  const removeLogo = () => {
    setLogoUrl(null);
  };

  const formatCurrency = (amount: number) => {
    const selectedCurrency = currencies.find(c => c.code === formData.currency);
    let symbol = selectedCurrency?.symbol || '$';
    
    // Use currency code for Iraqi Dinar instead of symbol
    if (formData.currency === 'IQD') {
      symbol = 'IQD';
    }
    
    // Format number with commas for thousands separator
    const formattedAmount = formatNumber(amount);
    
    // For RTL languages (Arabic/Kurdish) and specific currencies, put symbol at the end
    if ((language === 'ar' || language === 'ckb') && (formData.currency === 'IQD' || formData.currency === 'SAR' || formData.currency === 'AED')) {
      return `${formattedAmount} ${symbol}`;
    }
    
    return `${symbol}${formattedAmount}`;
  };

  // Settings Panel Component
  const SettingsPanel = () => (
    <div className="space-y-6">
      {/* Color Theme */}
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <Palette className="h-4 w-4" />
          {t('colorTheme')}
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {colorThemes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => setSidebarSettings({ ...sidebarSettings, colorTheme: theme.value })}
              className={`w-full h-10 rounded-md border-2 transition-all ${
                sidebarSettings.colorTheme === theme.value 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
            />
          ))}
        </div>
      </div>

      {/* Discount Type */}
      <div>
        <Label htmlFor="discountType">{t('discountType')}</Label>
        <Select 
          value={sidebarSettings.discountType} 
          onValueChange={(value) => setSidebarSettings({ 
            ...sidebarSettings, 
            discountType: value,
            discountValue: 0 // Reset discount value when type changes
          })}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-[60]">
            <SelectItem value="none">{t('noDiscount')}</SelectItem>
            <SelectItem value="percentage">{t('percentage')}</SelectItem>
            <SelectItem value="fixed">{t('fixedAmount')}</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Conditional Discount Value Input */}
        {sidebarSettings.discountType === 'percentage' && (
          <div className="mt-3">
            <Label htmlFor="discountPercentage">{t('discountPercentage')}</Label>
            <Input
              id="discountPercentage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={sidebarSettings.discountValue}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const clampedValue = Math.min(Math.max(value, 0), 100);
                setSidebarSettings({ 
                  ...sidebarSettings, 
                  discountValue: clampedValue
                });
              }}
              placeholder={t('percentagePlaceholder')}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t('discountQuestion')}
            </p>
          </div>
        )}
        
        {sidebarSettings.discountType === 'fixed' && (
          <div className="mt-3">
            <Label htmlFor="discountFixed">{t('discountAmount')} ({formData.currency})</Label>
            <Input
              id="discountFixed"
              type="number"
              min="0"
              step="0.01"
              value={sidebarSettings.discountValue}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const clampedValue = Math.max(value, 0);
                setSidebarSettings({ 
                  ...sidebarSettings, 
                  discountValue: clampedValue
                });
              }}
              placeholder={t('discountAmountPlaceholder')}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter discount amount in {formData.currency}
            </p>
          </div>
        )}
      </div>

      {/* Currency */}
      <div>
        <Label htmlFor="currency">{t('currency')}</Label>
        <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-[60] max-h-60">
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currency.symbol}</span>
                  <span>{currency.code} - {currency.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6" dir={dir}>
      {/* Main Content */}
      <div className="flex-1 space-y-4 lg:space-y-6 min-w-0">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">{t('newInvoice')}</h1>
            <p className="text-sm text-muted-foreground">{t('generateProfessionalInvoices')}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handlePreview}>
              <Eye className="h-4 w-4" />
              {t('preview')}
            </Button>
            <Button 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 lg:px-6 shadow-lg hover:shadow-xl transition-all duration-200" 
              onClick={handleDownloadPDF}
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">{t('downloadPdf')}</span> 
            </Button>
            {/* Mobile Settings Button */}
            {isMobile && (
              <Sheet open={showSettings} onOpenChange={setShowSettings}>
                <SheetTrigger asChild>
                  <Button 
                    size="sm" 
                    className="gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-0"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="font-semibold">{t('settings')}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      {t('settings')}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SettingsPanel />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* Invoice Header */}
        <Card className="shadow-soft">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-shrink-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title={t('uploadLogo')}
                  />
                  <div className="w-14 h-14 lg:w-16 lg:h-16 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer group relative overflow-hidden">
                    {logoUrl ? (
                      <>
                        <img
                          src={logoUrl}
                          alt="Company Logo"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeLogo();
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 z-10"
                          title={t('removeLogo')}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <Upload className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="relative">
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="text-xl lg:text-2xl font-bold border-2 border-dashed border-primary/30 bg-transparent p-2 h-auto shadow-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary hover:border-primary/50 transition-all rounded-md"
                      placeholder={t('invoicePlaceholder')}
                    />
                  </div>
                  
                  {/* Title Suggestions */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground">{t('invoiceTitleHelp')}</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, title: t('invoiceTitleExample1') })}
                        className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20 hover:border-primary/40"
                      >
                        {t('invoiceTitleExample1')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, title: t('invoiceTitleExample2') })}
                        className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20 hover:border-primary/40"
                      >
                        {t('invoiceTitleExample2')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, title: t('invoiceTitleExample3') })}
                        className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20 hover:border-primary/40"
                      >
                        {t('invoiceTitleExample3')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, title: t('invoiceTitleExample4') })}
                        className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20 hover:border-primary/40"
                      >
                        {t('invoiceTitleExample4')}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs lg:text-sm text-muted-foreground mt-3 flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    {t('uploadCompanyLogo')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* From / Bill To Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* From Section */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3 lg:pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-base lg:text-lg">{t('from')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              <div>
                <Label htmlFor="sellerName" className="text-sm">{t('name')}</Label>
                <Input
                  id="sellerName"
                  value={sellerInfo.name}
                  onChange={(e) => setSellerInfo({ ...sellerInfo, name: e.target.value })}
                  placeholder={t('companyNamePlaceholder')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sellerEmail" className="text-sm">{t('email')}</Label>
                <Input
                  id="sellerEmail"
                  type="email"
                  value={sellerInfo.email}
                  onChange={(e) => setSellerInfo({ ...sellerInfo, email: e.target.value })}
                  placeholder={t('companyEmailPlaceholder')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sellerAddress" className="text-sm">{t('address')}</Label>
                <Textarea
                  id="sellerAddress"
                  value={sellerInfo.address}
                  onChange={(e) => setSellerInfo({ ...sellerInfo, address: e.target.value })}
                  placeholder={t('companyAddressPlaceholder')}
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="sellerPhone" className="text-sm">{t('phone')}</Label>
                <Input
                  id="sellerPhone"
                  type="tel"
                  value={sellerInfo.phone}
                  onChange={(e) => {
                    const formattedValue = formatPhoneInput(e.target.value);
                    setSellerInfo({ ...sellerInfo, phone: formattedValue });
                  }}
                  placeholder={t('companyPhonePlaceholder')}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bill To Section */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3 lg:pb-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="text-base lg:text-lg">{t('billTo')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              <div>
                <Label htmlFor="buyerName" className="text-sm">{t('name')}</Label>
                <Input
                  id="buyerName"
                  value={buyerInfo.name}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                  placeholder={t('customerNamePlaceholder')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="buyerEmail" className="text-sm">Email</Label>
                <Input
                  id="buyerEmail"
                  type="email"
                  value={buyerInfo.email}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                  placeholder={t('customerEmailPlaceholder')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="buyerAddress" className="text-sm">{t('address')}</Label>
                <Textarea
                  id="buyerAddress"
                  value={buyerInfo.address}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                  placeholder={t('customerAddressPlaceholder')}
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="buyerPhone" className="text-sm">{t('phone')}</Label>
                <Input
                  id="buyerPhone"
                  type="tel"
                  value={buyerInfo.phone}
                  onChange={(e) => {
                    const formattedValue = formatPhoneInput(e.target.value);
                    setBuyerInfo({ ...buyerInfo, phone: formattedValue });
                  }}
                  placeholder={t('customerPhonePlaceholder')}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Metadata */}
        <Card className="shadow-soft">
          <CardContent className="p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div>
                <Label htmlFor="invoiceNo" className="text-sm">{t('invoiceNumber')}</Label>
                <Input
                  id="invoiceNo"
                  type="text"
                  value={formData.invoiceNo}
                  onChange={(e) => {
                    const formattedValue = formatInvoiceNumber(e.target.value);
                    setFormData({ ...formData, invoiceNo: formattedValue });
                  }}
                  placeholder={t('invoiceNumberPlaceholder')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="issueDate" className="text-sm">{t('date')}</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="dueDate" className="text-sm">{t('dueDate')}</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3 lg:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-base lg:text-lg">{t('items')}</CardTitle>
              <Button onClick={addItem} size="sm" className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                {t('addItem')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 lg:p-6 lg:pt-0">
            {/* Mobile Table View */}
            <div className="block lg:hidden">
              <div className="space-y-4 p-4">
                {items.map((item, index) => (
                  <Card key={item.id} className="border border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Item #{index + 1}
                        </Badge>
                        {items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">{t('itemName')}</Label>
                          <Input
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            placeholder={t('itemName')}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs text-muted-foreground">{t('description')}</Label>
                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder={t('additionalDetails')}
                            className="mt-1"
                            rows={2}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">{t('quantity')}</Label>
                            <Input
                              type="number"
                              min="0"
                              step="1"
                              value={item.quantity === 0 ? '' : item.quantity}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                const clampedValue = Math.max(value, 0);
                                updateItem(item.id, 'quantity', clampedValue);
                              }}
                              onFocus={(e) => {
                                if (e.target.value === '0') {
                                  e.target.select();
                                }
                              }}
                              placeholder={t('quantityPlaceholder')}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-xs text-muted-foreground">{t('unitPrice')}</Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice === 0 ? '' : item.unitPrice}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                const clampedValue = Math.max(value, 0);
                                updateItem(item.id, 'unitPrice', clampedValue);
                              }}
                              onFocus={(e) => {
                                if (e.target.value === '0') {
                                  e.target.select();
                                }
                              }}
                              placeholder={t('pricePlaceholder')}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm font-medium text-muted-foreground">Total:</span>
                          <span className="text-lg font-bold">{formatCurrency(item.lineTotal)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">{t('description')}</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground w-32">{t('unitPrice')}</th>
                    <th className="text-center py-3 px-2 font-medium text-muted-foreground w-24">{t('quantity')}</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground w-32">{t('amount')}</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 group hover:bg-muted/20">
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <Input
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            placeholder={t('itemName')}
                            className="border border-input bg-background px-3 py-2 h-9 font-medium focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder={t('additionalDetails')}
                            className="border-0 bg-transparent p-0 h-6 resize-none text-xs text-muted-foreground"
                            rows={1}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-2 align-top">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice === 0 ? '' : item.unitPrice}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            const clampedValue = Math.max(value, 0);
                            updateItem(item.id, 'unitPrice', clampedValue);
                          }}
                          onFocus={(e) => {
                            if (e.target.value === '0') {
                              e.target.select();
                            }
                          }}
                          placeholder={t('pricePlaceholder')}
                          className="border border-input bg-background px-3 py-2 h-9 text-right focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </td>
                      <td className="py-4 px-2 align-top">
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          value={item.quantity === 0 ? '' : item.quantity}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            const clampedValue = Math.max(value, 0);
                            updateItem(item.id, 'quantity', clampedValue);
                          }}
                          onFocus={(e) => {
                            if (e.target.value === '0') {
                              e.target.select();
                            }
                          }}
                          placeholder={t('quantityPlaceholder')}
                          className="border border-input bg-background px-3 py-2 h-9 text-center focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </td>
                      <td className="py-4 px-2 text-right font-medium text-lg align-top">
                        {formatCurrency(item.lineTotal)}
                      </td>
                      <td className="py-4 px-2">
                        {items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Totals Section */}
        <Card className="shadow-soft">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
              <div className="flex flex-col sm:flex-row gap-3 order-2 lg:order-1 w-full lg:w-auto">
                <Button variant="outline" className="gap-2" onClick={handlePreview}>
                  <Eye className="h-4 w-4" />
                  {t('previewInvoice')}
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 lg:px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
                  onClick={handleDownloadPDF}
                >
                  <FileDown className="h-5 w-5" />
                  {t('downloadInvoice')}
                </Button>
              </div>
              <div className="w-full lg:w-auto lg:max-w-xs space-y-3 order-1 lg:order-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      {t('discount')} 
                      {sidebarSettings.discountType === 'percentage' 
                        ? ` (${sidebarSettings.discountValue}%)` 
                        : ' (Fixed)'
                      }
                    </span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>{t('total')}</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3 lg:pb-4">
            <CardTitle className="text-base lg:text-lg">{t('notes')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('notesPlaceholder')}
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Desktop Sidebar Controls */}
      {!isMobile && (
        <div className="w-80 space-y-6 flex-shrink-0">
          <Card className="shadow-soft">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{t('settings')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <SettingsPanel />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto p-2 sm:p-6">
          <DialogHeader>
            <DialogTitle>{t('previewInvoice')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <InvoicePreview 
              invoice={getInvoiceData()} 
              language={language} 
              sellerInfo={sellerInfo}
              buyerInfo={buyerInfo}
              themeColor={getCurrentThemeColor()}
              themeGradient={getCurrentThemeGradient()}
              logoUrl={logoUrl}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface SellerInfo {
  name: string;
  address: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
}

interface BuyerInfo {
  name: string;
  address: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
}

// Invoice Preview Component
interface InvoicePreviewProps {
  invoice: Invoice;
  language: 'en' | 'ar' | 'ckb';
  sellerInfo: SellerInfo;
  buyerInfo: BuyerInfo;
  themeColor: string;
  themeGradient: string;
  logoUrl?: string | null;
}

const InvoicePreview = ({ invoice, language, sellerInfo, buyerInfo, themeColor, themeGradient, logoUrl }: InvoicePreviewProps) => {
  const isRTL = language !== 'en';
  const { t } = useTranslation(language);
  
  const formatCurrency = (amount: number) => {
    const selectedCurrency = currencies.find(c => c.code === invoice.currency);
    let symbol = selectedCurrency?.symbol || '$';
    
    // Use currency code for Iraqi Dinar instead of symbol
    if (invoice.currency === 'IQD') {
      symbol = 'IQD';
    }
    
    // Format number with commas for thousands separator
    const formattedAmount = formatNumber(amount);
    
    // For RTL languages (Arabic/Kurdish) and specific currencies, put symbol at the end
    if ((language === 'ar' || language === 'ckb') && (invoice.currency === 'IQD' || invoice.currency === 'SAR' || invoice.currency === 'AED')) {
      return `${formattedAmount} ${symbol}`;
    }
    
    return `${symbol}${formattedAmount}`;
  };

  return (
    <div className={`invoice-preview-mobile w-full mx-auto bg-white text-black shadow-2xl border border-gray-200 ${isRTL ? 'rtl' : 'ltr'} overflow-hidden rounded-lg`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="invoice-header text-white relative overflow-hidden" style={{ 
        background: themeGradient,
        boxShadow: `0 4px 20px ${themeColor}40`
      }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{ background: `radial-gradient(circle, white 0.5px, transparent 0.5px)`, backgroundSize: '15px 15px' }}></div>
        </div>
        
        <div className="relative flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {logoUrl && (
              <div className="relative flex-shrink-0">
                <img
                  src={logoUrl}
                  alt="Company Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm p-1 sm:p-2 shadow-lg"
                />
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{t('invoice').toUpperCase()}</h1>
              <p className="text-sm sm:text-base lg:text-lg opacity-90">
                {invoice.invoiceNo || `INV-${Date.now().toString().slice(-6)}`}
              </p>
            </div>
          </div>
          <div className={`text-${isRTL ? 'left' : 'right'} text-xs sm:text-sm lg:text-base w-full sm:w-auto`}>
            <p className="mb-1">{t('issueDate')}: {new Date(invoice.issueDate).toLocaleDateString()}</p>
            <p>{t('dueDate')}: {new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="invoice-section">
        <div className="invoice-grid grid gap-3 sm:gap-4 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-gray-50 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-l-4" style={{ borderLeftColor: themeColor }}>
            <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 flex items-center gap-2" style={{ color: themeColor }}>
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              {t('from')}:
            </h3>
            <div className="space-y-1 sm:space-y-2">
              {sellerInfo.name && (
                <p className="text-sm sm:text-base lg:text-lg">
                  <span className="text-xs font-medium text-gray-500">{t('name')}: </span>
                  <span className="font-semibold text-gray-800">{sellerInfo.name}</span>
                </p>
              )}
              {sellerInfo.address && (
                <p className="text-xs sm:text-xs lg:text-sm">
                  <span className="font-medium text-gray-500">{t('address')}: </span>
                  <span className="text-gray-600">{sellerInfo.address.replace(/\n/g, ', ')}</span>
                </p>
              )}
              {sellerInfo.phone && (
                <p className="text-xs sm:text-xs lg:text-sm">
                  <span className="font-medium text-gray-500">{t('phone')}: </span>
                  <span className="text-gray-600">{sellerInfo.phone}</span>
                </p>
              )}
              {sellerInfo.email && (
                <p className="text-xs sm:text-xs lg:text-sm">
                  <span className="font-medium text-gray-500">{t('email')}: </span>
                  <span className="text-gray-600">{sellerInfo.email}</span>
                </p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-l-4" style={{ borderLeftColor: themeColor }}>
            <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 flex items-center gap-2" style={{ color: themeColor }}>
              <User className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              {t('to')}:
            </h3>
            <div className="space-y-1 sm:space-y-2">
              {buyerInfo.name && (
                <p className="text-sm sm:text-base lg:text-lg">
                  <span className="text-xs font-medium text-gray-500">{t('name')}: </span>
                  <span className="font-semibold text-gray-800">{buyerInfo.name}</span>
                </p>
              )}
              {buyerInfo.address && (
                <p className="text-xs sm:text-xs lg:text-sm">
                  <span className="font-medium text-gray-500">{t('address')}: </span>
                  <span className="text-gray-600">{buyerInfo.address.replace(/\n/g, ', ')}</span>
                </p>
              )}
              {buyerInfo.phone && (
                <p className="text-xs sm:text-xs lg:text-sm">
                  <span className="font-medium text-gray-500">{t('phone')}: </span>
                  <span className="text-gray-600">{buyerInfo.phone}</span>
                </p>
              )}
              {buyerInfo.email && (
                <p className="text-xs sm:text-xs lg:text-sm">
                  <span className="font-medium text-gray-500">{t('email')}: </span>
                  <span className="text-gray-600">{buyerInfo.email}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="invoice-section">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          {/* Mobile Table View */}
          <div className="invoice-table-mobile block lg:hidden">
            {invoice.items.map((item, index) => (
              <div key={index} className="invoice-card bg-gray-50 border-l-4" style={{ borderLeftColor: themeColor }}>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</p>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">#{index + 1}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{t('qty')}</p>
                      <p className="font-medium text-sm">{formatNumber(item.quantity)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{t('unitPrice')}</p>
                      <p className="font-medium text-sm">{formatCurrency(item.unitPrice)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">{t('total')}</p>
                      <p className="font-bold text-gray-800 text-sm">{formatCurrency(item.lineTotal)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-white" style={{ background: themeGradient }}>
                  <th className="p-4 text-left font-semibold">{t('itemDescription')}</th>
                  <th className="p-4 text-center font-semibold">{t('qty')}</th>
                  <th className="p-4 text-right font-semibold">{t('unitPrice')}</th>
                  <th className="p-4 text-right font-semibold">{t('amount')}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center text-gray-700">{formatNumber(item.quantity)}</td>
                    <td className="p-4 text-right text-gray-700">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-4 text-right font-semibold text-gray-800">{formatCurrency(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="invoice-section">
        <div className="flex justify-end mb-4 sm:mb-6 lg:mb-8">
          <div className="w-full sm:w-80">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center py-1 sm:py-2">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm lg:text-base">{t('subtotal')}:</span>
                  <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{formatCurrency(invoice.summary.subtotal)}</span>
                </div>
                {invoice.summary.discountTotal > 0 && (
                  <div className="flex justify-between items-center py-1 sm:py-2 text-red-600">
                    <span className="font-medium text-xs sm:text-sm lg:text-base">{t('discount')}:</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base">-{formatCurrency(invoice.summary.discountTotal)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 sm:pt-3 mt-2 sm:mt-3">
                  <div className="flex justify-between items-center py-2 text-white rounded-lg px-3 sm:px-4" style={{ background: themeGradient }}>
                    <span className="font-bold text-sm sm:text-base lg:text-lg">{t('total')}:</span>
                    <span className="font-bold text-base sm:text-lg lg:text-xl">{formatCurrency(invoice.summary.grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {invoice.notes && (
        <div className="invoice-section">
          <div className="border-t border-gray-200 pt-4 sm:pt-6 lg:pt-8 pb-3 sm:pb-4 lg:pb-6">
            <div className="bg-gray-50 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
              <h4 className="font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 flex items-center gap-2" style={{ color: themeColor }}>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: themeColor }}></div>
                {t('notes')}:
              </h4>
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">{invoice.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
