/* 1. Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* 2. Build Our Functions */

// Toggle Play/Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the Play/Pause Button Icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Handle Skip Buttons (« 10s and 25s »)
function skip() {
  // `this.dataset.skip` parses the data-skip value attribute from HTML (-10 or 25)
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume and Playback Speed range inputs
function handleRangeUpdate() {
  // 'name' matches either 'volume' or 'playbackRate' properties native to HTML5 video elements
  video[this.name] = this.value;
}

// Update the Progress Bar real-time visual width
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub through the video timeline by clicking/dragging the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* 3. Hook up the event listeners */

// Play/Pause events
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

// Timeline/Progress updates
video.addEventListener('timeupdate', handleProgress);

// Skip events
skipButtons.forEach(button => button.addEventListener('click', skip));

// Control Sliders (Volume / Playback rate)
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Progress Bar Scrubbing events
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);