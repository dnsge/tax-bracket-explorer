import { useState } from "react";
import { formatCurrency, TaxBracket } from "./Tax";
import { TAX_PRESETS } from "./TaxPresets";

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
  const [newMin, setNewMin] = useState<string>("");
  const [newRate, setNewRate] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  const addBracket = () => {
    if (!newMin || !newRate) return;
    const inputMin = parseFloat(newMin);
    const rate = parseFloat(newRate);

    if (isNaN(inputMin) || isNaN(rate)) return;
    if (rate < 0 || rate > 100) return;

    const min = Math.floor(inputMin * 100) / 100; // Floor to cent

    if (brackets.findIndex((b) => b.min === min) !== -1) {
      alert(
        `A tax bracket with minimum income of ${formatCurrency(
          min
        )} already exists`
      );
      return;
    }

    const newBrackets = [...brackets, { min, rate }].sort(
      (a, b) => a.min - b.min
    );

    onBracketsChange(newBrackets);
    setNewMin("");
    setNewRate("");
  };

  const removeBracket = (index: number) => {
    if (index === 0) return;
    onBracketsChange(brackets.filter((_, i) => i !== index));
  };

  const updateBracketRate = (targetIndex: number, newRate: number) => {
    if (newRate < 0 || newRate > 100) return;
    const newBrackets = brackets.map((bracket, index) =>
      index === targetIndex ? { ...bracket, rate: newRate } : bracket
    );
    onBracketsChange(newBrackets);
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = TAX_PRESETS.find((p) => p.id === presetId);
    if (preset && presetId !== "custom") {
      onBracketsChange(preset.brackets);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-8">
        <div className="mt-4 grow-[3]">
          <h2 className="text-xl font-bold mb-2">Tax Brackets</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tax Configuration
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            >
              {TAX_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
            {selectedPreset !== "custom" && (
              <p className="text-sm text-gray-600 mb-2">
                {TAX_PRESETS.find((p) => p.id === selectedPreset)?.description}
              </p>
            )}
          </div>
          <table className="mt-4 w-full">
            <thead>
              <tr className="text-left">
                <th className="p-2">Minimum</th>
                <th className="p-2">Rate</th>
                {selectedPreset === "custom" && (
                  <th className="p-2">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {brackets.map((bracket, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{formatCurrency(bracket.min)}</td>
                  <td className="p-2">
                    {selectedPreset === "custom" ? (
                      <input
                        type="number"
                        value={bracket.rate}
                        onChange={(e) =>
                          updateBracketRate(index, Number(e.target.value))
                        }
                        min="0"
                        max="100"
                        className="text-sm border p-2 rounded w-20"
                      />
                    ) : (
                      bracket.rate
                    )}
                    %
                  </td>
                  {selectedPreset === "custom" && (
                    <td className="p-2">
                      {index > 0 && (
                        <button
                          onClick={() => removeBracket(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {selectedPreset === "custom" && (
                <tr key={"add"} className="border-t">
                  <td className="p-2">
                    <input
                      type="number"
                      value={newMin}
                      onChange={(e) => setNewMin(e.target.value)}
                      min="0"
                      placeholder="Minimum Income"
                      className="text-sm border p-2 rounded"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      min="0"
                      max="100"
                      placeholder="Tax Rate"
                      className="text-sm border p-2 rounded w-32"
                    />
                    %
                  </td>
                  <td className="p-2">
                    <button
                      onClick={addBracket}
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded"
                    >
                      Add Bracket
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grow-[1] w-4/12">
          <h2 className="text-xl font-bold mb-2">Your Income</h2>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taxable Income (as defined by IRS)
          </label>
          <span className="text-lg">
            $
            <input
              type="number"
              value={income}
              min="0"
              onChange={(e) => onIncomeChange(Number(e.target.value))}
              className="border p-2 rounded"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaxSettings;
