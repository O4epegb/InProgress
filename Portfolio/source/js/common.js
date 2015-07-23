$(document).ready(function () {
	$(".menu-projects").click(function () {
		$(window).stop().scrollTo($(".projects"), 500, {
			offset: -60
		});
	});
	$(".menu-skills").click(function () {
		$(window).stop().scrollTo($(".skills"), 500, {
			offset: -60
		});
	});
	$(".menu-contact").click(function () {
		$(window).stop().scrollTo($(".footer-wrapper"), 500, {
			offset: -60
		});
	});

	// Init controller
	var controller = new ScrollMagic.Controller({
		refreshInterval: 200,
		globalSceneOptions: {
			triggerHook: .69
		}
	});

	var scene1 = new ScrollMagic.Scene({
			triggerElement: '.projects',
			duration: $('.projects').height()
		})
		.setClassToggle('.menu li:nth-of-type(1)', 'active')
		.addTo(controller);
	var scene12 = new ScrollMagic.Scene({
			triggerElement: '.projects',
			duration: $('.projects').height()
		})
		.setClassToggle('.header-wrapper', 'header-border-red')
		.addTo(controller);
	var scene2 = new ScrollMagic.Scene({
			triggerElement: '.skills',
			duration: $('.skills').height()
		})
		.setClassToggle('.menu li:nth-of-type(2)', 'active')
		.addTo(controller);
	var scene22 = new ScrollMagic.Scene({
			triggerElement: '.skills',
			duration: $('.skills').height()
		})
		.setClassToggle('.header-wrapper', 'header-border-aqua')
		.addTo(controller);
	var scene3 = new ScrollMagic.Scene({
			triggerElement: '.footer-wrapper',
			duration: $('.footer-wrapper').height()
		})
		.setClassToggle('.menu li:nth-of-type(3)', 'active')
		.addTo(controller);
	var scene32 = new ScrollMagic.Scene({
			triggerElement: '.footer-wrapper',
			duration: $('.footer-wrapper').height()
		})
		.setClassToggle('.header-wrapper', 'header-border-yellow')
		.addTo(controller);
});