import {Box, CircularProgress} from '@mui/material';

const LoadingSelect = ({size= 20, obj = null}) => {
    
    const isLoading = obj ? obj.loading : true;

    if(!isLoading) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 1
            }}
        >
            <CircularProgress size={size}/>
        </Box>

    );
}

export default LoadingSelect;