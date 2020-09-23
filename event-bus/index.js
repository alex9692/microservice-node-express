const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);
  try {
    await axios.post("http://localhost:4000/events", event);
  } catch (error) {
    console.log(error);
  }
  try {
    await axios.post("http://localhost:4001/events", event);
  } catch (error) {
    console.log(error);
  }
  try {
    await axios.post("http://localhost:4002/events", event);
  } catch (error) {
    console.log(error);
  }
  try {
    await axios.post("http://localhost:4003/events", event);
  } catch (error) {
    console.log(error);
  }

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.json({ events });
});

app.listen(4005, () => {
  console.log("Listening on PORT:4005");
});
