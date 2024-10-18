<template>
	<div id="app">
		<h1>Cчётчик: {{ count }}</h1>
	  <div
		class="circle"
		@click="handleClick"
	  ></div>
	  <transition name="fade" mode="out-in">
		<div v-if="scoreVisible" class="score" :style="{ top: scorePosition.y + 'px', left: scorePosition.x + 'px' }">
		  Спотачь !  +1
		</div>
	  </transition>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		count: 0,
		scoreVisible: false,
		circlePosition: { x: 0, y: 0 },
		scorePosition: { x: 0, y: 0 },
	  };
	},
	methods: {
	  randomPosition() {
		const x = Math.random() * (window.innerWidth - 50);
		const y = Math.random() * (window.innerHeight - 50);
		return { x, y };
	  },
	  handleClick() {
		this.count += 1
		this.scoreVisible = true;
  
		// Устанавливаем позицию для анимации
		this.scorePosition = this.randomPosition();
  
		// Перемещаем круг в новое случайное место
		this.circlePosition = this.randomPosition();
  
		// Скрываем счет через 1 секунду
		setTimeout(() => {
		  this.scoreVisible = false;
		}, 1000);
	  },
	},
	mounted() {
	  // Устанавливаем начальную позицию круга
	  this.circlePosition = this.randomPosition();
	},
  };
  </script>
  
  <style>
  * {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
	color: #fff;
  }


  #app {
	position: relative;
	height: 100vh;
	overflow: hidden;
	background: #444;
	margin: 0;
	padding: 0;
  }
  
  .circle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100px;
	height: 100px;
	background-color: black;
	border-radius: 50%;
	cursor: pointer;
	
  }
  
  .score {
	color: #fff;
	position: absolute;
	font-size: 16px;
	transition: opacity 0.5s ease;
  }
  
  .fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
	opacity: 0;
  }
  </style>