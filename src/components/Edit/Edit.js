import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container,Col,Row,Button, Form } from 'react-bootstrap';

const Edit = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')


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
          
        })
    },[])
    function editUser() {
        fetch(`http://localhost:8000/admin/update/${id}` ,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
               
              }),
        })
        .then(res => res.json())
        .then(data => {
            
            setName(data.user.name)
            setEmail(data.user.email)
           
            

        })
    }
    function backward (){
        navigate('/admin/dashboard')
    }
  return (
    <Container className='d-flex pt-5 w-100 h-100 justify-content-center'>
        <Row className='w-50'>
        <Col className='text-center'><h3>Edit User</h3></Col>
      <Form>
        <Form.Label className='label' for="name">Username</Form.Label>
        <br />
        <Form.Control
        className='input'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="username"
        />
        <br />
        <Form.Label className='label' for="name">Email</Form.Label>
        <br />
        <Form.Control
        className='input'
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        />
        
        <br />
        <Col className='text-center'>
        <Button variant="outline-info" onClick={editUser}>Edit</Button>
        </Col>
      </Form>
      <Col className='text-center pt-4'>
      <Button variant="outline-secondary" onClick={backward}>Dashboard</Button>
      </Col>
    </Row>
    </Container>
  )
}

export default Edit