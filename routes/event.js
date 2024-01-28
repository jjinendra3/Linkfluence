const express = require("express");
const app = express.Router();
const Checkuser = require("../middleware/CheckUser");
const Event = require("../models/Events");
const EventManager = require("../models/EventManagement");

app.post("/addevent", Checkuser, async (req, res) => {
  if (!req.checker) {
    res.status(201).json({
      success: true,
      message: "User Not Found!",
    });
  }
  try {
    const { name, datetime, theme, venue, venuelink, expectedbudget } =
      req.body;
    const userid = req.user_id;
    const AddEvent = {
      name,
      datetime,
      theme,
      venue,
      venuelink,
      expectedbudget,
      userid,
    };
    const adder = await Event.create(AddEvent);
    const eventcompany = await EventManager.findOne({ _id: userid });
    eventcompany.events_id.push(adder._id.toString());
    await eventcompany.save();
    res.status(201).json({
      success: true,
      message: "Event added successfully!",
      event: AddEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
module.exports = app;
