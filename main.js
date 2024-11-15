document.getElementById('wordart').addEventListener('click', (event) => {
    const image = event.target;
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const width = rect.width;

    if (x >= 0.6 * width && x <= 0.7 * width) {
        // Hide all other elements
        document.querySelector('.top-banner').style.display = 'none';
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.bottom-banner').style.display = 'none';
        document.querySelector('.monkecorner-container').style.display = 'none';
        document.querySelector('.content').style.display = 'none';
        document.querySelector('.floating-images-container').style.display = 'none';
        document.getElementById('main-body').style.background = "url('resources/bratgreen.jpg') no-repeat center center fixed";
        document.getElementById('main-body').style.backgroundSize = 'cover';

        // Show the center image
        document.getElementById('center-image-container').style.display = 'block';

        const audio = new Audio('resources/brat.mp3');
        audio.volume = 0.1;
        audio.play();
    } else {
        // Otherwise, trigger confetti and play sound
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        const audio = new Audio('resources/yipee.mp3');
        audio.volume = 0.1;
        audio.play();
    }
});

document.getElementById('center-image').addEventListener('click', () => {
    location.reload();
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


document.addEventListener('DOMContentLoaded', () => {
    const monkecorner = document.querySelector('.monkecorner');
    const overlay = document.getElementById('overlay');
    const jumpscareAudio = document.getElementById('jumpscare-audio');
    const overlayText = document.getElementById('overlay-text');

    monkecorner.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        document.querySelector('.menu').style.display = 'none';
        jumpscareAudio.play();
    });

    // Optionally, hide the overlay after some time
    setTimeout(() => {
        document.querySelector('.menu').style.display = 'block';
        overlay.classList.add('hidden');
    }, 10000); // Hide after 10 seconds, for example
});

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: {
                    x: item.getBoundingClientRect().left / window.innerWidth,
                    y: item.getBoundingClientRect().top / window.innerHeight
                }
            });
        });

        item.addEventListener('click', () => {
            const audio = new Audio('resources/click-sound.mp3');
            audio.volume = 0.1;
            audio.play();
        });
    });
});


animate();