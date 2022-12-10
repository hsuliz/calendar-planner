import React from 'react';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import PeriodicitySelect, {
  periodicitySelectItems,
} from '../InputBindings/PeriodicitySelect';
import { TextInputBinding } from '../InputBindings/TextInputBinding';
import { TextAreaBinding } from '../InputBindings/TextAreaBinding';
import { DateInputBinding } from '../InputBindings/DateInputBinding';

interface AddEventFormProps {
  className?: string;
  onModalClose: () => void;
}

type AddEventFormField = 'name' | 'description' | 'dateFrom' | 'dateTo' | 'periodicity';
type AddEventFormValues = Record<AddEventFormField, string | Date | object>;

const initialValues: AddEventFormValues = {
  name: '',
  description: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  periodicity: periodicitySelectItems[0].value,
};

export const AddEventForm = ({ className, onModalClose }: AddEventFormProps) => {
  const onFormSubmit = (values: AddEventFormValues) => {
    console.log(values);
    // onModalClose();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
      {({ handleSubmit, errors, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <div className={className}>
            <Field name="name" label="Nazwa" component={TextInputBinding} />
            <Field name='description' label='Opis' component={TextAreaBinding} />

            <div
              style={{
                display: 'flex',
                flexShrink: 1,
                justifyContent: 'space-between',
              }}
            >
                <Field name='dateFrom' label='Od' component={DateInputBinding} />
                <Field name='dateTo' label='Do' component={DateInputBinding} />
            </div>

            <Field name='periodicity' label='Cykliczność' component={PeriodicitySelect} />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={onModalClose}>Anuluj</Button>
              <Button type='submit' intent={Intent.SUCCESS}>
                Zatwierdź
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
