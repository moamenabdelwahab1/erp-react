import React, { useState } from 'react';
import { InvoiceDueReminderSDK } from '../utils/InvoiceDueReminderSDK';

const ReminderForm = ({ invoice, onRemindersSent }) => {
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
    userId: ''
  });

  const [selectedChannels, setSelectedChannels] = useState({
    EMAIL: false,
    SMS: false,
    IN_APP: false
  });

  const [status, setStatus] = useState('');

  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChannelChange = (e) => {
    const { name, checked } = e.target;
    setSelectedChannels(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending reminders...');

    try {
      // Get selected notification channels
      const notificationTypes = Object.entries(selectedChannels)
        .filter(([_, isSelected]) => isSelected)
        .map(([channel]) => channel);

      if (notificationTypes.length === 0) {
        throw new Error('Please select at least one notification channel');
      }

      // Create and send reminders
      const reminders = InvoiceDueReminderSDK.createReminder(
        invoice.invoiceId,
        invoice.dueDate,
        contactDetails,
        notificationTypes
      );

      const results = await InvoiceDueReminderSDK.sendReminders(reminders);
      
      // Check if any reminders failed
      const failedReminders = results.filter(r => r.status === 'FAILED');
      if (failedReminders.length > 0) {
        setStatus(`Some reminders failed to send. Please try again.`);
      } else {
        setStatus('Reminders sent successfully!');
        if (onRemindersSent) {
          onRemindersSent(results);
        }
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="reminder-form">
      <h3>Send Due Date Reminders</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactDetails.email}
            onChange={handleContactDetailsChange}
            placeholder="client@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactDetails.phone}
            onChange={handleContactDetailsChange}
            placeholder="+1234567890"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">User ID (for in-app):</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={contactDetails.userId}
            onChange={handleContactDetailsChange}
            placeholder="User ID for in-app notifications"
          />
        </div>

        <div className="form-group">
          <label>Notification Channels:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="EMAIL"
                checked={selectedChannels.EMAIL}
                onChange={handleChannelChange}
              />
              Email
            </label>
            <label>
              <input
                type="checkbox"
                name="SMS"
                checked={selectedChannels.SMS}
                onChange={handleChannelChange}
              />
              SMS
            </label>
            <label>
              <input
                type="checkbox"
                name="IN_APP"
                checked={selectedChannels.IN_APP}
                onChange={handleChannelChange}
              />
              In-app Notification
            </label>
          </div>
        </div>

        {status && (
          <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
            {status}
          </div>
        )}

        <button type="submit" className="submit-button">
          Send Reminders
        </button>
      </form>
    </div>
  );
};

export default ReminderForm; 