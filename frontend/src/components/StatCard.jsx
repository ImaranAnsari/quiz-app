import React from 'react';

const StatCard = ({ icon, label, value, color }) => (
    <div
        className="stat-card"
        style={color ? { borderTop: `3px solid ${color}` } : {}}
    >
        <div className="stat-card__label">
            {icon && (
                <span style={{ color, fontSize: '1.1rem' }}>{icon}</span>
            )}
            {label}
        </div>
        <div className="stat-card__value" style={color ? { color } : {}}>
            {value ?? '—'}
        </div>
    </div>
);

export default StatCard;
