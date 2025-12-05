export const actions = {
  don: {
    title: "Faire un don",
    description: "Financer entre 1 et 5 repas pour des étudiants.",
    points: 50,
    badge: "Donateur 💙",
    fields: [
      { name: "montant", label: "Montant (€)", type: "number", placeholder: "Ex : 3" },
    ],
  },

  signature: {
    title: "Signer le soutien",
    description: "Soutiens une pétition pour améliorer les aides étudiantes.",
    points: 20,
    badge: "Soutien engagé ✍️",
    fields: [
      { name: "name", label: "Nom complet", type: "text" },
      { name: "email", label: "Email", type: "email" },
    ],
  },

  defi: {
    title: "Défi solidaire",
    description: "Réalise une action concrète (collecte, repas partagé…).",
    points: 100,
    badge: "Héros solidaire 🔥",
    fields: [
      { name: "preuve", label: "Décris ta participation", type: "text" },
    ],
  },

  partage: {
    title: "Partager à 3 amis",
    description: "Invite d’autres étudiants à participer.",
    points: 30,
    badge: "Ambassadeur 🚀",
    fields: [
      { name: "amis", label: "Nombre d’amis invités", type: "number" },
    ],
  },
};
