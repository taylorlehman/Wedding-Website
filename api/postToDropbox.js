//https://github.com/sintaxi/node-dbox
var dbox = require("dbox");
//http://nodejs.org/docs/v0.3.1/api/fs.html
var fs = require('fs');

var processing = 0;

function checkNextAttempt(cb){
	if(processing > 0){
		console.log(processing + " items left to process so starting again");
		createAndPostCSV();
	} else {
		console.log(processing + " items remaining, so calling the callback");
		cb();
	}
}

function postToDropbox(csvString, cb){

	//Create a new dropbox client
	var client = dbox.createClient({
	  app_key    : "<INSERT APP KEY HERE>",             // required
	  app_secret : "<INSERT APP SECRET HERE>",           // required
	  root       : "dropbox"            // optional (defaults to sandbox)
	});
	
	console.log("Created new dropbox client");
	
	//These are hard-coded values that are the OAuth tokens that
	//authorize this script access to taylor.lehman@hotmail.com's dropbox
	var userData = { 
		authData: {
			oauth_token_secret: '<INSERT OAUTH SECRET HERE>',
			oauth_token: '<INSERT OAUTH TOKEN HERE>'
		},
		uid: '18342264'
	}
	
	//Post the file to dropbox
	var options = userData.authData;
	options.overwrite = "true";
	
	console.log("Posting file to dropbox");
	
	client.put('./Wedding/rsvp_list.csv', csvString, options, function(status, reply){
		console.log("Post attempt results:");
		console.log(status);
		console.log(reply);
		processing--;
		checkNextAttempt(cb);
	});
}

function convertResponseToString(response){
	if(response == "1"){
		return "Accepts";
	} else {
		return "Declines";
	}
}

function generateCSVLine(doc){
	console.log("Looking at entry");
	
	var tempCSVString = doc.Location + "," + convertResponseToString(doc.Response) + "," + doc.RSVPTimestamp + "," + doc.person1.LastName + "," + doc.person1.FirstName + "," + doc.person1.Vegetarian;
	
	if(typeof doc.person2 != 'undefined'){
		tempCSVString += "," + doc.person2.LastName + "," + doc.person2.FirstName + "," + doc.person2.Vegetarian;
	} else {
		tempCSVString += ", , , ";
	}
	
	return tempCSVString + "\n";
}

function createAndPostCSV(cb){
	//Query the database to determine what records need to be written to the CSV
	//Connect to the DB: https://github.com/christkv/node-mongodb-native
	var mongo = require('./node_modules/mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

	var server = new Server('localhost', 27017, {auto_reconnect: true});
	var db = new Db('rsvp', server);

	//Connect to the DB
	db.open(function(err, db) {

	    	//If there was not an error connecting to the DB
	    	if(!err) {
	      		console.log("Connected to: " + db.databaseName);
			//Pull collection from DB
			db.collection('rsvp_responses', function(CollectionErr, collection) {
				
				//If there wasn't an error connecting to the collection		
				if(!CollectionErr){
					console.log("Successfully connected to the collection");

					//Query for all results
					collection.find({}, function(findErr, cursor){
						if(!findErr){
							console.log("Successfully queried the DB");
							var csvString = "Event,RSVP,RSVP Date,Guest 1 Last Name,Guest 1 First Name,Guest 1 Vegetarian,Guest 2 Last Name, Guest 2 First Name, Guest 2 Vegetarian\n";
							
							//Loop through each result writing a line in the csv file
							cursor.each(function(eachError, doc){
								if(!eachError){
									//It's the last document
									if(doc == null){
										postToDropbox(csvString, cb);	
									} else {
										csvString += generateCSVLine(doc);
									}
								} else {
									console.log("There was an error iterating through the DB results" + eachError);
									processing--;
									checkNextAttempt(cb);
								}
							});
						} else {
							console.log("There was an error querying the DB:" + findErr);
							processing--;
							checkNextAttempt(cb);
						}
					});
				} else {
					console.log("There was an error connecting to the collection: " + collectionErr);
					processing--;
					checkNextAttempt(cb);
				}
			});
		} else {
			processing--;
			console.log("There was an error connecting to the DB:" + err);
			checkNextAttempt(cb);
		}
	});
}

//This method gets called once per RSVP
exports.requestDropboxPost = function (cb){ 
	//If processing is greater than zero, we are already processing something.
	//If so, increment processing and return.  Part of processing is checking
	//if there is anything else to process.
	if(processing > 0){
		console.log("Processing currently running, so going to increment the counter return.");
		console.log("Old Processing:" + processing);
		processing++;
		console.log("New Processing:" + processing);
		return;
	} else {
		console.log("Nothing currently processing, need to kick off new processing");
		console.log("Old Processing:" + processing);
		processing++;
		console.log("New Processing:" + processing);
		createAndPostCSV(cb);				
	}
}
