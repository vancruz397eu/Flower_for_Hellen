// 1. Fondo de Estrellas Aleatorias
const starField = document.getElementById('star-field');
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    starField.appendChild(star);
}

// 2. Generación del Campo de Gerberas Adaptable
const field = document.getElementById('field');

function generateNaturalField() {
    field.innerHTML = '';
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const area = viewWidth * viewHeight;
    
    const divisor = viewWidth < 600 ? 6500 : 9500; 
    const flowerCount = Math.floor(area / divisor);

    for (let i = 0; i < flowerCount; i++) {
        const x = Math.random() * viewWidth;
        const y = Math.random() * viewHeight;
        const scale = Math.random() * 0.7 + 0.5; 
        const tilt = Math.random() * 360; 
        const delay = Math.random() * 1.6; 
        const zIndex = Math.floor(scale * 10); 

        createOrganicGerbera(x, y, scale, tilt, delay, zIndex, viewWidth);
    }
}

function createOrganicGerbera(x, y, scale, tilt, delay, zIndex, viewWidth) {
    const gerbera = document.createElement('div');
    gerbera.classList.add('gerbera');
    gerbera.style.left = `${x}px`;
    gerbera.style.top = `${y}px`;
    gerbera.style.zIndex = zIndex;
    gerbera.style.setProperty('--base-scale', scale);
    gerbera.style.setProperty('--flower-tilt', `${tilt}deg`);
    gerbera.style.setProperty('--delay', `${delay}s`);

    const petalLeft = viewWidth < 600 ? 37 : 51;
    const petalWidth = viewWidth < 600 ? 6 : 8;
    const heightFront = viewWidth < 600 ? 40 : 55;
    const heightBack = viewWidth < 600 ? 42 : 57;

    let petalsHTMLBack = '';
    let petalsHTMLFront = '';
    for (let a = 0; a < 360; a += 24) {
        petalsHTMLFront += `<div class="g-petal" style="--g-angle: ${a}deg; left: ${petalLeft}px; width: ${petalWidth}px; height: ${heightFront}px;"></div>`;
        petalsHTMLBack += `<div class="g-petal" style="--g-angle: ${a + 12}deg; left: ${petalLeft}px; width: ${petalWidth}px; height: ${heightBack}px; top: -2px;"></div>`;
    }

    gerbera.innerHTML = `
        <div class="g-petals back">${petalsHTMLBack}</div>
        <div class="g-petals front">${petalsHTMLFront}</div>
        <div class="gerbera-center"></div>
    `;
    field.appendChild(gerbera);
}

generateNaturalField();
window.addEventListener('resize', generateNaturalField);

// 3. Mecánica del Menú Interactivo
let yesCount = 0;
const questionText = document.getElementById('question-text');
const btnNo = document.getElementById('btn-no');
const buttonsBox = document.getElementById('buttons-box');

function handleYes() {
    yesCount++;
    
    if (yesCount <= 10) {
        questionText.innerHTML = `¿Segura? 🤔 <br><small style="font-size:1rem; color:#ffd700;">(Confirmación ${yesCount}/10)</small>`;
        
        if (yesCount === 1) {
            btnNo.style.display = 'none';
        }
    } 
    
    if (yesCount > 10) {
        questionText.innerHTML = "✨ ¡Sabía que sí! ✨<br><br><span style='color:#fff; font-size:1.6rem; text-shadow: 0 0 10px #ffcc00; display:block; line-height:1.3;'>Te amo como no tienes idea ❤️</span>";
        buttonsBox.innerHTML = ''; 
    }
}

function dodgeNo() {
    const card = document.getElementById('menu-card');
    const cardWidth = card.clientWidth;
    const cardHeight = card.clientHeight;
    
    const randomX = Math.random() * (cardWidth - 110) - (cardWidth / 2 - 55);
    const randomY = Math.random() * (cardHeight - 110) - (cardHeight / 2 - 55);
    
    btnNo.style.position = 'absolute';
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// 4. Generador de Partículas de Brillos
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const symbols = ['✨', '💛', '🌟'];
    sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.setProperty('--drift', `${Math.random() * 160 - 80}px`);
    sparkle.style.animationDuration = `${Math.random() * 2 + 3}s`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 5000);
}
setInterval(createSparkle, 350);
