$(document).ready(function() {
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#contactus").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("#contactus").serialize()
		}).done(function() {
			alert("Thank you for your message");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});