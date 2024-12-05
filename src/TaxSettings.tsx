import { useState } from "react";
import { TaxBracket } from "./Tax";

// Settings Component
interface TaxSettingsProps {
  brackets: TaxBracket[];
  income: number;
  onBracketsChange: (brackets: TaxBracket[]) => void;
  onIncomeChange: (income: number) => void;
}

const TaxSettings: React.FC<TaxSettingsProps> = ({
  brackets,
  income,
  onBracketsChange,
  onIncomeChange,
}) => {
  const [newMin, setNewMin] = useState<string>('');
  const [newRate, setNewRate] = useState<string>('');

  const addBracket = () => {
    if (!newMin || !newRate) return;
    const min = parseFloat(newMin);
    const rate = parseFloat(newRate);

    if (isNaN(min) || isNaN(rate)) return;
    if (rate < 0 || rate > 100) return;

    const newBrackets = [...brackets, { min, rate }]
      .sort((a, b) => a.min - b.min);

    onBracketsChange(newBrackets);
    setNewMin('');
    setNewRate('');
  };

  const removeBracket = (index: number) => {
    if (index === 0) return;
    onBracketsChange(brackets.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Tax Bracket Settings</h2>
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={newMin}
            onChange={(e) => setNewMin(e.target.value)}
            placeholder="Minimum Income"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            placeholder="Tax Rate %"
            className="border p-2 rounded"
          />
          <button
            onClick={addBracket}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Bracket
          </button>
        </div>

        <div className="space-y-2">
          {brackets.map((bracket, index) => (
            <div key={index} className="flex gap-4 items-center">
              <span>Min: ${bracket.min.toLocaleString()}</span>
              <span>Rate: {bracket.rate}%</span>
              {index > 0 && (
                <button
                  onClick={() => removeBracket(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Your Income</h2>
        <input
          type="number"
          value={income}
          onChange={(e) => onIncomeChange(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default TaxSettings;
