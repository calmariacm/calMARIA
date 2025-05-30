// Arquivo mantido para compatibilidade futura
// Tema claro padrão
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que o tema claro esteja ativo
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Remover qualquer tema escuro do localStorage
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
    }
});
