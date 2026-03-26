import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../css/global.css';

const SubmitExamMessage = () => {
    const navigate = useNavigate();
    return (
        <div className="submit-success-page">
            <div className="submit-success-card">
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)', lineHeight: 1 }}>🎉</div>

                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    background: 'var(--gradient-success)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: 'var(--space-md)',
                }}>
                    Exam Submitted!
                </h2>

                <p style={{ marginBottom: 'var(--space-2xl)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    You have successfully submitted your exam. Great job! 🚀<br />
                    Check your results in the Reports section.
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        id="go-dashboard-btn"
                        className="btn"
                        onClick={() => navigate("/dashboard")}
                        style={{ minWidth: 140 }}
                    >
                        🏠 Dashboard
                    </button>
                    <button
                        id="view-report-btn"
                        className="btn btn--outline"
                        onClick={() => navigate("/dashboard/report")}
                        style={{ minWidth: 140 }}
                    >
                        📊 View Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmitExamMessage;
