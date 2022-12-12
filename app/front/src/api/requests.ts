import axios, { AxiosError } from 'axios';

interface AuthRequestReturnValue {
	success: boolean;
	token?: string;
	failureReason?: string;
}

export const login = async (
	email: string,
	password: string
): Promise<AuthRequestReturnValue> => {
	try {
		const { data, status } = await axios.post('/auth/login', {
			email,
			password,
		});

		if (status === 200) {
			return {
				success: true,
				token: data.token,
			};
		}
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			const status = e.response?.status;

			if (status === 500) {
				return {
					success: false,
					failureReason: 'Błąd serwera. Spróbuj ponownie później.',
				};
			}

			if (status === 401) {
				return {
					success: false,
					failureReason: 'Błędna nazwa użytkownika lub hasło',
				};
			}
		}
	}
	return {
		success: false,
		failureReason: 'Nieznany błąd :-(',
	};
};

export const validateToken = async (token: string): Promise<boolean> => {
	try {
		const { status } = await axios.get('/auth/validateToken', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return status === 200;
	} catch (e: unknown) {
		// 4XX and 5XX statuses raise AxiosError, so that would mean that token is invalid
		return false;
	}
};
