const { Schema, model } = require('mongoose');


const activitySchema = new Schema({
    actName: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Schema.Types.Decimal128
    },
    commentText: {
        type: String,
        required: true,
        trim: true,
    },
});

const Activity = model('activity', activitySchema);

module.exports = Activity;