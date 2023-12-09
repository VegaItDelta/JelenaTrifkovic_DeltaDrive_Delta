const paginationParamsError = (res) => {
  return res.status(400).json({
    success: false,
    errorMessage: "Pagination params are not valid",
  });
};

module.exports = { paginationParamsError };
