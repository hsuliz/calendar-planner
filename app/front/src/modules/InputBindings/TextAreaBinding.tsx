import React from 'react';
import { Intent, Label, TextArea } from '@blueprintjs/core';
import { InputBindingProps } from './constants';
import { Tooltip2 } from '@blueprintjs/popover2';

export const TextAreaBinding = ({
  field,
  form,
  label,
  error,
}: InputBindingProps) => {
  const { name } = field;
  const { setFieldValue } = form;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <Tooltip2
      content={error || 'tu mogę wpisać cokolwiek serio'}
      isOpen={!!error}
      fill
    >
      <Label>
        {label}
        <TextArea
          fill
          growVertically={true}
          large={true}
          intent={error ? Intent.DANGER : Intent.NONE}
          onChange={onChange}
        />
      </Label>
    </Tooltip2>
  );
};
