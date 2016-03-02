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

    $(function() {
        $( "#slider-range" ).slider({
          range: true,
          min: 0,
          max: 500,
          values: [ 75, 300 ],
          slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
          }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
          " - $" + $( "#slider-range" ).slider( "values", 1 ) );
      })


    $("#slider").dateRangeSlider()


    $(document).ready(function(){
      $('.modal-trigger').leanModal();
    })
})