document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');

    mobileMenuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Đóng menu khi click bên ngoài
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
});
