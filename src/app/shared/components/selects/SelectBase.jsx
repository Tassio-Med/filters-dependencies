import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import LoadingSelect from '../loaders/LoadingSelect';
import { FILTRO_TODOS } from '../../constants';


const SelectBase = ({
  label,
  value,
  onChange,
  options = [],
  loading = false,
  disabled = false,
  size = 'small',
  fullWidth = true,
  required = false,
  error = false,
  helperText = '',
  optionValue = 'id',
  optionLabel = 'nome',
  showAll = true,
  allLabel = 'Todos',
  allValue = FILTRO_TODOS,
  onOpen = () => {},
  onClose = () => {},
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  
  const opcoesRender = React.useMemo(() => {
    let listaOpcoes = [...options];
    
    if (showAll && options.length > 0) {
      listaOpcoes = [
        { [optionValue]: allValue, [optionLabel]: allLabel }, 
        ...listaOpcoes
      ];
    }
    
    return listaOpcoes;
  }, [options, showAll, optionValue, optionLabel, allLabel, allValue]);

  return (
    <FormControl 
      fullWidth={fullWidth} 
      size={size} 
      required={required} 
      error={error}
      disabled={disabled || loading}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        onOpen={onOpen}
        onClose={onClose}
        IconComponent={() => loading && <LoadingSelect />}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: '330px' }
          }
        }}
      >
        {opcoesRender.length === 0 && !loading ? (
          <MenuItem disabled>Nenhuma opção disponível</MenuItem>
        ) : (
          opcoesRender.map((option, index) => (
            <MenuItem 
              key={option[optionValue] || index} 
              value={option[optionValue]}
            >
              {option[optionLabel]}
            </MenuItem>
          ))
        )}
      </Select>
      {helperText && (
        <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>
          {helperText}
        </Box>
      )}
    </FormControl>
  );
};

export default SelectBase;