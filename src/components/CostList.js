import React from 'react';

const CostList = ({ costs }) => {
    return (
        <div className="cost-list">
            <h2>Cost Entries</h2>
            {costs.length === 0 ? (
                <p>No cost entries yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {costs.map(cost => (
                            <tr key={cost.id}>
                                <td>{new Date(cost.date).toLocaleDateString()}</td>
                                <td>{cost.category}</td>
                                <td>${cost.amount.toFixed(2)}</td>
                                <td>{cost.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CostList; 