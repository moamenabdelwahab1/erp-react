import React from 'react';
import { TaxCalculator } from '../utils/TaxCalculator';

const InvoiceOutput = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div className="invoice-output">
      <div className="invoice-header">
        <h2>Invoice</h2>
        <div className="invoice-meta">
          <div className="invoice-number">
            <strong>Invoice Number:</strong>
            <span>{invoice.invoiceId}</span>
          </div>
          <div className="invoice-date">
            <strong>Created:</strong>
            <span>{new Date(invoice.createdAt).toLocaleDateString('en-US')}</span>
          </div>
          <div className="invoice-due">
            <strong>Due Date:</strong>
            <span>{new Date(invoice.dueDate).toLocaleDateString('en-US')}</span>
          </div>
        </div>
      </div>

      <div className="invoice-client">
        <h3>Client Information</h3>
        <div className="client-details">
          <strong>Client ID:</strong>
          <span>{invoice.clientId}</span>
        </div>
      </div>

      <div className="invoice-items">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{TaxCalculator.formatCurrency(item.unitPrice)}</td>
                <td>{TaxCalculator.formatCurrency(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="invoice-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{TaxCalculator.formatCurrency(invoice.subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Tax ({invoice.tax}%):</span>
          <span>{TaxCalculator.formatCurrency(invoice.taxAmount)}</span>
        </div>
        {invoice.discount > 0 && (
          <div className="summary-row discount">
            <span>Discount ({invoice.discount}%):</span>
            <span>-{TaxCalculator.formatCurrency(invoice.discountAmount)}</span>
          </div>
        )}
        <div className="summary-row total">
          <strong>Total:</strong>
          <strong>{TaxCalculator.formatCurrency(invoice.total)}</strong>
        </div>
      </div>

      <div className="invoice-status">
        <div className="status-badge" data-status={invoice.status}>
          Status: {invoice.status}
        </div>
      </div>

      <div className="invoice-footer">
        <p>Thank you for your business!</p>
        {invoice.updatedAt && (
          <div className="last-updated">
            Last Updated: {new Date(invoice.updatedAt).toLocaleString('en-US')}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceOutput; 