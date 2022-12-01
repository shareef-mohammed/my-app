import React,{useState} from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home'
import Admin from './components/Admin/Admin'
import Dashboard from './components/Dashboard/Dashboard';
import View from './components/View/View'
import Edit from './components/Edit/Edit'
import AddUser from './components/AddUser/AddUser'


import 'bootstrap/dist/css/bootstrap.min.css';

// import logo from './logo.svg';
import './App.css';
import {AuthContext} from './components/store/AuthContext'
function App() {
  const [user,setUser] = useState('')

  return(
    
    <AuthContext.Provider value={{user,setUser}}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<Admin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/view/:id' element={<View />} />
        <Route path='/admin/edit/:id' element={<Edit />} />
        <Route path='/admin/addUser' element={<AddUser />} />
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
