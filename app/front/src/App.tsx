import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/StartingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
