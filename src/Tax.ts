export interface TaxBracket {
  min: number;
  rate: number;
}

export interface TaxBreakdown {
  min: number;
  max: number;
  taxable: number;
  tax: number;
  takeHome: number;
  rate: number;
}

export const formatCurrency = (amount: number) =>
  amount === Infinity
    ? "$∞"
    : amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      });
