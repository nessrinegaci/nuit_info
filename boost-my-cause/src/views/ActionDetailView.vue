<template>
  <section class="action-detail card">
    <!-- Popup points -->
    <PointsPopup 
      :amount="action.points" 
      :trigger="popupTrigger" 
    />

    <!-- Titre -->
    <h1 class="action-title">{{ action.title }}</h1>
    <p class="action-description">{{ action.description }}</p>

    <!-- Infos -->
    <div class="action-info">
      <span class="badge">{{ action.type }}</span>
      <span class="points">+{{ action.points }} pts</span>
    </div>

    <!-- Contenu principal (exemple simple pour le défi) -->
    <div class="action-body">
      <p>
        En réalisant cette action, tu aides directement la lutte contre la précarité étudiante.
        Chaque contribution compte 
      </p>
    </div>

    <!-- CTA -->
    <button class="primary-btn validate-btn" @click="validateAction">
      Je valide cette action 
    </button>
  </section>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PointsPopup from "../components/PointsPopup.vue";

// Fake database (same IDs as ActionsView)
const actionsDB = [
  { id: 1, title: "Faire un mini-don de 1€", description: "Contribue à financer un repas étudiant.", points: 40, type: "Don" },
  { id: 2, title: "Signer une pétition", description: "Soutiens les droits des étudiants précaires.", points: 20, type: "Engagement" },
  { id: 3, title: "Partager le défi sur Instagram", description: "Aide-nous à rendre la cause plus visible.", points: 30, type: "Partage" },
  { id: 4, title: "Participer à un défi solidaire", description: "Réalise un petit défi utile et amusant.", points: 50, type: "Défi" }
];

const route = useRoute();
const router = useRouter();

// Trouver l'action via son ID
const action = actionsDB.find(a => a.id === Number(route.params.id));

// Popup trigger
const popupTrigger = ref(0);

// Validation de l'action
const validateAction = () => {
  // Ajouter les points
  const oldPoints = Number(localStorage.getItem("points") || 0);
  const newPoints = oldPoints + action.points;
  localStorage.setItem("points", newPoints);

  // Ajouter aux actions réalisées
  const oldActions = Number(localStorage.getItem("actions") || 0);
  localStorage.setItem("actions", oldActions + 1);

  // Déclencher pop-up
  popupTrigger.value++;

  // Confettis
  import('canvas-confetti').then(({ default: confetti }) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  });

  // Redirection automatique après 1 sec
  setTimeout(() => {
    router.push("/actions");
  }, 1200);
};
</script>


<style scoped>
.action-detail {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

.action-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.action-description {
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.action-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.badge {
  padding: 0.3rem 0.8rem;
  background: rgba(37, 99, 235, 0.2);
  border-radius: 999px;
  color: #bfdbfe;
  font-size: 0.85rem;
}

.points {
  color: #22c55e;
  font-weight: 600;
}

.action-body {
  margin-bottom: 2rem;
  background: rgba(255,255,255,0.04);
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(148,163,184,0.25);
}

.validate-btn {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.9rem;
}
</style>
