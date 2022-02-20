const audio = new Audio(),
      play = document.querySelector('.play'),
      next = document.querySelector('.next'),
      prev = document.querySelector('.prev'),
      title = document.querySelector('.name-song'),
      rangeInput = document.querySelector('.progress-bar'),
      rangeValue = document.querySelector('.volume-bar'),
      valueButton = document.querySelector('.v-btn'),
      logoAthor = document.querySelector('.logo_author'),
      trackList = ['Fun mode - я ухожу',
                  'Fun Mode - Стены цитадели',
                  'Radio Tapok - attack the dead man',
                  'Level 70 Elite Tauren Chieftain - I Am Murloc',
                  'Fun mode - навсегда один',
                  'Evergrey & Floor Jansen - In Orbit',
                  'Bloodywood - Aaj'];
let numValue = 1;
 //document.querySelector('.volume-bar').oninput = volume;
/*
  function volume() {
  let v = this.value;
  audio.volume = v / 100;
}
*/
rangeValue.addEventListener('input', () => {
    numValue = rangeValue.value / 100;
    audio.volume = numValue;
    document.querySelector('.volume-num').innerHTML = rangeValue.value;
    const max = rangeValue.max;
    const val = rangeValue.value;
    
    rangeValue.style.backgroundSize = val * 100 / max + '% 100%';
    if(numValue === 0) {
        valueButton.classList.add('vol-off');
        valueButton.classList.remove('vol-on');
    } else {
        valueButton.classList.add('vol-on');
        valueButton.classList.remove('vol-off');
    }
});
valueButton.addEventListener('click', () => {
    valueButton.classList.toggle('vol-off');
    valueButton.classList.toggle('vol-on');
    if(valueButton.classList.contains('vol-off')) {
        audio.volume = 0;
        rangeValue.value = 0;
        const max = rangeValue.max;
        const val = rangeValue.value;
        rangeValue.style.backgroundSize = val * 100 / max + '% 100%';
        document.querySelector('.volume-num').innerHTML = 0;
    } else {
        if(numValue === 0) {
            numValue += 0.01;
        }
        rangeValue.value = Math.trunc(numValue * 100);
        const max = rangeValue.max;
        const val = rangeValue.value;
        rangeValue.style.backgroundSize = val * 100 / max + '% 100%';
        audio.volume = numValue;
        document.querySelector('.volume-num').innerHTML = Math.trunc(numValue * 100);
    }
});

let isPlay = false,
    playNum = 0;

function playAudio() {
  audio.src = `assets/audio/${trackList[playNum]}.mp3`;
  logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
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
    audio.src = `assets/audio/${trackList[playNum]}.mp3`;
     logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
    title.innerHTML = trackList[playNum];
    audio.play();
    isPlay = true;
    play.classList.remove('play');
    play.classList.add('pause');
    }
    audio.src = `assets/audio/${trackList[playNum]}.mp3`;
     logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
    title.innerHTML = trackList[playNum];
    audio.play();
    isPlay = true;
    play.classList.remove('play');
    play.classList.add('pause');
  }
next.addEventListener('click', playNext);

function playPrev() {
  --playNum;
 if (playNum < 0) {
    playNum = trackList.length - 1;
    title.innerHTML = trackList[playNum];
    audio.src = `assets/audio/${trackList[playNum]}.mp3`;
     logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
    audio.play();
    isPlay = true;
    play.classList.remove('play');
    play.classList.add('pause');
  }
    audio.src = `assets/audio/${trackList[playNum]}.mp3`;
     logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
    audio.play();
    isPlay = true;
    play.classList.remove('play');
    play.classList.add('pause');
    title.innerHTML = trackList[playNum];
}
prev.addEventListener('click', playPrev);
 //бегунок песни
function redLine() {
    const max = rangeInput.max;
    const val = rangeInput.value;
    
    rangeInput.style.backgroundSize = val * 100 / max + '% 100%';
    let time = Math.floor(val / 60) + ":";
    if(val % 60 < 10) {
        time += '0';
    }
    time += val % 60;
    document.querySelector('.this-time').innerHTML = time;
}

rangeInput.addEventListener('input', () => {
    const val = rangeInput.value;
    redLine();
    audio.currentTime = val;
});

