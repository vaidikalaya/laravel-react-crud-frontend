import { useState } from "react"
import { useNavigate } from "react-router-dom";
import http from "../http";
import Loader from "../components/Loader";

export default function Create(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inputs,setInputs]=useState({});
    const handleInputs = (event) => {
        const name=event.target.name;
        const value=event.target.value;
        setInputs(values=>({...values,[name]:value}))
    }
    const submitForm = (event) => {
        event.preventDefault();
        setLoading(true);
        http.post('/save-user',inputs).then((res)=>{
            if(res.data.code===200){
                setLoading(false);
                navigate('/');
            }
        })
    }
    return (
        <>
            <Loader show={loading}/>
            <div className="d-flex justify-content-center">
                <div className="card mt-5 w-50">
                    <div className="card-header">
                        Create User
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" value={inputs.name || ''} onChange={handleInputs} autoComplete="username" className="form-control" id="name" placeholder="Enter Name"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" name="email" value={inputs.email || ''} onChange={handleInputs} autoComplete="new-email" className="form-control" id="email" placeholder="Enter Email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" value={inputs.password || ''} onChange={handleInputs} autoComplete="new-password" className="form-control" id="password" placeholder="Enter Password"/>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}