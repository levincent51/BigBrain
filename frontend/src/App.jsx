import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context, initialValues } from './context';
import Dashboard from './pages/Dashboard/Dashboard';
import Welcome from './pages/LoginPage/Welcome';
import LoginPage from './pages/LoginPage/LoginPage';
import Navbar from './components/Navbar/Navbar';
import EditGame from './pages/EditGame/EditGame';
import GamePage from './pages/Game/GamePage';
import EditGameQuestion from './pages/EditGame/EditGameQuestion';
import GameResultPage from './pages/Game/GameResultPage';
import JoinGame from './pages/JoinGame/JoinGame';

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
            <Route path="/game/play/:playerId" element={
              <GamePage/>
            } />
            <Route path="/game/join/:sessionId" element={
              <JoinGame/>
            } />
            <Route path="/game/result/:gameId/:sessionId" element={
              <GameResultPage/>
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
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
