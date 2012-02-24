var map = null;
var directionsManager;
var directionsErrorEventObj;
var directionsUpdatedEventObj; 
var montpelier_address = "11407 Constitution Highway Montpelier Station, VA 22957";
var current_start_lat = "";
var current_start_long = "";

function createDirectionsManager(){

	var displayMessage;

	if (!directionsManager){
		directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
		displayMessage = 'Directions Module loaded\n';
		displayMessage += 'Directions Manager loaded';
	}

	directionsManager.resetDirections();
	directionsErrorEventObj = Microsoft.Maps.Events.addHandler(directionsManager, 'directionsError', null);
	directionsUpdatedEventObj = Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', null);
}

function createDrivingRoute(){

	if (!directionsManager){ 
		createDirectionsManager(); 
	}

	directionsManager.resetDirections();

	// Set Route Mode to driving 
	directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
	var startWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(current_start_lat, current_start_long) });
	directionsManager.addWaypoint(startWaypoint);
	var montpelierWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: montpelier_address, location: new Microsoft.Maps.Location(38.2371331751347, -78.1575402617455) });
	directionsManager.addWaypoint(montpelierWaypoint);

	// Set the element in which the itinerary will be rendered
	directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('directions_container') });
	directionsManager.calculateDirections();
	$('.directions_outer_container').animate({opacity: 1.0}, 800);
	$('.directions_h1').animate({opacity: 1.0}, 800);
}

function createDirections(){
	if (!directionsManager){
		Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: createDrivingRoute });
	} else {
		createDrivingRoute();
	}
}

$(document).ready(function(){
	
	//Setup the map display
	map = new Microsoft.Maps.Map(document.getElementById('map_div'), {credentials: 'AkeFGke5nNMlKgZpDc7dadbgvTmSOmxSBO68XYvtjRKOKMn7Zf76-P-XSguqpyZv', showMapTypeSelector:false, enableClickableLogo: false, showScalebar: false, showDashboard: true});
	map.setView({mapTypeId : Microsoft.Maps.MapTypeId.road, zoom: 6, center: new Microsoft.Maps.Location(38.2371331751347, -78.1575402617455)});
	
	map.entities.clear(); 
	var infoboxOptions = {width:125, height :35, title:'Montpelier'}; 
	var defaultInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(38.2371331751347, -78.1575402617455), infoboxOptions );    
	map.entities.push(defaultInfobox);
	//var pushpin= new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(38.2371331751347, -78.1575402617455), null); 
	//map.entities.push(pushpin);

 
	$(".map_options_li").mouseover(function() {
		$(this).removeClass("map_options_li");
		$(this).addClass("map_options_li_mouse_over");
	});
	
	$(".map_options_li").mouseout(function() {
		$(this).removeClass("map_options_li_mouse_over");
		$(this).addClass("map_options_li");
	});
	
	$("#map_options_bw").click(function() {
		current_start_lat = 38.2613039016724;
		current_start_long = -78.1204848736525;
		$('.directions_h1').html("Directions from Holiday Inn Express in Orange");
		$('#directions_a').attr("href", "http://www.bing.com/maps/print.aspx?mkt=en-us&z=14&s=r&cp=38.249382,-78.134306&pt=pf&rtp=pos.38.26128646731377_-78.1205378472805_750%20Round%20Hill%20Dr%2C%20Orange%2C%20VA%2022960___e__mIPG%2FxE6RxwAAOAB%2By8jPgA%3D~pos.38.23708958923817_-78.15752483904362_11407%20Constitution%20Hwy%2C%20Orange%2C%20VA%2022960___e__mIPG%2F6ENRxwAAOABjDh7PQA%3D&mode=D&rtop=0~0~0~&cmw=929&cmh=599&u=0");
		createDirections();
	});
	
	$("#map_options_ivy").click(function() {
		current_start_lat = 38.0465481430292;
		current_start_long = -78.5164754837751;
		$('.directions_h1').html("Directions from Ivy Gardens (UVA Campus)");
		$('#directions_a').attr("href", "http://www.bing.com/maps/print.aspx?mkt=en-us&z=11&s=r&cp=38.160219,-78.340533&pt=pf&rtp=pos.38.046522_-78.516429_100%20Ivy%20Dr%2C%20Charlottesville%2C%20VA%2022903___e__mIPG%2F6EQRhwAAOABAPsSPQA%3D~pos.38.23708958923817_-78.15752483904362_11407%20Constitution%20Hwy%2C%20Orange%2C%20VA%2022960___e__mIPG%2F6ENRxwAAOABjDh7PQA%3D&mode=D&rtop=0~0~0~&cmw=929&cmh=599&u=0");
		createDirections();
	});
	
	$("#map_options_dc").click(function() {
		current_start_lat = 38.8903694152832;
		current_start_long = -77.0319595336914;
		$('.directions_h1').html("Directions from Washington, DC");
		$('#directions_a').attr("href", "http://www.bing.com/maps/print.aspx?mkt=en-us&z=9&s=r&cp=38.565018,-77.594697&pt=pf&rtp=pos.38.890369_-77.031960_Washington%2C%20DC___e__AygmRAFxETgcAADgAQAAgD8A~pos.38.236948_-78.157433_near%2012404%20Constitution%20Hwy%2C%20Orange%2C%20VA%2022960___a__AygmRAHB1BEcAADgAVs6nT0C&mode=D&rtop=0~0~0~&cmw=1015&cmh=572&u=0");	
		createDirections();
	});
	
	$("#map_options_marriot").click(function() {
		current_start_lat = 38.0336112976074;
		current_start_long = -78.4969787597656;
		$('.directions_h1').html("Directions from Charlottesville Courtyard Marriot");
		$('#directions_a').attr("href", "http://www.bing.com/maps/print.aspx?mkt=en-us&z=10&s=r&cp=38.153600,-78.332092&pt=pf&rtp=pos.38.033140_-78.497152_1201%20W%20Main%20St%2C%20Charlottesville%2C%20VA_Courtyard%20Charlottesville%20-%20University%20Medical%20Center_(434)%20977-1700_e_YN894x400403635_mIPG%2FwHmRRwAAOABK8UFPwA%3D~pos.38.237090_-78.157525_11407%20Constitution%20Hwy%2C%20Orange%2C%20VA%2022960___e__mIPG%2F6ENRxwAAOABgCV7PQA%3D&mode=D&rtop=0~0~0~&cmw=1015&cmh=572&u=0");	
		createDirections();
	});
});
