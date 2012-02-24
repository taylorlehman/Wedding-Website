//TO-DO: Examine for scope problems

//Variables for response + callback
var response = null;
var callback = "";


//https://github.com/marak/node_mailer
var email = require('./node_modules/mailer');

//Variables for email sending
var email_options = {
			  host : "smtp.live.com",              // smtp server hostname
			  port : "25",                     // smtp server port
			  to : "taylor.lehman@gmail.com,caseybi@gmail.com",
			  from : "taylor.lehman@hotmail.com",
			  body: "Check out the full list of RSVPs here: http://www.caseyandtaylor.com/admin.html (or just check the dropbox on your desktop)!",
			  authentication : "login",        // auth login is supported; anything else is no auth
			  username : "taylor.lehman@hotmail.com",       // Base64 encoded username
			  password : "<INSERT PASSWORD HERE>"        // Base64 encoded password
		    }	

//Build Response
function build_response(code, record){
	var response_object = {"code": code, "record": record};
	response.end(callback + "(" + JSON.stringify(response_object) + ")");
}

//Commits the RSVP to the database
exports.commit = function (client_rsvp, api_response, api_callback){
	//Save the input variables to the namespace state
	response = api_response;
	callback = api_callback;
	
	//Connect to the DB
	var mongo = require('./node_modules/mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

	var server = new Server('localhost', 27017, {auto_reconnect: true});
	var db = new Db('rsvp', server);
 	
	//Open the Database
  	db.open(function(err, db) {

	    	//If there was not an error connecting to the DB
	    	if(!err) {
	      		console.log("Connected to: " + db.databaseName);
	
			//Check for collection availability
		      	db.collection('rsvp_responses', function(CollectionErr, collection) {
				//If there wasn't an error connecting to the collection		
				if(!CollectionErr){
					console.log("Successfully connected to the collection");
					
					//Append the datetime to the rsvp object
					var current_date = new Date();
					client_rsvp.RSVPTimestamp = current_date.getMonth() + "/" + current_date.getDate() + "/" + current_date.getFullYear();
					
					//Attempt to save the client_rsvp into the database
					console.log("Attempting to save to database:" +  client_rsvp);
					collection.save(client_rsvp, {safe:true}, function(SaveErr, record){
						//If there was NOT an error saving				
						if(!SaveErr){
							console.log('Successfully entered into DB:' + JSON.stringify(client_rsvp));
							
							//Send the response to the client
							build_response("1", record);

							//Send an email about the successful rsvp
							var response_string = "";
							if(record.Response == "1"){
								response_string = "Accepts, with Pleasure";
							} else {
								response_string = "Declines, with Regret";
							}
							email_options.subject = "RSVP from " + record.person1.FirstName + " " + record.person1.LastName + ": " + response_string + " (" + record.Location + ")";												
							email.send(email_options,
							function(err, result){
								if(err){ 
									console.log("There was an error sending the email: " + err); 
								} else { 
									console.log("Email successfully sent!");
								}
							});
							
							//Post to the dropbox
							var dropBoxHandler = require("./postToDropbox");
							dropBoxHandler.requestDropboxPost(function(){
								console.log("We finished processing all items");
							});					
						} else {
							console.log('Data Insert Failed: ' + SaveErr);
							build_response("0", SaveErr);
						}
					});
				} else {
					console.log("Error connecting to the Collection: " + CollectionError);
					build_response("0", CollectionError);
				}
			});
		} else {
			console.log("We were unable to connect to the DB: " + err)
			build_response("0", err);
		}
	});
}
