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