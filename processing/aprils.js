var MONGO = require('mongodb').MongoClient
,__ = require('underscore')
,MOMENT = require('moment')
;

var get_bellies = (db,CEEBEE)=>{
	db.collection('bellies').find().toArray((err,docs)=>{

var RD={}
RD.rows=[]
__.each(docs,(D)=>{
    delete(D.collection)
    delete(D.Location)
    delete(D._id)
    D.ts_as_ts=MOMENT(D.timestamp,['MM/DD/YYYY h:mm:ss A']).unix()
if(D.timestamp.split("/")[0]==04)
    {RD.rows.push(D)}
    delete(D.timestamp)
})

console.log(JSON.stringify(RD));
CEEBEE();


	}) // toarray

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