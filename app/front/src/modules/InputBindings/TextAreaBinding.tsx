import React from 'react';
import { Label, TextArea } from '@blueprintjs/core';
import { InputBindingProps } from './constants';

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
    <Label>
      {label}
      <TextArea fill growVertically={true} large={true} onChange={onChange} />
    </Label>
  );
};
