const httpStatus = require("http-status");
const BlogService = require("../service/blog.service");
const BlogServiceInstance = new BlogService();

class BlogController {
  // Get all the blog in the db
  getAllBlogs = async (req, res) => {
    try {
      const blogsResult = await BlogServiceInstance.findAll();
      if (blogsResult.length) {
        res.json(blogsResult);
      } else {
        res.status(httpStatus.NOT_FOUND).json({ message: "No Blogs found" });
      }
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching blogs", error });
    }
  };

  // Find the blog with a provided Id
  findBlogsByEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const result = await BlogServiceInstance.findWithEmail(email);
      if (result) {
        res.json(result);
      } else {
        res
          .status(httpStatus.NOT_FOUND)
          .json({ message: `Blog with id ${id} not found` });
      }
    } catch (error) {
      res
        .status(httpStatus.BAD_GATEWAY)
        .json({ message: "Could not fetch this blog", id });
    }
  };

  // Creates a new blog in the db
  createNewBlog = async (req, res) => {
    try {
      const result = await BlogServiceInstance.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({
        message: "Failed to create new blog",
        title: req.body.title,
        error,
      });
    }
  };

  // Delete a the blog in the db
  deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await BlogServiceInstance.delete(id);
      res.status(httpStatus.ACCEPTED).json({
        message: "Delete successful",
        blog_id: id,
      });
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({
        message: "Failed to delete this blog",
        blog_id: id,
      });
    }
  };

  // Update content in the blog
  updateContentInBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await BlogServiceInstance.addContent(req.body, id);
      if(!result){
        res.status(httpStatus.UNAUTHORIZED).json({
          message: "Updation unsuccessful, check Id and author"
        });
      }else{
        res.status(httpStatus.OK).json({
          message: "Successfully updated the content in the blog",
          blog_id: id,
        })
      }
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({
        message: "Failed to update content in the blog",
        blog_id: id,
        error,
      });
    }
  };

  // Find blogs by location
  findBlogsByLocation = async (req, res) => {
    const {location} = req.params;
    try {
      const result = await BlogServiceInstance.findByLocation(location);    
      res.json(result);
    } catch (error) {
      res
        .status(httpStatus.BAD_GATEWAY)
        .json({ message: "Could not fetch blog" });
    }
  };

  // Find blogs by location
  createPaymentSession = async (req, res) => {
    try {
      const result = await BlogServiceInstance.makePayment();    
      res.json(result);
    } catch (error) {
      res
        .status(httpStatus.BAD_GATEWAY)
        .json({ message: "Could not fetch blog" });
    }
  };
}

module.exports = BlogController;
