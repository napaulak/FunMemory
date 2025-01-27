const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const itemNav = document.querySelector(".comida");

const bichos =[
    'suco',
    'cafe',
    'arroz',
    'agua',
    'sorvete',
    'bolo',
    'lanche',
    'donuts',
    'feijao',
    'achocolate',
];

const sons = {
   'donuts': 'donuts.mp3',
    'feijao': 'beans.mp3',
    'bolo': 'cake.mp3',
    'achocolate': 'chocolatemilk.mp3',
    'cafe': 'coffee.mp3',
    'lanche': 'hamburguer.mp3',
    'sorvete': 'icecream.mp3',
    'suco': 'juice.mp3',
    'agua': 'water.mp3',
    'arroz': 'rice.mp3',
};


const createElement = (tag, className) => {

    const element = document.createElement(tag)
    element.className = className
    return element
}


let firstCard = '';
let secondCard = '';

const playSound = (bicho) => {
    const audio = new Audio(`../audios/comidas/${sons[bicho]}`);
    audio.play();
}

// Atualize a função checkEndGame para chamar checkAllGamesWon
function checkEndGame() {
    const disabledCards = document.querySelectorAll(".disabled-card");
  
    if (disabledCards.length == 20) {
      clearInterval(this.loop);
  
      const playerName = spanPlayer.innerHTML;
      const timeTaken = timer.innerHTML;
  
      document.getElementById(
        "popupMessage"
      ).innerText = `${playerName} Seu tempo foi de: ${timeTaken}. Jogue mais uma vez!`;
      document.getElementById("popup").style.display = "flex";
  
      itemNav.classList.add("disabled");
  
      // Marcar o jogo atual como 'won'
      localStorage.setItem("game-comida", "won");
  
      // Verificar se todos os jogos foram ganhos
      checkAllGamesWon();
  
      // Adicionar evento de clique ao botão de "Jogar Novamente"
      document.getElementById('play-again').addEventListener('click', function() {
        restartGame();
      });
    }
  }
  

const checkCards = () => {
   const firstBicho = firstCard.getAttribute('data-bicho')
   const secondBicho = secondCard.getAttribute('data-bicho')

if(firstBicho == secondBicho){

     firstCard.firstChild.classList.add('disabled-card')
     secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard = ''

        checkEndGame();

}else{
    
    setTimeout( ()=> {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = ''
        secondCard = ''
    }, 500)
       
}
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
        
   if(firstCard == ''){
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode

    const bicho = firstCard.getAttribute('data-bicho');
    playSound(bicho);
}else if(secondCard == ''){
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode
    const bicho = secondCard.getAttribute('data-bicho');
    playSound(bicho);
    checkCards();
}
    
}

const createCard = (bicho) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/${bicho}.png')`;
    
    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', revealCard);
    card.setAttribute('data-bicho', bicho)
return card
}

const loadGame = () => {
    const duplicateBichos = [ ... bichos, ... bichos]

    const shuffledArray = duplicateBichos.sort( ()=> Math.random() - 0.5);

    Math.random()
    
    shuffledArray.forEach((bicho) => {
     const card = createCard(bicho);
      grid.appendChild(card);
    });
}

// Função para reiniciar o jogo
function restartGame() {
    // Lógica para reiniciar o jogo
    document.getElementById("popup").style.display = "none";
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.remove();
    });
  
    localStorage.removeItem("game-comida");
  
    // Resetar o timer e outras variáveis de estado do jogo
    timer.innerHTML = "00";
    spanPlayer.innerHTML = localStorage.getItem('player');
    loadGame();
    // Reiniciar o loop do jogo
    startGame();
  }
  
  // Função para iniciar o jogo
  function startGame() {
    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  }

const startTimer = () => {

     this.loop =  setInterval(() => {

      const currentTime = +timer.innerHTML
      timer.innerHTML = currentTime + 1 
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem("player");

    const winnedAnimals = [
        localStorage.getItem("game-animais"),
        localStorage.getItem("game-brinquedo"),
        localStorage.getItem("game-comida"),
        localStorage.getItem("game-fruta"),
        localStorage.getItem("game-escola"),
        localStorage.getItem("game-objeto"),
        localStorage.getItem("game-corpo"),
        localStorage.getItem("game-profissao"),
        localStorage.getItem("game-sensacao"),
        localStorage.getItem("game-transporte"),
    ];

    console.log(winnedAnimals);

    // Desabilitar todos os itens que foram ganhos
    winnedAnimals.forEach((status, index) => {
        console.log(`Status: ${status}, Index: ${index}`);
        if (status === 'won') {
            const itemClasses = [
                'animal',
                'brinquedo',
                'comida',
                'fruta',
                'escola',
                'objeto',
                'corpo',
                'profissao',
                'sensacao',
                'transporte'
            ];
            const item = document.querySelector(`.${itemClasses[index]}`);
            console.log(`Item encontrado: ${item}`); // Verifica se o item foi encontrado
            if (item) {
                item.classList.add("disabled");
                console.log(`Item ${itemClasses[index]} desabilitado`); // Confirma desabilitação
            } else {
                console.log(`Item ${itemClasses[index]} não encontrado`); // Verifica se o item não foi encontrado
            }
        }
    });
    
    console.log(localStorage);

    startTimer();
    loadGame();
};


document.getElementById('closePopup').onclick = function() {
    document.getElementById('popup').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
}

// Função para verificar se todos os jogos foram ganhos
function checkAllGamesWon() {
    const winnedAnimals = [
      localStorage.getItem("game-animais"),
      localStorage.getItem("game-brinquedo"),
      localStorage.getItem("game-comida"),
      localStorage.getItem("game-fruta"),
      localStorage.getItem("game-escola"),
      localStorage.getItem("game-objeto"),
      localStorage.getItem("game-corpo"),
      localStorage.getItem("game-profissao"),
      localStorage.getItem("game-sensacao"),
      localStorage.getItem("game-transporte"),
    ];
  
    // Verifica se todos os jogos estão com status 'won'
    const allWon = winnedAnimals.every(status => status === 'won');
    
    if (allWon) {
      // Redirecionar para a tela final
      window.location.href = "telafinal.html"; // Altere para o caminho correto da sua tela final
    }
  }
