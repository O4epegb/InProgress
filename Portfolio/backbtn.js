$(document).ready(function () {
	$("body").prepend( "<a class='back-button' href='http://o4epegb.github.io/'>Back to main</a>" );
	$(".back-button").css({
		"font-size": "20px",
		"display": "block",
		"position": "fixed",
		"width": "120px",
		"height": "40px",
		"line-height": "40px",
		"top": "100px",
		"left": "0",
		"z-index": "1000",
		"background-color": "#fff",
		"border": "2px solid #000",
		"border-left": "none",
		"border-top-right-radius": "5px",
		"border-bottom-right-radius": "5px",
		"color": "#000"
    });
});