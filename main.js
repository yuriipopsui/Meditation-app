
const app = () => {
  // Video
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.movingOutline circle');
  const video = document.querySelector('.videoContainer video');

  //Sounds
  const sounds = document.querySelectorAll('.soundPicker button');
  //Time Display
  const timeDisplay = document.querySelector('.timeDisplay');
  const timeSelect = document.querySelectorAll('.timeSelect button');
  console.log(timeSelect)

  //Get the length of the outline
  const outlineLength = outline.getTotalLength();
  //Duration
  let duration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Choice of sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      // playerDirection(song);
    })
  })

  //Play sound
  play.addEventListener('click', () => {
    playerDirection(song);
  });

  // Duration selector
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      duration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}0`;
    })
  })

  // Player function
  const playerDirection = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    }
    else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  }

  // Circle progress Animation
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = duration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  }

}

app();