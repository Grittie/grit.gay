document.getElementById('wordart').addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    const audio = new Audio('resources/yipee.mp3');
    audio.volume = 0.1;
    audio.play();
});

const images = document.querySelectorAll('.floating-image');

function getRandomSpeed() {
    return (Math.random() - 0.5) * 10;
}

function animate() {
    const topBannerHeight = document.querySelector('.top-banner').offsetHeight;
    const bottomBannerHeight = document.querySelector('.bottom-banner').offsetHeight;
    const containerHeight = window.innerHeight;

    images.forEach(image => {
        let x = parseFloat(image.dataset.x || Math.random() * (window.innerWidth - image.width));
        let y = parseFloat(image.dataset.y || (topBannerHeight + Math.random() * (containerHeight - topBannerHeight - bottomBannerHeight - image.height)));
        let dx = parseFloat(image.dataset.dx || getRandomSpeed());
        let dy = parseFloat(image.dataset.dy || getRandomSpeed());
        let rotation = parseFloat(image.dataset.rotation || 0);
        const rotationSpeed = 2;

        x += dx;
        y += dy;
        rotation += rotationSpeed;

        // Prevent images from moving outside the viewport
        if (x < 0) {
            x = 0;
            dx *= -1;
        } else if (x > window.innerWidth - image.width) {
            x = window.innerWidth - image.width;
            dx *= -1;
        }

        if (y < topBannerHeight) {
            y = topBannerHeight;
            dy *= -1;
        } else if (y > containerHeight - bottomBannerHeight - image.height) {
            y = containerHeight - bottomBannerHeight - image.height;
            dy *= -1;
        }

        image.dataset.x = x;
        image.dataset.y = y;
        image.dataset.dx = dx;
        image.dataset.dy = dy;
        image.dataset.rotation = rotation;

        image.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });

    requestAnimationFrame(animate);
}

animate();