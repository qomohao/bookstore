$(document).ready(function () {
    //匹配nav-link的激活状态
    badgeCount();
    var $nav_main_link = $(".nav-main-link-a");
    var fullURL = window.location.protocol + '//' + window.location.host + window.location.pathname;
    for (var i = 0; i < $nav_main_link.length; i++) {
        if (fullURL == $nav_main_link[i].href) {
            $nav_main_link[i].parentNode.classList.add("active");
        }
        else {
            $nav_main_link[i].parentNode.classList.remove("active");
        }
    }
});

//导航购物车数量
function badgeCount() {

    $.get('/shopping/count', {}, function (data) {
        if (data.status == 1) {
            $('#shopping_car_count').html(data.total_num)
        } else {
            return;
        }
    })

}



