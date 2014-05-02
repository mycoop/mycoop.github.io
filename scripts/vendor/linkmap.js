$(function(){
   var $header = $('h5.toggle-header');

	$header.click(function(){	
		if ($('.foot-sub-nav').is(":visible")){			
			$(this).find('span').removeClass('TD-arrow-2').addClass("TD-arrow");
		} else {			
			$(this).find('span').removeClass('TD-arrow').addClass("TD-arrow-2");			
		}
	});

});