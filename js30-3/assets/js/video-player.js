// /*  Получить элементы */


const player = document.querySelector('.player');
const playerVideo = player.querySelector('.player__video');
const layerControls = player.querySelector('.layer__controls');

const video = player.querySelector('.viewer');

const playbackIcons = player.querySelectorAll('.playback-icons use');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filed');

const toggle = player.querySelector('.toggle');

//console.log(video)

const skipButton = player.querySelectorAll('[data-skip]')

const timeElapsed = player.querySelector('#time-elapsed');
const duration = player.querySelector('#duration');

const volumeButton = player.querySelector('#volume-button');
const volumeControls = player.querySelector('.volume-controls');
const volume = volumeControls.querySelector('.volume');
const volumeIcons = volumeButton.querySelectorAll('.volume-button use');

const volumeMute = volumeButton.querySelector('use[href="#volume-mute"]');
const volumeLow = volumeButton.querySelector('use[href="#volume-low"]');
const volumeHigh = volumeButton.querySelector('use[href="#volume-high"]');

const fullscreenButton = document.getElementById('fullscreen-button');
//const videoContainer = document.getElementById('video-container');

const videoContainer = player;
const fullscreenIcons = fullscreenButton.querySelectorAll('use');
const playBtn = player.querySelector('.play-btn');

// Скрыть собственные элементы управления
// Первое, что нам нужно сделать, это скрыть элементы управления видео по умолчанию и предоставить наш собственный интерфейс, 
// как только будет определено, что браузер поддерживает видео HTML5.

const videoWorks = !!document.createElement('video').canPlayType;
//console.log(videoWorks)

// canPlayTypeСвойство заключается в том, как мы можем обнаружить поддержку видеоформата в браузере. Чтобы использовать его, нам нужно 
// создать экземпляр <video>элемента и проверить, поддерживает ли он canPlayTypeметод. Если это так, можно с уверенностью предположить, 
// что видео HTML5 поддерживается, поэтому элементы управления по умолчанию быстро отключаются в пользу наших пользовательских элементов управления.

if (videoWorks) {
    playerVideo.controls = false;
    // layerControls.classList.remove('hidden');
}



// /* Посмтроить функции */

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    playBtn.classList.toggle('hidden');
}

function updateButton() {
    playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));
}

// обрабатываем прогресс
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {

    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;

}


function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substring(11, 19);

    return {
        minutes: result.substring(3, 5),
        seconds: result.substring(6, 8),
    };
};

function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

//обновим время, прошедшее с момента
function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}


function updateVolume() {
    if (video.muted) {
        video.muted = false;
    }

    video.volume = volume.value;
}

function updateVolumeIcon() {
    volumeIcons.forEach(icon => {
        icon.classList.add('hidden');
    });

    //volumeButton.setAttribute('data-title', 'Mute (m)')

    if (video.muted || video.volume === 0) {
        volumeMute.classList.remove('hidden');
        //volumeButton.setAttribute('data-title', 'Unmute (m)')
    } else if (video.volume > 0 && video.volume <= 0.5) {
        volumeLow.classList.remove('hidden');
    } else {
        volumeHigh.classList.remove('hidden');
    }
}


function updateVolumeIcon() {
    volumeIcons.forEach(icon => {
        icon.classList.add('hidden');
    });

    volumeButton.setAttribute('data-title', 'Mute (m)')

    if (video.muted || video.volume === 0) {
        volumeMute.classList.remove('hidden');
        volumeButton.setAttribute('data-title', 'Unmute (m)')
    } else if (video.volume > 0 && video.volume <= 0.5) {
        volumeLow.classList.remove('hidden');
    } else {
        volumeHigh.classList.remove('hidden');
    }
}

function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        volume.setAttribute('data-volume', volume.value);
        volume.value = 0;
    } else {
        volume.value = volume.dataset.volume;
    }
}

function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
        // Need this to support Safari
        document.webkitExitFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        // Need this to support Safari
        videoContainer.webkitRequestFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }

    fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));
}

function updateFullscreenButton() {
    /*console.log('123');*/
    fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));
}


function togglPlayBtn() {
    video.play();
    playBtn.classList.add('hidden');
    layerControls.classList.remove('hidden');
}

// /* Включим */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// //слушаем событие обновление времени
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);

progress.addEventListener('mousedown', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('volumechange', updateVolumeIcon);
volume.addEventListener('input', updateVolume);
video.addEventListener('volumechange', updateVolumeIcon);
volumeButton.addEventListener('click', toggleMute);

fullscreenButton.onclick = toggleFullScreen;
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);


playBtn.addEventListener('click', togglPlayBtn);