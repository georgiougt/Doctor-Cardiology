document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const modal = document.getElementById('cardioModal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('cardioForm');
    const confirm = document.getElementById('cardioConfirm');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    if (form && confirm) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            confirm.style.display = 'block';
        });
    }
});
