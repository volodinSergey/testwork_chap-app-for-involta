
<template>
  <div class="game-container">
    <canvas ref="canvas" width="480" height="800"></canvas>
    <div class="score">Score: {{ score }}</div>

    <div class="controls-box">
        <button class="controls-box__control" @touchstart="onMovePaddleLeft" @touchend="onEndMovePaddleLeft">left</button>
        <button class="controls-box__control" @touchstart="onMovePaddleRight" @touchend="onEndMovePaddleRight">right</button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let x = 240;
let y = 160;
let dx = 1;
let dy = -1;
let paddleX = (480 - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const bricks: { x: number; y: number; status: number }[] = [];
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const onMovePaddleLeft = () => leftPressed = true
const onMovePaddleRight = () => rightPressed = true

const onEndMovePaddleLeft = () =>  leftPressed = false
const onEndMovePaddleRight = () => rightPressed = false

for (let c = 0; c < brickColumnCount; c++) {
  for (let r = 0; r < brickRowCount; r++) {
    bricks.push({
      x: c * (brickWidth + brickPadding) + brickOffsetLeft,
      y: r * (brickHeight + brickPadding) + brickOffsetTop,
      status: 1,
    });
  }
}

const drawBall = () => {
  if (ctx.value) {
    ctx.value.beginPath();
    ctx.value.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.value.fillStyle = '#0095DD';
    ctx.value.fill();
    ctx.value.closePath();
  }
};

const drawPaddle = () => {
  if (ctx.value) {
    ctx.value.beginPath();
ctx.value.rect(paddleX, 600, paddleWidth, paddleHeight);
    ctx.value.fillStyle = '#0095DD';
    ctx.value.fill();
    ctx.value.closePath();
  }
};

const drawBricks = () => {
  if (ctx.value) {
    for (let i = 0; i < bricks.length; i++) {
      if (bricks[i].status === 1) {
        ctx.value.beginPath();
        ctx.value.rect(bricks[i].x, bricks[i].y, brickWidth, brickHeight);
        ctx.value.fillStyle = '#0095DD';
        ctx.value.fill();
        ctx.value.closePath();
      }
    }
  }
};

const collisionDetection = () => {
  for (let i = 0; i < bricks.length; i++) {
    const b = bricks[i];
    if (b.status === 1) {
      if (
        x > b.x &&
        x < b.x + brickWidth &&
        y > b.y &&
        y < b.y + brickHeight
      ) {
        dy = -dy;
        b.status = 0;
        score.value++;
      }
    }
  }
};

const draw = () => {
  if (ctx.value) {
    ctx.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Проверка границ для шарика
    if (x + dx > canvas.value!.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.value!.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        document.location.reload();
      }
    }

    // Движение платформы
    if (rightPressed && paddleX < canvas.value!.width - paddleWidth) {
      paddleX += 7; // скорость движения вправо
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7; // скорость движения влево
    }

    // Обновление позиции шарика
    x += dx;
    y += dy;
  }
};

const keyDownHandler = (event: KeyboardEvent) => {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = true;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

const keyUpHandler = (event: KeyboardEvent) => {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

onMounted(() => {
  ctx.value = canvas.value?.getContext('2d');
  
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  const interval = setInterval(draw, 10);

  onBeforeUnmount(() => {
    clearInterval(interval);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
  });
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 800px;
  background-color: rgb(69, 42, 165);
}
.score {
  margin-top: 10px;
}

.controls-box {
    font-family: sans-serif;
    color: #000;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}

.controls-box__control {
    font-size: 1rem;
    color: #000;
    padding: 10px;
    flex-grow: 1;
}
</style>