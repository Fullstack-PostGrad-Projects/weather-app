import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { loginUser } from "../api";
import { storeToken, storeUserData } from "../auth";
import Toast from "react-bootstrap/Toast";
const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();
    console.log(event.currentTarget.floatingInputEmail.value);
    console.log(event.currentTarget.floatingInputPassword.value);
    const password = event.currentTarget.floatingInputPassword.value;
    const username = event.currentTarget.floatingInputEmail.value;
    const user = await loginUser(username, password);
    if (user) {
      storeToken(user.token);
      storeUserData(user.user);
    } else {
    }
    console.log("user should be", user);
    // console.log("I was clicked");
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
  };

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
        <Button variant="outline-primary" size="lg">
          Sign up
        </Button>
      </div>
    </Container>
  );
};

export default Login;
