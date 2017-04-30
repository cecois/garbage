var MONGO = require('mongodb').MongoClient
,__ = require('underscore')
,FS = require('fs')
,MOMENT = require('moment')
;

var t = "animebos"
// var event = require()

// Get content from file
 var event = FS.readFileSync("../src/assets/bellies.2014-"+t+".json");

event.toArray((err,docs)=>{
console.log(docs.length);
})