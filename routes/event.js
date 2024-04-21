const express = require("express");
const app = express.Router();
const Event = require("../models/Events");
const EventManager = require("../models/EventManagement");
const CheckUser = require("../middleware/CheckUser");

app.post("/addevent", CheckUser, async (req, res) => {
  if (!req.checker || req.type !== "Event" || req.user_id === undefined) {
    return res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const {
      name,
      datetime,
      desc,
      theme,
      venue,
      venuelink,
      expectedbudget,
      images,
    } = req.body;
    const userid = req.user_id;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const months = [];
    const years = [];
    for (const dateKey in datetime) {
      if (datetime.hasOwnProperty(dateKey)) {
        const [day, month, year] = dateKey.split("/");
        const numericMonth = parseInt(month, 10);
        const numericYear = parseInt(year, 10);

        if (!months.includes(monthNames[numericMonth - 1])) {
          months.push(monthNames[numericMonth - 1]);
        }
        if (!years.includes(numericYear)) {
          years.push(numericYear);
        }
      }
    }
    const AddEvent = {
      name,
      datetime,
      theme,
      venue,
      venuelink,
      expectedbudget,
      userid,
      months,
      years,
      images,
      desc,
    };
    const adder = await Event.create(AddEvent);
    const eventcompany = await EventManager.findById(userid);
    eventcompany.events_id.push(adder._id.toString());
    await eventcompany.save();
    res.status(201).json({
      success: true,
      message: "Event added successfully!",
      event: AddEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});


module.exports = app;
