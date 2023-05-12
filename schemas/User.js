const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }]
});

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = {
  User,
  Task
};
