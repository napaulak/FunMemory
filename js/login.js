const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');


function validateInput({target}){

    if(target.value.length > 2){

    button.removeAttribute('disabled')
}else{
    button.setAttribute('disabled', '')
}

}
function handleSubmit (event){
    event.preventDefault()

    localStorage.setItem('player', input.value);
    window.location = 'php/game.php'

}

input.addEventListener('input', validateInput) 
form.addEventListener('submit', handleSubmit) 
