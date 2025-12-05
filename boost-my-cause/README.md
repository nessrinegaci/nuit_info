# BoostMyCause  
### Une plateforme gamifiée qui transforme chaque clic en impact solidaire  
Projet développé pour le défi **“Oh les beaux boutons”** – Nuit de l’Info × AJIR INSA Rouen.

---

## Concept  
BoostMyCause est une plateforme qui vise à **transformer l’engagement passif en action concrète**, grâce à une expérience utilisateur soignée et une gamification motivante.

Chaque utilisateur peut choisir une action solidaire (don symbolique, défi, partage…), la valider en un clic, et voir immédiatement son impact à travers :

- des **points d’impact**,  
- des **badges**,  
- une **barre de progression collective**,  
- des **animations visuelles** qui renforcent la motivation.

Le but : montrer comment une UX engageante peut encourager la participation à des causes sociales, ici la **précarité étudiante**.

---

##  Objectifs du projet

###  Simplicité & clarté  
Une interface épurée, lisible et compréhensible en un coup d’œil.

###  Fluidité  
Un parcours utilisateur réduit à l’essentiel :  
**Accueil → Actions → Impact personnel & collectif**

###  Interactivité & feedback  
- Pop-ups de points  
- Confettis  
- Boutons animés  
- Retours immédiats après chaque action

###  Gamification  
- Collecte de points  
- 4 niveaux de badges  
- Historique de progression  
- Objectif collectif de **500 repas financés**

###  Originalité  
Un système d’impact symbolique qui convertit des actions numériques simples en “repas financés” pour sensibiliser à la situation étudiante.

---

##  Fonctionnalités principales

###  Accueil  
- CTA principal “Je participe maintenant”  
- Statistiques dynamiques (participants, actions, prochain badge)  
- Défi collectif avec barre de progression  
- Section “Comment ça marche” claire et concise

###  Actions  
- Catalogue d’actions solidaires  
- Description + points à gagner  
- Validation en un clic  
- Pop-up “+XX points” et confettis

###  Profil  
- Total des points  
- Nombre d’actions effectuées  
- Badges débloqués  
- Suivi de progression

---

## 🎮 Gamification

| Élément | Rôle |
|--------|------|
| **Points** | récompensent chaque action |
| **Badges** | indiquent la progression du joueur |
| **Défi collectif** | objectif commun pour encourager la participation |
| **Animations** | renforcent la motivation (confettis, pop-ups) |

Chaque action réalisée **augmente le nombre de “repas financés”**, simulant un impact social réel.

---

##  Comment l'application convertit un clic en impact ?

Même si le projet n’est pas connecté à une API réelle, BoostMyCause **simule un système d’impact** :

- 1 action validée → certains points → +1 repas financé  
- Les points débloient des niveaux  
- La barre globale avance  
- L’utilisateur voit son impact instantanément  

 **Objectif : rendre visible la valeur de l’engagement**, même symbolique.

---

## Stack technique

- **Vue.js 3** (Composition API)
- **Vite**
- **LocalStorage** pour la persistance
- **CSS pur** (design system maison)
- **canvas-confetti** pour les animations

---

## Installation

```bash
npm install
npm run dev
