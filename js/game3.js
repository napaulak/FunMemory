const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const bichos =[
    'suco',
    'cafe',
    'arroz',
    'leite',
    'sorvete',
    'bolo',
    'lanche',
    'churras',
    'feijao',
    'achocolate',
];

const sons = {
   'churrasco': 'barbecue.mp3',
    'feijao': 'beans.mp3',
    'bolo': 'cake.mp3',
    'achocolate': 'chocolatemilk.mp3',
    'cafe': 'coffee.mp3',
    'lanche': 'hamburguer.mp3',
    'sorvete': 'icecream.mp3',
    'suco': 'juice.mp3',
    'leite': 'milk.mp3',
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

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);

        // Configurações da animação de confete com tamanho maior
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}. Jogue mais uma vez!`);
        

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
    
   spanPlayer.innerHTML = localStorage.getItem('player')
   startTimer()
    loadGame();
}

