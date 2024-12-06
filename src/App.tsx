import { useState } from "react";
import { TaxBracket } from "./Tax";
import TaxSettings from "./TaxSettings";
import TaxVisualizer from "./TaxVisualizer";

// Main Container Component
const TaxBracketVisualizer = () => {
  const [brackets, setBrackets] = useState<TaxBracket[]>([]);
  const [income, setIncome] = useState<number>(75000);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">Tax Bracket Explorer</h1>
      <span>
        Select a tax bracket preset and enter your income to visualize your owed
        taxes.
      </span>
      <TaxSettings
        defaultPreset="us-federal-2024"
        brackets={brackets}
        income={income}
        onBracketsChange={setBrackets}
        onIncomeChange={setIncome}
      />
      <TaxVisualizer brackets={brackets} income={income} />
      <p className="text-sm">
        This is a helpful tool for exploring and visualizing different taxation
        scenarios; don't use this for your taxes without verifying the results
        yourself.
      </p>
    </div>
  );
};

function App() {
  return <TaxBracketVisualizer />;
}

export default App;
