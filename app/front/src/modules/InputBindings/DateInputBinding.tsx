import React, { useEffect } from 'react';
import { Button, Label } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { DateInput as DateInputBase, TimePrecision } from '@blueprintjs/datetime';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/pl';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { InputBindingProps } from './constants';

const dateFormat = 'DD.MM.YYYY HH:mm';

// custom red outline for invalid DateInput, because blueprint doesn't provide such functionality for some reason
const DateInput = styled(DateInputBase)<{ hasError?: boolean }>`
	${({ hasError }) =>
		hasError &&
		css`
			.bp4-input {
				box-shadow: 0 0 0 0 rgba(205, 66, 70, 0), 0 0 0 0 rgba(205, 66, 70, 0),
					inset 0 0 0 1px #cd4246, inset 0 0 0 1px rgba(17, 20, 24, 0.2),
					inset 0 1px 1px rgba(17, 20, 24, 0.5);
			}
		`}
`;

const minDate = new Date(1990, 0, 1);
const maxDate = new Date(2050, 11, 31);

export const DateInputBinding = ({
	field,
	form,
	value,
	label,
	error,
}: InputBindingProps<Date>) => {
	const { name } = field;
	const { setFieldValue } = form;

	const onChange = (selectedDate: Date | null) => {
		if (!selectedDate) return;

		if (selectedDate > maxDate) {
			return setFieldValue(name, maxDate);
		}

		if (selectedDate < minDate) {
			return setFieldValue(name, minDate);
		}

		setFieldValue(name, selectedDate);
	};

	const onClear = () => {
		setFieldValue(name, undefined);
	};

	const parseDate = (str: string) => {
		const parsedDate = moment(str, dateFormat).toDate();

		if (isNaN(parsedDate as unknown as number)) {
			return new Date();
		}

		return parsedDate;
	};

	const formatDate = (date: Date) => {
		return moment(date).format(dateFormat);
	};

	useEffect(() => {
		setFieldValue(name, value);
		// eslint-disable-next-line
	}, [value]);

	return (
		<Tooltip2
			placement='bottom'
			content={error || 'tu mogę wpisać cokolwiek serio'}
			isOpen={!!error}
			fill
		>
			<Label>
				{label}
				<DateInput
					minDate={minDate}
					maxDate={maxDate}
					// TODO: default value to powinien być kliknięty dzień na kalendarzu
					defaultValue={value}
					value={value}
					locale={'pl'}
					localeUtils={MomentLocaleUtils}
					parseDate={parseDate}
					formatDate={formatDate}
					timePrecision={TimePrecision.MINUTE}
					timePickerProps={{
						useAmPm: false,
					}}
					onChange={onChange}
					highlightCurrentDay
					hasError={!!error}
					dayPickerProps={{
						firstDayOfWeek: 1,
					}}
					rightElement={value && <Button icon='cross-circle' onClick={onClear} />}
				/>
			</Label>
		</Tooltip2>
	);
};
