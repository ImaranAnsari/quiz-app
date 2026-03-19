import { useNavigate } from "react-router-dom"

const SubmitExamMessage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 'var(--space-xl)'
            }}>
                <div style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-3xl)',
                    textAlign: 'center',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: 'var(--shadow-lg)',
                    animation: 'fadeInUp 0.5s ease-out'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>🎉</div>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #34d399, #059669)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: 'var(--space-md)',
                    }}>Exam Submitted!</h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        marginBottom: 'var(--space-2xl)',
                        lineHeight: 1.6
                    }}>
                        You have submitted your exam successfully. Great job!
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="bton" onClick={() => navigate("/dashboard")}>
                            🏠 Dashboard
                        </button>
                        <button className="bton" onClick={() => navigate("/dashboard/report")} style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid var(--border-glass-hover)'
                        }}>
                            📊 View Report
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SubmitExamMessage
