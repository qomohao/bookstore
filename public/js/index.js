$().ready(function() {
    //		外部包裹
    //		data-ride="carousel"设置自动播放
    //		data-interval="2000" 播放间隔时间
    //		data-pause="hover" 鼠标悬停停止，离开继续播放
    //		data-wrap="false" 是否循环播放 默认true
    $("#carousel-example-generic").carousel({
        interval: 2000, //间隔时间
        pause: 'hover', //鼠标放上暂停，离开后继续
        wrap: true //是否循环轮播
    });
    //左右箭头的鼠标事件 淡入淡出
    $("#carousel-example-generic").hover(function() {
        $(".carousel-control").fadeIn(100);
    }, function() {
        $(".carousel-control").fadeOut(100);
    });

});