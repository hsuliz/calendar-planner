import React, { useState } from 'react';
import { Button, Callout, Intent } from '@blueprintjs/core';
import * as P from './parts';
import { Formik, Form, Field } from 'formik';
import * as C from './constants';
import { TextInputBinding } from '../InputBindings/TextInputBinding';
import { PasswordInputBinding } from '../InputBindings/PasswordInputBinding';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginRequest } from '../../api/requests';
import { useAuth } from '../../contexts/useAuth';
import toast from '../../utils/toast';

function LoginForm() {
	const { isLoggedIn, setIsLoggedIn, setToken } = useAuth();
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [wasFormTouched, setWasFormTouched] = useState(false);
	const [formError, setFormError] = useState(''); // here we keep error message from API
	const [formSuccess, setFormSuccess] = useState(false); // here we only mark if form submitting was successful
	const navigate = useNavigate();

	if (isLoggedIn && !wasFormTouched) {
		// only if owner enters /login page manually
		return <Navigate to='/kalendarz' replace={true} />;
	}

	const onFormChange = () => {
		if (!wasFormTouched) {
			setWasFormTouched(true);
		}

		if (formError) {
			setFormError('');
		}
	};

	const onFormSubmit = async (values: C.LoginFormValues) => {
		setIsSubmitting(true);

		const {
			success,
			token = '',
			failureReason = '',
		} = await loginRequest(values.email, values.password);

		setIsSubmitting(false);

		// Success scenario
		if (success) {
			setToken(token);
			setFormSuccess(true);
			setIsLoggedIn(true);
			toast.show({ message: 'Zalogowano!', intent: Intent.SUCCESS, icon: 'endorsed' });
			return navigate('/kalendarz');
		}

		// Failure scenario
		setFormError(failureReason);
	};

	return (
		<Formik
			initialValues={C.initialValues}
			onSubmit={onFormSubmit}
			validationSchema={C.loginFormValidationSchema}
			validateOnChange={shouldValidateOnChange}
			validateOnBlur={shouldValidateOnChange}
		>
			{({ handleSubmit, errors }) => (
				<Form
					onChange={onFormChange}
					onSubmit={(e: React.FormEvent) => {
						e.preventDefault();
						setValidateOnChange(true);
						handleSubmit();
					}}
				>
					<P.LoginFormWrapper className='bp4-dark'>
						<Field
							name='email'
							label='E-mail'
							placeholder='E-mail...'
							error={errors.email}
							component={TextInputBinding}
						/>
						<Field
							name='password'
							label='Hasło'
							placeholder='Hasło...'
							error={errors.password}
							component={PasswordInputBinding}
						/>

						<Button
							type='submit'
							intent={Intent.PRIMARY}
							loading={isSubmitting}
							fill
						>
							Zaloguj
						</Button>
						<P.StyledLink to='/rejestracja'>
							<Button type='button' outlined fill>
								Nie mam jeszcze konta
							</Button>
						</P.StyledLink>

						{formError && (
							<Callout intent={Intent.DANGER} title='Wystąpił błąd'>
								{formError}
							</Callout>
						)}

						{formSuccess && (
							<Callout intent={Intent.SUCCESS} title='Sukces!'>
								Zalogowano poprawnie!{' '}
								<Link to='/kalendarz'>Przejdź do kalendarza.</Link>
							</Callout>
						)}
					</P.LoginFormWrapper>
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
