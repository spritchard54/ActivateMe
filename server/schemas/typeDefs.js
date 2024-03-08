const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        activities: [Activity]
    }

    type Category {
        _id: ID
        catName: String
    }

    type Activity {
        _id: ID
        duration: Float
        commentText: String
        category: Category
        activityType: ActivityType
    }

    type ActivityType {
        _id: ID
        actname: String
        user: User
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        categories: [Category]
        category(_id: ID!): Category
        activities: [Activity]
        activity(_id: ID!): Activity
        activityTypes: [ActivityType]
        activityType(_id: ID!): ActivityType
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addActivity(duration: Float!, commentText: String!, categoryId: ID!, activityTypeId: ID!): Activity
        updateActivity(_id: ID!, duration: Float, commentText: String, categoryId: ID, activityTypeId: ID): Activity
        deleteActivity(_id: ID!): Activity
        addActivityType(actName: String!, userId: ID!): ActivityType
        updateActivityType(_id: ID!, actName: String, userId: ID): ActivityType
        deleteActivityType(_id: ID!): ActivityType
    }

`;

module.exports = typeDefs;
