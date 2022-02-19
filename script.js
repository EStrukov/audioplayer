const audio = new Audio(),
      play = document.querySelector('.play'),
      next = document.querySelector('.next'),
      prev = document.querySelector('.prev'),
      title = document.querySelector('.name-song'),
      trackList = ['fan mode - asda',
                  'Fun_Mode_-_Steny_citadeli',
                  'Radio tapok - csacasd'];

let isPlay = false,
    playNum = 0;

function playAudio() {
  audio.src = `assets/audio/${trackList[playNum]}.mp3`;
  //audio.currentTime = 0;
  if (!isPlay) {
  audio.play();
  isPlay = true;
    play.classList.remove('play');
  play.classList.add('pause');
  } else {
    audio.pause();
    isPlay = false;
        play.classList.remove('pause');
    play.classList.add('play');
  }
}
play.addEventListener('click', playAudio);


function playNext() {
 ++playNum;
 if (playNum >= trackList.length) {
    playNum = 0;
    title.innerHTML = trackList[playNum];
    playAudio();
  }
  title.innerHTML = trackList[playNum];
    playAudio();
}
next.addEventListener('click', playNext);

function playPrev() {
playNum--;
 if (playNum < 0) {
    playNum = trackList.length - 1;
    title.innerHTML = trackList[playNum];
    playAudio();
  }
  playAudio();
  title.innerHTML = trackList[playNum];
}
prev.addEventListener('click', playPrev);