var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//using mongoose to simplify our data grab
//mongoose.connect('mongodb://localhost/eta_channels');
//this creates our new collection and sets the model for it
var Wishes = mongoose.model('channels', {name:String, purpose:String, wish:Boolean});


router.post('/', function(req, res, next) {
    //takes data from our submission and inserts it into the database the "new" wishes have an extra
    //field, making them easily sortable
    var wish = new Wishes({name: req.body.name, purpose: req.body.purpose, wish: req.body.wish});
    wish.save(function(err){
        if(err) console.log('meow %s', err);
    });
});

//getting data from the database and sending to the page
router.get('/', function(req, res, next) {
    return Wishes.find({
        wish: {$exists: true}
    }).exec(function(err, wishes){
        if(err) throw new Error(err);
        //turns our mongo data into a usable jSon object
        var data = JSON.stringify(wishes);
        res.send(data);
    });
});



module.exports = router;
