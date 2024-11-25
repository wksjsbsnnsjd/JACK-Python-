const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// الصور
const backgroundImg = new Image();
backgroundImg.src = '/static/background.jpg';

const playerImg = new Image();
playerImg.src = '/static/player.png';

const coinImg = new Image();
coinImg.src = '/static/coin.png';

// الموسيقى
const backgroundMusic = new Audio('/static/music.mp3');
const coinSound = new Audio('/static/coin.mp3');
const winSound = new Audio('/static/win.mp3');

// إعداد اللاعب
const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    speed: 5,
    dy: 0
};

// العملات الذهبية
const coins = [
    { x: 200, y: 300, collected: false },
    { x: 400, y: 200, collected: false },
    { x: 600, y: 250, collected: false }
];

// الجاذبية
const gravity = 0.5;
let isJumping = false;

// النقاط والمستوى
let score = 0;
let level = 1;

// رسم اللاعب
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// رسم العملات
function drawCoins() {
    coins.forEach((coin) => {
        if (!coin.collected) {
            ctx.drawImage(coinImg, coin.x, coin.y, 30, 30);
        }
    });
}

// تحديث حالة اللاعب
function updatePlayer() {
    if (player.y + player.height < canvas.height) {
        player.dy += gravity;
        player.y += player.dy;
    } else {
        player.dy = 0;
        isJumping = false;
    }
}

// جمع العملات
function collectCoins() {
    coins.forEach((coin) => {
        if (
            player.x < coin.x + 30 &&
            player.x + player.width > coin.x &&
            player.y < coin.y + 30 &&
            player.y + player.height > coin.y
        ) {
            if (!coin.collected) {
                coin.collected = true;
                score += 10;
                coinSound.play();
            }
        }
    });
}

// التحقق من الفوز
function checkWin() {
    if (coins.every((coin) => coin.collected)) {
        winSound.play();
        level++;
        resetGame();
    }
}

// إعادة ضبط اللعبة
function resetGame() {
    coins.forEach((coin) => (coin.collected = false));
    player.x = 50;
    player.y = 300;
}

// التحكم عبر لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
    if (e.code === 'ArrowRight') {
        player.x += player.speed;
    }
    if (e.code === 'ArrowLeft') {
        player.x -= player.speed;
    }
});

// القفز
function jump() {
    if (!isJumping) {
        player.dy = -10;
        isJumping = true;
    }
}

// تحديث اللعبة
function gameLoop() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCoins();
    updatePlayer();
    collectCoins();
    checkWin();

    // عرض النقاط والمستوى
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Level: ${level}`, 10, 50);

    requestAnimationFrame(gameLoop);
}

// تشغيل الموسيقى
backgroundMusic.loop = true;
backgroundMusic.play();

// بدء اللعبة
gameLoop();
