import React, { useEffect, useState } from 'react';
import '../../css/global.css';
import { getReport } from '../../api/Exam';
import ThemeToggle from '../ThemeToggle';
import { BarChart2 } from 'lucide-react';

const ReportComponent = () => {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllReport = async () => {
        setLoading(true);
        try {
            let reportData = await getReport();
            setReport(reportData.data.data || []);
        } catch (error) {
            console.log('error', error);
            setReport([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getAllReport(); }, []);

    return (
        <div className="main">
            <div className="topbar">
                <h2>My Results</h2>
                <ThemeToggle />
            </div>

            {loading ? (
                <div className="reportView">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="card" style={{ overflow: 'hidden' }}>
                            <div className="card-header">
                                <div className="skeleton" style={{ height: 16, width: '60%' }} />
                            </div>
                            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div className="skeleton" style={{ height: 14, width: '80%' }} />
                                <div className="skeleton" style={{ height: 14, width: '60%' }} />
                                <div className="skeleton" style={{ height: 14, width: '40%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : !report || report.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state__icon">📭</div>
                    <p>No results yet. Take an exam to see your results here!</p>
                </div>
            ) : (
                <div className="reportView">
                    {report.map((item, index) => {
                        const percentage = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
                        const color = percentage >= 70 ? 'var(--color-success)' : percentage >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';
                        return (
                            <div className="card reportCard" key={index} id={`report-card-${index}`}>
                                <div className="card-header">
                                    <BarChart2 size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    Report #{index + 1}
                                </div>
                                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                    <div style={{ textAlign: 'center', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-sm)' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color, lineHeight: 1 }}>{percentage}%</div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: 4 }}>
                                            {item.score} / {item.total} correct
                                        </div>
                                    </div>
                                    <div className="quiz-card__progress" style={{ height: 8, marginBottom: 'var(--space-sm)' }}>
                                        <div className="quiz-card__progress-bar" style={{ width: `${percentage}%`, background: color }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.825rem', fontWeight: 600 }}>Total Questions</span>
                                            <span style={{ fontWeight: 700 }}>{item.total}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.825rem', fontWeight: 600 }}>Score</span>
                                            <span style={{ fontWeight: 700, color }}>{item.score}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ReportComponent;