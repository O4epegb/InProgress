//Кнопка плюс минус, поп-ап, карта
$(document).ready(function () {
	$(".theader-menu__list--mobile-button").click(function(){
        $(this).next().slideToggle();
    })
	
    function e() {
        var e = {
                center: n,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            o = new google.maps.Map(document.getElementById("googleMap"), e),
            l = new google.maps.Marker({
                position: n,
                icon: "images/google-map__icon.png"
            });
        l.setMap(o);
        var a = new google.maps.InfoWindow({
            content: "<p>Welcome to Sedona!</p>"
        });
        google.maps.event.addListener(l, "click", function () {
            a.open(o, l)
        })
    }
    $(".order__btn-search").click(function (e) {
        e.preventDefault(), $(this).toggleClass("order__btn-search--active"), $(".order__popup").slideToggle(500)
    });
    var o = /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/;
    $(".order__field-in, .order__field-out").blur(function (e) {
        var l = $(this).val();
        "" === l ? ($(this).val($(this).attr("value")), $(this).css({
            border: "1px solid #F2F2F2"
        })) : $(this).css(-1 != l.search(o) ? {
            border: "1px solid #3bea38"
        } : {
            border: "1px solid red"
        })
    });
    var l = $(".order__field-people--adult"),
        a = $(".order__field-people--child");
    $("#minus-adult").click(function (e) {
        l.val() > 0 && l.val(+l.val() - 1)
    }), $("#plus-adult").click(function (e) {
        l.val() >= 0 && l.val() < 99 ? l.val(+l.val() + 1) : l.val() >= 100 && l.val(99)
    }), $("#minus-child").click(function (e) {
        a.val() > 0 && a.val(+a.val() - 1)
    }), $("#plus-child").click(function (e) {
        a.val() >= 0 && a.val() < 99 ? a.val(+a.val() + 1) : a.val() >= 100 && a.val(99)
    });
    var n = new google.maps.LatLng(34.869946, -111.761156);
    google.maps.event.addDomListener(window, "load", e)
});