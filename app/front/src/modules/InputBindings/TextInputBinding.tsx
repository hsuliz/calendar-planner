import React from 'react';
import { InputGroup, Label } from '@blueprintjs/core';
import { InputBindingProps } from './constants';

export const TextInputBinding = ({
  field,
  form,
  label,
  error,
}: InputBindingProps) => {
  const { name } = field;
  const { setFieldValue } = form;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <Label>
      {label}
      <InputGroup placeholder="Nazwa..." onChange={onChange} />
    </Label>
  );
};
