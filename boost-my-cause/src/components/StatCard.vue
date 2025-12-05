<template>
  <div class="stat-card">
    <p class="label">{{ label }}</p>
    <p class="value">{{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  value: [String, Number],
});
</script>

<style scoped>
.stat-card {
  padding: 1rem;
  border-radius: var(--radius-lg);
  background-color: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.3);
  text-align: center;
}

.label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.value {
  font-size: 1.4rem;
  font-weight: 700;
}
</style>
