import React from 'react';
import LoginForm from '../modules/LoginForm/LoginForm';

function LoginPage() {
	return (
        <div className='App'>
            <header className='App-header'>
                <p>Logowanie</p>
                <LoginForm />
            </header>
        </div>
	);
}

export default LoginPage;
