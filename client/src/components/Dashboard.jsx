import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DashboardHeader = styled.header`
  margin-bottom: 30px;
  text-align: center;
  h1 {
    color: #333;
    font-size: 2rem;
  }
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const DashboardCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 1.5rem;
    color: #007bff;
  }

  p {
    color: #555;
    font-size: 1rem;
    margin: 8px 0;
  }
`;

const ActionButton = styled.button`
  margin: 5px;
  padding: 10px 18px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Welcome, {user?.displayName || user?.email || 'User'}</h1>
      </DashboardHeader>

      <DashboardContent>
        <DashboardCard>
          <h2>Profile Information</h2>
          <p>Email: {user?.email || 'Not Available'}</p>
          <p>Last Login: {user?.metadata?.lastSignInTime || 'Not Available'}</p>
        </DashboardCard>

        <DashboardCard>
          <h2>Quick Actions</h2>
          <ActionButton>Edit Profile</ActionButton>
          <ActionButton>View Settings</ActionButton>
        </DashboardCard>
      </DashboardContent>
    </DashboardContainer>
  );
}

export default Dashboard;
  