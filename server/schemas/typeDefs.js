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
        duration: Decimal
        commentText: String
        category: Category
        activityType: ActivityType
    }

    type ActivityType {
        _id: ID
        actname: String
        user: User
    }

`


module.exports = typeDefs;