document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('moving-image');

    // Opcional: Função para alternar a animação
    function toggleAnimation() {
        if (image.style.animation) {
            image.style.animation = ''; // Para a animação
        } else {
            image.style.animation = 'float 3s ease-in-out infinite'; // Reinicia a animação
        }
    }

    // Exemplo: Chamar a função toggleAnimation ao clicar na imagem
    image.addEventListener('click', toggleAnimation);
});