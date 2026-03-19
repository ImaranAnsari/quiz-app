import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/report.css'
import {
    getReport,
} from '../../api/Exam';

const ReportComponent = () => {
    const [report, setReport] = useState();
    const [flag] = useState();
    const getAllReport = async () => {
        try {
            let reportData = await getReport();
            setReport(reportData.data.data);
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        getAllReport()
    }, [flag]);

    return (
        <>
            <h1 style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 'var(--space-xl) 0',
            }}>📊 Reports</h1>
            <div className="reportView">
                {report && report.map((item, index) => (
                    <div className="card reportCard" key={index}>
                        <div className="card-header">
                            📋 Report {index + 1}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quiz ID</span>
                                <div style={{ fontWeight: 600, marginTop: '4px' }}>{item.quizId}</div>
                            </li>
                            <li className="list-group-item">
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Questions</span>
                                <div style={{ fontWeight: 600, marginTop: '4px' }}>{item.total}</div>
                            </li>
                            <li className="list-group-item">
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score</span>
                                <div style={{ fontWeight: 700, marginTop: '4px', color: 'var(--accent-green)', fontSize: '1.25rem' }}>{item.score}</div>
                            </li>
                            <li className="list-group-item" style={{ borderBottom: 'none' }}>
                                <button className='bton' style={{ width: '100%', marginTop: 'var(--space-sm)' }}>View More</button>
                            </li>
                        </ul>
                    </div>
                ))}
                {(!report || report.length === 0) && (
                    <div style={{
                        textAlign: 'center',
                        padding: 'var(--space-3xl)',
                        color: 'var(--text-muted)',
                        width: '100%'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>📭</div>
                        <p>No reports found yet. Take an exam to see your results here!</p>
                    </div>
                )}
            </div>
        </>
    )
}
export default ReportComponent