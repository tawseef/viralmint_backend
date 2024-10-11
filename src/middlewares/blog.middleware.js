const httpStatus = require("http-status");
const BlogService = require("../service/blog.service");
const BlogServiceInstance = new BlogService();

const checkEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    
    const blogDetails = await BlogServiceInstance.findWithId(id);
    if (blogDetails) {
      if (blogDetails.email === email) {
        next();
      } else {
        res.status(httpStatus.FORBIDDEN).json({
          message: "Blog does not belong to the provided email",
        });
      }
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Blog not found with the provided id.", id });
    }
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({
      message: "Could not verify provided email",
      id: req.params.id,
    });
  }
};

const checkBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogResponse = await BlogServiceInstance.findWithId(id);
    if (blogResponse) {
      next();
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Blog not found", blogId: id });
    }
  } catch (error) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Invalid Blog id", id: req.params.id });
  }
};

module.exports = { checkEmail, checkBlog };
