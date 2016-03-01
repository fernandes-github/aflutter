$(document).ready(function(){
	$(".button-collapse").sideNav();
	//$('#menu-icon').click();

	$(".toggle-wrapper > .col").click(function(){
		$(this).parent().find(".toggle-section").removeClass("active");
		$(this).find(".toggle-section").addClass("active");
	})
})