$(document).ready(function () {
    //匹配nav-link的激活状态
    var $nav_main_link = $(".nav-main-link");
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



