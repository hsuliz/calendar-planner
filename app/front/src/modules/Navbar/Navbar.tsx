import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

const AppNavbar = () => {
  const { isLoggedIn, onLogout } = useAuth();

  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Link to='/kalendarz'>
            <Button minimal large icon='calendar'>
              Calendar App
            </Button>
          </Link>
        </NavbarHeading>
        <NavbarDivider />
      </NavbarGroup>

      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarHeading>Ustawienia</NavbarHeading>
        <NavbarDivider />
        {isLoggedIn ? (
          <>
            <Button icon='user' text='Profil' />
            <Button icon='log-out' text='Wyloguj' onClick={onLogout} />
          </>
        ) : (
          <Link to='/login'>
            <Button icon='log-in' text='Zaloguj się' />
          </Link>
        )}
      </NavbarGroup>
    </Navbar>
  );
};

export default AppNavbar;
