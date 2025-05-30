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
    let menuOpen = false;

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
            if (dropdown !== except) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Verificar clique fora do menu
    function setupClickOutside() {
        document.addEventListener('click', function(e) {
            // Fechar dropdowns se clicar fora
            reservaContainers.forEach(container => {
                const dropdown = container.querySelector('.reserva-dropdown');
                const btn = container.querySelector('.reserva-btn');
                
                if (dropdown && btn && !container.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Fechar menu mobile se clicar fora
            if (menuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // Menu Mobile
    function toggleMenu() {
        menuOpen = !menuOpen;
        hamburger.classList.toggle('active', menuOpen);
        navLinks.classList.toggle('active', menuOpen);
        
        if (menuOpen) {
            // Fechar todos os dropdowns ao abrir o menu
            closeAllDropdowns();
            // Adicionar overlay
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);
            
            // Fechar menu ao clicar no overlay
            overlay.addEventListener('click', function() {
                menuOpen = false;
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.removeChild(overlay);
            });
            
            // Fechar menu ao clicar em um link
            const navItems = navLinks.querySelectorAll('a:not(.reserva-option)');
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    menuOpen = false;
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    const overlay = document.querySelector('.mobile-menu-overlay');
                    if (overlay) document.body.removeChild(overlay);
                });
            });
        } else {
            // Remover overlay ao fechar o menu
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) document.body.removeChild(overlay);
        }
    }

    // Evento de clique no botão do menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Comportamento do menu de reserva
    reservaContainers.forEach(container => {
        const btn = container.querySelector('.reserva-btn');
        const dropdown = container.querySelector('.reserva-dropdown');
        
        if (!btn || !dropdown) return;
        
        // Adicionar classe para identificar dropdowns mobile
        if (isMobile || isTouchDevice) {
            dropdown.classList.add('mobile-dropdown');
        }

        // Toggle do dropdown no clique (mobile) ou hover (desktop)
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMobile || isTouchDevice) {
                // Comportamento para mobile
                const isActive = dropdown.classList.contains('active');
                closeAllDropdowns();
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            } else {
                // Comportamento para desktop (abrir link)
                const parentLink = this.closest('a');
                if (parentLink && parentLink.href) {
                    window.location.href = parentLink.href;
                }
            }
        });

        // Fechar ao clicar fora
        document.addEventListener('click', function closeOnClickOutside(e) {
            if (!container.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
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
    
    // Configurar clique fora dos menus
    setupClickOutside();
});
