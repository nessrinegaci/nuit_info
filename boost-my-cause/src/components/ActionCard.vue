<template>
  <div class="card action-card" @click="$emit('click')">
    <h3 class="action-title">{{ action.title }}</h3>
    <p class="action-desc">{{ action.description }}</p>

    <div class="action-footer">
      <span class="points">+{{ action.points }} pts</span>
      <span class="action-type">{{ action.type }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  action: Object
});
</script>

<style scoped>
.action-card {
  cursor: pointer;
  transition: 0.25s ease;
  border: 1px solid rgba(148,163,184,0.25);
  border-radius: var(--radius-lg);
}

.action-card:hover {
  transform: translateY(-4px);
  border-color: rgba(148,163,184,0.5);
}

.action-title {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.action-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.action-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.points {
  color: #22c55e;
  font-weight: 600;
}

.action-type {
  font-size: 0.8rem;
  opacity: 0.8;
}
</style>
