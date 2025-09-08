import React, { Suspense, ComponentType } from 'react';
import { Loading } from './ui/loading';

// Lazy wrapper for components
export const LazyWrapper: React.FC<{
  component: React.LazyExoticComponent<ComponentType<unknown>>;
  fallback?: React.ReactNode;
  props?: Record<string, unknown>;
}> = ({ component: Component, fallback, props = {} }) => (
  <Suspense fallback={fallback || <Loading variant="spinner" />}>
    <Component {...props} />
  </Suspense>
);
