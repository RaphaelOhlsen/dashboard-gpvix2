import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';

import { CitiesService } from '../../../shared/services/api/cities/CitiesService';

type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
}

export const CityAutoComplete: FC<IAutoCompleteCityProps> = ({ isExternalLoading = false}) => {
  const {
    fieldName, 
    registerField, 
    defaultValue, 
    error, 
    clearError
  } = useField('cityId');

  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = 
    useState<number | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedValue) => setSelectedId(newSelectedValue),
    });
  },[selectedId]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CitiesService.getAll(1, search, selectedId)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            // setNotify({
            //   isOpen: true,
            //   message: 'Erro de conexão',
            //   type: 'error'
            // });
          } else {
            setOptions(result.data.map((city) => 
              ({id: city.id, label: city.name})));
          }
        });
    });
  }, [search, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;
    
    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedId) return null;

    return selectedOption;

  }, [selectedId, options]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      value={autoCompleteSelectedOption}
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id); 
        setSearch('');
        clearError();
      }}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28}/> : undefined}
      renderInput={(params) => 
        <TextField
          {...params} 
          label="Cidade" 
          error={!!error}
          helperText={error}
        />
      } 
    />
  );
};