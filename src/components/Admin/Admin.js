import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
export default function Signup() {
  const [name,setName] = useState('')
  
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  async function loginAdmin(event){
    event.preventDefault()
    const response = await fetch('http://localhost:7000/admin/dashboard', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),

    })
    .then(res => res.json())
    .then(data => {
      if(data.status === 'blank'){
        
        document.getElementById('error').innerHTML = 'Invalid Inputs'
      }else if(data.status === 'ok') {
        navigate('/admin/dashboard')
      } else {
        document.getElementById('error').innerHTML = 'Wrong user name or password. Try again !!!'
      }
    })
    
    const data = await response.json()
    console.log(data)
  }

  
  return (
    <div className='container'>
      <h1 className='head'>ADMIN LOGIN</h1>
      <form onSubmit={loginAdmin}>
        <div className='err'>
          <h5 id='error'></h5>
        </div>
        <label className='label' for="name">Username</label>
        <br />
        <input 
        className='input'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
        />
        <br />
        
        <label className='label' for="name">Password</label>
        <br />
        <input 
        className='input'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        <br />
        <br />
        <div className='btn' >
        <button type='submit'>Login</button>
        </div>
        
      </form>
      
    </div>
  )
}

