import React, { useState, useEffect } from 'react';
import { validateToken } from '../api/requests';
import {
	getJWT as getTokenFromLS,
	setJWT as setTokenInLS,
	removeJWT as removeTokenFromLS,
} from '../utils/manageJWT';

interface IAuthContext {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	token: string;
	setToken: (jwt: string) => void;
	onLogout: () => void;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(getTokenFromLS() || '');

	const onSetToken = (jwt: string) => {
		setToken(jwt);
		setTokenInLS(jwt);
	};

	const resetToken = () => {
		setToken('');
		removeTokenFromLS();
	};

	const onLogout = () => {
		setIsLoggedIn(false);
		resetToken();
	};

	const handleTokenValidation = async (jwt: string) => {
		const isValid = await validateToken(token);

		if (isValid) {
			onSetToken(jwt);
			setIsLoggedIn(true);
		} else {
			resetToken();
			setIsLoggedIn(false);
		}
	};

	useEffect(() => {
		const jwt = getTokenFromLS();

		if (jwt) {
			handleTokenValidation(jwt);
		}
		// eslint-disable-next-line
	}, []);

	const contextValue: IAuthContext = {
		isLoggedIn,
		setIsLoggedIn,
		token,
		setToken: onSetToken,
		onLogout,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
