const db = require("../config/connection");
const { Activity, ActivityType, Category, User } = require("../models");
const cleanDB = require("./cleanDB");

const categoryData = require("./categoryData.json");
const activityTypeData = require("./activityTypeData.json");
let activityData = require("./activityData.json");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Activity", "activities");
  await cleanDB("ActivityType", "activityTypes");

  const categoriesRaw = await Category.insertMany(categoryData);

  const categories = {};
  categoriesRaw.forEach((category) => {
    categories[category.catName] = category._id;
  });

  console.log("Categories seeded!");

  const activitiesRaw = await ActivityType.insertMany(activityTypeData);

  const activities = {};
  activitiesRaw.forEach((activity) => {
    activities[activity.actName] = activity._id;
  });

  console.log("ActivityTypes seeded!");

  activityData = activityData.map(activity=>{
    activity.category=categories[activity.category]
    activity.activityType=activities[activity.activityType]
    return activity
  })
console.log(activityData);

await Activity.insertMany(activityData);
  
process.exit(0);
});
