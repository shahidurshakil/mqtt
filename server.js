

const express = require ('express')
const bodyParser = require('body-parser')
const mongojs  = require('mongojs')
const db = mongojs('mongodb://shahidurshakil:11221323@ds125255.mlab.com:25255/firealarmsystem',['sensordata']);
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

const app=express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(function (req, res) {
 //res.setHeader('Content-Type', 'text/plain')
 //res.write('you posted:\n')
 //res.end(JSON.stringify(req.body, null, 2))
//})

app.get('/showdata', function (req, res){
    db.sensordata.find(function( err,docs)
{res.send(docs);

});
})

app.post('/data'), function(req,res){

    //const data = req.body;
    db.sensordata.save(req.body);
    res.json(req.body)
}

app.listen(3000, function(){
    console.log('exaple app listening on port 3000!')
})
client.on('connect', function () {
    client.subscribe('shakil')
    //client.publish('shakil', 'Hello mqtt')
  })
   
   
  
  client.on('message', function (topic, message) {
    // message is Buffer
    db.sensordata.save(JSON.parse(message.toString()));
    console.log(message.toString())
    //client.end()
  })
