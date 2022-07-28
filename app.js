const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

let query = "Paris";
app.get("/", function(req, res) {
    
    const apiKey = process.env.API_KEY;
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const speed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const main = weatherData.weather[0].main;
            // res.write(`<h1>The current temperature in ${query} is ${temp} degrees</h1>`);
            // res.write(`<h2>The current weather is ${description}</h2>`);
            // res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
            // res.send();
            const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.render('index', {temp: temp, description: description, icon: imgUrl, query: query, speed: speed, humidity: humidity, main: main});
            
        });
    });
});

app.post("/", function(req, res) {

   query = req.body.cityName;

//    res.sendFile(__dirname + "/public/index.ejs");
// res.render('index', {temp: ''})

});

app.post("/", function(req, res) {

    query = req.body.cityName;
    res.redirect("/");
    
});



app.listen(5050, function() {
    console.log("Server running on port 5050!");
});