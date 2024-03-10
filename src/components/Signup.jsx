import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import style from "./styles/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("");
  const navigate = useNavigate();
  const handleSignup = async (event) => {
    event.preventDefault();
    const reqBody = {user:{name, email, password}};
    const response = (await fetch('https://weather-app-be.vercel.app/signup',{method: 'POST', headers:{"Content-Type": 'application/json'}, body: JSON.stringify(reqBody)})).json();
    if (response.error) {
      alert(response.error)
    }
    else {
      Cookies.set('message', 'Registered successfully');
      navigate('/login');
    }

  };
  return (
    <>
      <Container
        className={`${style.Container} d-flex justify-content-center align-items-center`}
        >
        <Card className={`${style.Card} rounded`}>
          <Card.Body>
            <Card.Title className="text-center">Sign up</Card.Title>
            <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <center>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSignup}>
                  Submit
                </Button>
              </center>
            </Form>
            <center className="mt-2">
              <span>Already an account? <Link to='/login'>Login here</Link></span>
            </center>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Signup;
