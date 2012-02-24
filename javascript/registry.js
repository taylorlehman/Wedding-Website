function position_lightbox_elements(){
	//Readjust the background
	$(".lightbox_background").css("width", $(document).width());
	$(".lightbox_background").css("height", $(document).height());
	
	//Position the lightbox vertically
	var border_top = $(document).scrollTop()+75;
	$(".lightbox_border").css("top", border_top + "px");
	var box_top = $(document).scrollTop()+85;
	$(".lightbox").css("top", box_top + "px");
	var close_top = $(document).scrollTop()+70;
	$(".lightbox_close").css("top", close_top + "px");
	
	//Position the lightbox horizontally
	var window_width = $(window).width()/2;
	var lightbox_border_width = $(".lightbox_border").width()/2;
	var border_left = window_width - lightbox_border_width;
	$(".lightbox_border").css("left", border_left + "px");
	var box_left = border_left + 10;
	$(".lightbox").css("left", box_left + "px");
	var close_left = box_left+$(".lightbox").width()+35;
	$(".lightbox_close").css("left", close_left + "px");
}

$(document).ready(function(){	
		//Need to handle clicking the lightbox background closing the lightbox
		$(".lightbox_background").click(function(){
			$(".lightbox_background").css("display", "none");
			$(".lightbox_border").css("display", "none");
			$(".lightbox").css("display", "none");
			$(".lightbox_close").css("display", "none");
		});
		
		//Need to handle window resize (if the lightbox is up)
		$(window).resize(function() {
			position_lightbox_elements();
		});

		
		//Need to handle lightbox button click
		$(".continue_to_charity").click(function(){
			window.open($(this).attr("href"));
		});
		
		//Need to handle lightbox close
		$(".lightbox_close").click(function(){
			$(".lightbox_background").css("display", "none");
			$(".lightbox_border").css("display", "none");
			$(".lightbox").css("display", "none");
			$(".lightbox_close").css("display", "none");
		});
		
		//Need to handle the charity button click (to show the lightbox)
		$(".charity_a").click(function(){    
			position_lightbox_elements();
			
			//Need to add text to the button
			$("#continue_to_charity").html("Continue to " + $(this).attr("charity"));
			$("#continue_to_charity").attr("href", $(this).attr("href"));
			
			//Show the lightbox elements
			$(".lightbox_background").css("display", "block");
			$(".lightbox_border").css("display", "block");
			$(".lightbox").css("display", "block");
			$(".lightbox_close").css("display", "block");
		});
});