import React, { useState } from 'react';
import { Button, InputGroup, Intent } from '@blueprintjs/core';
import * as P from './parts';
import { Formik, Form, Field } from 'formik';
import * as C from './constants';
import { TextInputBinding } from '../InputBindings/TextInputBinding';
import { PasswordInputBinding } from '../InputBindings/PasswordInputBinding';
import { Link } from 'react-router-dom';

function LoginForm() {
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);

	const onFormSubmit = (values: C.LoginFormValues) => {
		console.log(values);
		// onModalClose();
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

						<Button type='submit' intent={Intent.PRIMARY} fill>
							Zaloguj
						</Button>
						<P.StyledLink to='/rejestracja'>
							<Button type='button' outlined fill>
								Nie mam jeszcze konta
							</Button>
						</P.StyledLink>
					</P.LoginFormWrapper>
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
