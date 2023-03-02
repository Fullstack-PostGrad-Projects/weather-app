import React, { useState } from "react";
import Loading from "./Loading";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Homepage() {
  // function handleClick(){
  //     window.navigator.geolocation.getCurrentPosition(
  //     console.log,
  //     console.log
  //     );
  // }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.formBasicEmail.value);
    console.log(event.currentTarget.formBasicPassword.value);

    // console.log("I was clicked");
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} id="formLayout">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters,
            numbers, and at least one special character.
          </Form.Text>
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
        <Button variant="outline-primary" size="lg">
          Sign up
        </Button>
      </div>
    </Container>
  );
}

export default Homepage;
