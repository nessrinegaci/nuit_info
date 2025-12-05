<template>
  <div class="progress-wrapper" :aria-label="label" role="group">
    <div class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-values">
        {{ current }} / {{ goal }} {{ unit }}
      </span>
    </div>
    <div class="progress-track" role="progressbar"
         :aria-valuenow="percentage"
         aria-valuemin="0"
         aria-valuemax="100">
      <div class="progress-fill" :style="{ width: percentage + '%' }"></div>
    </div>
    <p v-if="helper" class="progress-helper">
      {{ helper }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  current: { type: Number, required: true },
  goal: { type: Number, required: true },
  unit: { type: String, default: '' },
  helper: { type: String, default: '' },
});

const percentage = computed(() => {
  if (props.goal <= 0) return 0;
  return Math.min(100, Math.round((props.current / props.goal) * 100));
});
</script>

<style scoped>
.progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.progress-label {
  color: var(--text-muted);
}

.progress-values {
  font-weight: 600;
}

.progress-track {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background-color: #020617;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.45);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #f97316, #f59e0b, #22c55e);
  transition: width 0.6s ease-out;
}

.progress-helper {
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
