//Method for returning to the caller of the API a JSON object in the following format:
//property attendees
//property declines
//property vegetarians
//array rsvps

function computeStats(doc){
	var attendees = 0;
	var declines = 0;
	var vegetarians = 0;

	if(doc.Response == 1){
		attendees++;
		if(doc.person1.Vegetarian == "true"){
			vegetarians++;
		} 
		if(doc.person2 != null){
			attendees++;
			if(doc.person2.Vegetarian == "true"){
				vegetarians++;
			}
		}
	} else {
		declines++;
	}

	return {"attendees" : attendees, "declines" : declines, "vegetarians" : vegetarians};
}

function build_response(code, record, res, callback){
	var response_object = {"code": code, "record": record};
	console.log("Sending data" + JSON.stringify(response_object) + "\n");
	res.end(callback + "(" + JSON.stringify(response_object) + ")");
}

exports.lookup = function (event_name, api_response, api_callback){
	var response_object = new Object();
	var response = null;
	var callback = null;
	var attendees = 0;
	var declines = 0;
	var vegetarians = 0;

	console.log("Entered view.lookup method");

	//Set the global response object
	response = api_response;
	callback = api_callback;

	//Connect to the DB: https://github.com/christkv/node-mongodb-native
	var mongo = require('./node_modules/mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

	var server = new Server('localhost', 27017, {auto_reconnect: true});
	var db = new Db('rsvp', server);

	db.open(function(err, db) {

	    	//If there was not an error connecting to the DB
	    	if(!err) {
	      		console.log("Connected to: " + db.databaseName);

			//Pull collection from DB
			db.collection('rsvp_responses', function(CollectionErr, collection) {
				//If there wasn't an error connecting to the collection		
				if(!CollectionErr){
					console.log("Successfully connected to the collection");
					
					//Lookup all events based on the event named provided by the caller
					collection.find({"Location": event_name}, function(findErr, cursor){
						if(!findErr){
							//TO-DO: Handle the no results case
							console.log("Collection Query was successful");
							
							//Run the following on each document returned from the query
							response_object.rsvps = [];							
							cursor.each(function(eachErr, doc){
								if(!eachErr){
									if(doc == null){
										//If the document is null, we've walked through them all.
										response_object.event_name = event_name;										
										response_object.attendees = attendees;
										response_object.declines = declines;
										response_object.vegetarians = vegetarians;
										build_response("1", response_object, response, callback);
									} else {
										console.log("Looking at Document" + JSON.stringify(doc) + "\n");											
										//If we are on a valid document - compute stats for that element
										var tempstats = computeStats(doc);
										attendees = attendees + tempstats.attendees;
										declines = declines + tempstats.declines;
										vegetarians = vegetarians + tempstats.vegetarians;

										//Also add to the rsvps array
										response_object.rsvps.push(doc);
									}
								} else {
									build_response(0, eachErr, response, callback);
								}
							});
						} else {
							build_response(0, findErr, response, callback);
						}			
					});
				} else {
					build_response(0, CollectionErr, response, callback);
				}
			});
		} else {
			build_response(0, err, response, callback);
		}
	});
}

