$(document).ready(function() {

    var $orders = $(".orders");
    var $age = $("#age");
    var $name = $("#name");

    var orderTemplate = $("#order-template").html();

    function addOrder(item) {
        $orders.append(Mustache.render(orderTemplate, item));
    }

    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/omg/wtf',
        success: function(data) {
            $.each(data, function(i, item) {
                addOrder(item);
            });
        },
        error: function() {
            alert("error loading orders");
        }
    });

    $(".add-order").on("click", function() {

        var order = {
            name: $name.val(),
            age: $age.val()
        };

        $.ajax({
            type: "POST",
            url: "http://rest.learncode.academy/api/omg/wtf",
            data: order,
            success: function(newItem) {
                addOrder(newItem);
            },
            error: function() {
                alert("error saving order");
            }
        });
    });

    $orders.delegate(".remove-item", "click", function() {

    	var $li = $(this).closest("li");

        $.ajax({
            type: "DELETE",
            url: "http://rest.learncode.academy/api/omg/wtf/" + $(this).attr("data-id"),
            success: function() {
                $li.fadeOut(200, function() {
                	$(this).remove();
                });
            }
        });
    });

    $orders.delegate(".edit-order", "click", function() {
    	var $li = $(this).closest("li");
    	$li.find('input.name').val( $li.find("span.name").html() );
    	$li.find('input.age').val( $li.find("span.age").html() );
    	$li.addClass("edit");
    });

    $orders.delegate(".cancel-edit", "click", function() {
    	var $li = $(this).closest("li").removeClass("edit");
    });

    $orders.delegate(".save-edit", "click", function() {
    	var $li = $(this).closest("li");
    	var order = {
            name: $li.find("input.name").val(),
            age: $li.find("input.age").val()
        };

        $.ajax({
            type: "PUT",
            url: "http://rest.learncode.academy/api/omg/wtf/" + $li.attr("data-id"),
            data: order,
            success: function(newItem) {
                $li.find("span.name").html(order.name);
                $li.find("span.age").html(order.age);
                $li.removeClass("edit");
            },
            error: function() {
                alert("error saving order");
            }
        });

    });

});
