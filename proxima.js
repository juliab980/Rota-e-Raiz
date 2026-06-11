// ====================== FILTROS ======================
const botaoAbrirFiltro = document.getElementById('botao-abrir-filtro');
const barraFiltro = document.getElementById('barra-filtro');
const botaoAbrirLista = document.getElementById('botao-abrir-lista');
const barraLista = document.getElementById('barra-lista');
const sobreposicaoFiltro = document.getElementById('sobreposicao-filtro');
const botaoFecharFiltro = document.getElementById('botao-fechar-filtro');
const botaoFecharLista = document.getElementById('botao-fechar-lista');
const botaoLimparFiltro = document.getElementById('botao-limpar-filtro');
const botaoAplicarFiltro = document.getElementById('botao-aplicar-filtro');

function closePanels() {
    barraFiltro.classList.remove('open');
    barraLista.classList.remove('open');
    sobreposicaoFiltro.classList.remove('active');
}

// Abrir filtros
botaoAbrirFiltro.addEventListener('click', () => {
    closePanels();
    barraFiltro.classList.add('open');
    sobreposicaoFiltro.classList.add('active');
});

// Abrir lista
botaoAbrirLista.addEventListener('click', () => {
    closePanels();
    barraLista.classList.add('open');
    sobreposicaoFiltro.classList.add('active');
});

botaoFecharFiltro.addEventListener('click', closePanels);
botaoFecharLista.addEventListener('click', closePanels);
sobreposicaoFiltro.addEventListener('click', closePanels);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closePanels();
});

// ==================== LIMPAR FILTROS (CORRIGIDO) ====================
botaoLimparFiltro.addEventListener('click', () => {
    const checkboxes = barraFiltro.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(chk => {
        chk.checked = false;        // Agora desmarca todos
    });

    // Reseta o range de preço
    const precoRange = barraFiltro.querySelector('.faixa-preco');
    if (precoRange) precoRange.value = 4;

    // Reseta o seletor de filtro (se existir)
    const seletor = barraFiltro.querySelector('.seletor-filtro');
    if (seletor) seletor.value = '';
});

// ==================== APLICAR FILTROS ====================
botaoAplicarFiltro.addEventListener('click', () => {
    // Aqui você pode colocar a lógica de filtragem no futuro
    closePanels();
});

// ==================== BOTÕES DO CARROSSEL DE CARTÕES ====================
const botaoAnteriorCartoes = document.querySelector('.botao-anterior-cartoes');
const botaoProximoCartoes = document.querySelector('.botao-proximo-cartoes');
const secaoCartoesAtiva = document.querySelectorAll('.secao-cartoes')[1] || document.querySelector('.secao-cartoes');
const gradeCartoes = secaoCartoesAtiva ? secaoCartoesAtiva.querySelector('.grade-cartoes') : document.querySelector('.grade-cartoes');

// Função de utilidade para rolar o carrossel horizontalmente
let indiceExtraVisivel = 0;

function cardWidth() {
    const primeiroCard = gradeCartoes ? gradeCartoes.querySelector('.card') : null;
    if (!primeiroCard) return 340;
    return primeiroCard.getBoundingClientRect().width + 16;
}

function rolarCartoes(direcao) {
    if (!gradeCartoes) return;

    const cardsExtras = Array.from(document.querySelectorAll('.card-extra'));

    if (direcao > 0 && indiceExtraVisivel < cardsExtras.length) {
        cardsExtras[indiceExtraVisivel].classList.remove('oculto');
        indiceExtraVisivel += 1;
    }

    if (direcao < 0 && indiceExtraVisivel > 0) {
        indiceExtraVisivel -= 1;
        cardsExtras[indiceExtraVisivel].classList.add('oculto');
    }

    gradeCartoes.scrollBy({
        left: direcao * cardWidth(),
        behavior: 'smooth'
    });
}

if (botaoAnteriorCartoes && gradeCartoes) {
    botaoAnteriorCartoes.addEventListener('click', () => rolarCartoes(-1));
}

if (botaoProximoCartoes && gradeCartoes) {
    botaoProximoCartoes.addEventListener('click', () => rolarCartoes(1));
}
