import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import {MyLocation, Geolocation, Homepage, Header, WrongPage, Register, CityProfile, Profile, ComingSoon} from "./";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

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
        <Route path='/cityprofile/' element={<CityProfile />} />
        <Route path='/cityprofile/:city' element={<CityProfile />} />
        <Route path='/comingsoon' element={<ComingSoon/>}/>
        <Route path='/profile' element={<Profile />} />



        </Route>
      <Route path="*" element={<WrongPage />} />

    </Routes>
        
    </>
)
}



export default App