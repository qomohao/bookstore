$(function () {
    addresslist();
});

// 获取收货地址列表
function addresslist() {

    $.get('/user/address', {}, function (data) {

        if (data.status == 1) {
            var user = data.result;
            var html = '<tr class="danger" style="color: red;">';
            html += '<td>收货人</td>';
            html += '<td>所在地区</td>';
            html += '<td>详细地址</td>';
            html += '<td>邮编</td>';
            html += '<td>联系方式</td>';
            html += '<td>操作</td>';
            html += '</tr>';
            for (var i = 0; i < user.address.length; i++) {
                html += ' <tr>';
                html += ' <td>' + user.address[i].name + '</td>';
                html += '<td>' + i + '</td>';
                html += '<td>' + user.address[i].address + '</td>';
                html += '<td>462601</td>';
                html += '<td>' + user.address[i].phone + '</td>';
                html += '<td>';
                html += '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#addressModal" onclick="getAddress(\'' + user.address[i]._id + '\',\'' + user.address[i].name + '\',\'' + user.address[i].phone + '\',\'' + user.address[i].address + '\')">修改</button>|';
                html += '<button type="button" class="btn btn-link" onclick="deleteaddress(\'' + user.address[i]._id + '\')">删除</button>';
                html += '<button type="button" class="btn btn-sm btn-danger">默认地址</button>';
                html += '</td>';
                html += '</tr>';
            }
            $("#addresslist").html(html);
        }
    });
}

// 点击事件 -- 对隐藏元素进行赋值，用于区分编辑和添加
function getAddress(address_id, user_name, user_phone, user_address) {
    $("#address_id").val(address_id);
    $("#user_name").val(user_name);
    $("#user_phone").val(user_phone);
    $("#user_address").val(user_address);
}

// 清空模态框内数据
function clearVal() {
    $("#address_id").val('');
    $("#user_name").val('');
    $("#user_phone").val('');
    $("#user_address").val('');
}

function manageaddress() {
    var address_id = $("#address_id").val();
    var user_name = $("#user_name").val();
    var user_phone = $("#user_phone").val();
    var user_address = $("#user_address").val();
    if (address_id) {
        // 修改收货地址
        $.post('/user/update?address_id=' + address_id, {
            name: user_name,
            phone: user_phone,
            address: user_address,
        }, function (data) {
            if (data.status == 1) {
                $('#addressModal').modal('hide');
                layer.msg(data.msg);
                addresslist();
            } else {
                layer.msg(data.msg);
            }
        })
    } else {
        // 地址添加
        $.post('/user/add', {
            name: user_name,
            phone: user_phone,
            address: user_address,
        }, function (data) {
            if (data.status == 1) {
                $('#addressModal').modal('hide');
                layer.msg(data.msg);
                addresslist();
            } else {
                layer.msg(data.msg);
            }
        })
    }
}

function deleteaddress(address_id) {
    layer.confirm('是否删除?', {
        btn: ['是', '否']
    }, function () {
        $.post('/user/delete/?address_id=' + address_id, {}, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                addresslist();
            } else {
                layer.msg(data.msg);
            }
        })
    })
}