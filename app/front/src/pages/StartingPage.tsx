import { Button, Callout, Intent } from '@blueprintjs/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StartingPage() {
	const [isFetching, setIsFetching] = useState(false);
	const [fromApi, setFromApi] = useState();

	const getAPIData = async () => {
		try {
			const { data } = await axios.get('/test');
			console.log(data);
			setFromApi(data);
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsFetching(false);
		}
	};

	// useEffect(() => {
	// 	setIsFetching(true);
	// 	getAPIData();
	// }, []);

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
