import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, FileText, Download } from 'lucide-react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  message?: string;
  className?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  type?: 'general' | 'pdf' | 'invoice' | 'upload';
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  message,
  className,
  fullScreen = false,
  overlay = false,
  type = 'general'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return <Download className={cn(sizeClasses[size], 'animate-bounce')} />;
      case 'invoice':
        return <FileText className={cn(sizeClasses[size], 'animate-pulse')} />;
      default:
        return <Loader2 className={cn(sizeClasses[size], 'animate-spin')} />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'pdf':
        return 'Generating PDF...';
      case 'invoice':
        return 'Creating invoice...';
      case 'upload':
        return 'Uploading...';
      default:
        return 'Loading...';
    }
  };

  const renderSpinner = () => (
    <div className="flex flex-col items-center gap-2">
      {getIcon()}
      {message && (
        <p className={cn(
          'text-muted-foreground',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        )}>
          {message}
        </p>
      )}
    </div>
  );

  const renderDots = () => (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
      {message && (
        <span className="ml-2 text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );

  const renderPulse = () => (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        'bg-primary rounded-full animate-pulse',
        sizeClasses[size]
      )}></div>
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );

  const renderSkeleton = () => (
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className={cn(
      'flex items-center justify-center',
      fullScreen && 'min-h-screen',
      className
    )}>
      {renderContent()}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-background p-6 rounded-lg shadow-lg">
          {renderContent()}
        </div>
      </div>
    );
  }

  return content;
};

// Inline loading component for buttons
export interface InlineLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  size?: 'sm' | 'md';
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
  isLoading,
  children,
  loadingText,
  size = 'sm'
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className={cn(
          'animate-spin',
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
        )} />
        {loadingText && <span>{loadingText}</span>}
      </div>
    );
  }

  return <>{children}</>;
};

// Loading skeleton for cards
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse space-y-4 p-6 border rounded-lg', className)}>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
  </div>
);

export default Loading;
