//Global Variables for managing state
rsvpState = {
	ACCEPTDECLINE: 0,
	RSVP: 1,
	PROCESSING: 2,
	RESULTS: 3
}
var Charlottesville_event = new Object();
Charlottesville_event.Location = "Charlottesville";
var Charlottesville_state = rsvpState.ACCEPTDECLINE;
var Seattle_event = new Object();
Seattle_event.Location = "Seattle";
var Seattle_state = rsvpState.ACCEPTDECLINE;

function get_event(event_name){
	if(event_name == "Charlottesville"){
		return Charlottesville_event;
	} else {
		return Seattle_event;
	}
}

function display_results(data){

	var result_template = null;
	var people_text = "";
	var server_response = data.record;
	var UI_div = "";
	var locationSpecificData_template = null;
	var locationSpecificData = "";
	
	//Check for code 1 (success)
	if(data.code == "1"){
		//Check for response 1 (accepted invitation)
		if(server_response.Response == "1"){
			result_template = _.template($("#accept-result").text());
			
			//Need to load the location specific data based on which event this is
			if(server_response.Location == "Seattle"){
				locationSpecificData_template = _.template($("#accept-result-seattle").text());
			} else {
				locationSpecificData_template = _.template($("#accept-result-charlottesville").text());
			}
			
			locationSpecificData = locationSpecificData_template({});
 			
			//Set the name of the people text (h2)
			people_text = server_response.person1.FirstName + " " + server_response.person1.LastName;
			if(typeof(server_response.person2) !== 'undefined' && server_response.person2 != null) {
				people_text += " and " + server_response.person2.FirstName + " " + server_response.person2.LastName;
			}
		} else {
			result_template = _.template($("#decline-result").text());
			people_text = server_response.person1.FirstName + " " + server_response.person1.LastName;
		}
	} else {
		result_template = _.template($("#error-result").text());
	}
	
	//Transition the form state
	if(server_response.Location == Charlottesville_event.Location){
		Charlottesville_state = rsvpState.RESULTS;
	} else {
		Seattle_state = rsvpState.RESULTS;
	}
	
	$("#" + server_response.Location + "_variable_action_div").html(result_template({"people" : people_text, "locationSpecificData" : locationSpecificData}));		
}

function display_error(server_response){
	var result_template = _.template($("#error-result").text());
	
	//Transition the form state
	if(server_response.Location == Charlottesville_event.Location){
		Charlottesville_state = rsvpState.RESULTS;
	} else {
		Seattle_state = rsvpState.RESULTS;
	}
	
	$("#" + server_response.Location + "_variable_action_div").animate({opacity: 0}, 400, function(){
		$("#" + server_response.Location + "_variable_action_div").html(result_template({}));
		
		$("#" + server_response.Location + "_variable_action_div").animate({opacity: 1}, 400);
	});
		
}

function send_rsvp(rsvp_object){
	//Post the rsvp_object to the server
	$.getJSON('http://107.20.141.198:1337?callback=?&action=rsvp&json=' + escape(JSON.stringify(rsvp_object)), function(data){display_results(data);}).error(function() {display_error(rsvp_object)})
}

function build_request(event_name){
	var rsvp_object = null; //This is the object we'll post to the server
	
	//Set the response type on the object (0 = decline, 1 = accept)
	if(event_name == "Charlottesville"){
		rsvp_object = Charlottesville_event;
	} else {
		rsvp_object = Seattle_event;
	}
	
	//Set the first person on the object
	rsvp_object.person1 = {
		"FirstName" : $("#" + event_name + "_person1_first_name").attr("value"),
		"LastName" : $("#" + event_name + "_person1_last_name").attr("value"),
		"Vegetarian" : $("#" + event_name + "_person1_vegetarian_checkbox").is(":checked").toString()
	}
	
	//If it's an accept, check for the second person
	if(rsvp_object.Response == "1") {
		//If this is true, a second person has been entered and we'll want to save it
		if($("#" + event_name + "_person2_first_name").attr("state") == "1"){
			rsvp_object.person2 = {
				"FirstName" : $("#" + event_name + "_person2_first_name").attr("value"),
				"LastName" : $("#" + event_name + "_person2_last_name").attr("value"),
				"Vegetarian" : $("#" + event_name + "_person2_vegetarian_checkbox").is(":checked").toString()
			}
		}
	}
	
	return rsvp_object;
}

