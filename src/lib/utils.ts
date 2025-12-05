import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Invoice } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Rounds a number to exactly 2 decimal places for financial calculations.
 * Avoids floating-point precision errors (e.g., 10.99 * 1.2 = 13.188000000000001)
 */
export function roundTo2Decimals(num: number): number {
  return Math.round(num * 100) / 100;
}

export function calculateInvoiceTotals(invoice: Invoice) {
  // Calculate with proper rounding at each step
  const lineItemTotals = invoice.items.map(item =>
    roundTo2Decimals(item.quantity * item.unitPrice)
  );

  const subtotal = roundTo2Decimals(
    lineItemTotals.reduce((acc, lineTotal) => acc + lineTotal, 0)
  );

  const vatAmount = invoice.vatEnabled
    ? roundTo2Decimals(subtotal * (invoice.vatRate / 100))
    : 0;

  const total = roundTo2Decimals(subtotal + vatAmount);

  return {
    subtotal,
    vatAmount,
    total
  };
}
