const express = require("express");
const router = express.Router();
const { fetchAuthorUser } = require("../middlewares/author.middleware");
const { validateSchema } = require("../middlewares/validate.middleware");
const { checkEmail, checkBlog } = require("../middlewares/blog.middleware");
const { blogValidation, contentValidation } = require("../validation/blog.validator");

const validateBlogSchema = validateSchema(blogValidation);
const validateContentSchema = validateSchema(contentValidation);

const BlogController = require("../controller/blog.controller");
const Controller = new BlogController();


// Get all blogs
router.get("/all", Controller.getAllBlogs);

// Get a blog with the provided email
router.get("/email/:email", Controller.findBlogsByEmail);

// Get all the blogs filtering with location
router.get("/filter/:location", Controller.findBlogsByLocation);

// Creates a new blog with an existing user/author in the db
router.post("/new", fetchAuthorUser, validateBlogSchema, Controller.createNewBlog);

// Delete a blog (Id and Author of the blog has to be provided)
router.delete("/id/:id", checkEmail, Controller.deleteBlog);

// Updates the content of the blog (Id and Author of the blog has to be provided)
router.put("/id/:id", fetchAuthorUser, checkBlog, validateContentSchema, Controller.updateContentInBlog );

// Make payment to publish post
router.post("/payment", Controller.createPaymentSession);   //fetchAuthorUser, validateBlogSchema, 

  



module.exports = router;
