<script setup lang="ts">
import Arcanoid from './Arcanoid.vue';
</script>




<template>
<Arcanoid />
  </template>
  
  
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