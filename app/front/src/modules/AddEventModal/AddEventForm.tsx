import React, { useState } from 'react';
import { InputGroup, Label, TextArea } from '@blueprintjs/core';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import PeriodicitySelect, {
  Periodicity,
  selectItems,
} from './CustomInputs/PeriodicitySelect';

interface AddEventFormProps {
  className?: string;
}

export const AddEventForm = ({ className }: AddEventFormProps) => {
  const [selectedPeriodicity, setSelectedPeriodicity] = useState<Periodicity>(
    selectItems[0]
  );

  const onItemSelect = (item: Periodicity) => {
    setSelectedPeriodicity(item);
  };

  const parseDate = (str: string, locale?: string | undefined): false => {
    console.log(str, locale);

    return false;
  }

  const formatDate = (date: Date, locale?: string | undefined) => {
    // TODO: usunąć sekundy
    return date.toLocaleDateString() + '  ' + date.toLocaleTimeString();
  }

  return (
    <div className={className}>
      <Label>
        Nazwa
        <InputGroup placeholder="Nazwa..." />
      </Label>

      <Label>
        Opis
        <TextArea
          fill
          growVertically={true}
          large={true}
          // onChange={this.handleChange}
          // value={this.state.value}
        />
      </Label>

      <div style={{
        display: 'flex',
        flexShrink: 1,
        justifyContent: 'space-between',
      }}>
        <Label>
          Od
          <DateInput
            // TODO: default value to powinien być kliknięty dzień na kalendarzu
            defaultValue={new Date()}
            locale='pl'
            parseDate={parseDate}
            formatDate={formatDate}
            timePrecision={TimePrecision.MINUTE}
          />
        </Label>
        <Label>
          Od
          <DateInput
            defaultValue={new Date()}
            locale='pl'
            parseDate={parseDate}
            formatDate={formatDate}
            timePrecision={TimePrecision.MINUTE}
          />
        </Label>
      </div>

      <PeriodicitySelect
        activeItem={selectedPeriodicity}
        onItemSelect={onItemSelect}
      />
    </div>
  );
};
