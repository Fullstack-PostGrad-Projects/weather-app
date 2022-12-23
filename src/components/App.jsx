import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import {MyLocation, Geolocation, Homepage} from "./";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
    const [button, setButton] = useState(0)
    
    return(
    <>
    <Routes>
        <Route path='/' element={<Homepage button={button} setButton={setButton}/>} />
        <Route path='/location' element={<Geolocation button={button} setButton={setButton}/>}/>
    </Routes>
        
    </>
)
}



export default App