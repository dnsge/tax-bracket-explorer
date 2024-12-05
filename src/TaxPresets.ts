export interface TaxPresetConfig {
  id: string;
  name: string;
  description: string;
  brackets: {
    min: number;
    rate: number;
  }[];
}

export const TAX_PRESETS: TaxPresetConfig[] = [
  {
    id: "us-federal-2024",
    name: "US Federal 2024",
    description: "US Federal Income Tax Brackets for 2024 (Single Filer)",
    brackets: [
      { min: 0, rate: 10 },
      { min: 11600, rate: 12 },
      { min: 47150, rate: 22 },
      { min: 100525, rate: 24 },
      { min: 191950, rate: 32 },
      { min: 243725, rate: 35 },
      { min: 609350, rate: 37 }
    ]
  },
  {
    id: "us-federal-2024-married",
    name: "US Federal 2024 (Married)",
    description: "US Federal Income Tax Brackets for 2024 (Married Filing Jointly)",
    brackets: [
      { min: 0, rate: 10 },
      { min: 23200, rate: 12 },
      { min: 94300, rate: 22 },
      { min: 201050, rate: 24 },
      { min: 383900, rate: 32 },
      { min: 487450, rate: 35 },
      { min: 731200, rate: 37 }
    ]
  },
  {
    id: "custom",
    name: "Custom",
    description: "Custom tax brackets",
    brackets: []
  }
];
