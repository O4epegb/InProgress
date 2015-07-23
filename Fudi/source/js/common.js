$(document).ready(function () {

	//Menu-scrolling
	$(".menu-reasons").click(function () {
		$(window).stop().scrollTo($(".reasons"), 500);
	});
	$(".menu-app").click(function () {
		$(window).stop().scrollTo($(".app"), 500);
	});
	$(".menu-recipes").click(function () {
		$(window).stop().scrollTo($(".recipes"), 500);
	});

	//Back-to-top-button
	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.btn-top');

	//hide or show the "back to top" link
	$(window).scroll(function () {
		($(this).scrollTop() > offset) ? $back_to_top.addClass('btn-top-visible') : $back_to_top.removeClass('btn-top-visible btn-top-fade-out');
		if ($(this).scrollTop() > offset_opacity) {
			$back_to_top.addClass('btn-top-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function (event) {
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0
		}, scroll_top_duration);
	});
});