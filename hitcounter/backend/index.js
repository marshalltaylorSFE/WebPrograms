var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var db =  monk('localhost:27017/hitcounterdb');
var app = new express();

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	//db.driver.admin.listDatabases(function(e,dbs){
	//    res.json(dbs);
	//});
	res.writeHead(200, {'Content-Type': 'text/html'});

	var collection = db.get("testCollection");
	collection.update({"hits":{$exists:true}},{$inc:{"hits":1}});
	collection.find({ hits: {$exists:true}},{limit:20},function(e,docs){
		//var obj = docs;
		console.log(docs[0].hits);
		//console.log(obj.hits);
		//var loc = docs.indexOf("hits:");
		res.write("Hello World!<br><br>");
		res.write("Page hits: " + docs[0].hits);
		res.end();
		})
});
app.get('/collections',function(req,res){
	db.driver.collectionNames(function(e,names){
		res.json(names);
	})
});
app.get('/collections/:name',function(req,res){
	var collection = db.get(req.params.name);
	console.log(req.params.name);
	collection.find({},{limit:20},function(e,docs){
		res.json(docs);
	})
});

app.get('/system/hits',function(req,res){
	var collection = db.get("testCollection");
	collection.find({ hits: {$exists:true}},{limit:20},function(e,docs){
		res.json(docs);
	})
});

app.put('/system/hits',function(req,res){
	var collection = db.get("testCollection");
	collection.update({"hits":{$exists:true}},{$inc:{"hits":1}});
	collection.find({ hits: {$exists:true}},{limit:20},function(e,docs){
		res.json(docs);
	})
});

console.log("Listening on port 3000");
app.listen(3000)