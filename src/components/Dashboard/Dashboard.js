import React, { useEffect, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
import { Container,Col,Navbar,Row,Button, Table} from 'react-bootstrap';


const Dashboard = () => {
    const [users,setUsers] = useState([])
    useEffect(() => {
      const admin = localStorage.getItem("admin");
        fetch('http://localhost:8000/admin/dashboard' , {
            headers: {
                'Content-Type' : 'application/json',
                "X-Custom-Header": `${admin}`,
              },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.users)
            
            if (data.errormsg) {
              navigate("/admin/login");

            }
            setUsers(data.users)
        })
    },[])    
   
    const navigate = useNavigate()

    function deleteUser(id) {
      alert('Do you want delete this user...?')

        fetch(`http://localhost:8000/admin/remove/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type' : 'application/json',
              },
        })
        .then(res => res.json())
        .then(data => {
            window.location.reload()
        })
    }
   function logout() {
    localStorage.clear();
    navigate('/admin/login')
   }

  return (
    <Container className='text-center'>
        <Row>
        <Navbar>
      <Container>
        <Navbar.Brand href="#home"><h4>DASHBOARD</h4></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Button variant='outline-danger' onClick={logout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        {/* <div className="nav">
            <h4>Admin Dashboard</h4>
            <Col className='btndiv'><Button className='btn' onClick={logout}>Logout</Button></Col>
        </div> */}
        <Col className='text-start pb-3'><Link to={'/admin/addUser'}><Button variant='outline-primary'>Add User</Button></Link></Col>
        <Table>
            <thead>
                <th>SI.No</th>
                <th>User Name</th> 
                <th>Email Id</th>
                
                <th>Acitons</th>
            </thead>
            <tbody>
            {   
                
              
                 users.map(user=>{
                  
                   return  <tr>
                   <td>{}</td>
                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   
                   <td>
                    <Col className='d-flex'>
                   <Col className=''><Link  to={`/admin/view/${user._id}`}><Button className='' variant='outline-info'>View</Button></Link></Col>
                   <Col className=''><Link to={`/admin/edit/${user._id}`}><Button className='' variant='outline-warning'>Edit</Button></Link></Col>
                   <Col className=''><Button className='' variant='outline-danger' onClick={()=>deleteUser(user._id)}>Delete</Button></Col>
                   </Col>
                   </td>
               </tr>
              
                })
              
            }

            </tbody>
        </Table>
        </Row>
    </Container>
  )
}

export default Dashboard