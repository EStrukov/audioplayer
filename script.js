const audio = new Audio(),
  play = document.querySelector('.play'),
  next = document.querySelector('.next'),
  prev = document.querySelector('.prev'),
  title = document.querySelector('.name-song'),
  progressContainer = document.querySelector('.progress_container'),
  progress = document.querySelector('.progress'),
  rangeValue = document.querySelector('.volume-bar'),
  valueButton = document.querySelector('.v-btn'),
  logoAthor = document.querySelector('.logo_author'),
  audioPlayer = document.querySelector(".audio-player"),
  timeProgress = document.querySelector(".this-time"),
  trackList = ['Dark Tranquillity - in truth divided',
    'Fun mode - я ухожу',
    'Fun Mode - Стены цитадели',
    'Radio Tapok - attack the dead man',
    'Level 70 Elite Tauren Chieftain - I Am Murloc',
    'Fun mode - навсегда один',
    'Evergrey & Floor Jansen - In Orbit',
    'Bloodywood - Aaj'
  ];
let numValue = 1,
  isPlay = false,
  playNum = 0;
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
  if (numValue === 0) {
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
  if (valueButton.classList.contains('vol-off')) {
    audio.volume = 0;
    rangeValue.value = 0;
    const max = rangeValue.max;
    const val = rangeValue.value;
    rangeValue.style.backgroundSize = val * 100 / max + '% 100%';
    document.querySelector('.volume-num').innerHTML = 0;
  } else {
    if (numValue === 0) {
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


function playAudio() {
  audio.src = `assets/audio/${trackList[playNum]}.mp3`;
  logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
  audio.currentTime = 0;
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
    if (isPlay == true) {
      audio.play();
    }
  }
  audio.src = `assets/audio/${trackList[playNum]}.mp3`;
  logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
  title.innerHTML = trackList[playNum];
  if (isPlay == true) {
    audio.play();
  }
}
next.addEventListener('click', playNext);

function playPrev() {
  --playNum;
  if (playNum < 0) {
    playNum = trackList.length - 1;
    title.innerHTML = trackList[playNum];
    audio.src = `assets/audio/${trackList[playNum]}.mp3`;
    logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
    if (isPlay == true) {
      audio.play();
    }
  }
  audio.src = `assets/audio/${trackList[playNum]}.mp3`;
  logoAthor.src = `./assets/logo/${trackList[playNum]}.jpg`;
  title.innerHTML = trackList[playNum];
  if (isPlay == true) {
    audio.play();
  }
}
prev.addEventListener('click', playPrev);
//бегунок песни

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', playNext);

/*
function updateProgress(event) {
  const {duration, currentTime} = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);
*/
function setTime() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progress.value}%`;
  let minutes = Math.floor(audio.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  timeProgress.innerHTML = `${minutes}:${seconds}`;
}
audio.addEventListener('timeupdate', setTime);