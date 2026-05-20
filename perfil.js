// Adicionar efeito aos botões de ícone de review
const botoesIconeReview = document.querySelectorAll('.botao-icone-review');

botoesIconeReview.forEach(botao => {
    botao.addEventListener('click', function() {
        // Efeito de clique
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        console.log('Ícone clicado:', this.title);
    });
});

// Funcionalidade do botão Postar
const botaoPostar = document.querySelector('.botao-postar');

botaoPostar.addEventListener('click', function() {
    alert('Review será postada em breve!');
    // Adicione aqui a lógica para postar a review
});

// Efeito hover nos cards
const cards = document.querySelectorAll('.card-stat, .card-restaurante');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Adicionar funcionalidade de clique no card de restaurante
const cardRestaurante = document.querySelector('.card-restaurante');

if (cardRestaurante) {
    cardRestaurante.addEventListener('click', function() {
        // Aqui você pode adicionar a navegação para a página do restaurante
        console.log('Restaurante clicado');
    });
}
