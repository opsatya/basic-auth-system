import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import Login component
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import Routes, Route, Link, and useNavigate
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
`;

const FormContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 1.5rem;
`;

const Divider = styled.div`
  margin: 1.5rem 0;
  text-align: center;
  color: #aaa;
  font-size: 14px;
`;

const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

// Define NavLink as a styled component
const NavLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin: 0 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Decode the Google credential response
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log('Google Login Success:', decodedToken);
  
      // Send user data to backend
      const response = await axios.post('http://localhost:5000/api/users/google-login', {
        email: decodedToken.email,
        name: decodedToken.name,
        profilePicture: decodedToken.picture,
      });
  
      // Save token and redirect user
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Google login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      alert('Google login failed. Please try again.');
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
  };

  return (
    <Routes>
      <Route path="/" element={
        <Container>
          <FormContainer>
            <Title>Welcome to the MERN Auth App</Title>
            <p>
              <NavLink to="/register">Register</NavLink> |{' '}
              <NavLink to="/login">Login</NavLink>
            </p>
            <Divider>OR</Divider>
            <GoogleButton>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </GoogleButton>
          </FormContainer>
        </Container>
      } />
      <Route path="/register" element={
        <Container>
          <Register />
        </Container>
      } />
      <Route path="/login" element={
        <Container>
          <Login />
        </Container>
      } />
    </Routes>
  );
}

export default App;
