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
  res.render('index', { title: 'Express' });
});
router.get('/getAp',function(req,res){
    db.get('appointments')
        .then(function(value){
            res.render('appointmentList',{
                list : value
            })
        })
})

module.exports = router;
