import React from "react";

const StatusMessage = ({
  icon = "!",
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="status-message">
      <div className="status-message__icon">
        {icon}
      </div>

      <h2>{title}</h2>

      {message && <p>{message}</p>}

      {actionLabel && onAction && (
        <button
          className="status-message__button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default StatusMessage;