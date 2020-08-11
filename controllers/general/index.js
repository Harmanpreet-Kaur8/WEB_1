const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
  let meals = await Meal.find({ highlight: true }).lean();
  meals.map(meal => {
    meal.mealImage.data = meal.mealImage.data.toString('base64');
  })
  res.render('general/index', { title: "Home Page", meals });
}