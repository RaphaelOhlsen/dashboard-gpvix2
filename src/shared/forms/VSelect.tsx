/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

type TVSelectFieldProps = {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
};

export const VSelect: FC<TVSelectFieldProps> = ({ name, label, options }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [value, setValue] = useState<string>(defaultValue || '');

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
      clearValue: () => setValue(''),
    });
  }, [fieldName, registerField, value]);

  const hasError = !!error;

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id='role'>{label}</InputLabel>
      <Select
        labelId='role'
        id='roleId'
        value={value}
        label='Função'
        onChange={(e) => {setValue(e.target.value);} }
        inputRef={selectRef}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        ;
      </Select>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>

  // {selectOptions.map((option) => (
  //   <option key={option.value} value={option.value}>
  //     {option.label}
  //   </option>
  // ))}

  // <div>
  //   <label htmlFor={fieldName}>{label}</label>

  //   <select
  //     id={fieldName}
  //     ref={selectRef}
  //     defaultValue={defaultValue}
  //     {...rest}
  //   >
  //     {children}
  //   </select>

  //   {error && <span className='error'>{error}</span>}
  // </div>
  );
};
