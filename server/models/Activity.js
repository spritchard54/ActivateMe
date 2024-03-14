const { Schema, model } = require('mongoose');
const Category = require('./Category');


function getDuration(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};

const activitySchema = new Schema({
    activityType:
    {
        type: Schema.Types.ObjectId,
        ref: 'ActivityType'
    }
    ,
    duration: {
        type: Schema.Types.Decimal128,
        default: 0,
        get: getDuration
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
},
    { toJSON: { getters: true } });

const Activity = model('activity', activitySchema);

module.exports = Activity;