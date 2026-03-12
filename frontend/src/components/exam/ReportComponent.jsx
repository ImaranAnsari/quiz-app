import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/report.css'
import {
    getReport,
    // getReportById 
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
            <div className="reportView">
                {report && report.map((item, index) => (
                    <div className="card reportCard" key={index}>
                        <div className="card-header">
                            User Report {index + 1}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{item.quizId} </li>
                            <li className="list-group-item">{item.total} </li>
                            <li className="list-group-item">{item.score}</li>
                            <button className='bton'>View More</button>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ReportComponent