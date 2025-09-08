/**
 * Lazy loading component wrapper only
 */
import React, { Suspense, ComponentType } from 'react';
import { Loading } from '@/components/ui/loading';
import ErrorBoundary from '@/components/ErrorBoundary';

// Simple lazy wrapper component
export const LazyWrapper: React.FC<{
  component: React.LazyExoticComponent<ComponentType<unknown>>;
  fallback?: React.ReactNode;
  props?: Record<string, unknown>;
}> = ({ component: Component, fallback, props = {} }) => (
  <ErrorBoundary>
    <Suspense fallback={fallback || <Loading variant="spinner" className="min-h-[200px]" />}>
      <Component {...props} />
    </Suspense>
  </ErrorBoundary>
);
