const { unexpectedError } = require("../utils/errors/unexpected");
const { paginationParamsError } = require("../utils/errors/pagination");

const handlePaginationParams = (Model) => async (req, res, next) => {
  try {
    const { page: pageStr, limit: limitStr } = req.query;
    const [page, limit] = [Number.parseInt(pageStr), Number.parseInt(limitStr)];

    if (Number.isNaN(page) || Number.isNaN(limit) || page < 1) {
      paginationParamsError(res);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const count = await Model.count();

    const prevPage = startIndex > 0 ? { page: page - 1, limit: limit } : null;
    const nextPage = endIndex < count ? { page: page + 1, limit: limit } : null;
    const totalPages = Math.floor(count / limit);

    if (page > totalPages) {
      paginationParamsError(res);
    }

    req.pagination = {
      offset: startIndex,
      limit,
      prev: prevPage,
      next: nextPage,
      totalPages,
    };

    next();
  } catch (e) {
    unexpectedError(res, e);
  }
};

module.exports = { handlePaginationParams };
