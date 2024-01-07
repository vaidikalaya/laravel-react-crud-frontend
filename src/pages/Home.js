import { useEffect, useState } from "react";
import http from "../http";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home(){
    const [users,setUsers]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        http.get('/users').then(res=>{
            if(res.data.code===200){
                setUsers(res.data.data);
                setLoading(false);
            }
        })
    }

    const deleteUser = (id,index) => {
        setLoading(true);
        http.delete('/delete-user/'+id).then(res=>{
            if(res.data.code===200){
                const tempUsers = Array.from(users)
                tempUsers.splice(index, 1)
                setUsers(tempUsers); 
                setLoading(false);
            }
        })
    }
    return (
        <>
            <Loader show={loading}/>
            <div className="card mt-5">
                <div className="card-header">
                    <h3>Users</h3>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user,index)=>
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={{pathname:"/edit/"+user.id}} className="btn btn-primary">
                                                Edit
                                            </Link>
                                            <Link to={{pathname:"/view/"+user.id}} className="btn btn-primary ms-2">
                                                View
                                            </Link>
                                            <button onClick={()=>{deleteUser(user.id,index)}} className="btn btn-danger ms-2">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}