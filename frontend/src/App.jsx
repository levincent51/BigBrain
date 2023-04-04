import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context, initialValues } from './context';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import LoginPage from './pages/LoginPage';

function App () {
  const [token, setToken] = useState(initialValues.token);
  const getters = {
    token
  };
  const setters = {
    setToken
  }

  return (
    <Context.Provider value={{ getters, setters, }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={token ? <Dashboard/> : <Welcome/>}/>
          <Route path="/login" element={
            <LoginPage setToken={setToken}/>
          } />
          <Route path="/register" element={
            <LoginPage setToken={setToken}/>
          } />
          <Route path="/*" element={
            <>
              <div>NO MATCHING ROUTE</div>
              <button onClick={() => window.location.replace('/')}>Go back</button>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
