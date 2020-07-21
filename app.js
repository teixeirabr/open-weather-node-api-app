const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config({});
const { API_KEY } = process.env;
const { response } = require("express");

const app = express();
let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;

// app.get("/", (req, res) => {
//   res.send("Server is running.");
// });

const weatherController = (req, res) => {
  axios
    .get(baseUrl)
    .then((response) => {
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
      return res
        .status(200)
        .send(
          `<h2>The temperature in London is ${response.data.main.temp} degrees Celsius and the weather has ${response.data.weather[0].description} </h2> `
        );
    })
    .catch((error) => {
      console.log(error);
    });
};

app.get("/", weatherController);

let port = 3000;

app.listen(port, () => console.log(`server is listening on ${port}`));
