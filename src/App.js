import React, { useState } from 'react';
import './App.css';
import CostEntry from './components/CostEntry';
import CostList from './components/CostList';
import Invoice from './components/Invoice';

function App() {
  const [activeTab, setActiveTab] = useState('invoice');
  const [costs, setCosts] = useState([]);

  const handleCostSubmit = (cost) => {
    setCosts(prevCosts => [...prevCosts, cost]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice and Cost Management System</h1>
        <nav>
          <button
            className={activeTab === 'invoice' ? 'active' : ''}
            onClick={() => setActiveTab('invoice')}
          >
            Invoices
          </button>
          <button
            className={activeTab === 'cost' ? 'active' : ''}
            onClick={() => setActiveTab('cost')}
          >
            Costs
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'invoice' ? (
          <Invoice />
        ) : (
          <div className="cost-section">
            <CostEntry onCostSubmit={handleCostSubmit} />
            <CostList costs={costs} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
