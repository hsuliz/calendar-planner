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

interface NavbarProps {}

const AppNavbar = (props: NavbarProps) => {
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
				<Button icon='user' text='Profil' />
				<Button icon='log-out' text='Wyloguj' />
			</NavbarGroup>
		</Navbar>
	);
};

export default AppNavbar;
