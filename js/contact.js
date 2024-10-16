document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Ở đây, bạn sẽ thêm logic để gửi dữ liệu đến server
        // Ví dụ: sử dụng fetch API để gửi POST request

        console.log('Đã gửi tin nhắn:', { name, email, message });
        alert('Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.');
        
        contactForm.reset();
    });
});
