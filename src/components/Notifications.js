import React from 'react';

const Notifications = ({ notifications }) => {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notifications-container">
      <h3>Notifications</h3>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.priority.toLowerCase()}`}
          >
            <div className="notification-header">
              <span className={`notification-type ${notification.type.toLowerCase()}`}>
                {notification.type.replace('_', ' ')}
              </span>
              <span className="notification-date">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="notification-message">
              {notification.message}
            </div>
            <div className="notification-status">
              Status: {notification.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications; 