import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function Loginpage({ onLogIn }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Username:', username);
    console.log('Password:', password);
  
    setUsername('');
    setPassword('');
  
    const userData = {
      username: username,
      // other user data
    };
  
    try {
      const response = await fetch("http://localhost:8000/signin", {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*",
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
        setIsLoggedIn(true);
        setUsername(username);
        onLogIn(true, username);
        console.log('User logged in:', username);
        navigate('/');
      } else {
        // Login failed
        console.log('Login failed:', data.error);
        setLoginError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      // Error occurred during the request
      console.log('Error:', error.message);
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div style={{ marginLeft: '100px', marginTop: '50px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: '40px', marginRight: '420px' }}>Username:</Form.Label>
          <br />
          <Form.Control
            value={username}
            type="name"
            onChange={handleUsernameChange}
            placeholder="Enter Username"
            style={{ width: '600px', height: '40px', marginTop: '10px', fontSize: '30px' }}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontSize: '40px', marginRight: '420px' }}>Password:</Form.Label>
          <br />
          <Form.Control
            value={password}
            type="password"
            onChange={handlePasswordChange}
            placeholder="Enter Password"
            style={{ width: '600px', height: '40px', marginTop: '10px', marginBottom: '20px', fontSize: '30px' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ marginRight: '420px' }}>
          <Form.Check type="checkbox" label="Check me out" style={{ marginBottom: '20px', fontSize: '30px' }} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ height: '40px', width: '120px', fontSize: '20px', marginTop: '20px' }}>
          Login
        </Button>
        <Button
          variant="primary"
          type="submit"
          href="/Register"
          style={{ height: '40px', width: '120px', fontSize: '20px', marginTop: '20px', marginLeft: '50px' }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}


