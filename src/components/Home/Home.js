import React,{useContext,useEffect, useState} from 'react'
import { Container,Col,Navbar,Row,Button,Image,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
// import {useJwt} from 'react-jwt'


const Home = () => {
  const navigate = useNavigate();
  const [image,setImage] = useState()
  
  const {user,setUser} = useContext(AuthContext)
  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    fetch(`http://localhost:8000/api/userDetails/${token}`,{
      headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(res => res.json())  
    .then(data => {
      setUser(data.details)
      // console.log(user)
    })
  },[])
  // console.log(user)  
  function logout() {
    localStorage.clear();
    navigate('/login')
  }

  function uploadPhoto(e) {

    e.preventDefault();
    const id = user._id;
    // console.log(image)
    const file= image.name
    console.log(file)
    fetch(`http://localhost:8000/api/uploadImg/${id}` ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          file
      }),
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data.image)
    })
  }
  return (
    <Container className='w-100'>
      <Row>
      <Navbar>
      <Container>
        <Navbar.Brand href="#home"><h4>HOME PAGE</h4></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Button variant='outline-danger' onClick={logout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Col className="text-center "><Col className='w-100' text-center><h2>Welcome to the Home Page </h2></Col>
       
        
       <Col  className='w-25 m-auto mt-5 text-center'>
        <Col className='mt-4 mb-3'><h3>PROFILE</h3></Col>
         <Image roundedCircle src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7QbZ7Ps_hMspbECRCvLeT4GZC7h8HI2AIGrqbEKX&s"></Image>
         <Form onSubmit={uploadPhoto} encType='multipart/form-data' >
          <Form.Control 
              
              onChange={(e) => {
                setImage(e.target.files[0])
                
              }} name='image' className='mt-5'  type='file' multiple/>
          <Button type='submit' className='mt-3' variant='outline-info'>Upload</Button>
         </Form>
       </Col>
       <Form.Label className='pt-5'><h5>User Name: {user.name}</h5></Form.Label><br/>
       <Form.Label className=''><h5>User Email: {user.email}</h5></Form.Label><br/>
       <Form.Label className=''><h5>Password: {user.password}</h5></Form.Label>
       </Col>
       
      </Row>
    </Container>
  )
}

export default Home