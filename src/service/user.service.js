const User = require("../model/user.model");
const httpStatus = require("http-status");

class UserService {
  // User registration in db
  register = async (user) => {
    try {
      const { email, password, location = "" } = user;
      const newUser = await new User({ email, password, location });
      const result = await newUser.save();
      return result;
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error, });
    }
  };

  // Find existing user in db
  findByUserEmail = async (email) => {
    try {
      const userResult = await User.findOne({email: email});
      return userResult;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
