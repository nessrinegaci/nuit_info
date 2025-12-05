<template>
  <section class="card profile">
    <h1>Ton profil </h1>

    <!-- Points -->
    <div class="points-block">
      <p class="points-label">Points d’impact</p>
      <p class="points-value">{{ points }}</p>
    </div>

    <!-- Niveau -->
    <div class="level-block">
      <p class="level-label">Niveau</p>
      <p class="level-value">Niveau {{ level }}</p>
      <p class="next-level">
        Prochain niveau à <strong>{{ nextLevel }} points</strong>
      </p>
    </div>

    <hr />

    <!-- Badges débloqués -->
    <h2>Badges obtenus</h2>

    <div class="badges-grid">
      <div
        v-for="badge in earnedBadges"
        :key="badge"
        class="badge-item unlocked"
      >
        {{ badge }}
      </div>

      <div
        v-for="badge in lockedBadges"
        :key="badge"
        class="badge-item locked"
      >
        {{ badge }}
      </div>
    </div>

    <hr />

    <!-- Statistiques -->
    <h2>Statistiques</h2>

    <div class="stats">
      <StatCard label="Actions réalisées" :value="actionsCount" />
      <StatCard label="Badges obtenus" :value="earnedBadges.length" />
      <StatCard label="Prochain badge" :value="nextBadgeText" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import StatCard from "../components/StatCard.vue";

// Récupère les points
const points = ref(Number(localStorage.getItem("points") || 0));

// Récupère le nombre d’actions (bonus UX)
const actionsCount = ref(
  Number(localStorage.getItem("actions") || 0)
);

// Niveau
const level = computed(() => Math.floor(points.value / 50) + 1);
const nextLevel = computed(() => level.value * 50);

// Liste des badges (ordre logique)
const badges = [
  { name: "Soutien engagé ", points: 20 },
  { name: "Donateur ", points: 50 },
  { name: "Héros solidaire ", points: 100 },
  { name: "Ambassadeur ", points: 150 },
];

// Badges débloqués
const earnedBadges = computed(() =>
  badges.filter((b) => points.value >= b.points).map((b) => b.name)
);

// Badges verrouillés
const lockedBadges = computed(() =>
  badges.filter((b) => points.value < b.points).map((b) => b.name)
);

// Prochain badge (affichage)
const nextBadgeText = computed(() => {
  const next = badges.find((b) => points.value < b.points);
  return next ? next.name : "Tous les badges obtenus ";
});
</script>

<style scoped>
.profile {
  max-width: 650px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 1.2rem;
}

.points-block,
.level-block {
  margin-bottom: 1.5rem;
}

.points-label {
  color: var(--text-muted);
}

.points-value {
  font-size: 2.8rem;
  font-weight: 700;
  color: #fbbf24;
}

.level-label {
  color: var(--text-muted);
}

.level-value {
  font-size: 1.6rem;
  font-weight: 700;
}

.next-level {
  font-size: 0.9rem;
  color: var(--text-muted);
}

hr {
  border: none;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  margin: 1.5rem 0;
}

.badges-grid {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  margin: 1rem 0;
}

.badge-item {
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.unlocked {
  background-color: rgba(37, 99, 235, 0.2);
  color: #dbeafe;
}

.locked {
  background-color: rgba(15, 23, 42, 0.7);
  color: rgba(148, 163, 184, 0.5);
}

.stats {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}
</style>
