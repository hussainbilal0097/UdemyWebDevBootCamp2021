const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res)
{
  const query = req.body.cityName;
  const apiKey = "a82328c5377a8dd8f2821f09a8c2e745";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+""
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data",function(data)
  {
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const icon = weatherData.weather[0].icon
    const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<h1>The Temperature in "+req.body.cityName+" is " +temp + "</h1>")
    res.write("<img src="+ imgURL +">");
    res.send();
  })
  });

});



app.listen(3000, function() {
  console.log("The server is running at port 3000");
});


// https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=a82328c5377a8dd8f2821f09a8c2e745
// key: a82328c5377a8dd8f2821f09a8c2e745
