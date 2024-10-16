document.addEventListener('DOMContentLoaded', function() {
    const accountForm = document.getElementById('account-form');
    const orderHistoryList = document.getElementById('order-history-list');

    // Giả lập dữ liệu tài khoản (trong thực tế, bạn sẽ lấy dữ liệu từ server)
    const accountInfo = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        address: 'Số 123, Đường ABC, Quận XYZ, TP. Hồ Chí Minh'
    };

    // Giả lập dữ liệu lịch sử đơn hàng (trong thực tế, bạn sẽ lấy dữ liệu từ server)
    const orderHistory = [
        { id: 1, date: '2023-05-01', total: 1500000, status: 'Đã giao hàng' },
        { id: 2, date: '2023-05-15', total: 2000000, status: 'Đang xử lý' },
        { id: 3, date: '2023-05-30', total: 1800000, status: 'Chờ thanh toán' },
    ];

    // Hiển thị thông tin tài khoản
    document.getElementById('account-name').value = accountInfo.name;
    document.getElementById('account-email').value = accountInfo.email;
    document.getElementById('account-phone').value = accountInfo.phone;
    document.getElementById('account-address').value = accountInfo.address;

    // Xử lý cập nhật thông tin tài khoản
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Ở đây bạn sẽ thêm logic để cập nhật thông tin tài khoản
        alert('Cập nhật thông tin thành công!');
    });

    // Hiển thị lịch sử đơn hàng
    orderHistoryList.innerHTML = orderHistory.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.total.toLocaleString('vi-VN')}đ</td>
            <td>${order.status}</td>
        </tr>
    `).join('');
});
