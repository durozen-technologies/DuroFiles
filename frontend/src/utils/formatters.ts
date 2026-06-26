/**
 * Formats a given amount into a strict 2-decimal localized string
 * Ensures 10000 becomes 10,000.00
 * Uses en-IN by default to handle Indian numbering systems properly (lakhs/crores)
 */
export const formatCurrency = (amount: number | string, locale: string = 'en-IN'): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0.00';
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
