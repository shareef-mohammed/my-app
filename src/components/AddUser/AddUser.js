import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './AddUser.css'
export default function Signup() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [password2,setPassword2] = useState('')
  const navigate = useNavigate()
  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:7000/api/register', {
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
      if(data.status === 'blank'){
        
        document.getElementById('error').innerHTML = 'Invalid Inputs'
      }else if(data.status === 'ok') {
        navigate('/admin/dashboard')
      } else {
        document.getElementById('error').innerHTML = 'User already exists !!!'
      }
    })
    
    const data = await response.json()
    console.log(data)
  }

  function backward (){
    navigate('/admin/dashboard')
}
  return (
    <div className='container'>
      <h1 className='head'>REGISTER</h1>
      <form onSubmit={registerUser}>
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
        <label className='label' for="name">Email</label>
        <br />
        <input 
        className='input'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
        <label className='label' for="name">Re-enter Password</label>
        <br />
        <input 
        className='input'
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Password"
        />
        <br />
        <br />
        <div className='btn' >
        <button type='submit'>Register</button>
        </div>
        
      </form>
      <button onClick={backward}>Dashboard</button>
      
    </div>
  )
}

