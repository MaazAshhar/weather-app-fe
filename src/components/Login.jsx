import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import style from "./styles/Login.module.css";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if(Cookies.get('error')){
        alert(Cookies.get('error'));
        Cookies.remove('error');
      } else if(Cookies.get('message')) {
        alert(Cookies.get('message'));
        Cookies.remove('message');
      }
    }, 500);
  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {user:{email, password}};
    fetch('https://weather-app-be.vercel.app/login',{method: 'POST', headers:{"Content-Type": 'application/json'}, body: JSON.stringify(reqBody)})
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        setEmail('');
        setPassword('');
        alert(response.error);
      }
      else {
        Cookies.set('jwt-token',response.token);
        navigate('/weather');
      }
    })
    .catch(err => console.log(err));
  };
  return (
    <>
      <Container
        className={`${style.Container} d-flex justify-content-center align-items-center`}
        >
        <Card className={`${style.Card} rounded`}>
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>
            <Form>
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
                  onClick={(e) => handleSubmit(e)}>
                  Submit
                </Button>
              </center>
            </Form>
            <center className="mt-2">
              <span>Not an account? <Link to='/signup'>Create Account</Link></span>
            </center>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
