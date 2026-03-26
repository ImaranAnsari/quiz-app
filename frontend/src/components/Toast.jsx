import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 3000, type = 'info' }) => {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    const icons = {
        success: '✅',
        error:   '❌',
        warning: '⚠️',
        info:    'ℹ️',
    };

    return (
        <div
            className="toast"
            role="alert"
            aria-live="polite"
            style={{
                borderLeft: `4px solid ${
                    type === 'success' ? 'var(--color-success)' :
                    type === 'error'   ? 'var(--color-danger)'  :
                    type === 'warning' ? 'var(--color-warning)' :
                    'var(--color-primary)'
                }`
            }}
        >
            <span style={{ marginRight: 8 }}>{icons[type]}</span>
            {message}
        </div>
    );
};

export default Toast;
