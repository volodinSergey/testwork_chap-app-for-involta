<template>
  <div id="app">
    <div
      class="circle"
      @click="handleClick"
    ></div>
    <transition name="fade" mode="out-in">
      <div v-if="scoreVisible" class="score" :style="{ top: scorePosition.y + 'px', left: scorePosition.x + 'px' }">
        Спотачь !
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
#app {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.circle {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
}

.score {
  position: absolute;
  font-size: 32px;
  color: red;
  transition: opacity 0.5s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>