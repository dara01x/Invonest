export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId?: string;
  registrationNo?: string;
  logoUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  businessName?: string;
  address: string;
  phone: string;
  email: string;
  taxId?: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  unit: string;
  unitPrice: number;
  defaultTaxRateId?: string;
}

export interface TaxRate {
  id: string;
  name: string;
  ratePercent: number;
}

export interface InvoiceItem {
  id: string;
  productId?: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discountType?: 'percent' | 'fixed';
  discountValue?: number;
  taxRateId?: string;
  lineTotal: number;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference?: string;
}

export interface InvoiceSummary {
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  rounding: number;
  grandTotal: number;
}

export type InvoiceStatus = 'draft' | 'paid' | 'unpaid' | 'partiallyPaid' | 'overdue';

export interface Invoice {
  id: string;
  invoiceNo: string;
  currency: string;
  sellerId: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  summary: InvoiceSummary;
  notes?: string;
  terms?: string;
  qrData?: string;
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  language: 'en' | 'ar' | 'ckb';
  theme: 'light' | 'dark' | 'system';
  currency: string;
  dateFormat: string;
  numberFormat: string;
  invoicePrefix: string;
  invoiceStartNumber: number;
  defaultPaymentTerms: number;
  companyProfile: Company;
}

// Form-related interfaces
export interface FormData {
  invoiceNo: string;
  currency: string;
  issueDate: string;
  dueDate: string;
  notes: string;
  title: string;
}

export interface SellerInfo {
  name: string;
  address: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
}

export interface BuyerInfo {
  name: string;
  address: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
}

export interface SidebarSettings {
  colorTheme: string;
  discountType: 'none' | 'percentage' | 'fixed';
  discountValue: number;
  currency: string;
  showIssueDate: boolean;
  showDueDate: boolean;
}

export interface ColorTheme {
  name: string;
  value: string;
  color: string;
  gradient: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// Error handling
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

// Component prop interfaces
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InvoiceFormProps {
  invoice?: Invoice;
  onSave?: (invoice: Partial<Invoice>) => void;
}

export interface InvoicePreviewProps {
  invoice: Invoice;
  language: 'en' | 'ar' | 'ckb';
  sellerInfo: SellerInfo;
  buyerInfo: BuyerInfo;
  themeColor: string;
  themeGradient: string;
  logoUrl?: string | null;
  showIssueDate?: boolean;
  showDueDate?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
  onBackToLanding?: () => void;
}

export interface LandingPageProps {
  onGetStarted: () => void;
}

// PDF generation types
export interface PDFGenerationOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Storage types
export interface StorageItem<T = unknown> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt?: number;
}

export const currencies = [
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'د.ع' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
];

export const units = [
  'pc', 'pcs', 'piece', 'pieces',
  'kg', 'g', 'lb', 'oz',
  'm', 'cm', 'ft', 'in',
  'l', 'ml', 'gal',
  'hr', 'hour', 'hours',
  'day', 'days',
  'month', 'months',
  'year', 'years',
  'service', 'consultation'
];