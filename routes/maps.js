var express = require("express");
var router = express.Router();


router.post("/trip", (req, res) => {
    const { coordinates, transport } = req.body;
    
    if (!coordinates || !transport) {
        return res.status(400).json({ error: 'Missing coordinates or transport type' });
      }

      if (
        !Array.isArray(coordinates) ||
        coordinates.length < 2 ||
        typeof transport !== 'string'
      ) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const requestCoordinates = {
        coordinates: coordinates
      };

    //coordinates = [[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]];
    console.log("checking")
    fetch(
        `https://api.openrouteservice.org/v2/directions/${transport}/geojson`,
        {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'OPENROUTESERVICE_API_KEY'
            },
            body: JSON.stringify(requestCoordinates)
          }
      )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
    .catch((error) => {
      console.error("Erreur lors de la récupération des articles :", error);
      res.status(500).json({ result: false, message: "Erreur serveur" });
  });
  });
  
/*
driving-car
cycling-regular
foot-walking	
wheelchair
 */

// let request = new XMLHttpRequest();

// request.open('POST', "https://api.openrouteservice.org/v2/directions/driving-car/geojson");

// request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
// request.setRequestHeader('Content-Type', 'application/json');
// request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248b1f668c85470414aa84163c5ce607245');

// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }
// };


// request.send(body);
// const body = '{"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]]}';
