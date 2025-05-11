var express = require("express");
var router = express.Router();

const Plans = require("../models/plans");

//https://app.ticketmaster.com/discovery/v2/events.json?apikey=tf69ta5IS6MOABhEbvFxoFAa1z07wtC0&city=New+York&startDateTime=2025-04-20T00:00:00Z&endDateTime=2025-04-20T23:59:59Z

//GET CLASSIFICATIONS
router.get("/classifications", (req, res) => {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${TICKETMASTER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ result: false, message: "no categories found" });
      } else {
        console.log(data);
        const receivedClassifications = data._embedded.classifications.map(
          (c) => c.segment.name
        );
      //   const genres = data._embedded.classifications.flatMap((c) =>
      //     c.segment._embedded.genres.map((g) => g.name)
      // );
      res.status(200).json({ result: true, classifications: receivedClassifications });
    }
    })
    .catch((error) => {
      console.error("error while getting classifications:", error);
      res.status(500).json({ result: false, message: "Server error" });
    });
});

//GET EVENTS
//classification example: Arts%20%26%20Theater
//Nota: Asegúrate de URL-encodear los espacios y caracteres especiales (por ejemplo, "Arts & Theater" se convierte en Arts%20%26%20Theater).
router.get("/events", (req, res) => {
  const { classification, city, dateFrom, dateTo } = req.query;
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&city=${city}&startDateTime=${dateFrom}&endDateTime=${dateTo}Z&classificationName=${classification}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ result: false, message: "no events found" });
      } else {
        res.status(200).json({ result: true, events: data });
        console.log(data);
      }
    })
    .catch((error) => {
      console.error("error while getting events :", error);
      res.status(500).json({ result: false, message: "Server error" });
    });
});


module.exports = router;
