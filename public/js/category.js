$('.category-tab >li>button').hover(function () {
    $(this).parent().find('ul').stop().slideDown();
}, function () {
    $(this).parent().find('ul').stop().slideUp()
});
$('.category-tab >li>ul').hover(function () {
    $(this).stop().slideDown();
}, function () {
    $(this).stop().slideUp()
});


$("#order_cnt_sort").on('click', function () {
    var pname = $(this).attr('data-pname');
    var cname = $(this).attr('data-cname');
    var order_cnt = $(this).attr('data-order_cnt');
    if (order_cnt == 1) {
        order_cnt = -1;
    } else {
        order_cnt = 1;
    }
    window.location.href = window.location.pathname + '?pname=' + pname + '&cname=' + cname + '&order_cnt=' + order_cnt;
    return false;
});
$("#price_sort").on('click', function () {
    var pname = $(this).attr('data-pname');
    var cname = $(this).attr('data-cname');
    var price = $(this).attr('data-price');
    if (price == 1) {
        price = -1;
    } else {
        price = 1;
    }
    window.location.href = window.location.pathname + '?pname=' + pname + '&cname=' + cname + '&price=' + price;
    return false;
});