const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const authenticate = require('./middlewares/authMiddleware')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User, Task } = require('./schemas/User');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

mongoose.connect('mongodb+srv://curranod840:4w3KLhRyD1dUevTs@todone.3glfliv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
  }).catch((error) => {
    console.log(error)
  })

//Register and Login--------------------------------------------------------------

app.post('/register', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  let salt = await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    username: username,
    password: hashedPassword,
    email: email
  })
  if (user) {
    await user.save()
    const token = jwt.sign({ username: user.username }, 'SECRETKEY')
    res.json({ token: token, success: true })
  } else {
    res.json({ success: false, message: "user already exists" })
  }
})

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const user = await User.findOne({username: username, email: email});
  console.log(user)
  if(user) {
    const result = bcrypt.compare(password, user.password)
      if (!result) {
        res.json({success: false, message: 'unable to authenticate'});
      } else {
        const token = jwt.sign({username: user.username}, 'SECRETKEY');
        res.json({success: true, token: token});
      }
    } else {
    res.json({success: false, message: 'user not fond'});
  }
});

// Tasks----------------------------------------------------------------------------

app.post("/:userId/addtasks", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    });

    // Save the task to the database
    await task.save();

    // Add the task to the user's tasks array
    user.tasks.push(task);

    await user.save();

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/:userId/tasks", async (req, res) => {
  const user = await User.findById(req.params.userId).populate("tasks");
  res.json(user.tasks)
  
})
//645996fbf67a92ccba8b9577


app.listen(8080, () => {
  console.log('server running ')
})