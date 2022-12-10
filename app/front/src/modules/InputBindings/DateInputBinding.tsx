import React from 'react';
import { Label } from '@blueprintjs/core';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import { InputBindingProps } from './constants';

// TODO: add momentjs polish locale

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
    console.log(str, locale);

    return false;
  };

  const formatDate = (date: Date, locale?: string | undefined) => {
    // TODO: usunąć sekundy
    return date.toLocaleDateString() + '  ' + date.toLocaleTimeString();
  };

  return (
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
        dayPickerProps={{
          firstDayOfWeek: 1
        }}
      />
    </Label>
  );
};
