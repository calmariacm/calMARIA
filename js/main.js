document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Fechar dropdown de reserva ao abrir o menu móvel
            const reservaDropdown = document.querySelector('.reserva-dropdown');
            if (reservaDropdown && reservaDropdown.classList.contains('active')) {
                reservaDropdown.classList.remove('active');
            }
        });
    }
    
    // Menu de Reserva
    const reservaBtns = document.querySelectorAll('.reserva-btn');
    const reservaDropdowns = document.querySelectorAll('.reserva-dropdown');
    
    reservaBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // Fechar outros dropdowns abertos
            reservaDropdowns.forEach(d => {
                if (d !== dropdown && d.classList.contains('active')) {
                    d.classList.remove('active');
                }
            });
            
            // Alternar o dropdown atual
            if (dropdown && dropdown.classList.contains('reserva-dropdown')) {
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function() {
        reservaDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // Prevenir que o clique no dropdown feche o menu
    reservaDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a:not(.reserva-option)');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            
            // Fechar dropdowns de reserva
            reservaDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    });
});
