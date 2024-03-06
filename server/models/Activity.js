const { Schema, model } = require('mongoose');
const Category = require('./Category');


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
    // add category reference
    category: [Category]
});

const Activity = model('activity', activitySchema);

module.exports = Activity;