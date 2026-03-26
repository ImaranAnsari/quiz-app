import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Chart = ({ data, title, color = '#6366f1' }) => (
    <div className="chart-container" style={{ minHeight: 240 }}>
        <h3 style={{ marginBottom: 16 }}>{title}</h3>
        {Array.isArray(data) && data.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        ) : (
            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>No data to display</div>
        )}
    </div>
);

export default Chart;
