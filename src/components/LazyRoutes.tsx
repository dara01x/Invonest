import { createLazyComponent } from '../lib/lazyLoadingUtils';

// Lazy load the Invoice Form
export const LazyInvoiceForm = createLazyComponent(
  () => import('./InvoiceForm').then(module => ({ default: module.InvoiceForm }))
);

// Lazy load the Landing Page
export const LazyLandingPage = createLazyComponent(
  () => import('./LandingPage').then(module => ({ default: module.LandingPage }))
);
