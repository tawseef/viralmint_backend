const Blogs = require("../model/blog.model");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY)

class BlogService {
  // Find blog using the provided Id 
  findWithEmail = async (email) => {
    try {
      const result = await Blogs.find({email:email})
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  // Find blog using the provided Location 
  findByLocation = async (location) => {
    try {
      const result = await Blogs.find({ location: location.toLowerCase() });
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  //////////////////////////////////////////////////
  // Find blog using the provided email 
  findWithemail = async (email) => {
    try {
      const result = await Blogs.find({ email: email });
      return result;
    } catch (error) {
      throw error;
    }
  }
  //////////////////////////////////////////////////

  // Find all the blogs in db
  findAll = async () => {
    try {
        const blogResult = await Blogs.find();
        return blogResult;
    } catch (error) {
        throw error;
    }
  }

  // Find with Id
  findWithId = async (id) => {
    try {
        const blogResult = await Blogs.findOne({_id:id});
        return blogResult;
    } catch (error) {
        throw error;
    }
  }

  //////////////////////////////////////////////////
  findOnly = async (data) => {
      const {title, email} = data
    try {
        const blogResult = await Blogs.find({title: title, email: email});
        return blogResult;
    } catch (error) {
        throw error;
    }
  }
  //////////////////////////////////////////////////

  // Create new blog
  create = async (data) => {
    try {
        const { email, title, content, location} = data; 
        const result = await Blogs.create({ email, title, content, location});
        return result;
    } catch (error) {
        throw error;
    }
  };

  // Modify the blog's content
  addContent = async (newContent, blogId) => {
    try {
      const { email, content } = newContent;
      const result = await Blogs.findOneAndUpdate(
        { _id: blogId, email: email },
        { content: content },
        { new: true }
      )
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Deleting the blog with provided Id
  delete = async (blogId) => {
    try {
      const result = await Blogs.findOneAndDelete({ _id: blogId });
      return result;
    } catch (error){
      throw error;
    }
  }

  // Payment function for Blog Posting
  makePayment = async () => {
    try {
      const result = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: 1,
        mode: "payment",
        success_url:"",
        cancel_url:""
      })

      return result;
    } catch (error){
      throw error;
    }
  }
}

module.exports = BlogService;
