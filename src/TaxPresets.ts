export interface TaxPresetConfig {
  id: string;
  name: string;
  description: string;
  brackets: {
    min: number;
    rate: number;
  }[];
}

export const TAX_GROUPS: { [group: string]: TaxPresetConfig[] } = {
  "": [
    {
      id: "custom",
      name: "Custom",
      description: "Custom tax brackets",
      brackets: [],
    },
  ],
  "US Federal": [
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
        { min: 609350, rate: 37 },
      ],
    },
    {
      id: "us-federal-2024-married",
      name: "US Federal 2024 (Married)",
      description:
        "US Federal Income Tax Brackets for 2024 (Married Filing Jointly)",
      brackets: [
        { min: 0, rate: 10 },
        { min: 23200, rate: 12 },
        { min: 94300, rate: 22 },
        { min: 201050, rate: 24 },
        { min: 383900, rate: 32 },
        { min: 487450, rate: 35 },
        { min: 731200, rate: 37 },
      ],
    },
    {
      id: "us-federal-2025",
      name: "US Federal 2025",
      description: "US Federal Income Tax Brackets for 2025 (Single Filer)",
      brackets: [
        { min: 0, rate: 10 },
        { min: 11925, rate: 12 },
        { min: 48475, rate: 22 },
        { min: 103350, rate: 24 },
        { min: 197300, rate: 32 },
        { min: 250525, rate: 35 },
        { min: 626350, rate: 37 },
      ],
    },
    {
      id: "us-federal-2025-married",
      name: "US Federal 2025 (Married)",
      description:
        "US Federal Income Tax Brackets for 2025 (Married Filing Jointly)",
      brackets: [
        { min: 0, rate: 10 },
        { min: 23850, rate: 12 },
        { min: 96950, rate: 22 },
        { min: 206700, rate: 24 },
        { min: 394600, rate: 32 },
        { min: 501050, rate: 35 },
        { min: 751600, rate: 37 },
      ],
    },
  ],
  "California State": [
    {
      id: "california-2024",
      name: "California State 2024",
      description:
        "California State Income Tax Brackets for 2024 (Single Filer)",
      brackets: [
        { min: 0, rate: 1 },
        { min: 10756, rate: 2 },
        { min: 25499, rate: 4 },
        { min: 40245, rate: 6 },
        { min: 55866, rate: 8 },
        { min: 70606, rate: 9.3 },
        { min: 360659, rate: 10.3 },
        { min: 432787, rate: 11.3 },
        { min: 721314, rate: 12.3 },
      ],
    },
    {
      id: "california-2024-married",
      name: "California State 2024 (Married)",
      description:
        "California State Income Tax Brackets for 2024 (Married Filing Jointly)",
      brackets: [
        { min: 0, rate: 1 },
        { min: 21512, rate: 2 },
        { min: 50998, rate: 4 },
        { min: 80490, rate: 6 },
        { min: 111732, rate: 8 },
        { min: 141212, rate: 9.3 },
        { min: 721318, rate: 10.3 },
        { min: 865574, rate: 11.3 },
        { min: 1442628, rate: 12.3 },
      ],
    },
  ],
};

export const TAX_PRESETS: TaxPresetConfig[] = Object.values(TAX_GROUPS).flat();
