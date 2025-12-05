import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ActionsView from '../views/ActionsView.vue';
import ActionDetailView from '../views/ActionDetailView.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/actions', name: 'actions', component: ActionsView },
  { path: '/actions/:id', name: 'action-detail', component: ActionDetailView, props: true },
  { path: '/profil', name: 'profil', component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
