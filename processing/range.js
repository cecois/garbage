var MONGO = require('mongodb').MongoClient
,__ = require('underscore')
,MOMENT = require('moment')
;

// e.g. 03/23/2014 11:59:59 PM
var Events={
    "marathon":{"start":"04/21/2014 00:00:00 AM","end":"04/22/2014 08:00:00 AM"}
    ,"anime":{"start":"","end":""}
    ,"calling":{"start":"","end":""}
    ,"comiccon":{"start":"","end":""}
    ,"nyd":{"start":"","end":""}
}

var tim_min = Events.marathon.start;
var tim_max = Events.marathon.end;

var get_bellies = (db,CEEBEE)=>{
	db.collection('bellies').find().toArray((err,docs)=>{

var RD={}
RD.rows=[]
__.each(docs,(D)=>{
    delete(D.collection)
    delete(D.Location)
    delete(D._id)
    D.ts_as_ts=MOMENT(D.timestamp,['MM/DD/YYYY h:mm:ss A']).unix()
// if(D.timestamp.split("/")[0]==12)
//     {RD.rows.push(D)}
var from = MOMENT(tim_min,['MM/DD/YYYY h:mm:ss A']).unix();
var to = MOMENT(tim_max,['MM/DD/YYYY h:mm:ss A']).unix();
var time = MOMENT(D.timestamp,['MM/DD/YYYY h:mm:ss A']).unix();
if(time>=from && time<=to){
    delete(D.timestamp)
// RD.rows.push({range:MOMENT(time,['X']).format()+" is in range "});}
RD.rows.push(D)
}

}); //each
// console.log(RD.rows.length+" within range");
console.log(JSON.stringify(RD));
CEEBEE();


	}); // toarray

} // get_bellies

var uri = "mongodb://cecois:r0mjwrD61vaRhWKn@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/garbage?"+
                "replicaSet=CL00-shard-0"+
                "&ssl=true"+
                "&authSource=admin";

MONGO.connect(uri, function(err, db) {
        if ( err ) { console.error('Connection Failed'); return console.log(err); } 
        // console.log("Connected to Mongo Atlas");
        // db.collection('bellies').find().toArray(function(e,d) {
        //      if ( e ) { console.log('error'); console.log(e);  }
        //      console.log(d.length);
        // db.close();    
        // });
          
      get_bellies(db, ()=>{db.close();});

});