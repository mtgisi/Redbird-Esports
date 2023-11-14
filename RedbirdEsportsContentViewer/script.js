document.addEventListener("DOMContentLoaded", function () {
    const mediaPlayer = document.getElementById("media-player");
    const fullscreenContainer = document.getElementById("fullscreen-container");

    // Read the media link from the txt file
    fetch('media_link.txt')
        .then(response => response.text())
        .then(mediaLink => {
            // Set the source of the video player
            mediaPlayer.src = mediaLink;

            // Play the video
            mediaPlayer.play();

            // Make the video fullscreen
            if (fullscreenContainer.requestFullscreen) {
                fullscreenContainer.requestFullscreen();
            } else if (fullscreenContainer.mozRequestFullScreen) { /* Firefox */
                fullscreenContainer.mozRequestFullScreen();
            } else if (fullscreenContainer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                fullscreenContainer.webkitRequestFullscreen();
            } else if (fullscreenContainer.msRequestFullscreen) { /* IE/Edge */
                fullscreenContainer.msRequestFullscreen();
            }
        })
        .catch(error => console.error('Error loading media link:', error));
});