function validateField(fieldValue){
	var validNameRegex = /^[a-zA-Z]+((\-)?|(\')?|(\s)?)[a-zA-Z]+$/;
	return validNameRegex.test(fieldValue.trim());
}

function validateInput(eventName){
	var eventObject = null;
	var validNameRegex = /^[a-zA-Z]+((\-)?|(\')?|(\s)?)[a-zA-Z]+$/;
	var results = {
	personOneFirstName: 1,
	personOneLastName: 1,
	personTwoFirstName: 1,
	personTwoLastName: 1,
	overallResult: 1}
	
	if(eventName == "Charlottesville"){
		eventObject = Charlottesville_event;
	} else {
		eventObject = Seattle_event;
	}
	
	//Check the first person
	var p1fn = $("#" + eventName + "_person1_first_name").attr("value").trim();
	var p1ln = $("#" + eventName + "_person1_last_name").attr("value").trim();
	var p1fns = $("#" + eventName + "_person1_first_name").attr("state").trim();
	var p1lns = $("#" + eventName + "_person1_last_name").attr("state").trim();
	
	if(!validNameRegex.test(p1fn) || !validNameRegex.test(p1ln) || p1fns == "0" || p1lns == "0"){
		results.overallResult = 0;
		if(!validNameRegex.test(p1fn) || p1fns == "0"){
			results.personOneFirstName = 0;
		}
		
		if(!validNameRegex.test(p1ln) || p1lns == "0"){
			results.personOneLastName = 0;
		}
	}
	
	//Only check the second person if it's an accept
	if(eventObject.Response == "1"){
		//Only check the fields if one of them are filled in
		var p2fn = $("#" + eventName + "_person2_first_name").attr("value").trim();
		var p2ln = $("#" + eventName + "_person2_last_name").attr("value").trim();
		var p2fns = $("#" + eventName + "_person2_first_name").attr("state").trim();
		var p2lns = $("#" + eventName + "_person2_last_name").attr("state").trim();
		if( p2fns != "0" || p2lns != "0"){
			if(!validNameRegex.test(p2fn) || !validNameRegex.test(p2ln) || p2fns == "0" || p2lns == "0"){
				results.overallResult = 0;
				if(!validNameRegex.test(p2fn) || p2fns == "0"){
					results.personTwoFirstName = 0;
				}
				
				if(!validNameRegex.test(p2ln) || p2lns == "0"){
					results.personTwoLastName = 0;
				}
			}
		}
	}
	
	return results;
}

function setErrorState(fieldName){
	$("#" + fieldName).attr("class", "rsvp_input_error");
	$("#" + fieldName).attr("error_state", "1");
	$("#" + fieldName).delay(700).animate({backgroundColor : "white"}, 1500);
}

function handle_rsvp(){
	var input_validated = 0;
	var event_name = $(this).attr("event");
	
	//Check if the button is disabled
	if($(this).attr("enabled") == "0"){
		return;
	}
	
	//If not disabled, disable before moving forward
	$(this).attr("enabled", "0");
	
	//Validate Input
	//TO-DO: Run first/last name of person1 for the event through a REGEX, and update input_validated accordingly
	input_validated = 1;
	
	var validateInputResults = validateInput(event_name);
	
	input_validated = validateInputResults.overallResult;
	
	//If this is true, we believe it's valid input to send back to the server
	if(input_validated == 1){
		//Hide the RSVP form
		$(this).parent().parent().animate({opacity: 0}, 400, function(){
			//Build the request
			var rsvp_object = build_request(event_name);
			
			if(event_name == "Charlottesville"){
				Charlottesville_state = rsvpState.PROCESSING;
			} else {
				Seattle_state = rsvpState.PROCESSING;
			}
			
			//Show the processing UX
			var processing_template = _.template($("#processing-template").text());
			$(this).html(processing_template({}));
			
			//Post to server
			send_rsvp(rsvp_object);
			
			//Show the processing UX
			$(this).animate({opacity: 1}, 400);
		});
	} else {
		if(validateInputResults.personOneFirstName == 0){
			setErrorState(event_name + "_person1_first_name");
		}
		
		if(validateInputResults.personOneLastName == 0){
			setErrorState(event_name + "_person1_last_name");
		}
		
		if(validateInputResults.personTwoFirstName == 0){
			setErrorState(event_name + "_person2_first_name");
		}
		
		if(validateInputResults.personTwoLastNAme == 0){
			setErrorState(event_name + "_person2_last_name");
		}
		
		//Re-enable the button
		$(this).attr("enabled", "1");
	}
	
}

function load_form(event_object){
	if(event_object.Response == "0"){
		return _.template($("#decline-form").text());
	} else {
		return _.template($("#rsvp-form").text());
	}
}

//Method copies the value from an object to the form
function copy_from_object(field_value, type, to_field){
	if(type == "text"){
		if(field_value != ""){
			//Set the value
			$("#" + to_field).attr("value", field_value);
			
			//Set the state property
			$("#" + to_field).attr("state", "1");
			
			//Set the class
			$("#" + to_field).attr("class", "rsvp_input_filled");
		}
	} else {
		if(field_value == "true"){
			$("#" + to_field).attr("checked", true);
		} else {
			$("#" + to_field).attr("checked", false);
		}
	}
}

//Method copies the value from one field to another (assuming a value is set)
function copy_field(from_field, to_field){
	//If it's a text field
	if($("#" + from_field).attr("type") == "text"){
		//If the text field has a non zero state, indicating user-entered data
		if($("#" + from_field).attr("state") == 1){
			//Copy the data
			$("#" + to_field).attr("value", $("#" + from_field).attr("value"));
			
			//Set the state property
			$("#" + to_field).attr("state", "1");
			
			//Set the class
			$("#" + to_field).attr("class", "rsvp_input_filled");
		}
	} else {
		//Only need to take an action if the from checkbox is checked
		if($("#" + from_field).is(":checked")){
			$("#" + to_field).attr("checked", true);
		}
	}
}

function prepopulate_form(event_name){
	var this_event = get_event(event_name);
	var other_object = null;
	var other_state = null;
	
	if(event_name == "Charlottesville"){
		other_state = Seattle_state;
		other_object = Seattle_event;
	} else {
		other_state = Charlottesville_state;
		other_object = Charlottesville_event;
	}
	
	if(other_state == rsvpState.RSVP){
		//Read the pre-pop values from the form fields
		copy_field(other_object.Location + "_person1_first_name",this_event.Location + "_person1_first_name");
		copy_field(other_object.Location + "_person1_last_name",this_event.Location + "_person1_last_name");
		
		//Only actually transfer these if it is an accept
		if(this_event.Response == "1"){
			copy_field(other_object.Location + "_person1_vegetarian_checkbox",this_event.Location + "_person1_vegetarian_checkbox");
			copy_field(other_object.Location + "_person2_first_name",this_event.Location + "_person2_first_name");
			copy_field(other_object.Location + "_person2_last_name",this_event.Location + "_person2_last_name");
			copy_field(other_object.Location + "_person2_vegetarian_checkbox",this_event.Location + "_person2_vegetarian_checkbox");
		}
	} 
	if(other_state == rsvpState.PROCESSING || other_state == rsvpState.RESULTS){
		copy_from_object(other_object.person1.FirstName, "text", this_event.Location + "_person1_first_name");
		copy_from_object(other_object.person1.LastName, "text", this_event.Location + "_person1_last_name");
		
		if(this_event.Response == "1"){
			copy_from_object(other_object.person1.Vegetarian, "checkbox", this_event.Location + "_person1_vegetarian_checkbox");
			if(typeof other_object.person2 != 'undefined'){
				copy_from_object(other_object.person2.FirstName, "text", this_event.Location + "_person2_first_name");
				copy_from_object(other_object.person2.LastName, "text", this_event.Location + "_person2_last_name");
				copy_from_object(other_object.person2.Vegetarian, "checkbox", this_event.Location + "_person2_vegetarian_checkbox");
			}
		}
	}
}

function intitalize_rsvp_form(){
	var rsvp = null;
	var rsvp_template = null;
	var rsvp_event = $(this).attr("event");
	
	if(rsvp_event == "Charlottesville"){
		Charlottesville_state = rsvpState.RSVP;
		Charlottesville_event.Response = $(this).attr("response");
		rsvp = load_form(Charlottesville_event);
		rsvp_template = rsvp({"event" : "Charlottesville"});
	} else {
		Seattle_state = rsvpState.RSVP;
		Seattle_event.Response = $(this).attr("response");
		rsvp = load_form(Seattle_event);
		rsvp_template = rsvp({"event" : "Seattle"});
	}
	
	$(this).parent().animate({opacity: 0}, 400, function(){
	
		$(this).html(rsvp_template);

		//Pre-fill form if the user has already started to fill in the other form
		prepopulate_form(rsvp_event);
		
		$(this).css("padding-top", "0px;");
		
		//Bind all events for the RSVP form
		$('.rsvp_input').bind('focusin', function(){
			if($(this).attr("state") == "0"){
				$(this).attr("value", "");
				if($(this).attr("error_state") == "0"){
					$(this).attr("class", "rsvp_input_filled");
				}
			}
		});
		
		$('.rsvp_input').bind('focusout', function(){
			if($(this).attr("state") == "0" && $(this).attr("error_state") != "1"){
				$(this).attr("class", "rsvp_input");
				$(this).attr("value", $(this).attr("defaultvalue"));
			}
		});
		
		$('.rsvp_input').bind('keyup', function(){
			if($(this).attr("value").trim() != ""){
				$(this).attr("state", "1");
			} else {
				$(this).attr("state", "0");
			}
			
			if($(this).attr("error_state") == "1" && validateField($(this).attr("value"))){
				$(this).switchClass( "rsvp_input_error", "rsvp_input_filled", 400 );
				$(this).attr("error_state", "0");
			}
		});
		
		$('.rsvp_button').bind('click', handle_rsvp);
		
		//Show the RSVP form
		$(this).animate({opacity: 1}, 400);
	});
}

function initialize_page(){
	//Create the framework template
	var framework = _.template($("#framework-template").text());
	
	//Initialize each div with the accept-decline template
	$("#charlottesville_div").html(framework({"venue_name" : "James Madison's Montpelier", "venue_date" : "May 26th, 2012 at 5PM", "venue_location" : "Orange, VA", "event" : "Charlottesville"}));
		
	$("#seattle_div").html(framework({"venue_name" : "Local 360", "venue_date" : "July 14th, 2012 at 7PM", "venue_location" : "Seattle, WA", "event" : "Seattle"}));
	
	//Bind The Click action for the accept/decline forms
	$('.a_d_button').bind('click', intitalize_rsvp_form);
}

$(document).ready(function(){	

	//Create an object for each event (to later be pushed to the server)
	initialize_page();
	
});