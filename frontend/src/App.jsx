import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context, initialValues } from './context';
import Dashboard from './pages/Dashboard/Dashboard';
import Welcome from './pages/LoginPage/Welcome';
import LoginPage from './pages/LoginPage/LoginPage';
import Navbar from './components/Navbar/Navbar';
import EditGame from './pages/EditGame/EditGame';
import GamePage from './pages/Game/gamePage';
import EditGameQuestion from './pages/EditGame/EditGameQuestion';

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
            <Route path="/editgame/:gameId" element={
              <EditGame/>
            } />
            <Route path="/editgame/:gameId/:questionId" element={
              <EditGameQuestion/>
            } />
            <Route path="/*" element={
              <>
                <div>NO MATCHING ROUTE</div>
                <button onClick={() => window.location.replace('/')}>Go back</button>
              </>
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
          <Route path="/game/:gameId" element={
            <GamePage/>
          } />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
