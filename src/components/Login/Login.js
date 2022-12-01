import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'

function Login() {
 

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:7000/api/login', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        
        email,
        password,
      }),

    })
    .then(res => res.json())
    .then(data => {
      
      if(data.user){
        navigate('/')
      } else {
        document.getElementById('error').innerHTML = 'Invalid input'
      }
    })
    
  }

  const redirect = () => {
    navigate('/Signup')
  }
  return (
    <div className='container1'>
      <h1 className='head'>Login</h1>
      <form onSubmit={loginUser}>
        <div className='err'>
        <h5 id='error'></h5>
        </div>
        
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
        <br />
        <div className='btn'>
          <button type='submit'>Login</button>
        </div>
      </form>
      <div className='btn' >
        <p>Don't have an account..?</p>
        <button type='button' onClick={redirect} >Signup</button>
      </div>
    </div>
  )
  
}

export default Login