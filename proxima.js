// ====================== FILTROS ======================
const filterBtn = document.getElementById('openFilterBtn');
const sidebar = document.getElementById('filterSidebar');
const overlay = document.getElementById('filterOverlay');
const closeBtn = document.getElementById('closeFilterBtn');
const clearBtn = document.getElementById('clearFilters');
const applyBtn = document.getElementById('applyFilters');

// Abrir filtros
filterBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
});

// Fechar filtros
function closeFilters() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

closeBtn.addEventListener('click', closeFilters);
overlay.addEventListener('click', closeFilters);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeFilters();
});

// ==================== LIMPAR FILTROS (CORRIGIDO) ====================
clearBtn.addEventListener('click', () => {
    const checkboxes = sidebar.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(chk => {
        chk.checked = false;        // Agora desmarca todos
    });

    // Reseta o range de preço
    const priceRange = sidebar.querySelector('.price-range');
    if (priceRange) priceRange.value = 4;

    // Reseta o select de distância (se existir)
    const select = sidebar.querySelector('.filter-select');
    if (select) select.value = '';
});

// ==================== APLICAR FILTROS ====================
applyBtn.addEventListener('click', () => {
    // Aqui você pode colocar a lógica de filtragem no futuro
    alert("✅ Filtros aplicados com sucesso!");
    closeFilters();
});