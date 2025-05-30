document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const reservaContainers = document.querySelectorAll('.reserva-container');
    const reservaBtns = document.querySelectorAll('.reserva-btn');
    const reservaDropdowns = document.querySelectorAll('.reserva-dropdown');
    const isMobile = window.innerWidth <= 992;
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let lastScroll = 0;

    // Efeito de scroll no cabeçalho
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Adiciona/remove classe quando rolar para baixo/cima
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Função para fechar todos os dropdowns
    function closeAllDropdowns(except = null) {
        reservaDropdowns.forEach(dropdown => {
            if (dropdown !== except && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    }


    // Menu Mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            closeAllDropdowns();
        });
    }

    // Comportamento do menu de reserva
    reservaContainers.forEach(container => {
        const btn = container.querySelector('.reserva-btn');
        const dropdown = container.querySelector('.reserva-dropdown');
        
        if (!btn || !dropdown) return;

        // Toggle do dropdown no clique (mobile) ou hover (desktop)
        btn.addEventListener('click', function(e) {
            if (isMobile || isTouchDevice) {
                e.preventDefault();
                e.stopPropagation();
                const isActive = dropdown.classList.contains('active');
                closeAllDropdowns();
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            }
        });

        // Fechar ao pressionar ESC
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
                btn.focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isActive = dropdown.classList.contains('active');
                closeAllDropdowns();
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            }
        });

        // Navegação por teclado no dropdown
        if (dropdown) {
            const focusableElements = 'a[href], button, [tabindex]:not([tabindex="-1"])';
            const focusableContent = dropdown.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            dropdown.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                    btn.focus();
                }

                let isTabPressed = e.key === 'Tab';
                if (!isTabPressed) {
                    return;
                }

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            });
        }
    });

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.reserva-container') && !e.target.closest('.reserva-dropdown')) {
            closeAllDropdowns();
        }
    });

    // Fechar menu mobile ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a:not(.reserva-option)');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            closeAllDropdowns();
        });
    });

    // Atualizar estado de mobile/desktop ao redimensionar a janela
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 992;
        if (newIsMobile !== isMobile) {
            window.location.reload();
        }
    });

    // Slideshow
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        // Esconde todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajusta o índice se for maior que o número de slides ou menor que zero
        currentSlide = (n + slides.length) % slides.length;
        
        // Mostra o slide atual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Iniciar slideshow automático
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Parar slideshow quando o mouse estiver sobre o slideshow
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshow.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            startSlideShow();
        });
    }


    // Event listeners para os botões de navegação
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            clearInterval(slideInterval);
            startSlideShow();
        });
    }


    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            clearInterval(slideInterval);
            startSlideShow();
        });
    }


    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            startSlideShow();
        });
    });

    // Iniciar o slideshow
    if (slides.length > 0) {
        showSlide(0);
        startSlideShow();
    }
});
