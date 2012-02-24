//Catch any unhandled exceptions
process.on('uncaughtException', function (err) {
  console.log('Something went wrong and we were not expecting it: ' + err);
});

//Load the node.js modules
var http = require('http');

//Starting the server
http.createServer(function (req, res) {
	//Break the URL into it's parts
  	var request_url = require('url').parse(req.url);
  
	//Break up the querystring
	var querystring_vars = new Array();
	querystring_vars = require('querystring').parse(request_url.query);

	//Prepare (and return) the response headers
	res.writeHead(200, {'Content-Type': 'application/json'});

	//Based on the action parameter passed in, different things happen
	console.log("Right before switching querystring_var['action'] that has a value of: " + querystring_vars["action"]);
	switch(querystring_vars["action"]){
		case "rsvp":
			var rsvp = require('./rsvp');
			console.log("About to parse:\n" + unescape(querystring_vars["json"]));	
			rsvp.commit(JSON.parse(unescape(querystring_vars["json"])), res, querystring_vars["callback"]);	
			break;
		case "view":
			var view = require('./view');
			console.log("The querystring callback is:" + querystring_vars["callback"]);
			view.lookup(querystring_vars["event"], res, querystring_vars["callback"]);
			break;
		default:
			var response_object = {"code": "0", "record": "The client made an invalid request."};
			res.end(querystring_vars["callback"] + "(" + JSON.stringify(response_object) + ")");
			console.log("invalid action");
			break;
	}
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');

