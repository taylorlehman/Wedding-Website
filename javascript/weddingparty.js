function selectImage(current_li){
	var img_url = "";
	
	switch(current_li){
		case "li_1":
			img_url = "./pictures/linda.jpg";
			break;
		case "li_2":
			img_url = "./pictures/scott.jpg";
			break;
		case "li_3":
			img_url = "./pictures/rachel.jpg";
			break;
		case "li_4":
			img_url = "./pictures/jeff.jpg"
			break;
		case "li_5":
			img_url = "./pictures/allison.jpg"
			break;
		case "li_6":
			img_url = "./pictures/grant.jpg"
			break;
		case "li_7":
			img_url = "./pictures/sharon.jpg"
			break;
		case "li_8":
			img_url = "./pictures/edwin.jpg"
			break;
		case "li_9":
			img_url = "./pictures/grandma.jpg"
			break;
		case "li_10":
			img_url = "./pictures/pam.jpg"
			break;
		case "li_11":
			img_url = "./pictures/andrew.jpg"
			break;
		case "li_12":
			img_url = "./pictures/jason.jpg"
			break;
	}
	
	return img_url;
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
	//Preload the images
	preload_media("linda","scott","rachel","jeff","allison","grant","jason","sharon");

	//Animate each li to full opacity after setting the background
	for(var i=1; i<13; i++){
		$("#li_" + i).css("background", "url('" + selectImage($("#li_" + i).attr("id")) + "')");
		$("#li_" + i).delay(i*100).animate({opacity: 1}, 800);
	}
});
