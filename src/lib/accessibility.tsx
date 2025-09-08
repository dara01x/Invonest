/**
 * Accessibility components
 */
import React from 'react';
import { useKeyboardNavigation } from '@/hooks/useAccessibility';

// Accessibility interfaces
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: boolean;
  role?: string;
  tabIndex?: number;
}

export interface FocusableElementProps extends AccessibilityProps {
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Screen reader only text component
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">
    {children}
  </span>
);

// Announcer for dynamic content changes
export const LiveRegion: React.FC<{
  children: React.ReactNode;
  level?: 'assertive' | 'polite';
  atomic?: boolean;
}> = ({ children, level = 'polite', atomic = true }) => (
  <div
    aria-live={level}
    aria-atomic={atomic}
    className="sr-only"
  >
    {children}
  </div>
);

// Skip link component
export const SkipLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
  >
    {children}
  </a>
);

// Accessible button component
export const AccessibleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  ...ariaProps
}) => {
  const { handleKeyDown } = useKeyboardNavigation();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${className}
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
      `}
      onKeyDown={(e) => handleKeyDown(e, { onEnter: onClick, onSpace: onClick })}
      {...ariaProps}
    >
      {children}
    </button>
  );
};

// Error message component with proper ARIA
export const ErrorMessage: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => (
  <div
    id={id}
    role="alert"
    aria-live="assertive"
    className={`text-destructive text-sm mt-1 ${className}`}
  >
    {children}
  </div>
);

// Loading announcement
export const LoadingAnnouncement: React.FC<{ message: string }> = ({ message }) => (
  <LiveRegion level="polite">
    {message}
  </LiveRegion>
);
