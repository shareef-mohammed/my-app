import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:7000/admin/edit/${id}`, {
            headers: {
                'Content-Type' : 'application/json',
            },
            
        })
        .then(res => res.json())
        .then(data => {
            
            setName(data.user.name)
            setEmail(data.user.email)
            setPassword(data.user.password)
        })
    },[])
    function editUser() {
        fetch(`http://localhost:7000/admin/update/${id}` ,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
              }),
        })
        .then(res => res.json())
        .then(data => {
            
            setName(data.user.name)
            setEmail(data.user.email)
            setPassword(data.user.password)
            

        })
    }
    function backward (){
        navigate('/admin/dashboard')
    }
  return (
    <div>
        <h3>Edit User</h3>
      <form>
        <input
        className='input'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="username"
        />
        <br />
        <input
        className='input'
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        />
        <br />
        <input
        className='input'
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        />
        <br />
        <button onClick={editUser}>Edit</button>
      </form>
      <button onClick={backward}>Dashboard</button>
    </div>
  )
}

export default Edit