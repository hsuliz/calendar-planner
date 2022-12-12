import React from 'react';
import { InputGroup, Intent, Label } from '@blueprintjs/core';
import { InputBindingProps } from './constants';
import { Tooltip2 } from '@blueprintjs/popover2';

export const TextInputBinding = ({
	field,
	form,
	label,
	placeholder,
	error,
}: InputBindingProps) => {
	const { name } = field;
	const { setFieldValue } = form;

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
			<Label>
				{label}
				<InputGroup
					placeholder={placeholder}
					onChange={onChange}
					intent={error ? Intent.DANGER : Intent.NONE}
				/>
			</Label>
		</Tooltip2>
	);
};
