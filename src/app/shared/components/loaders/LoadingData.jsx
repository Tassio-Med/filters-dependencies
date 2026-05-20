import { Box, CircularProgress, Alert, Button, Typography } from '@mui/material';

const LoadingData = ({
    obj = null,
    loading = false,
    error = null,
    msg = 'Carregando...',
    onRetry = null,
    noError = false,
    noButtonError = false,
    children
}) => {

    const isLoading = loading || (obj && obj.loading);
    const hasError = error || (obj && obj.error);
    const errorMessage = error || (obj && obj.msgError);
    const retryAction = onRetry || (obj && obj.action);

    if(!isLoading) {
        return (
            <Box>
                <CircularProgress size={40}/>
                <Typography variant="body2" color="text.secondary">
                    {msg}
                </Typography>
            </Box>
        );
    }

    if(hasError && !noError) {
        return (
            <Alert
                severity='error'
                sx={{ m: 2 }}
                action={
                    retryAction && !noButtonError && (
                        <Button color='inherit' size='small' onClick={retryAction}>
                            Tentar novamente
                        </Button>
                    )
                }
            >
                {errorMessage || 'Erro ao carregar os dados'}
            </Alert>
        );
    }

    return children || null;
};

export default LoadingData;