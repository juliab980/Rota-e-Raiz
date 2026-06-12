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
const gradeCartoes = document.getElementById('grade-restaurantes');

let indiceExtraVisivel = 0;

function cardWidth() {
    const primeiroCard = gradeCartoes ? gradeCartoes.querySelector('.card') : null;
    if (!primeiroCard) return 296;

    const estilo = getComputedStyle(gradeCartoes);
    const gap = parseFloat(estilo.columnGap || estilo.gap || '16');
    return primeiroCard.getBoundingClientRect().width + gap;
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

(function () {
    const container = document.getElementById('cardsContainer');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.card'));
    if (!cards.length) return;

    function goToIndex(index) {
        const card = cards[index];
        if (!card) return;
        card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }

    function syncActive() {
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;

        let bestIndex = 0;
        let bestDistance = Infinity;

        cards.forEach((card, idx) => {
            const r = card.getBoundingClientRect();
            const cardCenterX = r.left + r.width / 2;
            const distance = Math.abs(cardCenterX - containerCenterX);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestIndex = idx;
            }
        });

        cards.forEach((c, idx) => c.classList.toggle('active', idx === bestIndex));
    }

    let index = Math.max(0, cards.findIndex((c) => c.classList.contains('active')));

    function tick() {
        index = (index + 1) % cards.length;
        goToIndex(index);
    }

    window.addEventListener('resize', syncActive);

    container.addEventListener('scroll', () => {
        window.clearTimeout(container.__syncTimer);
        container.__syncTimer = window.setTimeout(syncActive, 80);
    });

    syncActive();

    const intervalMs = 7000;
    setInterval(tick, intervalMs);
})();
