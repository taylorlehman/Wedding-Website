var media_count = 1;
var media_text = [
"<h1>Hanging on to the Capilano Suspension Bridge</h1><h2>Vancouver, Canada</h2>",
"<h1>Enjoying the fall foliage</h1><h2>Shenandoah National Park, VA</h2>",
"<h1>Strolling along the waterfront</h1><h2>Seattle, WA</h2>",
"<h1>Treking through the rain</h1><h2>Multnomah Falls, OR</h2>",
"<h1>Celebrating Israeli Independence Day</h1><h2>Herzliyya, Israel</h2>",
"<h1>Listening to Switchfoot and Goo Goo Dolls</h1><h2>Jones Beach, NY</h2>",
"<h1>Touring Notre Dame</h1><h2>Paris, France</h2>",
"<h1>Watching the US Open</h1><h2>Queens, NY</h2>",
"<h1>Soaking in the sunshine</h1><h2>Seattle, WA</h2>",
"<h1>Competing in a city-wide scavenger hunt</h1><h2>New York, NY</h2>",
];

function set_nav_images(){
	//Set the Back Image
	if(media_count == 1){
		$("#media_nav_back").css("background", "");
		$("#media_nav_back").css("border", "0px");
		$("#media_nav_back").css("cursor", "auto");
	} else {
		$("#media_nav_back").css("background", "url('./pictures/" + (media_count - 1) + "s.jpg')");
		$("#media_nav_back").css("border", "1px solid white");
		$("#media_nav_back").css("cursor", "pointer");
	}
	
	//Set the current image
	$("#media_nav_current").css("background", "url('./pictures/" + media_count + "s.jpg')");
	
	//Set the next image
	if(media_count == 10){
		$("#media_nav_next").css("background", "");
		$("#media_nav_next").css("border", "0px");
		$("#media_nav_next").css("cursor", "auto");
	} else {
		$("#media_nav_next").css("background", "url('./pictures/" + (media_count + 1) + "s.jpg')");
		$("#media_nav_next").css("border", "1px solid white");
		$("#media_nav_next").css("cursor", "pointer");
	}
}

function set_main_image(){
	$("#media_text").animate({opacity: 0}, 300);
	$("#media_main_img").delay(100).animate({opacity: 0}, 300, function(){
		$("#media_main_img").attr("src", "./pictures/" + media_count + ".jpg");
		$("#media_main_img").animate({opacity: 1}, 300, function(){
			prepare_text();
			$("#media_text").animate({opacity: 1}, 300);
		});
	});
}

function prepare_text(){
	$("#media_text").css("top", $("#media_main_img").offset().top+$("#media_main_img").height()-77);
	$("#media_text").css("left", $("#media_main_img").offset().left+5);
	var text_width = $("#media_main_img").width() - 40;
	$("#media_text").css("width", text_width+"px");
	$("#media_text").html(media_text[media_count-1])
}

function preload_media(images_array){
	var cached_images = new Array();
	for(var i = 0; i<images_array.length; i++){
	    var temp_image = new Image(5, 5);
	    temp_image.src = "./pictures/" + images_array[i] + ".jpg";
		cached_images.push(temp_image);
	}
}

$(document).ready(function(){	
	//Preload the first three images - small and large
	preload_media(["1","1s","2","2s","3","3s"]);
	
	//Set the first set of nav images
	$("#media_nav_current").css("background", "url('./pictures/1s.jpg')");
	$("#media_nav_next").css("background", "url('./pictures/2s.jpg')");
	
	//Position and Display text+image
	$("#media_main_img").animate({opacity: 1}, 300, function(){
		prepare_text();
		$("#media_text").animate({opacity: 1}, 300);
	});
	
	//Position and Display the callout
	$("#callout_div").css("top", $("#media_nav_next").offset().top);
	$("#callout_div").css("left", $("#media_nav_next").offset().left + 90);
	$("#callout_div").delay(400).animate({opacity: 1}, 400);
	
	//Preload the remaining images
	preload_media(["4","4s","5","5s","6","6s","7","7s","8","8s","9","9s","10","10s"]);
	
	$(window).resize(function() {
		$("#media_text").css("top", $("#media_main_img").offset().top+$("#media_main_img").height()-77);
		$("#media_text").css("left", $("#media_main_img").offset().left+5);
	});

	$(document).keydown(function(event){
		//Left = back
		if(event.keyCode == 37 || event.keyCode == 38){
			if(media_count != 1){
				media_count--;
				
				//Set the main image
				set_main_image();
				
				//Set the navigation images
				set_nav_images();
			}
		}
		
		//Right = forward
		if(event.keyCode == 39 || event.keyCode == 40){
			if(media_count != 10){
				media_count++;
				
				//Set the main image
				set_main_image();
				
				//Set the navigation images
				set_nav_images();
			}
		}
	});
	
	$("#media_nav_next").click(function() {
		$("#callout_div").animate({opacity: 0}, 400);
		
		if(media_count != 10){
			media_count++;
			
			//Set the main image
			set_main_image();
			
			//Set the navigation images
			set_nav_images();
		}
	});
	
	$("#media_nav_back").click(function() {
		if(media_count != 1){
			media_count--;
			
			//Set the main image
			set_main_image();
			
			//Set the navigation images
			set_nav_images();
		}
	});
	
	$("#media_nav_back").mouseover(function() {
		$("#media_nav_back").css("opacity", "1.0");
	});
	
	$("#media_nav_next").mouseover(function() {
		$("#media_nav_next").css("opacity", "1.0");
	});
	
	$("#media_nav_next").mouseout(function() {
		$("#media_nav_next").css("opacity", "0.5");
	});
	
	$("#media_nav_back").mouseout(function() {
		$("#media_nav_back").css("opacity", "0.5");
	});
});
