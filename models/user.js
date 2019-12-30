const Joi = require('joi');
const mongoose = require("mongoose");


//wydaje mi się, że to nie jest konieczne, że wystarczy to, co w index.js
mongoose
  .connect("mongodb://localhost/users")
  .then(() => console.log("connected to Mongo..."))
  .catch(err => console.log("Error", err));

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  email: String,
  isAdmin: Boolean,
  playlist: [Object]
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = new User({
    login: "Admin",
    password: "Admin123",
    email: "admin@gmail.com",
    isAdmin: true,
    playlist: []
  });

  const result = await user.save();
  console.log(result);
}


//wydaje mi się, że to (rozbudowane) powinno być w routes/users.js
async function getUsers() {
  const users = await User.find();
  console.log(users);
}

getUsers();