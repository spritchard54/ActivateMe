const typeDefs = `
    type User {
        _id: ID
        username: String
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
        
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;
