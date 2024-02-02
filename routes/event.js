const express = require("express");
const app = express.Router();
const Event = require("../models/Events");
const EventManager = require("../models/EventManagement");
const CheckUser = require("../middleware/CheckUser");

app.post("/addevent", CheckUser, async (req, res) => {
  if (!req.checker || req.type !== "Event") {
    res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const { name, datetime, theme, venue, venuelink, expectedbudget,images } =
      req.body;
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
      images
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
    console.error("Error adding event:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});


app.post("/get-all-events-by-month-year", CheckUser, async function (req, res) {
  if (!req.checker) {
    res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const { selectedMonths, selectedYears } = req.body;
    if (!selectedMonths || !selectedYears) {
      return res.status(400).json({
        success: false,
        message: "Selected months and years are required in the request body.",
      });
    }

    const events = await Event.find({
      $or: [
        {
          $and: [
            { months: { $in: selectedMonths } },
            { years: { $in: selectedYears } },
          ],
        },
        {
          $and: [
            { months: { $in: selectedMonths } },
            { years: { $in: selectedYears.map((year) => year.toString()) } },
          ],
        },
      ],
    });
    const projectedEvents = events.map((event) => ({
      _id: event._id,
      name: event.name,
      datetime: event.datetime,
      theme: event.theme,
      venue: event.venue,
      venuelink: event.venuelink,
      firstImage: event.images[0],
    }));
    return res.status(200).json({
      success: true,
      events: projectedEvents,
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = app;
