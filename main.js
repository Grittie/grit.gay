document.getElementById('wordart').addEventListener('click', () => {
    // Play confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Play the sound
    const audio = new Audio('resources/yipee.mp3');
    audio.volume = 0.5;
    audio.play();
});

const images = document.querySelectorAll('.floating-image');
const container = document.querySelector('.floating-images-container');

function getRandomSpeed() {
    return (Math.random() - 0.5) * 2; // Random speed between -1 and 1
}

function animate() {
    images.forEach(image => {
        let x = parseFloat(image.dataset.x || Math.random() * (window.innerWidth - image.width));
        let y = parseFloat(image.dataset.y || Math.random() * (window.innerHeight - image.height));
        let dx = parseFloat(image.dataset.dx || getRandomSpeed());
        let dy = parseFloat(image.dataset.dy || getRandomSpeed());
        let rotation = parseFloat(image.dataset.rotation || 0);
        const rotationSpeed = 2; // Speed of rotation

        x += dx;
        y += dy;
        rotation += rotationSpeed; // Increment rotation angle

        // Store updated values for the next frame
        image.dataset.x = x;
        image.dataset.y = y;
        image.dataset.dx = dx;
        image.dataset.dy = dy;
        image.dataset.rotation = rotation;

        // Check for collision with container edges
        if (x < 0 || x > window.innerWidth - image.width) {
            dx *= -1; // Reverse direction
            image.dataset.dx = dx;
        }
        if (y < 0 || y > window.innerHeight - image.height) {
            dy *= -1; // Reverse direction
            image.dataset.dy = dy;
        }

        image.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });

    requestAnimationFrame(animate);
}

animate();
