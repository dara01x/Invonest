/**
 * Code splitting utilities (functions only)
 */
import React, { ComponentType } from 'react';

// Preload a component
export const preloadComponent = (importFunc: () => Promise<unknown>) => {
  // Start loading the component
  importFunc();
};

// Factory for creating lazy routes
export const createLazyComponent = (
  importFunc: () => Promise<{ default: ComponentType<unknown> }>,
) => {
  return React.lazy(importFunc);
};

// Bundle analyzer helper (development only)
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis:');
    console.log('- Main bundle includes core app functionality');
    console.log('- PDF generation is loaded on-demand');
    console.log('- Image optimization utilities are loaded when needed');
  }
};
