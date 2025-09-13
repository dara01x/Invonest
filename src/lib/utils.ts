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

// Format numbers with thousands separators (commas)
export function formatNumber(num: number): string {
  // Convert number to string and handle decimal places
  const numStr = num % 1 === 0 ? num.toString() : num.toFixed(2).replace(/\.?0+$/, '');
  
  // Split into integer and decimal parts
  const [integerPart, decimalPart] = numStr.split('.');
  
  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Return with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
