import React, { useEffect } from 'react';
import { Label } from '@blueprintjs/core';
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
		setFieldValue(name, selectedDate);
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
					minDate={new Date(1990, 1, 1)}
					maxDate={new Date(2035, 12, 31)}
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
				/>
			</Label>
		</Tooltip2>
	);
};
