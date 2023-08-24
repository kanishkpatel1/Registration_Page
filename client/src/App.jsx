import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login  from './login'
import Home from './Home'
import Dashboard from './Dashboard'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
function App() {
  return (
      <div>
       <BrowserRouter>
       <Routes>
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
       </Routes>
       </BrowserRouter>
      </div>
    
  )
}

export default App
