/**
 * Accessibility hooks and utilities
 */
import { useEffect } from 'react';

// Focus management hook
export const useFocusManagement = () => {
  const setFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  };

  const focusFirstElement = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  };

  return { setFocus, focusFirstElement, trapFocus };
};

// Keyboard navigation hook
export const useKeyboardNavigation = () => {
  const handleKeyDown = (
    event: React.KeyboardEvent,
    actions: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
    }
  ) => {
    switch (event.key) {
      case 'Enter':
        if (actions.onEnter) {
          event.preventDefault();
          actions.onEnter();
        }
        break;
      case ' ':
        if (actions.onSpace) {
          event.preventDefault();
          actions.onSpace();
        }
        break;
      case 'Escape':
        if (actions.onEscape) {
          event.preventDefault();
          actions.onEscape();
        }
        break;
      case 'ArrowUp':
        if (actions.onArrowUp) {
          event.preventDefault();
          actions.onArrowUp();
        }
        break;
      case 'ArrowDown':
        if (actions.onArrowDown) {
          event.preventDefault();
          actions.onArrowDown();
        }
        break;
      case 'ArrowLeft':
        if (actions.onArrowLeft) {
          event.preventDefault();
          actions.onArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (actions.onArrowRight) {
          event.preventDefault();
          actions.onArrowRight();
        }
        break;
    }
  };

  return { handleKeyDown };
};

// Accessible modal/dialog management
export const useModalAccessibility = (isOpen: boolean) => {
  const { trapFocus } = useFocusManagement();

  useEffect(() => {
    if (isOpen) {
      // Save the previously focused element
      const previouslyFocused = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Find and focus the modal
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modal) {
        const cleanup = trapFocus(modal);
        
        return () => {
          cleanup();
          document.body.style.overflow = '';
          
          // Restore focus
          if (previouslyFocused) {
            previouslyFocused.focus();
          }
        };
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, trapFocus]);
};

// Color contrast checker
export const checkColorContrast = (foreground: string, background: string): number => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Announce changes to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};
