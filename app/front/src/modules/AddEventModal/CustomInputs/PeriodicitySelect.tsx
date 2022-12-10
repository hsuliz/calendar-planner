import React from 'react';
import { Button, Label, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select2 } from '@blueprintjs/select';

export interface Periodicity {
  value: string;
  label: string;
}

export const selectItems: Periodicity[] = [
  { value: 'once', label: 'Jednorazowo' },
  { value: 'daily', label: 'Codziennie' },
  { value: 'weekly', label: 'Co tydzień' },
  { value: 'monthly', label: 'Co miesiąc' },
  { value: 'yearly', label: 'Co rok' },
];

const renderMenu: ItemRenderer<Periodicity> = (
  item,
  { handleClick, handleFocus, modifiers }
) => {
  return (
    <MenuItem
      text={item.label}
      label={item.label}
      roleStructure="listoption"
      active={modifiers.active}
      key={item.value}
      onClick={handleClick}
      onFocus={handleFocus}
    />
  );
};

interface PeriodicitySelectProps {
    activeItem: Periodicity;
  onItemSelect: (item: Periodicity) => void;
}

const PeriodicitySelect = ({ activeItem, onItemSelect }: PeriodicitySelectProps) => {
  return (
    <Label>
      Cykliczność
      <Select2<Periodicity>
        filterable={false}
        fill
        activeItem={activeItem}
        items={selectItems}
        itemRenderer={renderMenu}
        onItemSelect={onItemSelect}
      >
        <Button text={activeItem.label} fill rightIcon="double-caret-vertical" />
        </Select2>
    </Label>
  );
};

export default PeriodicitySelect;
