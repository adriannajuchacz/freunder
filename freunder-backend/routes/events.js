const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");

// Gets All Events
router.get("/", (req, res) => {
  Event.find({}).then((events) => {
    res.status(200).send({
      success: "true",
      message: "events retrieved successfully",
      events: events,
    });
  });
});

// get event with id
router.get("/:id", (req, res) => {
  Event.findOne({ _id: req.params.id }).then((event) => {
    if (!event) {
      res.status(404).send({
        success: "false",
        message: "No event found",
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "Event retrieved successfully",
        event: event,
      });
    }
  });
});

// delete event with id
router.delete("/:id", (req, res) => {
  Event.deleteOne({ _id: req.params.id }).then((event) => {
    if (!event) {
      res.status(404).send({
        success: "false",
        message: "No event found",
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "User deleted successfully"
      });
    }
  });
});

// CREATE EVENT
router.post("/", (req, res) => {
  let {
    title,
    location,
    description,
    imgLink,
    link,
    start,
    end,
    user_id,
  } = req.body;
  let errors = [];
  //TODO: validation
  if (!title || !location || !description || !imgLink || !link || !user_id) {
    errors.push({ msg: "Please enter all fields" });
  }
  User.findOne({ _id: user_id }).then((user) => {
    if (!user) {
      errors.push({ msg: "User not found" });
    }
    // TODO: start & should come from frontend
    if (!start) {
      start = Date.now();
    } else {
      start = Date.parse(start);
    }
    if (!end) {
      end = Date.now();
    } else {
      end = Date.parse(end);
    }
    if (errors.length > 0) {
      res.status(400).send({
        success: "false",
        messages: errors,
        event_create_data: req.body,
      });
      return;
    }
    const newEvent = new Event({
      title,
      location,
      description,
      imgLink,
      link,
      start,
      end,
    });
    // SAVE USER
    user.createdEvents.push(newEvent);
    user.save().catch((err) => console.log(err));
    // SAVE EVENT
    newEvent.creator = user;
    newEvent
      .save()
      .then((event) => {
        res.status(200).send({
          success: "true",
          message: "Event created successfully",
          event: event,
        });
      })
      .catch((err) => console.log(err));
  });
});

// update event
router.put("/:id", (req, res) => {
  let {
    title,
    location,
    description,
    imgLink,
    link,
    start,
    end,
    user_id,
  } = req.body;
  let errors = [];
  //TODO: validation
  if (!title || !location || !description || !imgLink || !link || !user_id) {
    errors.push({ msg: "Please enter all fields" });
  }
  Event.findOne({ _id: req.params.id }).then((event) => {
    if (!event) {
      res.status(404).send({
        success: "false",
        message: "No event found",
      });
    }
    if (!start) {
      start = Date.now();
    } else {
      start = Date.parse(start);
    }
    if (!end) {
      end = Date.now();
    } else {
      end = Date.parse(end);
    }
    if (errors.length > 0) {
      res.status(400).send({
        success: "false",
        messages: errors,
        event_create_data: req.body,
      });
      return;
    }
    const updatedEvent = new Event({
      title,
      location,
      description,
      imgLink,
      link,
      start,
      end,
    });
    const updatedData = {
      $set: {
        title: updatedEvent.title,
        location: updatedEvent.location,
        description: updatedEvent.description,
        imgLink: updatedEvent.imgLink,
        link: updatedEvent.link,
        start: updatedEvent.start,
        end: updatedEvent.end,
      },
    };
    Event.updateOne({ _id: req.params.id }, updatedData, (err) => {
      if (err) {
        res.status(403).send({
          success: "false",
          message: "Event not updated",
          event: updatedEvent,
        });
      }
    })
      .then((event) => {
        res.status(200).send({
          success: "true",
          message: "Event updated successfully",
          event: updatedEvent,
        });
      })
      .catch((err) => console.log(err));
  });
});
module.exports = router;
