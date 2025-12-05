<template>
  <section class="home-grid" aria-labelledby="home-title">
    <!-- Bloc gauche : hero -->
    <div class="card hero">
      <p class="chip">Défi solidaire · Nuit de l'Info</p>

    <h1 id="home-title">
        <span class="highlight">3 clics.</span>
        <span class="highlight">1 action solidaire.</span>
        Ton impact commence ici.
    </h1>


      <p class="hero-text">
        BoostMyCause te permet d'agir en quelques secondes pour lutter contre la précarité étudiante.
        Choisis une action, réalise-la, et vois ton impact en temps réel.
      </p>

      <div class="hero-actions">
        <router-link to="/actions">
          <button class="primary-btn">
            Je participe maintenant 
          </button>
        </router-link>

        <button class="secondary-btn" @click="scrollToHow">
          Voir comment ça marche
        </button>
      </div>

      <!-- META DYNAMIQUE -->
      <div class="hero-meta">
        <div class="meta-item">
          <span class="meta-label">Participants</span>
          <span class="meta-value">{{ participants }}</span>
        </div>

        <div class="meta-item">
          <span class="meta-label">Actions réalisées</span>
          <span class="meta-value">{{ actionsDone }}</span>
        </div>

        <div class="meta-item">
          <span class="meta-label">Badge prochain niveau</span>
          <span class="meta-value">{{ nextBadge }}</span>
        </div>
      </div>
    </div>

    <!-- Bloc droite : impact -->
    <div class="card impact">
      <header class="impact-header">
        <h2>Défi collectif en cours</h2>
        <p class="impact-sub">
          Ensemble, atteignons <strong>{{ collectiveGoal }} repas financés</strong> pour des étudiants.
        </p>
      </header>

      <ProgressBar
        label="Repas financés"
        :current="collectiveProgress"
        :goal="collectiveGoal"
        unit="repas"
        helper="Grâce aux dons et défis relevés cette semaine."
      />

      <!-- Stats d'impact -->
      <div class="impact-stats">
        <div class="impact-pill">
          +{{ collectiveProgress }} repas
          <span class="pill-caption">depuis ton inscription</span>
        </div>

        <div class="impact-pill">
          {{ actionsDone > 0 ? Math.max(1, Math.floor(actionsDone / 2)) : 1 }} défis
          <span class="pill-caption">en cours</span>
        </div>
      </div>

      <div class="impact-footer">
        <p class="impact-footer-text">
          Ton action débloque des <strong>points d'impact</strong> et des
          <strong>badges solidaires</strong>.
        </p>
        <router-link to="/actions">
          <button class="secondary-btn">
            Choisir mon action
          </button>
        </router-link>
      </div>
    </div>
  </section>

  <!-- SECTION COMMENT ÇA MARCHE -->
  <section ref="howSection" class="card how-it-works">
    <h2>3 étapes, pas plus.</h2>

    <div class="steps">
      <div class="step">
        <div class="step-index">1</div>
        <h3>Choisis ton action</h3>
        <p>Don, signature, défi solidaire ou partage : tu agis comme tu veux.</p>
      </div>

      <div class="step">
        <div class="step-index">2</div>
        <h3>Agis en 1 minute</h3>
        <p>Un formulaire ultra simple, aucune création de compte obligatoire.</p>
      </div>

      <div class="step">
        <div class="step-index">3</div>
        <h3>Vois ton impact</h3>
        <p>Points, badges et barres de progression rendent ton impact visible.</p>
      </div>
    </div>
  </section>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue';
import ProgressBar from '../components/ProgressBar.vue';
import { animateNumber } from '../utils/animateNumber';

// --- Références dynamiques ---
const points = ref(0);
const actionsDone = ref(0);
const collectiveProgress = ref(0);

const collectiveGoal = 500;

// Charger depuis localStorage avec animation
onMounted(() => {
  const savedPoints = Number(localStorage.getItem("points") || 0);
  const savedActions = Number(localStorage.getItem("actions") || 0);

  animateNumber(points, savedPoints);
  animateNumber(actionsDone, savedActions);
  animateNumber(collectiveProgress, savedActions);
});

// Participants dynamiques
const participants = computed(() => {
  return actionsDone.value > 0 ? 1 : 0;
});


// Badge dynamique
const nextBadge = computed(() => {
  if (points.value < 20) return "Soutien engagé ";
  if (points.value < 50) return "Donateur ";
  if (points.value < 100) return "Héros solidaire ";
  return "Ambassadeur ";
});

// Scroll vers la section how-it-works
const howSection = ref(null);
const scrollToHow = () => {
  howSection.value?.scrollIntoView({ behavior: 'smooth' });
};
</script>



<style scoped>
/* GRID PRINCIPALE */
.home-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2.4fr);
}

@media (max-width: 900px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}

/* HERO */
.hero h1 {
  font-size: clamp(1.9rem, 3vw, 2.4rem);
  line-height: 1.2;
  margin-bottom: 0.8rem;
}

.highlight {
  background: linear-gradient(to right, #f97316, #2563eb);
  -webkit-background-clip: text;
  color: transparent;
}

.hero-text {
  color: var(--text-muted);
  margin-bottom: 1.4rem;
}

/* BOUTONS */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

/* META */
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
}

.meta-value {
  font-weight: 600;
  color: #e5e7eb;
}

/* IMPACT */
.impact-header h2 {
  margin-bottom: 0.2rem;
}

.impact-sub {
  color: var(--text-muted);
}

.impact-stats {
  display: flex;
  gap: 0.6rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.impact-pill {
  border: 1px solid rgba(148, 163, 184, 0.6);
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
}

.pill-caption {
  color: var(--text-muted);
}

/* HOW IT WORKS */
.how-it-works {
  margin-top: 1.5rem;
  padding-top: 1rem;
}

.steps {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 900px) {
  .steps {
    grid-template-columns: 1fr;
  }
}

.step {
  padding: 1rem;
  background-color: rgba(15, 23, 42, 0.9);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.step-index {
  width: 30px;
  height: 30px;
  background: rgba(37, 99, 235, 0.3);
  color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}
</style>
