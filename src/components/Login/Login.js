import React, {useEffect, useState ,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
// import axios from 'axios'
// import {useJwt} from 'react-jwt'

// import Home from '../Home/Home'
// import './Login.css'
import { Container,Col,Row,Button, Form} from 'react-bootstrap';
import {AuthContext} from '../store/AuthContext'
function Login() {
 

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const [user,setUser] = useState()
  const {user,setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() =>{
    const loggedInUser = localStorage.getItem('token');
    if(loggedInUser) {
        
	      
        const foundUser = loggedInUser;
        setUser(foundUser);
        navigate('/')
        console.log("hi")
    } else {
      navigate('/login')
    }
  },[])
  
  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    const data = await response.json()

    if(data.user){
        localStorage.setItem('token',data.user)
        navigate('/')
    }
    if(!data.status){
        alert("Invalid Email or Password");
    }
  }
  

  const redirect = () => {
    navigate('/Signup')
  }
  return (
    <Container className='d-flex pt-5 w-100 h-100 justify-content-center'>
      <Row>
      <Col className='text-center'><h1 className='head'>Login</h1></Col>
      <Form onSubmit={loginUser}>
        <Col className='bg-danger text-light border-rounded text-center'>
        <h5 id='error'></h5>
        </Col>
        
        <Form.Label className='label' for="name">Email</Form.Label>
        <br />
        <Form.Control 
        className='input'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
        <br />
        <Form.Label className='label' for="name">Password</Form.Label>
        <br />
        <Form.Control  
        className='input'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        <br />
        <br />
        <Col className='text-center ' >
          <Button variant="outline-primary" style={{height:40}} size="lg" type='submit'>Login</Button>
        </Col>
      </Form>
      <Col className='text-center pt-3' >
        <p>Don't have an account..?</p>
        <Button variant="outline-secondary" style={{height:40}} type='button' onClick={redirect} >Signup</Button>
      </Col>
      </Row>
    </Container>
  )
  
}

export default Login