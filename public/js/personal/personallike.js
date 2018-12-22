$(function () {
    addresslist();
});

// 获取收货地址列表
function addresslist() {

    $.get('/user/index', function (data) {
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
            for (var i = 0; i < user[0].address.length; i++) {
                html += ' <tr>';
                html += ' <td>' + user[0].address[i].name + '</td>';
                html += '<td>' + i + '</td>';
                html += '<td>' + user[0].address[i].address + '</td>';
                html += '<td>462601</td>';
                html += '<td>' + user[0].address[i].phone + '</td>';
                html += '<td>';
                html += '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#addressModal" onclick="getAddress(\'' + user[0].address[i]._id + '\',' + user[0].address[i].name + ',' + user[0].address[i].phone + ',' + user[0].address[i].address + ')">修改</button>|';
                html += '<button type="button" class="btn btn-link" onclick="deleteaddress(\'' + user[0].address[i]._id + '\')">删除</button>';
                html += '<button type="button" class="btn btn-sm btn-danger">默认地址</button>';
                html += '</td>';
                html += '</tr>';
            }
            $("#addresslist").html(html);
        }
    });
}