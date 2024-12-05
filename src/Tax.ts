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
