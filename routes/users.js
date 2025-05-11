var express = require('express');
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const {checkBody} = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//SIGN UP USER
router.post("/signup", (req, res) => {
  console.log("checking")
  if (!checkBody(req.body, ["username", "password"])) {
    //res.json({ result: false, error: "Missing or empty fields" });
    res.status(400).json({ result: false, error: "Missing required fields" });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        token: uid2(32),
      });

      newUser.save().then((newDoc) => {
        //res.json({ result: true, token: newDoc.token });
        res.status(201).json({ result: true, message: "New user created",  token: newDoc.token  });

      });
    } else {
      // User already exists in database
      //res.json({ result: false, error: "User already exists" });
      res.status(409).json({ result: false, error: "User already exists" });
    }
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ result: false, message: "Erreur serveur" });
});
});

//SIGN IN USER
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    //res.json({ result: false, error: "Missing or empty fields" });
    res.status(400).json({ result: false, error: "Missing required fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      //res.json({ result: true, token: data.token });
      res.status(200).json({ result: true, message: "User identified",  token: data.token  });
    } else {
      //res.json({ result: false, error: "User not found or wrong password" });
      res.status(409).json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;


