const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// إعداد اللاعب
const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dy: 0
};

// إعداد الجاذبية
const gravity = 0.5;
let isJumping = false;

// رسم اللاعب
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
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

// التعامل مع القفز
function jump() {
    if (!isJumping) {
        player.dy = -10;
        isJumping = true;
    }
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

// تحديث اللعبة
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();
