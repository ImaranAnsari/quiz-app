import { useNavigate } from "react-router-dom"
const SubmitExamMessage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <p className="card-text">You have submitted your exam successfully</p>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/dashboard")}>Home</button>
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/submit-exam")}>Report</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SubmitExamMessage
