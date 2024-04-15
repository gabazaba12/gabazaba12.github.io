function showPage(page) {
    var pages = document.querySelectorAll('.content');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(page + 'Page').style.display = 'block';
}
let currentImageIndex = 0;
    const images = document.querySelectorAll('.gallery-item img');
    const captions = document.querySelectorAll('.gallery-caption');

    function showImage(index) {
        images.forEach((image, i) => {
            if (i === index) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
        
        captions.forEach((caption, i) => {
            if (i === index) {
                caption.style.display = 'block';
            } else {
                caption.style.display = 'none';
            }
        });
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    showImage(currentImageIndex);

// script.js

// script.js

// Data premiery filmu (rok, miesiąc (liczone od 0), dzień, godzina, minuta, sekunda)
const releaseDate = new Date(2025, 8, 10); // 10 września 2025 roku

// Funkcja obliczająca pozostały czas do premiery filmu i aktualizująca odliczanie co sekundę
function updateCountdown() {
    const now = new Date(); // Aktualna data i czas
    const difference = releaseDate - now; // Różnica między datami w milisekundach

    if (difference <= 0) {
        // Jeśli premiera filmu już minęła
        document.getElementById('countdown').innerText = 'Premiera filmu już się odbyła!';
    } else {
        // Obliczanie pozostałego czasu
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Aktualizacja wyświetlanego odliczania
        document.getElementById('countdown').innerHTML = `Do premiery filmu pozostało: ${days} dni ${hours} godz. ${minutes} min ${seconds} sek`;
    }
}

// Wywołanie funkcji updateCountdown co sekundę
setInterval(updateCountdown, 1000);

// Wywołanie funkcji updateCountdown po załadowaniu strony
updateCountdown();
