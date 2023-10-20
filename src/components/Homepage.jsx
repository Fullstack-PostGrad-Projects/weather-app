import React, { useState } from "react";
import Loading from "./Loading";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";


function Homepage() {
  // function handleClick(){
  //     window.navigator.geolocation.getCurrentPosition(
  //     console.log,
  //     console.log
  //     );
  // }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.floatingInputEmail.value);
    console.log(event.currentTarget.floatingInputPassword.value);

    // console.log("I was clicked");
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
  };
  const handleOnClick = () =>{

  }

  return (
    <Container>
        <Form onSubmit={handleSubmit} id="formLayout">
          <Form.Group className="mb-3" controlId="formBasicText">
            <FloatingLabel
              controlId="floatingInputEmail"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Enter username" required />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInputPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" placeholder="Password" required />
            </FloatingLabel>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Log in
            </Button>
          </div>
        </Form>
        <div className="loginSignUpSeparator">
          <span>or</span>
        </div>
        <div className="d-grid gap-2">
          <Button variant="outline-primary" size="lg"  onClick={handleOnClick}>
          <Link to='/register' className="signuplink"> Sign up</Link>
          </Button>
        </div>
      </Container>
  );
}

export default Homepage;
