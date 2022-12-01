import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container,Col,Row,Button } from 'react-bootstrap';

const View = () => {
    const [user,setUser] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`http://localhost:8000/admin/view/${id}`, {
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
    <Container className='text-center pt-5'>
        <Row>
        <h3 style={{color:'pink'}}>USER DETAILS</h3>
        <h5>USER NAME:</h5>
        <h5>{user.name}</h5>
        <h5>USER EMAIL:</h5>
        <h5>{user.email}</h5>
        {/* <h5>USER PASSWORD:</h5> */}
        {/* <h5>{user.password}</h5> */}
        <Col><Button variant='outline-secondary' onClick={backward}>Dashboard</Button></Col>
        </Row>
    </Container>
  )
}

export default View