var $ = jQuery.noConflict();
$(document).ready(function(){

    //$('.navigation-side-nav').height($(document).height());

	  $(".button-collapse").sideNav();

    var isMediumAndAbove = Modernizr.mq('(min-width: 900px)')
    if(isMediumAndAbove){
        $('#menu-icon').click(function(){
            if(parseInt($('#nav-mobile').css('left')) !== 0 ){
                $('.page-content').animate({
                    'padding-left' : '240px'
                }, 200);
            }
            else{
                $('.page-content').animate({
                    'padding-left' : '0px'
                }, 200);
            }
        }).click();
    }



    //new group/project
    $('.add-groups-btn').click(function(){
      $(this).closest('li').next().toggleClass('hide');
    });
    $('.new-project-input').keypress(function(e){
      if(e.keyCode !== 13){
        return;
      }
      var value = $(this).val();
      var smallCapsName = value.toLowerCase();
      var randomId = parseInt( Math.random() * (9999 - 99) + 99 );
      var html =  '<li class="group droppable"> '+
                    '<a href="#'+smallCapsName+'">'+value+'</a>'+
                    '<a href="#" class="dropdown-button"  data-activates="dropdown'+randomId+'"><i class="material-icons right">more_vert</i></a>'+
                    '<!-- Dropdown Structure -->'+
                      '<ul id="dropdown'+randomId+'" class="dropdown-content">'+
                        '<li><a href="#!">Rename</a></li>'+
                        '<li><a href="#!">Delete</a></li>'+
                      '</ul>'+
                  '</li>';
      html = $(html).hide();
      $(this).parent().siblings().last().after(html);
      html.slideDown();
      $(this).val('');
      $(html).find(".dropdown-button").dropdown({
        constrainwidth : false,
        alignment : 'right'
      });
      $('.add-groups-btn').click();

      //add element to right content
      var html =  '<div class="row" id="'+smallCapsName+'">' +
                      '<div class="col s12">' +
                      '<h4 class="">'+value+'</h4> </div>' +
                    '</div>';
      $('.people-collapsed-wrapper > .col.s12').append($(html));
    });

  	$(".toggle-wrapper > .col").click(function(){
  		$(this).parent().find(".toggle-section").removeClass("active");
  		$(this).find(".toggle-section").addClass("active");
  	});

    setTimeout(function(){
      $("#slider").dateRangeSlider();
    },200);


    $('.modal-trigger').leanModal();

    $('#nav-mobile .group a:not(.dropdown-button').on('click',function(e){
      e.stopPropagation();
      e.preventDefault();
      var hash = $(this).attr('href');
      $('#nav-mobile .group').removeClass('active');
      $('.people-collapsed-wrapper h4').removeClass('active');
      $(this).parent().addClass('active');
      $(hash).siblings().find('h4.active').removeClass('active');
      $(hash).find('h4').addClass('active');
      var scrollOffset = $('#couple').parent().offset().top + 50;
      $('html,body').animate({
        scrollTop : $(hash).offset().top - scrollOffset
      }, 'slow');
    });

   /*modal scroll*/
    $(".modal-content").slimScroll({
          height: '550px'
    });


    //card.js
    $('.people-collapsed-wrapper .card').click(function(){
        var _this = this;
        if(!$(this).hasClass('expanded')){  
          if($('.people-collapsed-wrapper .expanded .card').length === 1){
              var card = $('.people-collapsed-wrapper .expanded.card');
              $(card).toggleClass('hoverable expanded').parent().toggleClass('expanded');
              var expandedSection = $(card).parent().next();
              expandedSection.removeAttr('style');
              expandedSection.toggleClass('hide');
              $(card).closest('.box').removeAttr('style');
          }
        }
        var expandedSection = $(this).parent().next();
        $(this).toggleClass('hoverable expanded').parent().toggleClass('expanded');
        expandedSection.toggleClass('hide');
        if(!$(this).hasClass('hoverable')){
          expandedSection.css({
            position: 'absolute',
            top: 192,
            zIndex: 100
          });
          $(this).closest('.box').css('margin-bottom', expandedSection.height());
        }
        else{
          expandedSection.removeAttr('style');
          $(this).closest('.box').removeAttr('style');
        }
    });

    

    $('.chips-input').keypress(function(e){
        if(e.which !== 13) {
            return true;
        }
        var input = $(this).val();
        var chip = '<div class="chip tag-inputs"><i class="material-icons chip-close">close</i>'+input+'</div>';
        $(this).val('').parent().next().append(chip);
    });


    /*tabs scroll*/

    $(".people-scroll").slimScroll({
          height: '250px'
    });

    


    $(".datepicker-box").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());;
    
    $('.editable').each(function(){
      this.contentEditable = true;
    });

    $(".dropdown-button").dropdown({
      constrainwidth : false,
      alignment : 'right'
    });

    

    $('.select-image').click(function(){
        $(this).next().click();
    });

    $('p.checkbox-wrapper').each(function(){
      var input = $(this).find('input');
      var label = $(this).find('label');
      var randomId = Math.random() * (9999 - 99) + 99;
      input.attr('id', 'checkbox' + randomId);
      label.attr('for', 'checkbox' + randomId);
    });

    $('ul.tabs li a').each(function(){
      var panelID = $(this).attr('href').replace('#','');
      var randomId = parseInt(Math.random() * (9999 - 99) + 99);
      var panelContainer = $(this).closest('.tabs-wrapper-row').next();
      var newId = panelID + randomId;
      $(panelContainer).find('[tab-id="'+panelID+'"]').attr('id', newId)
      $(this).attr('href', '#'+newId);
    });

    setTimeout(function(){
      $("ul.todo-tabs").tabs();
    }, 300);

    $('.datepicker-box').click(function(evt){
      evt.stopPropagation();
    });

    // todo-items.sort.js
    $( ".sortable-todo-items" ).sortable({
      items: "> .row",
      start : function(event, ui){
        var sortable = $(event.target).closest('.sortable-todo-items');
        sortable.prev().find('p.alert').slideUp(50);
      },
      stop : function( event, ui ){
        var sortable = $(event.target).closest('.sortable-todo-items');
        sortable.prev().find('p.alert').find('.undo-todo-move').show();
        sortable.prev().find('p.alert').find('span.message').text('To do order changed');
        sortable.prev().find('p.alert').slideDown();
      }
    }).disableSelection();

    $('p.alert .fa-times-circle').click(function(){
      $(this).closest('p.alert').slideUp();
    });

    $('p.alert .undo-todo-move').click(function(){
       $( ".sortable-todo-items" ).sortable('cancel');
       $(this).hide().closest('p.alert').find('span.message').text('Todo item restored');
    });

});