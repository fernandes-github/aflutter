var $ = jQuery.noConflict();
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
  	});

    setTimeout(function(){
      $("#slider").dateRangeSlider();
    },200);


    $('.modal-trigger').leanModal();

    $('#nav-mobile .group a').click(function(e){
      e.stopPropagation();
      e.preventDefault();
      var hash = $(this).attr('href');
      $('#nav-mobile .group').removeClass('active');
      $('.people-collapsed-wrapper h4').removeClass('active');
      $(this).parent().addClass('active');
      $(hash).find('h4').addClass('active');
      var scrollOffset = $('#couple').parent().offset().top + 50;
      $('html,body').animate({
        scrollTop : $(hash).offset().top - scrollOffset
      }, 'slow');
    });

   
    $(".modal-content").slimScroll({
          height: '550px'
    });

   
    //card.js
    $('.people-collapsed-wrapper .card').click(function(){
        var expandedSection = $(this).parent().next();
        $(this).toggleClass('hoverable').toggleClass('expanded');
        expandedSection.toggleClass('hide');
    });
      
    $("ul.todo-tabs").tabs();
    
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $('.chips-input').autocomplete({source: availableTags}).keypress(function(e){
        if(e.which !== 13) {
            return true;
        }
        var input = $(this).val();
        var chip = '<div class="chip tag-inputs"><i class="material-icons chip-close">close</i>'+input+'</div>';
        $(this).val('').parent().next().append(chip);
    });
    
    
    

});