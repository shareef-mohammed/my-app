import React, { useEffect, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const [users,setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:7000/admin/dashboard' , {
            headers: {
                'Content-Type' : 'application/json',
              },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.users)
            setUsers(data.users)
        })
    },[])    
    let i=1;
    const navigate = useNavigate()

    function deleteUser(id) {

        fetch(`http://localhost:7000/admin/remove/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type' : 'application/json',
              },
        })
        .then(res => res.json())
        .then(data => {
            window.location.reload()
        })
    }
   function logout() {
    navigate('/admin/login')
   }

  return (
    <div className='container3'>
        <div className="nav">
            <h4>Admin Dashboard</h4>
            <div className='btndiv'><button className='btn' onClick={logout}>Logout</button></div>
        </div>
        <Link to={'/admin/addUser'}><button >Add User</button></Link>
        <table>
            <thead>
                <th>SI.No</th>
                <th>User Name</th> 
                <th>Email Id</th>
                <th>Password</th>
                <th>Acitons</th>
            </thead>
            <tbody>
            {   
                
              
                 users.map(user=>{
                   return  <tr>
                   <td>{i}</td>
                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   <td>{user.password}</td>
                   <td>
                   <Link to={`/admin/view/${user._id}`}><button>View</button></Link>
                   <Link to={`/admin/edit/${user._id}`}><button>Edit</button></Link>
                   <button onClick={()=>deleteUser(user._id)}>Delete</button>
                    
                   </td>
               </tr>
              
                })
              
            }

            </tbody>
        </table>
    </div>
  )
}

export default Dashboard