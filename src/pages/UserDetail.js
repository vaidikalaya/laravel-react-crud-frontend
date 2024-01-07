import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import http from "../http";
import Loader from "../components/Loader";

export default function UserDetail(props){
    const [loading, setLoading] = useState(true);
    const {id}=useParams()
    const [user,setUser]=useState({});
    
    useEffect(()=>{
        fetchUser();
    },[]);

    const fetchUser = () => {
        http.get('/user/'+id).then((res)=>{
            if(res.data.code===200){
                setUser(res.data.data);
                setLoading(false);
            }
        })
    }
    
    return (
        <>
            <Loader show={loading}/>
            <div className="d-flex justify-content-center">
                <div className="card mt-5 w-50">
                    <div className="card-header">
                        User Detail
                    </div>
                    <div className="card-body">
                        <h6>Name: {user.name}</h6>
                        <h6>Email: {user.email}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}