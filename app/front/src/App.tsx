import React from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/StartingPage';
import LoginPage from './pages/LoginPage';
import CalendarView from './modules/CalendarView/CalendarView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/calendar' element={<CalendarView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
