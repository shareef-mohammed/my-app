import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Container,Col,Row,Button, Form } from 'react-bootstrap';
// import './AddUser.css'
export default function AddUser() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [password2,setPassword2] = useState('')
  const navigate = useNavigate()
  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:8000/api/register', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password2
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
    <Container className='d-flex pt-5 w-100 h-100 justify-content-center'>
      <Row className='w-50 '>
      <Col className='text-center'><h1>ADD USER</h1></Col>
      <Form className='' onSubmit={registerUser} >
        <Col className='text-light bg-danger border-rounded text-center'>
          <h5 id='error' ></h5>
        </Col>
        <Form.Label className='label' for="name">Username</Form.Label>
        <br />
        <Form.Control 
        className='input'
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
        />
        <br />
        <Form.Label className='label' for="name">Email</Form.Label>
        <br />
        <Form.Control  
        className='input'
        type="email"
        value={email}
        required
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
        required
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        <br />
        <Form.Label className='label' for="name">Re-enter Password</Form.Label>
        <br />
        <Form.Control  
        className='input'
        type="password"
        value={password2}
        required
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Password"
        />
        <br />
        <br />
        <Col className='text-center ' >
        <Button variant="outline-info" style={{height:45}} size="lg" type='submit'>Register</Button>
        </Col>
        
      </Form>
      <Col className='text-center pt-3'>
      <Button variant="outline-secondary" style={{height:40}} onClick={backward}>Dashboard</Button>
      </Col>
      </Row>
    </Container>
      
      
    
  )
}

