import { useState } from 'react';
import { TaxBracket } from './Tax'
import TaxSettings from './TaxSettings';
import TaxVisualizer from './TaxVisualizer';


// Main Container Component
const TaxBracketVisualizer = () => {
  const [brackets, setBrackets] = useState<TaxBracket[]>([
    { min: 0, rate: 10 },
    { min: 30000, rate: 20 },
    { min: 50000, rate: 30 },
  ]);
  const [income, setIncome] = useState<number>(75000);

  return (
    <div className="p-6">
      <TaxSettings
        brackets={brackets}
        income={income}
        onBracketsChange={setBrackets}
        onIncomeChange={setIncome}
      />
      <TaxVisualizer
        brackets={brackets}
        income={income}
      />
    </div>
  );
};


function App() {
  return (
    <TaxBracketVisualizer />
  )
}

export default App
