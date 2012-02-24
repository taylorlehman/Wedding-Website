function loadResultsTemplate(data){
	//Load the Details Template
	var rowTemplate = _.template($("#details-row-template").text());
	var tableBodyString = "";
		
	//Loop through each document building a row in the table
	_.each(data.record.rsvps, function(doc){
		var acceptDeclineClass = "";
		var acceptDeclineValue = "";
		var firstPersonVegetarianString = "";
		var secondPersonVegetarianString = "";
		var secondPersonClass = "";
		
		//Check to see if this is an accept or decline
		if(doc.Response == "1"){
			acceptDeclineClass = "accept-td";
			acceptDeclineValue = "Accept";
			
			//Determine if we need to show the second person
			if(typeof doc.person2 != 'undefined'){
				secondPersonClass = "name-td";
				secondPersonVegetarianString = doc.person2.LastName + ", " + doc.person2.FirstName;
				
				//Check if the second person is a vegetarian
				if(doc.person2.Vegetarian == "true"){
					secondPersonVegetarianString += " (V)";
				}
			} else {
				secondPersonClass = "no-guest-td";
				secondPersonVegetarianString = "No Extra Guest";
			}
		} else {
			acceptDeclineClass = "decline-td";
			acceptDeclineValue =  "Decline";
			secondPersonClass = "no-guest-td";
			secondPersonVegetarianString = "No Extra Guest";
		}
	
		//Check if the first person is veggie
		if(doc.person1.Vegetarian == "true"){
			firstPersonVegetarianString = "(V)";
		}
		
		//Add to the string
		tableBodyString += rowTemplate({"person1_LastName" : doc.person1.LastName, "person1_FirstName" : doc.person1.FirstName, "person_1_veggie_string" : firstPersonVegetarianString, "person_2_string" : secondPersonVegetarianString, "accept_decline_class" : acceptDeclineClass, "accept_decline_value" : acceptDeclineValue, "person_2_class" : secondPersonClass});
	});
	
	//Load the framework template
	//Load the Summary Template
	var summaryCountClass = "charlottesville_summary_span";
	if(data.record.event_name == "Seattle"){
		summaryCountClass = "seattle_summary_span";
	}
	
	var frameworkTemplate = _.template($("#framework-template").text());
	$("#results_div").html(frameworkTemplate({
		"attendees" : data.record.attendees, 
		"declines" : data.record.declines, 
		"vegetarians" : data.record.vegetarians,
		"summary_count_class" : summaryCountClass,
		"table_body" : tableBodyString
	}));
}

function loadEmptyResultsTemplate(){
	var emptyResultsTemplate = _.template($("#empty-results-template").text());
	$("#results_div").html(emptyResultsTemplate({}));
}

function loadEventResults(data){
	//Code 1 is success, code 0 is error
	if(data.code == "1"){
		//Need to check if there are any results returned
		if(data.record.rsvps.length == 0){
			loadEmptyResultsTemplate();
		} else {
			loadResultsTemplate(data);
		}
	} else {
		//Load the server error template
		var resultTemplate = _.template($("#details-error-template").text());
		$("#results_div").html(resultTemplate({}));
	}
}

function getData(eventNameString){
	var URL = 'http://107.20.141.198:1337?callback=?&action=view&event=' + eventNameString + '&json={}';
	
	//Make the JSONP call
	$.getJSON( URL, function(data) {
		//When we get the response, fade what is on the screen out and fade in the new info
		$("#results_div").animate({opacity: 0}, 400, function(){
			loadEventResults(data);
			
			$("#results_div").animate({opacity: 1}, 400);
		});
	});
}

$(document).ready(function(){
	//Load the loading template
	var loadingTemplate = _.template($("#loading-template").text());
	$("#results_div").html(loadingTemplate({}));
	
	//Pull the data from the server
	getData("Charlottesville");
	
	//Bind the click events for the buttons a the top
	$(".event_button").click(function(){
		var eventNameString = $(this).attr("event_name");
		$("#results_div").animate({opacity: 0}, 400, function(){
			$("#results_div").html(loadingTemplate({}));
			$("#results_div").animate({opacity: 1}, 400, function(){
				getData(eventNameString);
			});
		});
	});
});
