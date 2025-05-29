// Script para o site Alojamentos GAMA

document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu de reserva em dispositivos móveis
    const reservaBtns = document.querySelectorAll('.reserva-btn');
    const dropdowns = document.querySelectorAll('.reserva-dropdown');
    
    reservaBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // Fecha todos os outros dropdowns abertos
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                }
            });
            
            // Alterna o dropdown atual
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                dropdown.style.display = 'block';
            }
        });
    });
    
    // Fecha o dropdown ao clicar fora dele
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
    
    // Impede que o clique no dropdown feche o menu
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    // Efeito de scroll na navegação
    const header = document.querySelector('header');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Adicionar classe scrolled ao header quando a página é rolada
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu móvel toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Formulário de reserva
    const formReserva = document.getElementById('form-reserva');
    if (formReserva) {
        formReserva.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por enquanto, apenas exibimos um alerta
            alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
            formReserva.reset();
        });
    }

    // Definir data mínima para os campos de data
    const hoje = new Date().toISOString().split('T')[0];
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    if (checkin) {
        checkin.setAttribute('min', hoje);
        
        // Atualizar data mínima de checkout quando checkin mudar
        checkin.addEventListener('change', function() {
            if (checkout) {
                checkout.setAttribute('min', checkin.value);
                
                // Se checkout for anterior ao novo checkin, ajustar
                if (checkout.value < checkin.value) {
                    checkout.value = checkin.value;
                }
            }
        });
    }
    
    if (checkout && !checkout.getAttribute('min')) {
        checkout.setAttribute('min', hoje);
    }

    // Animação suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
