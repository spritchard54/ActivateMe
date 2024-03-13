const { Schema, model } = require('mongoose');
const Category = require('./Category');


const activitySchema = new Schema({
    activityType: 
        {
            type: Schema.Types.ObjectId,
            ref: 'ActivityType'
        }
    ,
    duration: {
        type: Schema.Types.Decimal128
    },
    commentText: {
        type: String,
        required: true,
        trim: true,
    },
    // add category reference
    category: 
        {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    ,
});

const Activity = model('activity', activitySchema);

module.exports = Activity;