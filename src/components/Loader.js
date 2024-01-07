export default function Loader({show}){
    return (
        <>
        {show && <div className="d-flex position-absolute top-25 left-25 justify-content-center align-items-center z-3 bg-white" style={{width:"86%",height:"80%",opacity:"0.8"}}>
            <div className="spinner-border" role="status" style={{width: "5rem",height:"5rem"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        }
        </>
    )
};