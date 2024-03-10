const db = require('../config/connection');
const { Activity, ActivityType, Category, User } = require('../models');
const cleanDB = require('./cleanDB');

const categoryData = require('./categoryData.json');
const activityTypeData = require('./activityTypeData.json');

db.once('open', async () => {
  await cleanDB('Category', 'categories');

  await Category.insertMany(categoryData);

  console.log('Categories seeded!');

  await ActivityType.insertMany(activityTypeData);

  console.log('ActivityTypes seeded!');
  
  process.exit(0);
});
