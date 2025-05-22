export class NotificationSDK {
  static createNotification(invoiceId, dueDate, contactDetails) {
    const now = new Date();
    const dueDateObj = new Date(dueDate);
    const daysUntilDue = Math.ceil((dueDateObj - now) / (1000 * 60 * 60 * 24));

    let notificationType = 'UPCOMING';
    let priority = 'LOW';
    let message = '';

    if (daysUntilDue < 0) {
      notificationType = 'OVERDUE';
      priority = 'HIGH';
      message = `Overdue Invoice: Invoice #${invoiceId} is overdue by ${Math.abs(daysUntilDue)} days`;
    } else if (daysUntilDue === 0) {
      notificationType = 'DUE_TODAY';
      priority = 'HIGH';
      message = `Due Today: Invoice #${invoiceId} is due for payment today`;
    } else if (daysUntilDue <= 7) {
      notificationType = 'DUE_SOON';
      priority = 'MEDIUM';
      message = `Payment Reminder: Invoice #${invoiceId} is due in ${daysUntilDue} days`;
    } else {
      message = `Notice: Invoice #${invoiceId} is due on ${dueDate}`;
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      invoiceId,
      type: notificationType,
      priority,
      message,
      contactDetails,
      createdAt: new Date(),
      status: 'PENDING'
    };
  }

  static async sendNotification(notification) {
    // Simulate sending notification
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...notification,
          status: 'SENT',
          sentAt: new Date()
        });
      }, 1000);
    });
  }

  static getNotificationChannel(contactDetails) {
    if (contactDetails.email) return 'EMAIL';
    if (contactDetails.phone) return 'SMS';
    return 'APP_NOTIFICATION';
  }
} 