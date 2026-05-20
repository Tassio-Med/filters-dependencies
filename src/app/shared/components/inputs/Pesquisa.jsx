import { IconButton, InputAdornment } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Utils } from '../../../../utils';


const Pesquisa = ({
    value: externalValue,
    onChange,
    onSearch,
    label = 'Pesquisar',
    placeholder = 'Digite para pesquisar...',
    size = 'small',
    fullWidth = true,
    debounceTime = 500,
    clearable = true,
}) => {
     const [valor, setValor] = useState(externalValue || '');

     const debounceSearch = useCallback(
        Utils.debounce((valorPesquisa) => {
            if(onSearch) {
                onSearch(valorPesquisa);
            }
        }, debounceTime),
        [onSearch, debounceTime]
     );

     useEffect(() => {
        if(externalValue !== undefined) {
            setValor(externalValue);
        }
     }, [externalValue]);

     const handleChange = (event) => {
        const novoValor = event.target.value;
        setValor(novoValor);
        
        if(onChange){
            onChange(novoValor);
        }

        if(onSearch) {
            debounceSearch(novoValor);
        }
     };

     const handleClear = () => {
        setValor('');
        if(onChange) {
            onChange('');
        }
        if(onSearch){
            onSearch('');
        }
     };

     return (
        <TextField 
            fullWidth={fullWidth}
            size={size}
            label={label}
            placeholder={placeholder}
            value={valor}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
                endAdornment: clearable && valor && (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={handleClear}/>
                        <ClearIcon fontSize="small"/>
                    </InputAdornment>
                )
            }}
        />
     );


}

export default Pesquisa;