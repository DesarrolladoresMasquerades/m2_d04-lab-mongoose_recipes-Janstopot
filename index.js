const mongoose = require('mongoose');
require('dotenv').config()
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.yx19v.mongodb.net/recipe-app?retryWrites=true&w=majority`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    Recipe.deleteMany()
    .then(() => {
      data.forEach((recipe) => {console.log(recipe.title)})
      Recipe.insertMany(data)
      .then(() => {
        Recipe.findOneAndUpdate(
         {title: {$eq: "Rigatoni alla Genovese"}},
         {$set: {duration: 100}},
         { new: true }
       )
       
       //
       .then(()=>{
        Recipe.deleteOne({title: {$eq:"Carrot Cake"}})
        data.forEach((recipe) => {console.log(recipe.title)})
       })
       .then(()=> mongoose.connection.close())
       //.catch(error => console.log(error))
       
      })
    })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
 })
 //mongoose.connection.close()

  ////////////// ITERATION 2
/*
Recipe.create({
  title: "Sopa de misco",
  level: "UltraPro Chef",
  ingredients: ["Misco", "agua", "sal"],
  cuisine: "Casera",
  dishType: "soup",
  duration: 5,
  creator: "Ferran Adrià",
})
*/




