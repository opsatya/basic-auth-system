import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  margin: 0.5rem;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <h1>Welcome to the MERN Auth App</h1>
      <Button onClick={() => navigate('/register')}>Register</Button>
      <Button onClick={() => navigate('/login')}>Login</Button>
    </HomeContainer>
  );
};

export default Home;