var ttBazaarVoice = (function($,config){
	
	//Review functions
	
	//Stars
	function updateRatingInfo(pid, options){
		
		var query = {
			apiVersion: config.apiVersion,
			passKey: config.apiKey,
			filter: "productid:" + pid + "_" + config.productYear,
			stats: config.stats
		};
		
		$.ajax({
			url: window.location.protocol + "//" + config.domain + config.path,
			data: query,
			dataType: "jsonp",
			cache: true,
			success: function(data){
				updateRatingInfoCallback(data, options);
			}
		});
		
	}
	
	function updateRatingInfoCallback(data, options){
		try{
			var numReviews = data["Results"][0]["ProductStatistics"]["ReviewStatistics"]["TotalReviewCount"];
			var avgRating = data["Results"][0]["ProductStatistics"]["ReviewStatistics"]["AverageOverallRating"];
			var productId = data["Results"][0]["ProductStatistics"]["ProductId"];
				
			var legacyProductId = productId.split("_")[0];			
			
			// If we are on the review archive page, update the text rating in the heading
			if(!avgRating) {
				avgRating = 0;
			}

			updateStarsAndRating(legacyProductId, numReviews, avgRating, options.updateAvgRating);
			
		}catch(e){
			//Do nothing
		}
	}
	
	function updateStarsAndRating(legacyProductId, numReviews, avgRating, updateAvgRating) {
		// Dynamically update star rating and review count for all products 
		$(".bzNumReviews_" + legacyProductId).html(addCommas(numReviews));
		$(".bzNumStars_" + legacyProductId).html(avgRating);
		$(".bzNumStars_" + legacyProductId).parent('.bzInner').css('width',BVCalcPercent(avgRating) + '%');		
		
		if(updateAvgRating) {
			if(!isNaN(avgRating)) {
				$("#bvArchiveAverageRating").html(avgRating.toFixed(1));
			} else {
				$("#bvArchiveAverageRating").html("n/a");	
			}				
		}		
	}
	
	function BVCalcPercent (bzVal){
		
		var numStars = 5;
		var starSize = 100 / 5;
		
		bzWhole = Math.floor(bzVal);
		bzDecimal = bzVal % 1;
		
		return bzWhole*starSize + bzDecimal*starSize;
		
	}

	function addCommas(nStr){
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	
	//public functions
	var pub = {};
	
	//async load of bvapi
	pub.loadApi = function(callback){
		if(window.$BV){
			callback();
		}else{
			$.ajax({
				url: window.location.protocol + "//" + config.libraryUrl,
				cache: true,
				dataType: "script",
				success: function(){
					$($BV.docReady);
					callback();
				}
			});
		}
	};
	
	pub.updateRatingInfo = function(pid, options){
		updateRatingInfo(pid, options);
	};
	
	pub.getFullProductId = function(pid, year){
		
		year = year || "";
		
		if(year != ""){
			return pid + "_" + year;
		}else{
			return pid + "_" + config.productYear;
		}
		
	};
	
	pub.staticStars = function(pid, reviews, rating, update){
		updateStarsAndRating(pid, reviews, rating, update);
	};

	pub.callToActionLinkCallback = function(event){

		event.preventDefault();

		 try {
			var title = $(event.target || event.srcElement).attr("title");
			if(title.indexOf("Online Federal Free Edition") !== -1) {
				location.pathname = "/personal-taxes/online/free-edition.jsp";
			} else if(title.indexOf("Online Basic") !== -1) {
				location.pathname = "/personal-taxes/online/basic.jsp";
			} else if(title.indexOf("Online Deluxe") !== -1) {
				location.pathname = "/personal-taxes/online/deluxe.jsp";
			} else if(title.indexOf("Online Premier") !== -1) {
				location.pathname = "/personal-taxes/online/premier.jsp";
			} else if(title.indexOf("Online Home & Business") !== -1) {
				location.pathname = "/personal-taxes/online/home-and-business.jsp";
			} else if(title.indexOf("Basic - CD or Download") !== -1) {
				location.pathname = "/personal-taxes/cd-download/basic.jsp";
			} else if(title.indexOf("Deluxe - CD or Download") !== -1) {
				location.pathname = "/personal-taxes/cd-download/deluxe.jsp";
			} else if(title.indexOf("Premier - CD or Download") !== -1) {
				location.pathname = "/personal-taxes/cd-download/premier.jsp";
			} else if(title.indexOf("Home & Business - CD or Download") !== -1) {
				location.pathname=  "/personal-taxes/cd-download/home-and-business.jsp";
			} else if(title.indexOf("Business - CD or Download") !== -1) {
				location.pathname = "/small-business-taxes/business.jsp";
			} else if(title.indexOf("TurboTax Military Edition - E-1 to E-5") !== -1) {
				location.pathname = "/personal-taxes/online/military-edition.jsp";
			} else if(title.indexOf("TurboTax Military Edition - E-6 to E-10 & Officer") !== -1) {
				location.pathname = "/personal-taxes/online/military-edition.jsp";
			} else {
				// If we can't determine the product, shoot them over to the questionnaire
				location.pathname = "/personal-taxes/";
			}
			
		} catch(e) {
			// If all else fails, just send them to the questionnaire
			location.pathname = "/personal-taxes/";
		}
		
		location.hash = ""; 

	};
	
	return pub;
	
}(jQuery,appVars.bv));
window.callToActionLinkCallback = ttBazaarVoice.callToActionLinkCallback || (function(e){ window.scrollTo(0,0); });