document.addEventListener('DOMContentLoaded', function() {
    const orderList = document.getElementById('order-list');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');

    // Giả lập dữ liệu đơn hàng (trong thực tế, bạn sẽ lấy dữ liệu từ server)
    let orders = [
        { id: 1, date: '2023-05-01', customer: 'Nguyễn Văn A', total: 1500000, status: 'pending' },
        { id: 2, date: '2023-05-02', customer: 'Trần Thị B', total: 2000000, status: 'processing' },
        { id: 3, date: '2023-05-03', customer: 'Lê Văn C', total: 1800000, status: 'shipped' },
    ];

    function renderOrders(filteredOrders) {
        orderList.innerHTML = filteredOrders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.customer}</td>
                <td>${order.total.toLocaleString('vi-VN')}đ</td>
                <td>${getStatusText(order.status)}</td>
                <td class="order-actions">
                    <button class="btn-view" onclick="viewOrder(${order.id})">Xem</button>
                    <button class="btn-edit" onclick="editOrder(${order.id})">Sửa</button>
                    <button class="btn-delete" onclick="deleteOrder(${order.id})">Xóa</button>
                </td>
            </tr>
        `).join('');
    }

    function getStatusText(status) {
        const statusMap = {
            'pending': 'Chờ xử lý',
            'processing': 'Đang xử lý',
            'shipped': 'Đã giao hàng',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy'
        };
        return statusMap[status] || status;
    }

    function filterOrders() {
        const selectedStatus = statusFilter.value;
        const selectedDate = dateFilter.value;

        const filteredOrders = orders.filter(order => 
            (selectedStatus === 'all' || order.status === selectedStatus) &&
            (!selectedDate || order.date === selectedDate)
        );

        renderOrders(filteredOrders);
    }

    statusFilter.addEventListener('change', filterOrders);
    dateFilter.addEventListener('change', filterOrders);

    // Khởi tạo danh sách đơn hàng
    renderOrders(orders);

    // Định nghĩa các hàm xử lý cho nút hành động
    window.viewOrder = function(id) {
        alert(`Xem chi tiết đơn hàng ${id}`);
    };

    window.editOrder = function(id) {
        alert(`Sửa đơn hàng ${id}`);
    };

    window.deleteOrder = function(id) {
        if (confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${id}?`)) {
            orders = orders.filter(order => order.id !== id);
            filterOrders();
        }
    };
});
