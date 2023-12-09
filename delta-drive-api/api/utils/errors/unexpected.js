const unexpected = (res, error = undefined) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    errorMessage: error
      ? `Unexpected error: ${error.message}`
      : `Unexpected error`,
  });
};

module.exports = { unexpected };
