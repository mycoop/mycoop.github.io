$(function(){

//fn
    var slideIn = function(){
        $('body').append('<div class="overlay"></div>');
        $('.overlay').hammer().on("tap", function(){ slideOut(); });
        $('.overlay').height(window.innerHeight*4);
        $('.overlay').toggleClass('fade-in');
        $('.navigation').toggleClass('slide-in');
        $('.navbar').toggleClass('active');
        $('body').toggleClass('nav-active');
    }
    var slideOut = function(){
        $('.navbar').toggleClass('active');
        $('body').toggleClass('nav-active');
        $('.navigation').toggleClass('slide-in');                               
        $('.navigation').toggleClass('slide-out');
        $('.overlay').remove();
    }

// listeners

    // flyout nav toggles
    $("[data-flyout-toggle='true']").hammer().on("tap", function(){
        if($('#navigation').hasClass('slide-in')){
            slideOut();
        } else {
            slideIn();                
        }
    })

    // flyout nav tap/click listeners
    $('.navigation .category').hammer().on("tap", function(){
        $(this).parent('li').toggleClass('active');
    });

    // navigation slide out callback
    $('.navigation').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function (e) {
        $('.navigation').removeClass('slide-out');
        $('.navigation .category').removeClass('active');
        $('.navigation .category').next('.menu').removeClass('active');
    });

    //prevent event bubbling 
    $('.navigation .category').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function (e) {
        e.stopPropagation();
    });
    
    //prevent event bubbling 
    $('.navigation .menu').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function (e) {
        e.stopPropagation();
    });

});
