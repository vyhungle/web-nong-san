const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { validateRegisterInput } = require("../../util/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "360d" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const user = await User.findOne({ username: username });
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      const respone = {
        error: [],
        user: null,
      };
      var error = {};
      if (user) {
        (error.field = "username"),
          (error.message = "Tên người dùng này đã được sử dụng");
        respone.error.push(error);
        if (!valid) {
          errors.map((e) => {
            respone.error.push(e);
          });
        }
      } else {
        password = await bcrypt.hash(password, 12);
        const newUser = new User({
          email,
          username,
          password,
          confirmPassword,
          createdAt: new Date().toISOString(),
        });

        const res = await newUser.save();
        const token = generateToken(res);
        respone.user = { ...res._doc, id: res.id, token };
      }
      return respone;
    },
  },
};
