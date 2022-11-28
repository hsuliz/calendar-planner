import axios from 'axios';
import React, { useEffect, useState } from 'react';

function StartingPage() {
    const [isFetching, setIsFetching] = useState(false);
    const [fromApi, setFromApi] = useState();

    const getAPIData = async () => {
        try {

            const { data } = await axios.get('/test');
            console.log(data);
            setFromApi(data);
        } catch(e: any) {
            console.log(e.message)
        } finally {
            setIsFetching(false)
        }

    }

    useEffect(() => {
        setIsFetching(true);
        getAPIData();
    }, [])


	return (
        <div className='App'>
            <header className='App-header'>
                <p>
                    {isFetching ? 'Loading...' : JSON.stringify(fromApi) || 'Brak danych'}
                </p>
            </header>
        </div>
	);
}

export default StartingPage;
