const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

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
      } else {
        if (!valid) {
          errors.map((e) => {
            respone.error.push(e);
          });
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
      }
      return respone;
    },

    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      const respone = {
        error: [],
        user: null,
      };
      const user = await User.findOne({ username: username });
      if (!user) {
        respone.error.push({
          message: "Không tìm thấy người dùng",
          field: "username",
        });
        if (!valid) {
          errors.map((e) => {
            respone.error.push(e);
          });
        }
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          respone.error.push({
            message: "Thông tin đăng nhập sai",
            field: "password",
          });
        } else {
          const token = generateToken(user);
          respone.user = {
            ...user._doc,
            id: user._id,
            token,
          };
        }
      }
      return respone;
    },
  },
};
