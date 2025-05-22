import React, { useState } from 'react';
import CostEntrySDK from '../utils/CostEntrySDK';

const CostEntry = ({ onCostSubmit }) => {
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const costRecord = CostEntrySDK.addCostEntry(formData);
        onCostSubmit(costRecord);
        setFormData({
            category: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            description: ''
        });
    };

    return (
        <div className="cost-entry">
            <h2>Add Cost Entry</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        placeholder="Enter cost category"
                    />
                </div>

                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Add Cost Entry
                </button>
            </form>
        </div>
    );
};

export default CostEntry; 