var selected_content = "";
var HIKE_CONTENT = "<h1 class='visit_content_h1'>Shenandoah National Park</h1>" +
		   "<p class='visit_content_p'>Nearby Shenandoah National Park offers hiking, waterfalls, and breathtaking views of central Virginia from \"Skyline Drive\", the road that runs the length of the park along the top of the Blue Ridge mountains.</p>" +
		   "<p class='visit_content_p'>One hike that we particularly recommend is the <a href='http://www.nps.gov/shen/planyourvisit/upload/loft_mountain_area.pdf' target='_blank' class='visit_content_a'>Doyles River falls hike</a>.  Starting from the Brown's Gap parking area at milepost 83, this 6.5 mile moderately difficult hike follows the Appalachian trail south until milepost 84 where it cuts east and follow's the Jones Run trail past the numerous waterfalls.  The trail then cuts north along Doyles River past two larger falls until it cross's the Brown's gap fire road.  Follow the Brown's gap fire road back to the parking area!</p>" +
		   "<p class='visit_content_p'>For other potential hikes, check out the <a href='http://www.nps.gov/shen/planyourvisit/index.htm' target='_blank' class='visit_content_a'>Shenandoah National Park website</a>.</p>"; 
var PRESIDENT_CONTENT = "<h1 class='visit_content_h1'>Monticello</h1>" +
		   "<p class='visit_content_p'>Step back in time 200 years to the life and time of Thomas Jefferson by visiting Jefferson's Monticello.  This Charlottesville landmark, listed on the National Register of Historic places, sits high on top a hill 15 minutes outside of the city and boasts beautiful views of the surrounding countryside." +
		   "<p class='visit_content_p'>A visit to <a href='http://www.monticello.org/' target='_blank' class='visit_content_a'>Thomas Jefferson's Monticello</a> wouldn't be complete without the 35min walking tour of the grounds and house (purchasing <a href='http://www.monticello.org/site/visit/tickets-tours' class='visit_content_a' target='_blank'>tickets</a> ahead of time is recommended).  On this tour you'll learn about the house's famous dome (and it's larger successor) and lots of interesting tidbits about Thomas Jefferson and his greatest rival (can you guess who it was?)." +
		   "<p class='visit_content_p'>While visiting Monticello also consider having a meal at nearby historic <a href='http://www.michietavern.com/' target='_blank' class='visit_content_a'>Mitchie Tavern</a>, visiting <a href='http://www.ashlawnhighland.org/' target='_blank' class='visit_content_a'>Ash Lawn Highland</a>, the home of James Monroe, or stopping to enjoy the orchards at <a href='http://www.cartermountainorchard.com/' class='visit_content_a' target='_blank'>Carter Mountain</a>.";
var WINE_CONTENT = "<h1 class='visit_content_h1'>Wine Tasting</h1>" + //King's Family, Veritas, Blenheim
				   "<p class='visit_content_p'>Central Virginia is home to many great wineries.  Taking a picnic lunch to a winery for an afternoon of sampling and enjoying the sun is a great way to relax and unwind.  Here are some wineries we'd suggest:</p>" +
				   "<ul>" +
				   "<li class='visit_food_li'>" +
				   "<h1 class='visit_food_h1'>King Family Vineyards</h1>" +
				   "<p class='visit_food_p'>King Family Vineyards is situated in the countryside about 20 minutes west of Charlottesville at the base of the Blue Ridge Mountains.  There are tours (Sat and Sun) at noon and 3PM and wine tastings are $5/pp.  Additionally, the Roseland polo matches begin on Memorial day weekend and can be viewed (for free!) from the winery.<p>" +
				   "<div class='visit_food_div'>" +
				   "<a href='http://kingfamilyvineyards.com/' target='_blank' class='visit_food_a'>Visit the King's Family website</a>" +
				   "</div>" +
				   "</li>" +
				   "<li class='visit_food_li'>" +
				   "<h1 class='visit_food_h1'>Veritas Winery</h1>" +
				   "<p class='visit_food_p'>The Veritas Winery, located in Afton Virginia also has wine tastings ($5) and tours throughout the day on Saturday and Sunday.  The tour gives visitors a chance to see all parts of the wine-making process!<p>" +
				   "<div class='visit_food_div'>" +
				   "<a href='http://www.veritaswines.com/' target='_blank' class='visit_food_a'>Visit the Veritas website</a>" +
				   "</div>" +
				   "</li>" +
				   "<li class='visit_food_li'>" +
				   "<h1 class='visit_food_h1'>Blenheim Vineyards</h1>" +
				   "<p class='visit_food_p'>Blenheim Vineyards, owned by Charlottesville native Dave Matthews (of the Dave Matthews Band) offers tours and wine tasting ($5) throughout the day on Saturday and Sunday.  In addition, Blenheim offers a $25 private cellar tour and tasting!<p>" +
				   "<div class='visit_food_div'>" +
				   "<a href='http://www.blenheimvineyards.com/' target='_blank' class='visit_food_a'>Visit the Blenheim website</a>" +
				   "</div>" +
				   "</li>" +
				   "</ul>";
