<template>
  <div v-if="visible" class="popup">
    +{{ amount }} pts 
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  amount: Number,     // nombre de points à afficher
  trigger: Number     // changement => afficher popup
});

const visible = ref(false);

watch(
  () => props.trigger,
  () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 1300);
  }
);
</script>

<style scoped>
.popup {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(37, 99, 235, 0.92);
  padding: 14px 26px;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  animation: pop 0.8s ease-out;
  z-index: 9999;
}

@keyframes pop {
  0% {
    transform: translate(-50%, -40%) scale(0.5);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -60%) scale(1);
    opacity: 0;
  }
}
</style>
