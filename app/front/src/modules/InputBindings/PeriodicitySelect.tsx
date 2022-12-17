import React from 'react';
import { Button, Label, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select2 } from '@blueprintjs/select';
import { InputBindingProps } from './constants';

//TODO?: make it more generic?? or maybe not??

export type PeriodicityType = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface PeriodicitySelectValue {
	value: PeriodicityType;
	label: string;
}

export const periodicitySelectItems: PeriodicitySelectValue[] = [
	{ value: 'once', label: 'Jednorazowo' },
	{ value: 'daily', label: 'Codziennie' },
	{ value: 'weekly', label: 'Co tydzień' },
	{ value: 'monthly', label: 'Co miesiąc' },
	{ value: 'yearly', label: 'Co rok' },
];

const findItem = (itemValue: string) =>
	periodicitySelectItems.find((el) => el.value === itemValue);

const renderMenu: ItemRenderer<PeriodicitySelectValue> = (
	item,
	{ handleClick, handleFocus, modifiers }
) => {
	return (
		<MenuItem
			text={item.label}
			label={item.label}
			roleStructure='listoption'
			active={modifiers.active}
			key={item.value}
			onClick={handleClick}
			onFocus={handleFocus}
		/>
	);
};

const PeriodicitySelect = ({ field, form, label, error }: InputBindingProps) => {
	const { name, value } = field;
	const { setFieldValue } = form;

	const onChange = (item: PeriodicitySelectValue) => {
		setFieldValue(name, item.value);
	};

	return (
		<Label>
			{label}
			<Select2<PeriodicitySelectValue>
				filterable={false}
				fill
				activeItem={findItem(value)}
				items={periodicitySelectItems}
				itemRenderer={renderMenu}
				onItemSelect={onChange}
			>
				<Button
					text={findItem(value)?.label}
					fill
					rightIcon='double-caret-vertical'
				/>
			</Select2>
		</Label>
	);
};

export default PeriodicitySelect;
