const typeDefs = `
    type User {
        _id: ID!
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
        when: String
        duration: Float
        commentText: String
        category: Category
        activityType: ActivityType
    }

    type ActivityType {
        _id: ID
        actName: String
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

        addActivity(
            when: String!, 
            duration: Float!, 
            commentText: String!, 
            category: ID!, 
            activityType: ID!): Activity
        
        updateActivity(
            _id: ID!, 
            when: String, 
            duration: Float, 
            commentText: String, 
            Category: ID, 
            activityType: ID): Activity
        
        deleteActivity(
            when: String!, 
            duration: Float!, 
            commentText: String!, 
            category: ID!, 
            activityType: ID!): Activity
            
        
        addActivityType(
            actName: String!, 
            userId: ID!): ActivityType
        
        updateActivityType(
            _id: ID!, 
            actName: String, 
            userId: ID): ActivityType
        
        deleteActivityType(_id: ID!): ActivityType
    }

`;

module.exports = typeDefs;
