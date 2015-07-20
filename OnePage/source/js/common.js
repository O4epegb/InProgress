$(document).ready(function () {
	//Открывание/закрывание меню
	$(document).on('click', function (e) {
		if ($(e.target).is($('.menu-btn')) || $(e.target).is($('.menu-btn').children())) {
			$(".menu").toggleClass("menu-active");
			$(".menu-btn").toggleClass("menu-btn-active");
		} else {
			$(".menu").removeClass("menu-active");
			$(".menu-btn").removeClass("menu-btn-active");
		}
	});

	//Переход по ссылкам меню, выделение активных ссылок после клика
	$(".menu ul li a, .dots a").click(function () {
		var currentPage = $('.active-page');
		var linkIndex = $(this).parent().index();
		var sectionSelector = $("main").children();
		if (linkIndex > currentPage.index()) {
			sectionSelector.filter(function (index) {
				return index < linkIndex;
			}).addClass('top-page')
		} else if (linkIndex < currentPage.index()) {
			sectionSelector.filter(function (index) {
				return index >= linkIndex;
			}).removeClass('top-page')
		};
		currentPage.removeClass('active-page');
		sectionSelector.eq(linkIndex).addClass('active-page');
		activeMenuLink();
		activeNavDot();
	})

	//Выделение активной ссылки в меню после скролла
	var activeMenuLink = function () {
		$(".active-menu-link").removeClass("active-menu-link")
		$("main").children().each(function (index) {
			if ($(this).hasClass("active-page")) {
				$(".menu").find("li").eq(index).children().addClass("active-menu-link");
			}
		});
	}
	
	//Выделение активной точки навигации после скролла
	$(".dots").first().addClass("active-dot");
	var activeNavDot = function () {
		$(".active-dot").removeClass("active-dot")
		$("main").children().each(function (index) {
			if ($(this).hasClass("active-page")) {
				$(".dots").eq(index).addClass("active-dot");
			}
		});
	}

	//Скролл страниц (плюс используем функции выделения активной ссылки и точки)
	$(document).on('mousewheel keydown mousedown', function (e) {
		if ((e.deltaY < 0 || e.keyCode == 40 || e.keyCode == 32 || e.keyCode == 34) && e.ctrlKey == false) {
			var currentPage = $('.active-page');
			var nextPage = currentPage.next();
			if (nextPage.length != 0) {
				currentPage.removeClass('active-page').addClass('top-page');
				nextPage.addClass('active-page');
			}
			activeMenuLink();
			activeNavDot();
		} else if ((e.deltaY > 0 || e.keyCode == 38 || e.keyCode == 33) && e.ctrlKey == false) {
			var currentPage = $('.active-page');
			var nextPage = currentPage.prev();
			if (nextPage.length != 0) {
				currentPage.removeClass('active-page');
				nextPage.removeClass('top-page').addClass('active-page');
			}
			activeMenuLink();
			activeNavDot();
		} else if (e.which == 2) {
			e.preventDefault();
		}
	});

	//Случайные цвета
	var rndNumber = function () {
		return Math.floor((Math.random() * colorsArr.length))
	};
	var colorsArr = ["bg-blue", "bg-yellow", "bg-pink", "bg-green", "bg-white"];
	var color;

	$(".apply-btn").mouseenter(function () {
		color = rndNumber();
		$(this).addClass(colorsArr[color]);
	});
	$(".apply-btn").mouseleave(function () {
		$(this).removeClass(colorsArr[color]);
	});
});