import React,{useContext,useEffect, useState} from 'react'
import { Container,Col,Navbar,Row,Button,Image,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
// import {useJwt} from 'react-jwt'


const Home = () => {
  const navigate = useNavigate();
  const [image,setImage] = useState("")
  
  
  const {user,setUser} = useContext(AuthContext)
  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    fetch(`http://localhost:8000/api/userDetails/${token}`,{
      headers: {
        'Content-Type': 'application/json',
        "X-Custom-Header": `${token}`,
    },
    })
    .then(res => res.json())  
    .then(data => {
      if (data.errormsg) {
        navigate("/login");

      }
      setUser(data.details)
      // console.log(user)
    })
  },[user])
  // console.log(user)  
  function logout() {
    localStorage.clear();
    navigate('/login')
  }

  const uploadImage = () => {
    const data = new FormData()
    data.append('file',image)
    data.append("upload_preset",'sxbx2ye4')
    data.append("cloud_name",'dnqylncvu')

    fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload",
    {
      method:'post',
      body:data
    })
    .then(res => res.json())
    .then(data => {
      const id = user._id;
      const url = data.url
      fetch(`http://localhost:8000/api/uploadImg/${id}` ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          url
      }),
    })
    .then(res => res.json())
    .then(data => {
      setUser(data.profile)
    })
      
    })
    .catch(err => console.log(err))
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
        {user.image ? 
         <Image className='w-75 h-75' roundedCircle src={user.image} />: <h5 style={{color:'red'}}>Add your profile !!</h5>
        }
          <Form.Control 
              
              onChange={(e) => {
                setImage(e.target.files[0])
                
              }}  className='mt-5'  type='file' />
          <Button type='button' onClick={uploadImage} className='mt-3' variant='outline-info'>Upload</Button>
         
       </Col>
       <Form.Label className='pt-5'><h5>User Name: {user.name}</h5></Form.Label><br/>
       <Form.Label className=''><h5>User Email: {user.email}</h5></Form.Label><br/>
       {/* <Form.Label className=''><h5>Password: {user.password}</h5></Form.Label> */}
       </Col>
       
      </Row>
    </Container>
  )
}

export default Home