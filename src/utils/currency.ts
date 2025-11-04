export const formatCurrency = (amount: number): string => {
  return `GH₵${amount.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
};
