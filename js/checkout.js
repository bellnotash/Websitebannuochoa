import { getCart, clearCart } from './cart.js';

document.addEventListener('DOMContentLoaded', function() {
    const orderItems = document.getElementById('order-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutForm = document.getElementById('checkout-form');

    function renderOrderSummary() {
        const cart = getCart();
        let total = 0;

        orderItems.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="order-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                </div>
            `;
        }).join('');

        totalPrice.textContent = `${total.toLocaleString('vi-VN')}đ`;
    }

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Ở đây bạn sẽ thêm logic để xử lý việc đặt hàng
        // Ví dụ: gửi dữ liệu đơn hàng lên server
        alert('Đặt hàng thành công!');
        clearCart();
        window.location.href = '../html/index.html'; // Chuyển hướng về trang chủ
    });

    renderOrderSummary();
});
