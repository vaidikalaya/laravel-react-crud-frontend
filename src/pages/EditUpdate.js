import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";
import Loader from "../components/Loader";

export default function EditUpdate(props){
    const {id}=useParams()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [inputs,setInputs]=useState({});
    
    useEffect(()=>{
        fetchUser();
    },[]);

    const fetchUser = () => {
        http.get('/user/'+id).then((res)=>{
            if(res.data.code===200){
                setInputs({
                    name:res.data.data.name,
                    email:res.data.data.email,
                })
                setLoading(false);
            }
        })
    }
    
    const handleInputs = (event) => {
        const name=event.target.name;
        const value=event.target.value;
        setInputs(values=>({...values,[name]:value}))
    }

    const submitForm = (event) => {
        event.preventDefault();
        setLoading(true);
        http.patch('/update-user/'+id,inputs).then((res)=>{
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
                        Edit User
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" value={inputs.name || ''} onChange={handleInputs} className="form-control" autoComplete="username" id="name" placeholder="Enter Name"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" name="email" value={inputs.email || ''} onChange={handleInputs} className="form-control" autoComplete="email" id="email" placeholder="Enter Email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" value={inputs.password || ''} onChange={handleInputs} className="form-control" autoComplete="password" id="password" placeholder="Enter Password"/>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}