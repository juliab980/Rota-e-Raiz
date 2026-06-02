document.getElementById('mainButton').addEventListener('click', function () {
    // Muda a cor do botão
    this.style.backgroundColor = '#D9D2B9';
    this.style.color = '#1F2A1F';

    // Aguarda um pouco e redireciona para a próxima página
    setTimeout(function () {
        window.location.href = 'proxima.html';
    }, 300);
});
