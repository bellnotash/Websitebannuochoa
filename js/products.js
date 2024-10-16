import { products } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const pagination = document.querySelector('.pagination');
    const filterForm = document.getElementById('filter-form');
    const priceRange = document.getElementById('price-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');

    let currentPage = 1;
    const productsPerPage = 12;
    let filteredProducts = [];

    function filterProductsBySearch(searchTerm) {
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }

    function renderProducts() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');

        if (searchTerm) {
            filteredProducts = filterProductsBySearch(searchTerm.toLowerCase());
            document.querySelector('h1').textContent = `Kết quả tìm kiếm cho "${searchTerm}"`;
        } else {
            filteredProducts = [...products];
        }

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);

        productGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card">
<img src="../images/placeholder.jpg" data-src="../${product.image}" alt="${product.name}" class="lazy-image">                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString('vi-VN')}đ</p>
                <a href="../html/product-detail.html?id=${product.id}" class="btn">Xem chi tiết</a>
            </div>
        `).join('');

        // Thêm đoạn code này để kích hoạt lazy loading
        const lazyImages = document.querySelectorAll('.lazy-image');
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => lazyLoadObserver.observe(img));

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        pagination.innerHTML = `
            <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Trước</button>
            <span>Trang ${currentPage} / ${totalPages}</span>
            <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Sau</button>
        `;
    }

    function changePage(page) {
        currentPage = page;
        renderProducts();
    }

    function applyFilters(event) {
        event.preventDefault();
        const formData = new FormData(filterForm);
        const selectedCategories = formData.getAll('category');
        const selectedBrands = formData.getAll('brand');
        const minPriceValue = parseInt(minPrice.value) || 0;
        const maxPriceValue = parseInt(maxPrice.value) || Infinity;

        filteredProducts = products.filter(product => 
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            (product.price >= minPriceValue && product.price <= maxPriceValue)
        );

        currentPage = 1;
        renderProducts();
    }

    filterForm.addEventListener('submit', applyFilters);

    priceRange.addEventListener('input', function() {
        const value = this.value;
        minPrice.value = 0;
        maxPrice.value = value;
    });

    // Khởi tạo
    filteredProducts = [...products];
    renderProducts();

    // Thêm sự kiện cho nút phân trang
    window.changePage = changePage;
});
