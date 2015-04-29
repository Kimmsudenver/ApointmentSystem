var express = require('express');
var router = express.Router();
//var apps=require('./getAppointments.js')
var redis = require('then-redis');
var db = redis.createClient({
    host: 'localhost',
    port: 6379
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Appointment System' });
});
router.get('/appointment.html',function(req,res){
   res.render('appointment',{title:"Appointment table"});
})

module.exports = router;
