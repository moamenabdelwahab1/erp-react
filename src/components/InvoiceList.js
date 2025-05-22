import React from 'react';
import { TaxCalculator } from '../utils/TaxCalculator';

const InvoiceList = ({ invoices, onEditInvoice }) => {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="invoice-list empty">
        <p>No invoices yet.</p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      <h3>Invoice Records</h3>
      <div className="invoice-table">
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Client ID</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.clientId}</td>
                <td>{TaxCalculator.formatCurrency(invoice.subtotal)}</td>
                <td>{TaxCalculator.formatCurrency(invoice.taxAmount)}</td>
                <td>{TaxCalculator.formatCurrency(invoice.discountAmount)}</td>
                <td>{TaxCalculator.formatCurrency(invoice.total)}</td>
                <td>{invoice.status}</td>
                <td>{new Date(invoice.dueDate).toLocaleDateString('en-US')}</td>
                <td>
                  <button 
                    className="edit-button"
                    onClick={() => onEditInvoice(invoice)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList; 