$(function () {
    sum();
    $('.addbtn').on('click', function () {
        var count = parseInt($(this).parent().parent().find('.count').val());
        count++;
        $(this).parent().parent().find('.count').val(count);

        var book_id = $(this).attr("data-id");
        countpost(book_id, 1);
        let sumPrice = (count * parseInt($(this).attr('data-price')) / 100).toFixed(2);
        $('#sum' + book_id).html(sumPrice);
        sum()
    });
    $('.subbtn').on('click', function () {
        var count = parseInt($(this).parent().parent().find('.count').val());

        var book_id = $(this).attr("data-id");
        if (count > 1) {
            count--;
            countpost(book_id, -1);
            let sumPrice = (count * parseInt($(this).attr('data-price')) / 100).toFixed(2);
            $('#sum' + book_id).html(sumPrice);
        }
        else {
            count = 1;
        }
        $(this).parent().parent().find('.count').val(count);
        sum();
    })


    $(".allcheckbox").each(function () {
        $(this).on('change', function () {
            $('input[type="checkbox"]').prop('checked', $(this).is(':checked'));
            sum();
        });
    });

    $('input[name="shopping-car"]').each(function () {
        $(this).on('change', function () {
            sum();
        });
    })

});

function countpost(book_id, num) {
    $.post('/shopping/addcar', {book_id: book_id, num: num}, function (data) {
        return;
    })
}

function sum() {
    var sumCount = 0;
    var sumPrice = 0;
    $('input[name="shopping-car"]').each(function () {
        if ($(this).is(':checked')) {
            var book_id = $(this).val();
            var price = parseFloat($('#sum' + book_id).text());
            sumPrice += price;
            sumCount += parseInt($('#price' + book_id).val());
        }
    })
    $("#sum").html("共" + sumCount + "本，合计" + sumPrice.toFixed(2) + "元")
}

function del(that, id) {

    $(that).parents("tr").remove();
    sum();
    $.post('/shopping/delete', {id: id}, function (data) {
        if (data == 1) {
            layer.msg(data.msg)
        } else {
            layer.msg(data.msg)
        }
    });

}

function datasubmit() {
    var shoppingcar = []
    $('input[name="shopping-car"]').each(function () {
        if ($(this).is(':checked')) {
            shoppingcar.push($(this).attr('data-id'));
        }
    });

}