import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Giả lập dữ liệu sản phẩm (trong thực tế, bạn sẽ lấy dữ liệu từ server)
    const products = [
        { id: 1, name: "Nước hoa A", price: 1200000, brand: "Chanel", image: "images/perfume1.jpg", description: "Mô tả chi tiết về Nước hoa A..." },
        { id: 2, name: "Nước hoa B", price: 1500000, brand: "Dior", image: "images/perfume2.jpg", description: "Mô tả chi tiết về Nước hoa B..." },
        // Thêm các sản phẩm khác
    ];

    // Tìm sản phẩm dựa trên ID
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        // Cập nhật thông tin sản phẩm trên trang
        document.querySelector('.product-title').textContent = product.name;
        document.querySelector('.product-brand span').textContent = product.brand;
        document.querySelector('.product-price').textContent = `${product.price.toLocaleString('vi-VN')}đ`;
        document.querySelector('.product-description p').textContent = product.description;
        document.querySelector('.main-image').src = product.image;
    } else {
        // Xử lý trường hợp không tìm thấy sản phẩm
        document.querySelector('.product-detail').innerHTML = '<p>Không tìm thấy sản phẩm</p>';
    }

    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const quantityInput = document.getElementById('quantity');
    const addToCartButton = document.querySelector('.add-to-cart');

    // Xử lý chuyển đổi hình ảnh khi click vào thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src.replace('-thumb', '');
        });
    });

    // Xử lý nút tăng/giảm số lượng
    quantityInput.addEventListener('change', function() {
        if (this.value < 1) {
            this.value = 1;
        }
    });

    // Xử lý nút "Thêm vào giỏ hàng"
    addToCartButton.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        addToCart(product, quantity);
        console.log(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
    });

    // Hiển thị sản phẩm liên quan (giả lập)
    const relatedProducts = [
        { id: 2, name: "Nước hoa B", price: 1500000, image: "../images/perfume2.jpg" },
        { id: 3, name: "Nước hoa C", price: 1800000, image: "../images/perfume3.jpg" },
        { id: 4, name: "Nước hoa D", price: 2000000, image: "../images/perfume4.jpg" },
    ];

    const relatedProductsGrid = document.querySelector('.related-products .product-grid');
    relatedProductsGrid.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString('vi-VN')}đ</p>
            <button class="btn">Xem chi tiết</button>
        </div>
    `).join('');

    // Thêm đoạn code sau vào cuối file

    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    // Giả lập dữ liệu đánh giá (trong thực tế, bạn sẽ lấy dữ liệu từ server)
    let reviews = [
        { name: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm rất tốt!" },
        { name: "Trần Thị B", rating: 4, comment: "Mùi hương dễ chịu, nhưng giá hơi cao." }
    ];

    function renderReviews() {
        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-name">${review.name}</span>
                    <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5-review.rating)}</span>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `).join('');
    }

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('review-name').value;
        const rating = document.getElementById('review-rating').value;
        const comment = document.getElementById('review-comment').value;

        reviews.push({ name, rating: parseInt(rating), comment });
        renderReviews();
        reviewForm.reset();
    });

    renderReviews();
});
