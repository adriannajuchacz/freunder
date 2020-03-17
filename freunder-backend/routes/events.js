const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");

// Gets All Events
router.get("/", (req, res) => {
  Event.find({}).then(events => {
    res.status(200).send({
      success: "true",
      message: "events retrieved successfully",
      events: events
    });
  });
});

// get event with id
router.get("/:id", (req, res) => {
  Event.findOne({ _id: req.params.id }).then(event => {
    if (!event) {
      res.status(404).send({
        success: "false",
        message: "No event found"
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "Event retrieved successfully",
        event: event
      });
    }
  });
});

// CREATE EVENT
router.post("/", (req, res) => {
  let { name, link, location, date, user_id } = req.body;
  let errors = [];
  //TODO: validation
  if (!name || !link || !location || !user_id) {
    errors.push({ msg: "Please enter all fields" });
  }
  User.findOne({ _id: user_id }).then(user => {
    if (!user) {
      errors.push({ msg: "User not found" });
    }
    if (!date) {
      date = Date.now();
    } else {
      date = Date.parse(date);
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

// update event
router.put("/:id", (req, res) => {
  let { name, link, location, date, user_id } = req.body;
  let errors = [];
  //TODO: validation
  if (!name || !link || !location || !user_id) {
    errors.push({ msg: "Please enter all fields" });
  }
  Event.findOne({ _id: req.params.id }).then(event => {
    if (!event) {
      res.status(404).send({
        success: "false",
        message: "No event found"
      });
    }
    let { name, link, location, date } = req.body;
    let errors = [];
    //TODO: validation
    if (!name || !link || !location) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (!date) {
      date = Date.now();
    } else {
      date = Date.parse(date);
    }
    if (errors.length > 0) {
      res.status(400).send({
        success: "false",
        messages: errors,
        event_create_data: req.body
      });
      return;
    }
    event = new Event({
      name,
      link,
      location,
      date
    });
    // SAVE EVENT
    event
      .save()
      .then(event => {
        res.status(200).send({
          success: "true",
          message: "Event updated successfully",
          event: event
        });
      })
      .catch(err => console.log(err));
  });
});
module.exports = router;
