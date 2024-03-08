const db = require('../config/connection');
const { Activity, ActivityType, Category, User } = require('../models');
const cleanDB = require('./cleanDB');

const categoryData = require('./categoryData.json');

db.once('open', async () => {
  await cleanDB('Category', 'categories');

  await Category.insertMany(categoryData);

  console.log('Categories seeded!');
  process.exit(0);
});
