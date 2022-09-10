import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import {MyLocation, Geolocation} from "./";


const App = () =>{
    return(
    <>
    <Routes>
        <Route path='/' element={<MyLocation/>} />
        <Route path='/location' element={<Geolocation/>}/>
    </Routes>
        
    </>
)
}



export default App