const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {},
  me: async (parent, args, context) => {
    console.log(context);
    if (context.user) {
      return User.findOne({ _id: context.user._id }).populate('activities');
    }
    throw AuthenticationError;
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
