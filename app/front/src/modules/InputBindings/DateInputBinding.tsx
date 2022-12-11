import React from 'react';
import { Label } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import {
  DateInput as DateInputBase,
  TimePrecision,
} from '@blueprintjs/datetime';
import { InputBindingProps } from './constants';
import styled, { css } from 'styled-components';

// TODO: add momentjs polish locale

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
  label,
  error,
}: InputBindingProps) => {
  const { name } = field;
  const { setFieldValue } = form;

  const onChange = (selectedDate: Date | null) => {
    setFieldValue(name, selectedDate);
  };

  const parseDate = (str: string, locale?: string | undefined): false => {
    // console.log(str, locale);

    return false;
  };

  const formatDate = (date: Date, locale?: string | undefined) => {
    // TODO: usunąć sekundy
    return date.toLocaleDateString() + '  ' + date.toLocaleTimeString();
  };

  return (
    <Tooltip2
      content={error || 'tu mogę wpisać cokolwiek serio'}
      isOpen={!!error}
      fill
    >
      <Label>
        {label}
        <DateInput
          // TODO: default value to powinien być kliknięty dzień na kalendarzu
          defaultValue={new Date()}
          locale="pl_PL"
          parseDate={parseDate}
          formatDate={formatDate}
          timePrecision={TimePrecision.MINUTE}
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
