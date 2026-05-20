// Funcionalidade de busca
const searchInput = document.querySelector('.search-input');
const botoesMenu = document.querySelectorAll('.botao-menu-config');

// Placeholder para funcionalidade de busca futura
searchInput.addEventListener('focus', function() {
    this.style.boxShadow = '0 0 10px rgba(61, 90, 71, 0.3)';
});

searchInput.addEventListener('blur', function() {
    this.style.boxShadow = 'none';
});

// Adicionar efeito visual aos botões do menu
botoesMenu.forEach(botao => {
    botao.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    botao.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Funcionalidade futura: adicionar comportamento aos cards de configuração
const cards = document.querySelectorAll('.card-config');
cards.forEach(card => {
    card.addEventListener('click', function() {
        // Adicione aqui a funcionalidade desejada quando um card for clicado
        console.log('Card clicado:', this);
    });
});
