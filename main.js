document.getElementById('wordart').addEventListener('click', () => {
    // Play confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Play the sound
    const audio = new Audio('resources/yipee.mp3');
    audio.play();
});
