const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

let query = "Paris";
let temp = "";
let main = "";
let icon = "";
let description = "";
let humidity = "";
let speed = "";
let imgUrl = "";

app.get("/", function(req, res) {
    const apiKey = process.env.API_KEY;
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;


    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
             temp = weatherData.main.temp;
            //  console.log(temp);
             description = weatherData.weather[0].description;
             icon = weatherData.weather[0].icon;
             speed = weatherData.wind.speed;
             humidity = weatherData.main.humidity;
             main = weatherData.weather[0].main;
            // res.write(`<h1>The current temperature in ${query} is ${temp} degrees</h1>`);
            // res.write(`<h2>The current weather is ${description}</h2>`);
            // res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
            // res.send();
             imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.render('index', {temp: temp, description: description, icon: imgUrl, query: query, speed: speed, humidity: humidity, main: main});
            
        });
        // response.end("ok");  end of response
    });

//    res.sendFile(__dirname + "/public/index.ejs");
// res.render('index', {temp: ''})

});

app.post("/", function(req, res) {

    query = req.body.cityName;
    res.redirect("/");
    
});



app.listen(process.env.PORT || 5050, function() {
    console.log("Server running on port 5050!");
});