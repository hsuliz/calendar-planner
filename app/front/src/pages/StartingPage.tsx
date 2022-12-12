import React from 'react';
import { Button, Callout, Intent } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

function StartingPage() {
	return (
		<div className='App'>
			<header className='App-header'>
				<div
					style={{
						width: 400,
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
					}}
				>
					<Callout title='Placeholder'>To jeszcze jest in progress</Callout>
					<Link to='/login'>
						<Button intent={Intent.PRIMARY} fill>
							Przejdź do logowania
						</Button>
					</Link>
					<Link to='/kalendarz'>
						<Button intent={Intent.SUCCESS} fill>
							Przejdź do kalendarza
						</Button>
					</Link>
				</div>
			</header>
		</div>
	);
}

export default StartingPage;
