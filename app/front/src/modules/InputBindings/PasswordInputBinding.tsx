import React, { useState } from 'react';
import { Button, InputGroup, Intent, Label } from '@blueprintjs/core';
import { InputBindingProps } from './constants';
import { Tooltip2 } from '@blueprintjs/popover2';
import styled from 'styled-components';

const TooltipWithCustomPosition = styled(Tooltip2)`
	margin-top: 0px !important;
`;

export const PasswordInputBinding = ({
	field,
	form,
	label,
	placeholder,
	error,
}: InputBindingProps) => {
	const { name } = field;
	const { setFieldValue } = form;

	const [showPassword, setShowPassword] = useState(false);

	const handleLockClick = () => {
		setShowPassword((prevState) => !prevState);
	};

	const lockButton = (
		<TooltipWithCustomPosition content={`${showPassword ? 'Ukryj' : 'Pokaż'} hasło`}>
			<Button
				icon={showPassword ? 'unlock' : 'lock'}
				intent={Intent.WARNING}
				onClick={handleLockClick}
			/>
		</TooltipWithCustomPosition>
	);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(name, event.target.value);
	};

	return (
		<Tooltip2
			placement='right'
			content={error || 'tu mogę wpisać cokolwiek serio'}
			isOpen={!!error}
			fill
		>
			<Label tabIndex={-1}>
				{label}
				<InputGroup
					placeholder={placeholder}
					onChange={onChange}
					intent={error ? Intent.DANGER : Intent.NONE}
					type={showPassword ? 'text' : 'password'}
					rightElement={lockButton}
				/>
			</Label>
		</Tooltip2>
	);
};
