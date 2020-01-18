const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use("/events", router);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(express.static(__dirname + "/public"));

const Event = require("./event.model");
const url =
  "mongodb://whwz:eventspass1@ds361968.mlab.com:61968/events" ||
  process.env.DATABASEURL ||
  "mongodb://127.0.0.1:27017/events";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

router.route("/").get((req, res) =>
  Event.find((err, events) => {
    if (err) {
      console.log(err);
    } else {
      res.json(events);
    }
  })
);

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  Event.findById(id, (err, event) => res.json(event));
});

router.route("/add").post((req, res) => {
  const event = new Event(req.body);
  event
    .save()
    .then(event => {
      res.status(200).json({ event: "event added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new event failed");
    });
});

router.route("/update/:id").post((req, res) => {
  Event.findById(req.params.id, (error, updatedEvent) => {
    if (!updatedEvent) {
      res.status(404).send(error);
    } else updatedEvent.title = req.body.title;
    updatedEvent.date = req.body.date;
    updatedEvent.time = req.body.time;
    updatedEvent.location = req.body.location;
    updatedEvent.description = req.body.description;

    updatedEvent
      .save()
      .then(eventItem => {
        res.json(eventItem);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
});

router.route("/delete/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
