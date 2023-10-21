import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("Not enough characters");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const passNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const passSpecialChar = [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    ":",
    ";",
    "<",
    ",",
    ">",
    ".",
    "?",
    "/",
  ];
  const navigate = useNavigate();
  const passwordNumChecker = (password) => {
    for (let num of passNumber) {
      if (password.includes(num)) {
        return true;
      }
    }
    return false;
  };
  const passwordCharChecker = (password) => {
    for (let char of passSpecialChar) {
      if (password.includes(char)) {
        return true;
      }
    }
    return false;
  };
  const modalErrorMessage = (passwordNumChecker, passwordCharChecker) => {
    if (!passwordCharChecker && !passwordNumChecker) {
      setModalMessage("Missing at least one number and special character");
      handleShow();
      return true;
    } else if (!passwordNumChecker) {
      setModalMessage("Missing at least one number");
      handleShow();

      return true;
    } else if (!passwordCharChecker) {
      setModalMessage("Missing at least one special character");
      handleShow();
      return true;
    }
  };
  const handlePassword = (event, password) => {
    if (password.length < 8) {
      setModalMessage("Must be at least 8 characters long");
      handleShow();
      event.currentTarget.formBasicPassword.value = "";
      return true;
    }
    const numCheck = passwordNumChecker(password);
    const charCheck = passwordCharChecker(password);
    if (modalErrorMessage(numCheck, charCheck)) {
      event.currentTarget.formBasicPassword.value = "";
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handlePassword(event, event.currentTarget.formBasicPassword.value);

    navigate("/comingsoon");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incorrect Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Form onSubmit={handleSubmit} id="formLayout">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />

            <Form.Text id="passwordHelpBlock" muted>
              Your password must contain a minimum of 8 characters and at least
              one number and special characters, numbers, and at least one
              special character.
            </Form.Text>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              // onClick={handleShow}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
