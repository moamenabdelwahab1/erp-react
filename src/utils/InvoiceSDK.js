export class InvoiceSDK {
  static generateInvoiceNumber() {
    const prefix = 'INV';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }

  static calculateTotals(items, tax, discount = 0) {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = (subtotal * tax) / 100;
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal + taxAmount - discountAmount;

    return {
      subtotal,
      taxAmount,
      discountAmount,
      total
    };
  }

  static createInvoice(clientId, items, tax, discount = 0) {
    const { subtotal, taxAmount, discountAmount, total } = this.calculateTotals(items, tax, discount);

    return {
      invoiceId: this.generateInvoiceNumber(),
      clientId,
      items,
      subtotal,
      tax,
      taxAmount,
      discount,
      discountAmount,
      total,
      status: 'PENDING',
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
  }

  static updateInvoice(originalInvoice, updates) {
    // Recalculate totals based on updated items and rates
    const { subtotal, taxAmount, discountAmount, total } = this.calculateTotals(
      updates.items,
      updates.tax,
      updates.discount
    );

    return {
      ...originalInvoice,
      ...updates,
      subtotal,
      taxAmount,
      discountAmount,
      total,
      updatedAt: new Date()
    };
  }

  static calculateDueStatus(invoice) {
    const now = new Date();
    const dueDate = new Date(invoice.dueDate);
    
    if (invoice.status === 'PAID') return 'PAID';
    if (now > dueDate) return 'OVERDUE';
    if (now < dueDate) return 'PENDING';
    return 'DUE_TODAY';
  }
} 