var MALL_CONTENT = "<h1 class='visit_content_h1'>Charlottesville Downtown Mall</h1>" +
				   "<p class='visit_content_p'>Charlottesville's Downtown Mall is an outdoor pedestrian area lined by shops and restaurants, movie theaters and ice cream shops.  This is one of the major social hubs in Charlottesville and is always bustling with activities.  Some things to do at the Downtown mall include, shopping, <a href='http://www.theglasspalette.net/' class='visit_content_a' target='_blank'>glass-art creation</a>, <a href='http://www.fandango.com/regaldowntownmall6_aaeqb/theaterpage' class='visit_content_a' target='_blank'>watching movies</a>, <a href='http://www.yelp.com/biz/sweet-frog-frozen-yogurt-charlottesville' class='visit_content_a' target='_blank'>eating frozen yogurt</a>, and enjoying a nice dinner outside under the trees and stars.</p>" +
				   "<p class='visit_content_p'>In addition, each Friday night the pavilion at the end of the Downtown Mall hosts <a href='http://www.thenteloswirelesspavilion.com/fridays-after-five;jsessionid=A52E891C86AC7E0B57FD4C8589121530' target='_blank' class='visit_content_a'>Fridays after Five</a>, a free concert series that features local and regional bands.  So make an evening of it and see a free show, stroll the downtown mall, and grab dinner at one of the many restaurants lining the Mall.</p>" +
				   "<p class='visit_content_p'>More information about what to see and do at the Downtown Mall can be found on the <a href='http://www.downtowncharlottesville.net/' target='_blank' class='visit_content_a'>Downtown Business Association Website</a><p>";
