/**
 * Created by kim on 4/20/15.
 */

var redis = require('then-redis');
var db = redis.createClient({
    host: 'localhost',
    port: 6379
});



exports.getAp = function(req,res){
    db.get('appointments')
        .then(function(value){
        res.send(value);
    })
}