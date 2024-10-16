document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Ở đây bạn sẽ thêm logic xử lý đăng nhập
        console.log('Đăng nhập:', email, password);
        alert('Đăng nhập thành công!');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        // Ở đây bạn sẽ thêm logic xử lý đăng ký
        console.log('Đăng ký:', name, email, password);
        alert('Đăng ký thành công!');
    });
});
