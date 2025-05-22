// CostEntrySDK.js
class CostEntrySDK {
    constructor() {
        this.costs = [];
    }

    addCostEntry(entry) {
        const costRecord = {
            id: Date.now(),
            category: entry.category,
            amount: parseFloat(entry.amount),
            date: entry.date || new Date().toISOString().split('T')[0],
            description: entry.description,
            createdAt: new Date().toISOString()
        };

        this.costs.push(costRecord);
        return costRecord;
    }

    getCostEntries() {
        return this.costs;
    }

    getCostByCategory(category) {
        return this.costs.filter(cost => cost.category === category);
    }

    clearCosts() {
        this.costs = [];
    }
}

export default new CostEntrySDK();