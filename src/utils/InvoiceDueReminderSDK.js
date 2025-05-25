export class InvoiceDueReminderSDK {
  static createReminder(invoiceId, dueDate, contactDetails, notificationTypes) {
    const now = new Date();
    const dueDateObj = new Date(dueDate);
    const daysUntilDue = Math.ceil((dueDateObj - now) / (1000 * 60 * 60 * 24));

    let reminderType = 'UPCOMING';
    let priority = 'LOW';
    let message = '';

    // Determine reminder type and priority based on due date
    if (daysUntilDue < 0) {
      reminderType = 'OVERDUE';
      priority = 'HIGH';
      message = `Overdue Invoice: Invoice #${invoiceId} is overdue by ${Math.abs(daysUntilDue)} days`;
    } else if (daysUntilDue === 0) {
      reminderType = 'DUE_TODAY';
      priority = 'HIGH';
      message = `Due Today: Invoice #${invoiceId} is due for payment today`;
    } else if (daysUntilDue <= 7) {
      reminderType = 'DUE_SOON';
      priority = 'MEDIUM';
      message = `Payment Reminder: Invoice #${invoiceId} is due in ${daysUntilDue} days`;
    } else {
      message = `Notice: Invoice #${invoiceId} is due on ${new Date(dueDate).toLocaleDateString()}`;
    }

    // Create reminder notifications for each selected type
    const notifications = notificationTypes.map(type => ({
      id: Math.random().toString(36).substr(2, 9),
      invoiceId,
      type: reminderType,
      priority,
      message,
      channel: type,
      contactDetails: this.getContactDetailsForChannel(contactDetails, type),
      createdAt: new Date(),
      status: 'PENDING'
    }));

    return notifications;
  }

  static getContactDetailsForChannel(contactDetails, channel) {
    switch (channel) {
      case 'EMAIL':
        return { email: contactDetails.email };
      case 'SMS':
        return { phone: contactDetails.phone };
      case 'IN_APP':
        return { userId: contactDetails.userId };
      default:
        return contactDetails;
    }
  }

  static async sendReminders(reminders) {
    const results = [];
    
    for (const reminder of reminders) {
      try {
        // Simulate sending reminders through different channels
        const result = await this.sendReminderByChannel(reminder);
        results.push({
          ...result,
          status: 'SENT',
          sentAt: new Date()
        });
      } catch (error) {
        results.push({
          ...reminder,
          status: 'FAILED',
          error: error.message
        });
      }
    }

    return results;
  }

  static async sendReminderByChannel(reminder) {
    // Simulate API calls to different notification services
    return new Promise((resolve) => {
      setTimeout(() => {
        let message;
        switch (reminder.channel) {
          case 'EMAIL':
            message = `Email sent to ${reminder.contactDetails.email}`;
            break;
          case 'SMS':
            message = `SMS sent to ${reminder.contactDetails.phone}`;
            break;
          case 'IN_APP':
            message = `In-app notification sent to user ${reminder.contactDetails.userId}`;
            break;
          default:
            message = 'Notification sent';
        }
        
        resolve({
          ...reminder,
          deliveryMessage: message
        });
      }, 1000);
    });
  }
} 