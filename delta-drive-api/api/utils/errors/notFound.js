const notFound = (res) => {
  return res.status(404).json({
    success: false,
    errorMessage: "Not found",
  });
};

module.exports = { notFound };
