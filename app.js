const bodyParser = require('body-parser');
const { Console } = require('console');
const express = require('express');
const https = require('https');


const app = express(); 
const PORT = 2500 || process.env.PORT;
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/',(req,res)=>{
    const id= req.body.cityName;
    const unit = 'metric';
    const apiKey='3e3602db34ac6bda597595aa7750214a';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ id +' &appid='+apiKey+ '&units='+ unit+'';

 https.get(url, (response)=>{
    response.on('data',(data)=>{
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription= weatherData.weather[0].description;  

        
            res.write('<h1>The weather is currently ' +  temp +'C in '+ id+'</h1>')
            res.write('<h3>The weather is currently ' + weatherDescription+' </h3>')
    })
 })

   

    
})

 app.listen(PORT,()=>{
    console.log('server is running')
 });