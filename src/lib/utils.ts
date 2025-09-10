import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for input validation
export function formatPhoneInput(value: string): string {
  // Only allow numbers, spaces, hyphens, parentheses, and plus sign
  return value.replace(/[^0-9\s\-()+ ]/g, '');
}

export function formatInvoiceNumber(value: string): string {
  // Only allow numbers, letters, hyphens, and hash symbols for invoice numbers
  return value.replace(/[^0-9A-Za-z\-#]/g, '');
}

export function formatNumericInput(value: string): string {
  // Only allow numbers
  return value.replace(/[^0-9]/g, '');
}
