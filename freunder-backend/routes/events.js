const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");

router.post("/", (req, res) => {
  let { name, link, location, date, user_id } = req.body;
  let errors = [];
  //TODO: validation
  if (!name || !link || !location || !user_id) {
    errors.push({ msg: "Please enter all fields" });
  }
  if (date && !(date instanceof Date)) {
    errors.push({ msg: "Date in wrong format" });
  }
  User.findOne({ _id: user_id }).then(user => {
    if (!user) {
      errors.push({ msg: "User not found" });
    }
    // TODO: DATE FORMAT
    if (!date) {
      date = Date.now();
    }
    if (errors.length > 0) {
      res.status(400).send({
        success: "false",
        messages: errors,
        event_create_data: req.body
      });
      return;
    }
    const newEvent = new Event({
      name,
      link,
      location,
      date
    });
    // SAVE USER
    user.createdEvents.push(newEvent);
    user.save().catch(err => console.log(err));
    // SAVE EVENT
    newEvent.creator = user;
    newEvent
      .save()
      .then(event => {
        res.status(200).send({
          success: "true",
          message: "Event created successfully",
          event: event
        });
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
