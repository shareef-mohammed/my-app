import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
// import './Admin.css'
import { Container,Col,Row,Button, Form} from 'react-bootstrap';
export default function Signup() {
  const [name,setName] = useState('')
  
  
  const [password,setPassword] = useState('')
  const [admin,setAdmin] = useState()
  const navigate = useNavigate()
  useEffect(() =>{
    const loggedInAdmin = localStorage.getItem('admin');
    if(loggedInAdmin) {
        
	      
        const foundAdmin = loggedInAdmin;
        setAdmin(foundAdmin);
        navigate('/admin/dashboard')
        console.log("hi")
    } else {
      navigate('/admin/login')
    }
  },[])
  async function loginAdmin(event){
    event.preventDefault()
    const response = await fetch('http://localhost:8000/admin/dashboard', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),

    })
    const data = await response.json()

    if(data.admin){
      localStorage.setItem('admin',data.admin)
      navigate('/admin/dashboard')
  }
  if(!data.status){
      alert("Invalid Email or Password");
  }

    
   
  }

  
  return (
    <Container className='d-flex pt-5 w-100 h-100 justify-content-center'>
      <Row>
      <Col className='text-center'><h1>ADMIN LOGIN</h1></Col>
      <Form onSubmit={loginAdmin}>
        <Col className='text-light bg-danger border-rounded text-center'>
          <h5 id='error'></h5>
        </Col>
        <Form.Label className='label' for="name">Username</Form.Label>
        <br />
        <Form.Control 
        className='input'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
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
        <Button variant="outline-primary" style={{height:45}} size="lg" type='submit'>Login</Button>
        </Col>
        
      </Form>
      </Row>
    </Container>
  )
}