var FOOD_CONTENT = "<h1 class='visit_content_h1'>The Chefs of Charlottesville</h1>" +
           "<p class='visit_content_p'>Charlottesville has an unusually high number of good restaurants for being such a small city.  Here are some restaurants that Casey and I love:</p>" +
		   "<ul>" +
		   /*First Entry*/
		   "<li class='visit_food_li'>" +
		   "<h1 class='visit_food_h1'>Continental Divide</h1>" +
		   "<h2 class='visit_food_h2'>Mexican - $$</h2>" +
		   "<p class='visit_food_p'>Continental Divide is hidden in plain sight (don't expect to see a sign for this restaurant!). Located directly across the street from the Amtrak station on Main Street, heed the neon lights that spell “Get in Here” to enjoy the best Tex-Mex food north of Texas. Casey and Taylor recommend the Bison Chili and the Quesadilla of the Day. From Mexican Coke to an endless tequila menu, Continental Divide has a little bit of something for everyone!</p>" +
		   "<div class='visit_food_div'>" +
		   "<a href='http://www.yelp.com/biz/continental-divide-charlottesville' target='_blank' class='visit_food_a'>Get the full scoop on Yelp!</a>" +
		   "<a href='http://www.bing.com/maps/?v=2&cp=38.031798~-78.491173&lvl=16&dir=0&sty=r&where1=811%20W%20Main%20St%2C%20Charlottesville%2C%20VA&ss=yp.Continental%20Divide~pg.1&form=LMLTCC' target='_blank' class='visit_food_a'>Map it on Bing!</a>" +
		   "</div>" +
		   "</li>" +
		   /*Second Entry*/
		   "<li class='visit_food_li'>" +
		   "<h1 class='visit_food_h1'>Taste of China</h1>" +
		   "<h2 class='visit_food_h2'>Chinese - $$</h2>" +
		   "<p class='visit_food_p'>Don't be fooled by the strip-mall location - Taste of China is the real deal!  Taste of China boasts a wide variety of delicious chinese dishes.  Everything is good, so just pick what you're hungry for!</p>" +
		   "<div class='visit_food_div'>" +
		   "<a href='http://www.yelp.com/biz/taste-of-china-charlottesville' target='_blank' class='visit_food_a'>Get the full scoop on Yelp!</a>" +
		   "<a href='http://www.bing.com/maps/?v=2&cp=38.08325~-78.471298&lvl=15&dir=0&sty=r&where1=612%20Albemarle%20Sq%2C%20Charlottesville%2C%20VA%2C%2022901&ss=yp.Asia%20In%20Taste%20of%20China~pg.1&form=LMLTCC' target='_blank' class='visit_food_a'>Map it on Bing!</a>" +
		   "</div>" +
		   "</li>" +
		   /*Third Entry*/
		   "<li class='visit_food_li'>" +
		   "<h1 class='visit_food_h1'>Brookville</h1>" +
		   "<h2 class='visit_food_h2'>New American - $$/$$$</h2>" +
		   "<p class='visit_food_p'>Hidden away on the second floor of the Downtown Mall, Brookville is a small, quiet restaurant that regularly updates its menu to include seasonal dishes sourced from local ingredients. The chef is a UVA alum who has a fascination with pork. Follow his bloghere. Probably not a great location to bring kids or if you're looking to make a lot of noise!</p>" +
		   "<div class='visit_food_div'>" +
		   "<a href='http://www.yelp.com/biz/brookville-charlottesville' target='_blank' class='visit_food_a'>Get the full scoop on Yelp!</a>" +
		   "<a href='http://maps.google.com/maps?q=Brookville+Restaurant,+Charlottesville,+VA&hl=en&ll=38.031164,-78.483002&spn=0.001147,0.002642&sll=37.0625,-95.677068&sspn=39.371738,86.572266&vpsrc=6&hq=Brookville+Restaurant,&hnear=Charlottesville,+Virginia&t=m&z=19' target='_blank' class='visit_food_a'>Map it on Google (booooo!)!</a>" +
		   "</div>" +
		   "</li>" +
		   /*Fourth Entry*/
		   "<li class='visit_food_li'>" +
		   "<h1 class='visit_food_h1'>Bizou</h1>" +
		   "<h2 class='visit_food_h2'>Brunch - $$</h2>" +
		   "<p class='visit_food_p'>This causal spot boasts elegant food carefully prepared in an open kitchen that greets you as you enter the restaurant from the Downtown Mall. The brunch menu includes a variety of traditional-meets-creative dishes that hit the spot on a sunny summer morning. Outdoor seating on the Downtown Mall is available – a great way to people watch!</p>" +
		   "<div class='visit_food_div'>" +
		   "<a href='http://www.yelp.com/biz/bizou-charlottesville' target='_blank' class='visit_food_a'>Get the full scoop on Yelp!</a>" +
		   "<a href='http://www.bing.com/maps/?v=2&cp=38.03067598218492~-78.48166254232785&lvl=18&dir=0&sty=r&ss=yp.bizou~pg.1~rad.0,16990323911905&form=LMLTCC' target='_blank' class='visit_food_a'>Map it on Bing!</a>" +
		   "</div>" +
		   "</li>" +
		   "</ul>";
