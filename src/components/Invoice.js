import React, { useState } from 'react';
import { InvoiceSDK } from '../utils/InvoiceSDK';
import { TaxCalculator } from '../utils/TaxCalculator';
import InvoiceList from './InvoiceList';
import InvoiceOutput from './InvoiceOutput';
import ReminderForm from './ReminderForm';

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    items: [{ name: '', quantity: 1, unitPrice: 0 }],
    tax: 15,
    discount: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'name' ? value : parseFloat(value) || 0
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    } else {
      alert('Invoice must have at least one item');
    }
  };

  const handleEditInvoice = (invoiceToEdit) => {
    setIsEditing(true);
    setFormData({
      clientId: invoiceToEdit.clientId,
      items: invoiceToEdit.items,
      tax: invoiceToEdit.tax,
      discount: invoiceToEdit.discount
    });
    setInvoice(invoiceToEdit);
  };

  const resetForm = () => {
    setFormData({
      clientId: '',
      items: [{ name: '', quantity: '', unitPrice: '' }],
      tax: 15,
      discount: 0
    });
    setIsEditing(false);
    setInvoice(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newInvoice;
      
      if (isEditing && invoice) {
        newInvoice = InvoiceSDK.updateInvoice(invoice, {
          clientId: formData.clientId,
          items: formData.items,
          tax: parseFloat(formData.tax),
          discount: parseFloat(formData.discount)
        });

        setInvoices(prev => 
          prev.map(inv => 
            inv.invoiceId === newInvoice.invoiceId ? newInvoice : inv
          )
        );
      } else {
        newInvoice = InvoiceSDK.createInvoice(
          formData.clientId,
          formData.items,
          parseFloat(formData.tax),
          parseFloat(formData.discount)
        );

        setInvoices(prev => [...prev, newInvoice]);
      }

      setInvoice(newInvoice);

      setFormData({
        clientId: '',
        items: [{ name: '', quantity: 1, unitPrice: 0 }],
        tax: 15,
        discount: 0
      });
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="invoice-management">
      <div className="invoice-form">
        <h2>{isEditing ? 'Edit Invoice' : 'Create New Invoice'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientId">Client ID:</label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="items-section">
            <h3>Items</h3>
            <div className="item-header">
              <span>Product Name</span>
              <span>Quantity</span>
              <span>Unit Price ($)</span>
              <span>Action</span>
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="item-row">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  required
                />
                <div className="quantity-field">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    min="1"
                    required
                  />
                </div>
                <div className="price-field">
                  <input
                    type="number"
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addItem}>
              Add Item
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="tax">Tax Rate (%):</label>
            <input
              type="number"
              id="tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="discount">Discount Rate (%):</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              {isEditing ? 'Update Invoice' : 'Create Invoice'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {invoice && !isEditing && (
        <>
          <InvoiceOutput invoice={invoice} />
          <ReminderForm 
            invoice={invoice}
            onRemindersSent={(results) => {
              console.log('Reminders sent:', results);
            }}
          />
        </>
      )}

      <InvoiceList 
        invoices={invoices} 
        onEditInvoice={handleEditInvoice} 
      />
    </div>
  );
};

export default Invoice; 