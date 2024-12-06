import React from "react";
import { formatCurrency, TaxBracket, TaxBreakdown } from "./Tax";

// Visualization Component
interface TaxVisualizerProps {
  brackets: TaxBracket[];
  income: number;
}

const calculateTaxes = (brackets: TaxBracket[], income: number) => {
  let totalTax = 0;
  const breakdowns: TaxBreakdown[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const nextBracketMin = brackets[i + 1]?.min || Infinity;
    const bracketMax = Math.min(nextBracketMin, income);
    const bracketMin = bracket.min;

    if (income <= bracketMin) break;

    const taxableInBracket = Math.max(0, bracketMax - bracketMin);
    const taxInBracket = taxableInBracket * (bracket.rate / 100);
    const takeHome = taxableInBracket - taxInBracket;

    totalTax += taxInBracket;
    breakdowns.push({
      min: bracketMin,
      max: nextBracketMin,
      taxable: taxableInBracket,
      tax: taxInBracket,
      takeHome,
      rate: bracket.rate,
    });
  }

  return { totalTax, breakdowns };
};

const TaxVisualizer: React.FC<TaxVisualizerProps> = ({ brackets, income }) => {
  const maxIncome = income * 1.2;
  // const maxIncome = Math.max(income, ...brackets.map((b) => b.min)) * 1.2;

  const visibleBrackets = brackets.filter((b) => b.min <= maxIncome);
  const { totalTax, breakdowns } = calculateTaxes(visibleBrackets, income);

  const calculateTicks = () => {
    const rawTicks = visibleBrackets.map((b) => ({
      position: (b.min / maxIncome) * 100,
      label: formatCurrency(b.min),
    }));

    rawTicks.push({
      position: (income / maxIncome) * 100,
      label: formatCurrency(income),
    });

    rawTicks.sort((a, b) => a.position - b.position);
    return rawTicks;
  };

  const ticks = calculateTicks();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tax Breakdown</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Bracket Range</th>
              <th className="border p-2 text-left">Rate</th>
              <th className="border p-2 text-left">Taxable Amount</th>
              <th className="border p-2 text-left">Tax Paid</th>
              <th className="border p-2 text-left">Take Home</th>
            </tr>
          </thead>
          <tbody>
            {breakdowns.map((breakdown, index) => (
              <tr key={index}>
                <td className="border p-2">
                  {formatCurrency(breakdown.min)} -{" "}
                  {formatCurrency(breakdown.max)}
                </td>
                <td className="border p-2">{breakdown.rate}%</td>
                <td className="border p-2">
                  {formatCurrency(breakdown.taxable)}
                </td>
                <td className="border p-2">{formatCurrency(breakdown.tax)}</td>
                <td className="border p-2">
                  {formatCurrency(breakdown.takeHome)}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td colSpan={3} className="border p-2 text-right">
                Totals:
              </td>
              <td className="border p-2">{formatCurrency(totalTax)}</td>
              <td className="border p-2">
                {formatCurrency(income - totalTax)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Visualization</h2>
        <div className="relative">
          <div className="w-full h-20 flex" style={{ backgroundColor: "#eee" }}>
            {breakdowns.map((breakdown, index) => {
              const effectiveMax = Math.min(breakdown.max, maxIncome);
              const width = ((effectiveMax - breakdown.min) / maxIncome) * 100;
              const taxWidth =
                (breakdown.taxable / (effectiveMax - breakdown.min)) * 100;
              const taxHeight = (breakdown.rate / 100) * 100;
              const showRightBorder = taxWidth < 100;
              return (
                <div
                  key={index}
                  className="h-full relative border-r group"
                  style={{ width: `${width}%` }}
                >
                  <div
                    className={
                      "absolute top-0 w-full bg-yellow-300" +
                      (showRightBorder ? " border-black border-r" : "")
                    }
                    style={{ width: `${taxWidth}%`, height: `${taxHeight}%` }}
                  />
                  <div
                    className={
                      "absolute bottom-0 w-full bg-green-500" +
                      (showRightBorder ? " border-black border-r" : "")
                    }
                    style={{
                      width: `${taxWidth}%`,
                      height: `${100 - taxHeight}%`,
                    }}
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-black text-white p-2 rounded text-sm whitespace-nowrap z-10">
                    Range: {formatCurrency(breakdown.min)} -
                    {formatCurrency(breakdown.max)}
                    <br />
                    Rate: {breakdown.rate}%
                    <br />
                    Tax: {formatCurrency(breakdown.tax)}
                    <br />
                    Take Home: {formatCurrency(breakdown.takeHome)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative h-1 w-full border-t">
            {ticks.map((tick, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${tick.position}%` }}
              >
                <div className="h-2 w-px bg-gray-400" />
              </div>
            ))}
          </div>
          <div className="relative h-24 w-full">
            {ticks.map((tick, index) => (
              <div
                key={index}
                className="absolute text-sm text-gray-600 mt-1 whitespace-nowrap"
                style={{
                  top: 0,
                  left: `${tick.position}%`,
                  transform: `translateX(-100%) rotate(-90deg)`,
                  transformOrigin: "right",
                }}
              >
                {tick.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxVisualizer;
