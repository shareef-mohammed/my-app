import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const View = () => {
    const [user,setUser] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`http://localhost:7000/admin/view/${id}`, {
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.user)
            setUser(data.user)
        })
    },[])
    function backward() {
        navigate('/admin/dashboard')
    }
  return (
    <div>
        <h3>User Details</h3>
        <h4>User Name:</h4>
        <h5>{user.name}</h5>
        <h4>User Email:</h4>
        <h5>{user.email}</h5>
        <h4>User Password:</h4>
        <h5>{user.password}</h5>
        <button onClick={backward}>Dashboard</button>
    </div>
  )
}

export default View