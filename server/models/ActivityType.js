const { Schema, model} = require('mongoose');

const activityTypeSchema = new Schema({
    actName: {
        type: String,
        required: true,
        trim: true,
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
});

const ActivityType = model('ActivityType', activityTypeSchema);

module.exports = ActivityType;