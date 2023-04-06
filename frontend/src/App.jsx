import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context, initialValues } from './context';
import Dashboard from './pages/Dashboard/Dashboard';
import Welcome from './pages/LoginPage/Welcome';
import LoginPage from './pages/LoginPage/LoginPage';
import Navbar from './components/Navbar/Navbar';
import EditGame from './pages/EditGame/EditGame';

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
          <Route path='/' element={<Navbar isLoggedIn={!!token}/>}>
            <Route path='/' element={token ? <Dashboard/> : <Welcome/>}/>
            <Route path="/editgame/:id" element={
              <EditGame/>
            } />
            <Route path="/*" element={
              <>
                <div>NO MATCHING ROUTE</div>
                <button onClick={() => window.location.replace('/')}>Go back</button>
              </>
            } />
          </Route>
          <Route path="/login" element={
            <LoginPage/>
          } />
          <Route path="/register" element={
            <LoginPage/>
          } />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
