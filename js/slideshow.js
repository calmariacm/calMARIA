document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slideshow-button.prev');
    const nextButton = document.querySelector('.slideshow-button.next');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 segundos

    // Função para mostrar um slide específico
    function showSlide(index) {
        // Esconder todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajustar o índice se for menor que 0 ou maior que o número de slides
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Mostrar o slide atual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reiniciar o temporizador
        resetInterval();
    }
    
    // Função para avançar para o próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Função para voltar ao slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Função para reiniciar o intervalo automático
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Event listeners para os botões de navegação
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            prevSlide();
        });
    }
    
    // Event listeners para os dots de navegação
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Pausar o slideshow quando o mouse estiver sobre ele
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slideshow.addEventListener('mouseleave', function() {
            resetInterval();
        });
    }
    
    // Iniciar o slideshow
    showSlide(0);
    
    // Suporte a teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});
