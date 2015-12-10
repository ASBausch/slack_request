var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//using mongoose to simplify our data grab
mongoose.connect('mongodb://localhost/eta_channels');

var Channels = mongoose.model('Channels', {name:String});

//getting data from the database and sending to the page
router.get('/', function(req, res, next) {
    return Channels.find({
        wish: {$exists: false}
    }).sort({name:1}).exec(function(err, channels){
        if(err) throw new Error(err);
        //turns our mongo data into a usable jSon object
        var data = JSON.stringify(channels);
        res.send(data);
    });
});

module.exports = router;