var MORE_CONTENT = "<h1 class='visit_content_h1'>Choose Your Own Adventure!</h1>" +
				   "<p class='visit_content_p'>There is so much more to do in central Virginia than we could share here!  Here are a list of helpful resources for other suggested adventures:</p>" +
				   "<ul>" +
				   "<li class='visit_more_li'><a href='http://www.visitcharlottesville.org/' target='_blank' class='visit_more_a'>VisitCharlottesville.org</a></li>" +
				   "<li class='visit_more_li'><a href='http://www.visitrichmondva.com/' target='_blank' class='visit_more_a'>VisitRichmondVA.com</a> - Richmond, only an hour away from Charlottesville offers many urban attractions.</li>" +
				   "<li class='visit_more_li'><a href='http://www.history.org/' target='_blank' class='visit_more_a'>Historial Williamsburg Website</a> (note: if you go to Williamsburg, Casey and Taylor suggest you check out the <a href='http://www.yelp.com/biz/the-cheese-shop-williamsburg' target='_blank' class='visit_more_a'>Cheese Shop</a>!)</li>" +
				   "<li class='visit_more_li'><a href='http://www.boarsheadinn.com/' target='_blank' class='visit_more_a'>The Boar's Head Inn</a> - Go golfing at the Birdwood golf course, spend the day at the spa, or take a hot air balloon ride over the skies of Charlottesville attractions.</li>" +
				   "<li class='visit_more_li'><a href='http://www.civilwartraveler.com/EAST/VA/index.html' target='_blank' class='visit_more_a'>Civil War Battlegrounds</a> - Central Virginia was the site of many civil war battlegrounds that are all within driving distance of Charlottesville.</li>" +
				   "<li class='visit_more_li'><a href='http://www.virginia.edu/rotunda/' target='_blank' class='visit_more_a'>UVA Grounds and Rotunda</a> - Take a tour of Thomas Jefferson’s Rotunda (a larger version of the Monticello rotunda) and Academical Village at the UVA campus.</li>" +
				   "</ul>";

function select_content(selected_id){
	switch(selected_id){
		case "li_1":
			selected_content = HIKE_CONTENT;
			break;
		case "li_2":
			selected_content = PRESIDENT_CONTENT;
			break;
		case "li_3":
			selected_content = WINE_CONTENT;
			break;
		case "li_4":
			selected_content = MALL_CONTENT;
			break;
		case "li_5":
			selected_content = FOOD_CONTENT;
			break;
		case "li_6":
			selected_content = MORE_CONTENT;
			break;
	}
}

$(document).ready(function(){
	
	//Animate each li to full opacity
	for(var i=1; i<7; i++){
		$("#li_" + i).delay(i*100).animate({opacity: 1}, 800);
	}
	
	$(".visit_content_li").click(function() {
		//Select the content to show
		select_content($(this).attr("id").replace("content_",""));
		$("#visit_content_div").html(selected_content);
	});
	
	$(".visit_li").click(function() {
	
		//Select the content to show
		select_content($(this).attr("id"));
		
		for(var i=6; i>0; i--){
		
			//Animate each li to 0 opacity
			$("#li_" + i).delay((7-i)*100).animate({opacity: 0}, 800, function(){
				//If the li is the last one
				if($(this).attr("id") == "li_1"){
					//Hide all the original boxes
					for(var j=1; j<7; j++){
						$("#li_" + j).css("display", "none");
					}
					
					//Show all the new boxes
					for(var k=1; k<7; k++){
						$("#li_content_" + k).css("display", "block");
						$("#li_content_" + k).delay(k*100).animate({opacity: 1.0}, 800, function(){
							//If it's the last one to be shown, show the content
							if($(this).attr("id") == "li_content_6"){
								$("#visit_content_div").html(selected_content);
								$("#visit_content_div").css("display", "block");
								$("#visit_content_div").animate({opacity: 1.0}, 800);	
							}
						});
					}
				}
			});
		}
	});
	
	$(".visit_li").mouseover(function() {
		if($(this).css("opacity") > 0.0){
			$(this).css("background", "url(./pictures/transparent_white_bg.png)");
			$(this).css("color", "white");
		}
	});
	
	$(".visit_li").mouseout(function() {
		if($(this).css("opacity") > 0.0){
			$(this).css("background", "white");
			$(this).css("color", "#96E4EF");
		}
	});
	
	$(".visit_content_li").mouseover(function() {
		if($(this).css("opacity") > 0.0){
			$(this).css("background", "url(./pictures/transparent_white_bg.png)");
			$(this).css("color", "white");
		}
	});
	
	$(".visit_content_li").mouseout(function() {
		if($(this).css("opacity") > 0.0){
			$(this).css("background", "white");
			$(this).css("color", "#96E4EF");
		}
	});
});
