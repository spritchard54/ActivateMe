const { User, Category, Activity, ActivityType } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
  me: async (parent, args, context) => {
    console.log(context);
    if (context.user) {
      const userData = await User.findOne({ _id: context.user._id }).populate('activities'); 
      return userData;
    }
    throw AuthenticationError;
  },
  users: async (parent, args, context) => {
    const userData = await User.find({});
    return userData;
  },
  // Query to fetch all Categories
  categories: async () => {
    return await Category.find({});
  },
  // Query to fetch a single Category by ID
  category: async (parent, {_id}) => {
    return await Category.findById(_id);
  },

  activities: async () => {
    return await Activity.find({}).populate('category').populate('activityType');
  },

  // Query to fetch a single activity by ID
  activity: async (parent, { _id }) => {
    return await Activity.findById(_id).populate('category').populate('activityType');
  },

  // Query to fetch all activity types
  activityTypes: async () => {
    return await ActivityType.find({});
  },

  // Query to fetch a single activity type by ID
  activityType: async (parent, { _id }) => {
    return await ActivityType.findById(_id).populate('userId');
  },

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(email);
      console.log(password);
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    // Mutation to add a new activity
    addActivity: async (parent, { duration, commentText, categoryId, activityTypeId }) => {
      console.log(duration);
      console.log(commentText);
      console.log(categoryId);
      console.log(activityTypeId);
      const activity = await Activity.create({ duration, commentText, category: categoryId, activityType: activityTypeId });
      return activity
    },

    // Mutation to update an existing activity
    updateActivity: async (parent, { _id, duration, commentText, categoryId, activityTypeId }) => {
      const updatedActivity = await Activity.findByIdAndUpdate(
        _id,
        { duration, commentText, category: categoryId, activityType: activityTypeId },
        { new: true }
      ).populate('category').populate('activityType');
      return updatedActivity;
    },

    // Mutation to delete an activity
    deleteActivity: async (parent, { _id }) => {
      const deletedActivity = await Activity.findByIdAndDelete(_id);
      if (!deletedActivity) {
        throw new Error('Activity not found');
      }
      return deletedActivity;
    },

    // Mutation to add a new activity type
    addActivityType: async (parent, { actName, userId }) => {
      const activityType = await ActivityType.create({ actName, userId });
      return activityType.populate('userId');
    },

    // Mutation to update an existing activity type
    updateActivityType: async (parent, { _id, actName, userId }) => {
      const updatedActivityType = await ActivityType.findByIdAndUpdate(
        _id,
        { actName, userId },
        { new: true }
      ).populate('userId');
      return updatedActivityType;
    },

    // Mutation to delete an activity type
    deleteActivityType: async (parent, { _id }) => {
      const deletedActivityType = await ActivityType.findByIdAndDelete(_id);
      if (!deletedActivityType) {
        throw new Error('ActivityType not found');
      }
      return deletedActivityType;
    },
    
  },
};

module.exports = resolvers;
