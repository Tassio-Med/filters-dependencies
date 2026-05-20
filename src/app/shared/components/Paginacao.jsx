const Paginacao = ({
  current_page = 1,
  total = 0,
  limit = 10,
  setCurrentPage,
  onPageChange,
  right = true,
  showTotal = true,
}) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageChage = (event, page) => {
    if(setCurrentPage){
      setCurrentPage();
    }

    if(onPageChange) {
      onPageChange();
    }
  }

  if(totalPages <= 1) return null;

  return (
    <Stack
      direction="row"
      justifyContent={right ? 'flex-end' : 'center'}
      alignItems="center"
      spacing={2}
      sx={{ mt: 2 }}
    >
      {showTotal && (
        <Typography variant="body2" color="text.secondary">
          Total: {total} registros
        </Typography>
      )}
      <Pagination
        count={totalPages}
        page={current_page}
        onChange={handlePageChage}
        color="primary"
        size="small"
        showFirstButton
        showLastButton
      />
      
    </Stack>

  );
};

export default Paginacao;