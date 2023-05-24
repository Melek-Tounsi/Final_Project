
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function Registerpage({onLogIn}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Perform form submission logic
    // You can access the form input values from the state variables (username, email, password)
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form input values
    setUsername('');
    setEmail('');
    setPassword('');

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Registration successful
        console.log('User registered:', username);
        handleSignIn(username);

        navigate('/');
      } else {
        // Registration failed
        console.log('Registration failed:', data.error);
      }
    } catch (error) {
      // Error occurred during the request
      console.log('Error:', error.message);
    }
  };
  
  
  const handleSignIn = async (username) => {
    try {
      // Send a POST request to the backend API with username and password
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Login successful
        console.log('User logged in:', username);
        onLogIn(true, username);
        // Redirect to another page or update state, etc.
      } else {
        // Login failed
        console.log('Login failed:', data.error);
        // Perform actions for failed login
      }
    } catch (error) {
      // Error occurred during the request
      console.log('Error:', error.message);
      // Perform error handling
    }
  };

  return (
    <div style={{ marginLeft: '100px', marginTop: '50px' }}>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: '40px', marginRight: '420px' }}>Username:</Form.Label>
          <br />
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            style={{ width: '600px', height: '40px', marginTop: '10px', marginBottom: '20px', fontSize: '30px' }}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: '40px', marginRight: '400px' }}>Email address:</Form.Label>
          <br />
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            style={{ width: '600px', height: '40px', marginTop: '10px', marginBottom: '20px', fontSize: '30px' }}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontSize: '40px', marginRight: '420px' }}>Password:</Form.Label>
          <br />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            style={{ width: '600px', height: '40px', marginTop: '10px', marginBottom: '20px', fontSize: '30px' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ height: '40px', width: '240px', fontSize: '20px', marginTop: '20px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

