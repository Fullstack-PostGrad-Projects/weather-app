import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import {MyLocation, Geolocation, Homepage, Header, WrongPage, Register} from "./";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
    const [button, setButton] = useState(0)
    
    return(
    <>
    <Routes>
        <Route exact path='/' element={<Header />}>
        <Route index element={<Geolocation button={button} setButton={setButton}/>}/>
        <Route path='/login' element={<Homepage />} />
        <Route path='/register' element={<Register />} />

        </Route>
      <Route path="*" element={<WrongPage />} />

    </Routes>
        
    </>
)
}



export default App