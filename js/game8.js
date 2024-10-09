const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const itemNav = document.querySelector(".profissao");

const bichos =[
    'policia',
    'bombeiro',
    'detetive',
    'vet',
    'enge',
    'medica',
    'cantor',
    'piloto',
    'ciencia',
    'atriz',
];

const sons = {
   'atriz': 'actress.mp3',
   'detetive': 'detective.mp3',
   'medica': 'doctor.mp3',
   'enge': 'engineer.mp3',
   'bombeiro': 'fireman.mp3',
   'piloto': 'pilot.mp3',
   'policia': 'policeofficer.mp3',
   'ciencia': 'scientist.mp3',
   'cantor': 'singer.mp3',
   'vet': 'veterinarian.mp3',
 };

const createElement = (tag, className) => {

    const element = document.createElement(tag)
    element.className = className
    return element
}


let firstCard = '';
let secondCard = '';

const playSound = (bicho) => {
    const audio = new Audio(`../audios/profissoes/${sons[bicho]}`);
    audio.play();
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);

        const playerName = spanPlayer.innerHTML;
        const timeTaken = timer.innerHTML;

        document.getElementById('popupMessage').innerText = `${playerName} Seu tempo foi de: ${timeTaken}. Jogue mais uma vez!`;
        document.getElementById('popup').style.display = 'flex';

        itemNav.classList.add("disabled");

        localStorage.setItem("game-profissoes", "won");

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

    // Desabilitar todos os itens que foram ganhos
    winnedAnimals.forEach((status, index) => {
        if (status === 'won') {
            // Aqui, você pode usar um seletor para desabilitar o item correspondente
            const itemClasses = [
                'animal',      // index 0
                'brinquedo',   // index 1
                'comida',      // index 2
                'fruta',       // index 3
                'escola',      // index 4
                'objeto',      // index 5
                'corpo',       // index 6
                'profissao',   // index 7
                'sensacao',    // index 8
                'transporte'   // index 9
            ];
            const item = document.querySelector(`.${itemClasses[index]}`);
            if (item) {
                item.classList.add("disabled");
            }
        }
    });

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