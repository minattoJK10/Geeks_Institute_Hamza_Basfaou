// Map keys to sound files
const keySoundMap = {
    'a': './drumset_setup/sounds/boom.wav',
    's': './drumset_setup/sounds/clap.wav',
    'd': './drumset_setup/sounds/hihat.wav',
    'f': './drumset_setup/sounds/Kick.wav',
    'g': './drumset_setup/sounds/openhat.wav',
    'h': './drumset_setup/sounds/ride.wav',
    'j': './drumset_setup/sounds/snare.wav',
    'k': './drumset_setup/sounds/tink.wav',
    'l': './drumset_setup/sounds/tom.wav'
};

function playSound(soundPath) {
    const audio = new Audio(soundPath);
    audio.play();
}

function addPlayingClass(button) {
    button.classList.add('playing');
    setTimeout(() => button.classList.remove('playing'), 150);
}

document.querySelectorAll('.drum').forEach(button => {
    button.addEventListener('click', function() {
        const sound = this.getAttribute('data-sound');
        playSound(sound);
        addPlayingClass(this);
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    if (keySoundMap[key]) {
        playSound(keySoundMap[key]);
        const button = document.querySelector(`.drum[data-sound="${keySoundMap[key]}"]`);
        if (button) {
            addPlayingClass(button);
        }
    }
});
