<template>
  <header class="navbar" aria-label="Navigation principale">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-logo">
        <span class="logo-pill">B</span>
        <div>
          <div class="logo-title">BoostMyCause</div>
          <div class="logo-subtitle">Précarité étudiante · Défis solidaires</div>
        </div>
      </router-link>

      <nav class="navbar-links" aria-label="Liens principaux">
        <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
          Accueil
        </router-link>
        <router-link to="/actions" class="nav-link" :class="{ active: isActive('/actions') }">
          Actions
        </router-link>
        <router-link to="/profil" class="nav-link" :class="{ active: isActive('/profil') }">
          Profil
        </router-link>
      </nav>

    
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// ▬▬▬ THEME ▬▬▬
const isDark = ref(true);

// Charger le thème depuis localStorage
onMounted(() => {
  const saved = localStorage.getItem("theme");

  if (saved) {
    isDark.value = saved === "dark";
  }

  applyTheme();
});

// Appliquer la classe sur <html>
const applyTheme = () => {
  document.documentElement.classList.toggle("dark", isDark.value);
};

// Basculer clair ↔ sombre
const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  applyTheme();
};

// ▬▬▬ ACTIVE LINK ▬▬▬
const isActive = (path) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(14px);
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0.96),
    rgba(15, 23, 42, 0.85),
    transparent
  );
}

.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-pill {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: radial-gradient(circle at 20% 20%, #f97316, #2563eb);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  font-size: 1.1rem;
}

.logo-title {
  font-weight: 700;
  letter-spacing: 0.03em;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-size: 0.95rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  color: var(--text-muted);
}

.nav-link.active {
  background-color: rgba(37, 99, 235, 0.16);
  color: #e5e7eb;
  border: 1px solid rgba(37, 99, 235, 0.6);
}
</style>
