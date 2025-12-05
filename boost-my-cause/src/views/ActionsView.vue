<template>
  <section class="actions-page" aria-labelledby="actions-title">

    <h1 id="actions-title" class="page-title">
      Actions disponibles 
    </h1>

    <p class="page-subtitle">
      Choisis une action pour aider la cause. Chaque action te rapporte des points d’impact
      et fait avancer le défi collectif.
    </p>

    <!-- FILTRE -->
    <div class="filter-bar">
      <button 
        v-for="f in filters"
        :key="f"
        class="filter-btn"
        :class="{ active: activeFilter === f }"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <!-- LISTE DES ACTIONS -->
    <div class="actions-list">
      <ActionCard
        v-for="act in filteredActions"
        :key="act.id"
        :action="act"
        @click="goToDetails(act.id)"
      />
    </div>
  </section>
</template>


<script setup>
import { ref, computed } from 'vue';
import ActionCard from '../components/ActionCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --------------- DONNÉES DES ACTIONS ------------------
const actions = ref([
  {
    id: 1,
    title: "Faire un mini-don de 1€",
    description: "Contribue à financer un repas étudiant.",
    points: 40,
    type: "Don"
  },
  {
    id: 2,
    title: "Signer une pétition",
    description: "Soutiens les droits des étudiants précaires.",
    points: 20,
    type: "Engagement"
  },
  {
    id: 3,
    title: "Partager le défi sur Instagram",
    description: "Aide-nous à rendre la cause plus visible.",
    points: 30,
    type: "Partage"
  },
  {
    id: 4,
    title: "Participer à un défi solidaire",
    description: "Réalise un petit défi utile et amusant.",
    points: 50,
    type: "Défi"
  }
]);

// --------------- FILTRAGE ------------------
const filters = ["Tous", "Don", "Engagement", "Partage", "Défi"];
const activeFilter = ref("Tous");

const filteredActions = computed(() => {
  if (activeFilter.value === "Tous") return actions.value;
  return actions.value.filter(a => a.type === activeFilter.value);
});

// --------------- NAVIGATION ------------------
const goToDetails = (id) => {
  router.push(`/actions/${id}`);
};
</script>



<style scoped>
.actions-page {
  padding: 1rem 0;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

/* FILTRE */
.filter-bar {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.4rem 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.4);
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.2s ease;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

/* LISTE */
.actions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  padding-bottom: 2rem;
}
</style>
