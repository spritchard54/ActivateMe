const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    catName: {
        type: String,
        required: true,
        trim: true,
    },
});

const Category = model('category', categorySchema);

module.exports = Category;