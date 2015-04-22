/**
 * Created by kim on 4/21/15.
 */
var socket= io.connect('http://localhost:3000')
socket.on('appointments',function(data){
    console.log(data)
})