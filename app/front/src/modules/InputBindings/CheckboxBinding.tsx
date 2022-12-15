import React, { useEffect, useState } from 'react';
import { Checkbox } from '@blueprintjs/core';
import { InputBindingProps } from './constants';
import { Tooltip2 } from '@blueprintjs/popover2';

export const CheckboxBinding = ({ field, form, label, error }: InputBindingProps) => {
	const { name } = field;
	const { setFieldValue } = form;

	const [isChecked, setChecked] = useState(false);

	const onChange = () => {
		setChecked((prevChecked) => !prevChecked);
	};

	useEffect(() => {
		setFieldValue(name, isChecked);
		// eslint-disable-next-line
	}, [isChecked]);

	return (
		<Tooltip2
			placement='right'
			content={error || 'tu mogę wpisać cokolwiek serio'}
			isOpen={!!error}
			fill
		>
			<Checkbox checked={isChecked} onChange={onChange} label={label} />
		</Tooltip2>
	);
};
