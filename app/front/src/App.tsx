import React from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

import StartingPage from './pages/StartingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CalendarView from './modules/CalendarView/CalendarView';
import EventView from './modules/EventView/EventView';
import AppNavbar from './modules/Navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<StartingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/rejestracja' element={<RegistrationPage />} />
          <Route path='/kalendarz' element={<CalendarView />} />
          <Route path='/kalendarz/:id' element={<EventView />} />
        </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
