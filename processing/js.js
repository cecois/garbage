var MONGO = require('mongodb').MongoClient
,__ = require('underscore')
,MOMENT = require('moment')
;

var get_bellies = (db,CEEBEE)=>{
	db.collection('bellies').find().toArray((err,docs)=>{

var uniqz = __.uniq(__.pluck(docs,"description"))

var RP = {}
RP.rows=[]

__.each(uniqz,(U,i,l)=>{

var records = __.filter(docs,{description:U})

// console.log("there are "+records.length+" entries for "+U);


var p = __.partition(records,(R)=>{
return (MOMENT(R.timestamp,['MM/DD/YYYY h:mm:ss A']).unix()<MOMENT("04/21/2014 00:00:00 AM",['MM/DD/YYYY h:mm:ss A']).unix())
})//partion

// if(typeof __.last(p[0]) !== 'undefined'){console.log("p[0]:");console.log(__.last(p[0]).description+" before w/ ts:"+__.last(p[0]).timestamp);}
// if(typeof __.first(p[1]) !== 'undefined'){console.log("p[1]:");console.log(__.first(p[1]).description+" after w/ ts:"+__.first(p[1]).timestamp);}

var finalz = p[1]
// console.log("typeof finalz");
// console.log(typeof finalz);
// console.log("length of finalz b4 prepend:");console.log(finalz.length);
if(typeof __.last(p[0]) !== 'undefined'){finalz.dprior=__.last(p[0])}
// console.log("length of finalz aft prepend:");console.log(finalz.length);

__.each(finalz,(R,i)=>{



delete R.Location
delete R.collection



// var ts = MOMENT(R.timestamp,['MM/DD/YYYY h:mm:ss A']).unix()
// console.log("ts for "+R.description+" ("+i+")",ts);

if(R.timestamp.split("/")[0]==04){
RP.rows.push(R)
}
}) // each.finalz

})//each.uniqz

// console.log(JSON.stringify(RP));

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