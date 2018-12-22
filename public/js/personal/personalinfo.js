$(function () {
    personalinfo()
});

function personalinfo() {

    $.get('/user/index', function (data) {
        const user = data.user
        var html = '';
        html += '<div style="text-align: center;">';
        html += ' <img src="/images/tou.jpg" alt="aaa" style="width: 100px;height: 100px;">';
        html += ' </div>';
        html += '<div style="text-align: center;padding: 10px 0px;">';
        html += ' <button type="button" class="btn btn-danger">修改头像</button>';
        html += ' </div>';
        html += '<div style="width: 50%;margin: auto;padding: 20px;">';
        html += ' <p>邮箱:&nbsp; &nbsp;<span style="color: #888;">' + user.email + '</span>';
        html += '<span class="btn btn-link" style="margin-left: 20px;color: red;" data-toggle="modal" data-target="#infoModel" onclick="getinfo()">编辑</span>';
        html += ' </p>';
        html += ' <p>电话:&nbsp; &nbsp;<span style="color: #888;">' + user.phone + '</span></p>';
        html += '<p>昵称:&nbsp; &nbsp;<span style="color: #888;">' + user.nickname + '</span></p>';
        html += '<p>性别:&nbsp; &nbsp;<span style="color: #888;">'+user.sex+'</span></p>';
        html += '<p>出生日期:&nbsp; &nbsp; <span style="color: #888;">1996-01-17</span></p>';
        html += '<p>自我介绍:&nbsp; &nbsp;<span style="color: #888;">' + user.info + '</span></p>';
        html += '</div>';
        $("#personalinfo").html(html);
    })
}

function saveinfo() {
    // 邮箱
    var email = $("#email_name").val();
    // 昵称
    var nickname = $("#nick_name").val();
    // 电话
    var phone = $("#nick_phone").val();
    // 性别
    var sex = $('input:radio[name="sex"]:checked').val();
    // 详细地址
    var info = $("#message_text").val();

    $.post('/user/usersave', {
        email: email,
        nickname: nickname,
        phone: phone,
        sex: sex,
        info: info,
    }, function (data) {
        if (data.status == 1) {
            $('#infoModel').modal('hide');
            layer.msg(data.msg);
            personalinfo();
        } else {
            layer.msg(data.msg);
        }
    })
}

function getinfo() {
    $.get('/user/index', function (data) {
        const user = data.user;
        // 邮箱
        $("#email_name").val(user.email);
        // 昵称
        $("#nick_name").val(user.nickname);
        // 电话
        $("#nick_phone").val(user.phone);
        // 性别
        $("#inlineRadio1").val(user.sex);
        // 详细地址
        $("#message_text").val(user.info);
    })
}

function password() {

    var oldpassword = $("#oldpassword").val();
    var newpassword = $("#newpassword").val();
    var repassword = $("#repassword").val();
    $.post('/user/password', {
        oldpassword: oldpassword,
        newpassword: newpassword,
        repassword: repassword,
    }, function (data) {
        if (data.status == 1) {
            layer.msg(data.msg);
            window.location.href = '/user/login'
        } else {
            layer.msg(data.msg);
        }
    })
}