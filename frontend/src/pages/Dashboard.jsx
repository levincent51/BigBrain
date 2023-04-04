import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = (props) => {
  const { token, setToken } = props;

  return (
    <div>
      <Navbar isLoggedin={true} token={token} setToken={setToken}></Navbar>
      THIS IS THE DASHBOARD
    </div>
  );
};

export default Dashboard;
