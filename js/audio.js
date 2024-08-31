const musicButton = document.getElementById('musicButton');
const audio = document.getElementById('audio');

musicButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicButton.classList.remove('nomusic-button');
    musicButton.classList.add('music-button');
   
  } else {
    audio.pause();
    musicButton.classList.remove('music-button');
    musicButton.classList.add('nomusic-button');
    
  }
});