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

const sons = [
    'barbecue.mp3',
    'beans.mp3',
    'cake.mp3',
    'chocolatemilk.mp3',
    'coffee.mp3',
    'hamburguer.mp3',
    'icecream.mp3',
    'juice.mp3',
    'milk.mp3',
    'rice.mp3',
 ];


const createElement = (tag, className) => {

    const element = document.createElement(tag)
    element.className = className
    return element
}


let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);

        // Configurações da animação de confete com tamanho maior
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            scalar: 1.5 // Aumenta o tamanho dos confetes (valor padrão é 1)
        });

        // Exibe uma mensagem personalizada
        const playerName = spanPlayer.innerHTML;
        const playerTime = timer.innerHTML;

        const message = document.createElement('div');
        message.innerHTML = `<h1>Parabéns, ${playerName}!</h1><p>Seu tempo foi de: ${playerTime}. Jogue mais uma vez!</p>`;
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.backgroundColor = 'white';
        message.style.padding = '20px';
        message.style.borderRadius = '10px';
        message.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        document.body.appendChild(message);

        // Remove a mensagem após alguns segundos
        setTimeout(() => {
            document.body.removeChild(message);
        }, 5000);
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
}else if(secondCard == ''){
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode

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

