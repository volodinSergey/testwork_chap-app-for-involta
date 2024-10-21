<template>
    <div class="game-container">
    <div v-if="isGameOver" class="gameover-modal">
        <h1>Igri konchilis, na zavooood</h1>

        <button class="play-again-button" @click="onPlayAgain">Igrat snova</button>
    </div>

      <canvas class="canvas" ref="canvas" width="390" height="320"></canvas>
      <!-- <div class="score">Score: {{ score }}</div> -->

      <div class="controls">
<button class="controls__control" 
           @mousedown="onMovePaddleLeft"
           @mouseup="onEndMovePaddleLeft"
           @touchstart="onMovePaddleLeft" 
           @touchend="onEndMovePaddleLeft"
        >
        Left
    </button>
<button class="controls__control" 
    @touchstart="onMovePaddleRight"
    @touchend="onEndMovePaddleRight"     
    @mousedown="onMovePaddleRight"
    @mouseup="onEndMovePaddleRight">
Right
</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const canvas = ref<HTMLCanvasElement | null>(null);
  const score = ref(0);
  const ctx = ref<CanvasRenderingContext2D | null>(null);
  const isGameOver = ref(false)
  
  const ballRadius = 5;
  const paddleHeight = 13;
  const paddleWidth = 80;
  let x = 240;
  let y = 160;
  let dx = 3;
  let dy = -3;
  let paddleX = (480 - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;
  
  const bricks: { x: number; y: number; status: number }[] = [];
  const brickRowCount = 6;
  const brickColumnCount = 6;
  const brickWidth = 45;
  const brickHeight = 6;
  const brickPadding = 5;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;
  let interval
  
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks.push({
        x: c * (brickWidth + brickPadding) + brickOffsetLeft,
        y: r * (brickHeight + brickPadding) + brickOffsetTop,
        status: 1,
      });
    }
  }

const onMovePaddleLeft = () => leftPressed = true
const onMovePaddleRight = () => rightPressed = true

const onEndMovePaddleLeft = () =>  leftPressed = false
const onEndMovePaddleRight = () => rightPressed = false

  
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
      ctx.value.rect(paddleX, 320 - paddleHeight, paddleWidth, paddleHeight);
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
    for (let i = 0; i < bricks.length; i += 1) {
      const b = bricks[i];

      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y <  b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score.value =+ 1;
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

        isGameOver.value = true
        clearInterval(interval)
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
  

  const onPlayAgain = () => {
y = 260
x = 260
isGameOver.value = false
    interval = setInterval(draw, 10)
  }
  onMounted(() => {
    //@ts-ignore
    ctx.value = canvas.value?.getContext('2d');
    
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
  
     interval = setInterval(draw, 10);
  
    onBeforeUnmount(() => {
      clearInterval(interval);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    });
  });
  </script>
  
  <style scoped>
  .game-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 390px;
    width: 100%;
    height: 320px;
  }
  .score {
    margin-top: 10px;
  }

  .gameover-modal {
    position: absolute;
    inset: 0;
    color: #fff;
    width: 100%;
    height: 103%;
    font-size: 12px;
    background-color: rgba(0 , 0, 0, 0.8);
    display: grid;
    place-items: center;
  }

  .canvas {
    width: 100%;
    border: 1px solid #fff;
  }
  .controls {
    display: flex;
    width: 100%;
  }

  .controls__control {
    flex-grow: 1;
    color: #000;
  }

  .play-again-button {
    color: #000;
    padding: 5px;
background-color: #c4e7e0;
  }
  </style>
