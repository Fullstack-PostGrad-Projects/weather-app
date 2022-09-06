import React from 'react'

function MyLocation() {

    function handleClick(){
        window.navigator.geolocation.getCurrentPosition(
        console.log,
        console.log
        );
    }


  return (
    <button onClick={handleClick()}>My Location</button>
  )
}

export default MyLocation