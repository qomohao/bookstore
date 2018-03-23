$('.category-tab >li>button').mouseenter(function () {
    $(this).parent().find('ul').stop().slideDown();
    $(this).parent().siblings().find('ul').stop().hide();
});
$('.category-tab >li>ul').hover(function () {
    $(this).clearQueue().slideDown();
}, function () {
    $(this).stop().hide()
});


$("#order_cnt_sort").on('click', function () {
    var pname = $(this).attr('data-pname');
    var cname = $(this).attr('data-cname');
    var order_cnt = $(this).attr('data-order_cnt');
    if (order_cnt == 1) {
        order_cnt = -1;
    } else if (order_cnt == -1) {
        order_cnt = 1;
    } else if (order_cnt == 1) {
        order_cnt = 0;
    }
    window.location.href = window.location.pathname + '?pname=' + pname + '&cname=' + cname + '&order_cnt=' + order_cnt + '&price=' + price + '&cid=' + cid;
    return false;
});


$("#price_sort").on('click', function () {

    var pname = $(this).attr('data-pname');
    var cname = $(this).attr('data-cname');
    var order_cnt = $(this).attr('data-order_cnt');
    var price = $(this).attr('data-price');
    var cid = $(this).attr('data-cid');
    if (price == 0) {
        price = 1;
    } else if (price == 1) {
        price = -1;
    } else if (price == -1) {
        price = 0;
    }
    window.location.href = window.location.pathname + '?pname=' + pname + '&cname=' + cname + '&order_cnt=' + order_cnt + '&price=' + price + '&cid=' + cid;
    return false;
});


