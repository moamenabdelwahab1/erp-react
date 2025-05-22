export class TaxCalculator {
  static TAX_RATES = {
    DEFAULT: 15, // Default tax rate
    REDUCED: 5,  // Reduced tax rate for certain items
    ZERO: 0      // Zero-rated items
  };

  static calculateTax(subtotal, taxRate, region = 'DEFAULT') {
    if (typeof taxRate !== 'number' || taxRate < 0) {
      taxRate = this.TAX_RATES[region] || this.TAX_RATES.DEFAULT;
    }

    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return {
      subtotal,
      taxRate,
      taxAmount,
      total
    };
  }

  static applyRegionalRules(amount, region) {
    // This can be extended with more complex regional tax rules
    const taxRate = this.TAX_RATES[region] || this.TAX_RATES.DEFAULT;
    return this.calculateTax(amount, taxRate, region);
  }

  static formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SAR',
      currencyDisplay: 'code'
    }).format(amount).replace('SAR', 'SAR ');
  }
} 