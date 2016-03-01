$(document).ready(function(){
	$(".button-collapse").sideNav();
	  
    var isMediumAndAbove = Modernizr.mq('(min-width: 900px)')
    if(isMediumAndAbove){    
        $('#menu-icon').click(function(){
            if(parseInt($('#nav-mobile').css('left')) !== 0 ){
                $('.page-content').animate({
                    'margin-left' : '240px'
                }, 200);
            }
            else{
                $('.page-content').animate({
                    'margin-left' : '0px'
                }, 200);
            }
        }).click();
    }

	$(".toggle-wrapper > .col").click(function(){
		$(this).parent().find(".toggle-section").removeClass("active");
		$(this).find(".toggle-section").addClass("active");
	})
})