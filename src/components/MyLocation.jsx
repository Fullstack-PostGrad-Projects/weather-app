import React from 'react'

function MyLocation({button, setButton}) {

    function handleClick(){
        window.navigator.geolocation.getCurrentPosition(
        console.log,
        console.log
        );
    }


  return (
    <>
    <button onClick={handleClick()}>My Location</button>
    {/* <button id='bigButton' onClick={setButton(button + 1)}>This is the current value of the button! {button}</button> */}

    </>
  )
}

export default MyLocation