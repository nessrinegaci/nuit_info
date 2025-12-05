// État global de l'application
const gameState = {
    autonomy: 20,
    savings: 0,
    ecoLevel: 1,
    budget: 1000,
    upgrades: [],
    currentQuizQuestion: 0,
    quizScore: 0,
    quizAnswers: []
};

// Questions du quiz NIRD
const quizData = [
    {
        question: "Qu'est-ce que la démarche NIRD ?",
        options: [
            "Numérique Industriel, Rapide et Déterminé",
            "Numérique Inclusif, Responsable et Durable",
            "Nouvelles Innovations Révolutionnaires Digitales",
            "Normes Internationales de Réseaux Distribués"
        ],
        correct: 1,
        explanation: "NIRD signifie Numérique Inclusif, Responsable et Durable - une approche qui privilégie l'accès pour tous, l'éthique et la durabilité."
    },
    {
        question: "Quel est le principal problème avec Windows 10 dans les écoles ?",
        options: [
            "Il est trop compliqué à utiliser",
            "Il n'est plus supporté et force le remplacement du matériel",
            "Il n'a pas assez de jeux",
            "Il consomme trop d'électricité"
        ],
        correct: 1,
        explanation: "Windows 10 n'étant plus supporté, il pousse les établissements à remplacer du matériel encore fonctionnel, créant un gaspillage énorme."
    },
    {
        question: "Quelle alternative libre à Microsoft Office recommande NIRD ?",
        options: [
            "Google Docs",
            "Apple iWork",
            "LibreOffice",
            "Adobe Creative Suite"
        ],
        correct: 2,
        explanation: "LibreOffice est une suite bureautique libre, gratuite et complète, parfaite alternative à Microsoft Office."
    },
    {
        question: "Qu'est-ce que l'obsolescence programmée dans le contexte numérique ?",
        options: [
            "La planification des mises à jour logicielles",
            "La stratégie pour rendre les appareils inutilisables artificiellement",
            "L'organisation des formations informatiques",
            "La gestion des licences logicielles"
        ],
        correct: 1,
        explanation: "L'obsolescence programmée consiste à rendre volontairement les appareils inutilisables pour forcer leur remplacement."
    },
    {
        question: "Quel est l'avantage principal de Linux pour les écoles ?",
        options: [
            "Il fonctionne uniquement sur du matériel récent",
            "Il permet de réutiliser d'anciens ordinateurs et est gratuit",
            "Il n'a besoin d'aucune maintenance",
            "Il est développé par Microsoft"
        ],
        correct: 1,
        explanation: "Linux permet de donner une seconde vie au matériel ancien et est entièrement gratuit, réduisant drastiquement les coûts."
    }
];

// Système d'upgrades pour le simulateur
const upgradeSystem = {
    linux: {
        name: "Migration Linux",
        cost: 100,
        autonomyGain: 30,
        savingsGain: 500,
        ecoGain: 1,
        icon: "🐧",
        description: "Remplace Windows par une distribution Linux libre"
    },
    libreoffice: {
        name: "LibreOffice",
        cost: 0,
        autonomyGain: 10,
        savingsGain: 200,
        ecoGain: 0,
        icon: "📄",
        description: "Suite bureautique libre et gratuite"
    },
    recycle: {
        name: "Reconditionnement",
        cost: 50,
        autonomyGain: 15,
        savingsGain: 300,
        ecoGain: 2,
        icon: "♻️",
        description: "Remet en service d'anciens ordinateurs"
    },
    formation: {
        name: "Formation équipes",
        cost: 200,
        autonomyGain: 20,
        savingsGain: 100,
        ecoGain: 0,
        icon: "👥",
        description: "Forme les équipes aux outils libres"
    },
    serveur: {
        name: "Serveur local",
        cost: 300,
        autonomyGain: 25,
        savingsGain: 400,
        ecoGain: 1,
        icon: "🖥️",
        description: "Serveur local avec solutions libres"
    },
    reseau: {
        name: "Réseau libre",
        cost: 150,
        autonomyGain: 15,
        savingsGain: 250,
        ecoGain: 1,
        icon: "🌐",
        description: "Infrastructure réseau basée sur des solutions libres"
    }
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startLoadingAnimation();
});

function initializeApp() {
    updateStats();
    loadQuizQuestion();
    updateActionButtons();
}

function setupEventListeners() {
    // Navigation smooth scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Quiz options
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quiz-option')) {
            selectQuizOption(e.target);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function startLoadingAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Animation d'entrée pour les éléments
        animateOnScroll();
    }, 3000);
}

function startAdventure() {
    // Animation spéciale pour commencer l'aventure
    const hero = document.querySelector('.hero-section');
    hero.classList.add('pulse');
    
    setTimeout(() => {
        hero.classList.remove('pulse');
        scrollToSection('decouvrir');
    }, 1000);
    
    // Petit message de bienvenue
    showNotification("🎯 Bienvenue dans l'aventure NIRD ! Explorez les différentes sections pour comprendre la démarche.", 'success');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Animation de highlight
        section.style.background = 'rgba(255, 107, 53, 0.1)';
        setTimeout(() => {
            section.style.background = '';
        }, 2000);
    }
}

// Simulateur de transformation
function performAction(actionType) {
    const upgrade = upgradeSystem[actionType];
    if (!upgrade) return;

    // Vérifier si l'action est abordable
    if (gameState.budget < upgrade.cost) {
        showNotification("💰 Budget insuffisant pour cette action !", 'error');
        document.querySelector(`[onclick="performAction('${actionType}')"]`).classList.add('shake');
        setTimeout(() => {
            document.querySelector(`[onclick="performAction('${actionType}')"]`).classList.remove('shake');
        }, 500);
        return;
    }

    // Vérifier si l'upgrade n'est pas déjà installé
    if (gameState.upgrades.includes(actionType)) {
        showNotification("✅ Cette amélioration est déjà installée !", 'warning');
        return;
    }

    // Appliquer l'upgrade
    gameState.budget -= upgrade.cost;
    gameState.autonomy = Math.min(100, gameState.autonomy + upgrade.autonomyGain);
    gameState.savings += upgrade.savingsGain;
    gameState.ecoLevel = Math.min(5, gameState.ecoLevel + upgrade.ecoGain);
    gameState.upgrades.push(actionType);

    // Animation et feedback
    updateStats();
    addUpgradeVisual(upgrade);
    updateActionButtons();
    
    showNotification(`🎉 ${upgrade.name} installé avec succès ! +${upgrade.autonomyGain}% autonomie`, 'success');

    // Vérifier les achievements
    checkAchievements();
}

function updateStats() {
    // Mise à jour de l'autonomie
    const autonomyProgress = document.getElementById('autonomy-progress');
    const autonomyValue = document.getElementById('autonomy-value');
    if (autonomyProgress && autonomyValue) {
        autonomyProgress.style.width = gameState.autonomy + '%';
        autonomyValue.textContent = gameState.autonomy + '%';
    }

    // Mise à jour des économies
    const savingsValue = document.getElementById('savings-value');
    if (savingsValue) {
        savingsValue.textContent = gameState.savings + '€';
    }

    // Mise à jour du niveau écologique
    const ecoMeter = document.getElementById('eco-meter');
    if (ecoMeter) {
        const ecoIcons = ['🌱', '🌿', '🌳', '🌲', '🌍'];
        ecoMeter.textContent = ecoIcons[gameState.ecoLevel - 1] || '🌱';
    }

    // Mise à jour du budget (affiché dans le dashboard)
    updateBudgetDisplay();
}

function updateBudgetDisplay() {
    // Ajouter un affichage du budget si pas déjà présent
    let budgetDisplay = document.querySelector('.budget-display');
    if (!budgetDisplay) {
        budgetDisplay = document.createElement('div');
        budgetDisplay.className = 'budget-display stat';
        budgetDisplay.innerHTML = `
            <span class="stat-label">Budget</span>
            <span class="stat-value" id="budget-value">${gameState.budget}€</span>
        `;
        document.querySelector('.stats').appendChild(budgetDisplay);
    }
    
    const budgetValue = document.getElementById('budget-value');
    if (budgetValue) {
        budgetValue.textContent = gameState.budget + '€';
    }
}

function addUpgradeVisual(upgrade) {
    const upgradesContainer = document.getElementById('upgrades-container');
    if (!upgradesContainer) return;

    const upgradeElement = document.createElement('div');
    upgradeElement.className = 'upgrade';
    upgradeElement.innerHTML = upgrade.icon;
    upgradeElement.title = upgrade.name;
    
    upgradesContainer.appendChild(upgradeElement);

    // Animation de l'école qui grandit
    const schoolBuilding = document.getElementById('school-building');
    if (schoolBuilding) {
        schoolBuilding.classList.add('pulse');
        setTimeout(() => {
            schoolBuilding.classList.remove('pulse');
        }, 1000);
    }
}

function updateActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        const actionType = button.getAttribute('onclick').match(/performAction\('(.+)'\)/)[1];
        const upgrade = upgradeSystem[actionType];
        
        if (gameState.upgrades.includes(actionType)) {
            button.disabled = true;
            button.innerHTML = button.innerHTML.replace(')', ' - ✅ Installé)');
        } else if (gameState.budget < upgrade.cost) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });
}

function checkAchievements() {
    const achievements = [];
    
    if (gameState.autonomy >= 50 && !gameState.achievedHalfAutonomy) {
        achievements.push("🏆 Village à demi autonome !");
        gameState.achievedHalfAutonomy = true;
    }
    
    if (gameState.autonomy >= 100 && !gameState.achievedFullAutonomy) {
        achievements.push("👑 Village totalement autonome !");
        gameState.achievedFullAutonomy = true;
        celebrateFullAutonomy();
    }
    
    if (gameState.savings >= 1000 && !gameState.achievedSaver) {
        achievements.push("💰 Économiseur confirmé !");
        gameState.achievedSaver = true;
    }
    
    if (gameState.ecoLevel >= 5 && !gameState.achievedEcoWarrior) {
        achievements.push("🌍 Guerrier écologique !");
        gameState.achievedEcoWarrior = true;
    }

    achievements.forEach(achievement => {
        showNotification(achievement, 'achievement');
    });
}

function celebrateFullAutonomy() {
    // Animation spéciale pour la réussite complète
    const schoolBuilding = document.getElementById('school-building');
    if (schoolBuilding) {
        schoolBuilding.style.transform = 'scale(1.2)';
        schoolBuilding.style.filter = 'drop-shadow(0 0 20px gold)';
        
        setTimeout(() => {
            schoolBuilding.style.transform = '';
            schoolBuilding.style.filter = '';
        }, 3000);
    }

    // Feux d'artifice virtuels
    createFireworks();
}

function createFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.fontSize = '2rem';
            firework.innerHTML = ['🎆', '✨', '🎊', '🎉'][Math.floor(Math.random() * 4)];
            firework.style.zIndex = '10000';
            firework.style.animation = 'firework 2s ease-out forwards';
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 200);
    }
}

// Système de quiz
function loadQuizQuestion() {
    const questionData = quizData[gameState.currentQuizQuestion];
    if (!questionData) return;

    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const progressElement = document.getElementById('quiz-progress');
    const progressText = document.getElementById('quiz-progress-text');

    if (questionElement) questionElement.textContent = questionData.question;
    if (progressText) progressText.textContent = `Question ${gameState.currentQuizQuestion + 1}/${quizData.length}`;
    
    if (progressElement) {
        progressElement.style.width = ((gameState.currentQuizQuestion + 1) / quizData.length) * 100 + '%';
    }

    if (optionsElement) {
        optionsElement.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionsElement.appendChild(optionElement);
        });
    }

    // Cacher le bouton next
    const nextButton = document.getElementById('quiz-next');
    if (nextButton) nextButton.style.display = 'none';
}

function selectQuizOption(optionElement) {
    const questionData = quizData[gameState.currentQuizQuestion];
    const selectedIndex = parseInt(optionElement.dataset.index);
    
    // Désactiver toutes les options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Marquer la réponse sélectionnée
    optionElement.classList.add('selected');
    gameState.quizAnswers[gameState.currentQuizQuestion] = selectedIndex;

    setTimeout(() => {
        // Révéler la bonne réponse
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            if (index === questionData.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== questionData.correct) {
                option.classList.add('incorrect');
            }
        });

        // Afficher l'explication
        const explanation = document.createElement('div');
        explanation.className = 'quiz-explanation';
        explanation.innerHTML = `<p><strong>Explication :</strong> ${questionData.explanation}</p>`;
        explanation.style.marginTop = '1rem';
        explanation.style.padding = '1rem';
        explanation.style.background = 'rgba(143,188,143,0.1)';
        explanation.style.borderRadius = 'var(--border-radius)';
        
        document.getElementById('quiz-options').appendChild(explanation);

        // Mettre à jour le score
        if (selectedIndex === questionData.correct) {
            gameState.quizScore++;
        }

        // Afficher le bouton next
        const nextButton = document.getElementById('quiz-next');
        if (nextButton) nextButton.style.display = 'block';
        
    }, 1000);
}

function nextQuestion() {
    gameState.currentQuizQuestion++;
    
    if (gameState.currentQuizQuestion >= quizData.length) {
        showQuizResults();
    } else {
        loadQuizQuestion();
    }
}

function showQuizResults() {
    const quizContent = document.querySelector('.quiz-content');
    const quizScore = document.getElementById('quiz-score');
    
    if (quizContent) quizContent.style.display = 'none';
    if (quizScore) {
        quizScore.style.display = 'block';
        
        const percentage = Math.round((gameState.quizScore / quizData.length) * 100);
        const scoreText = document.getElementById('score-text');
        const resistanceLevel = document.getElementById('resistance-level');
        
        if (scoreText) {
            scoreText.textContent = `Vous avez obtenu ${gameState.quizScore}/${quizData.length} (${percentage}%)`;
        }
        
        if (resistanceLevel) {
            let level, emoji;
            if (percentage >= 80) {
                level = "Chef de la Résistance NIRD";
                emoji = "👑";
            } else if (percentage >= 60) {
                level = "Guerrier NIRD Confirmé";
                emoji = "🛡️";
            } else if (percentage >= 40) {
                level = "Apprenti Résistant";
                emoji = "⚔️";
            } else {
                level = "Recrue du Village";
                emoji = "🗡️";
            }
            
            resistanceLevel.innerHTML = `${emoji}<br><strong>${level}</strong>`;
        }
    }
}

function restartQuiz() {
    gameState.currentQuizQuestion = 0;
    gameState.quizScore = 0;
    gameState.quizAnswers = [];
    
    document.querySelector('.quiz-content').style.display = 'block';
    document.getElementById('quiz-score').style.display = 'none';
    
    loadQuizQuestion();
}

// Système de notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#32cd32',
        error: '#dc143c',
        warning: '#ff6b35',
        info: '#2c5530',
        achievement: 'linear-gradient(45deg, gold, orange)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 10001;
        font-weight: 700;
        max-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Système de modals
function openModal(modalType) {
    const modal = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const modalContent = {
        'share-experience': {
            title: '📝 Partager votre expérience NIRD',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Type d'établissement :</label>
                        <select required>
                            <option value="">Choisir...</option>
                            <option value="primaire">École primaire</option>
                            <option value="college">Collège</option>
                            <option value="lycee">Lycée</option>
                            <option value="universite">Université</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Votre rôle :</label>
                        <select required>
                            <option value="">Choisir...</option>
                            <option value="enseignant">Enseignant</option>
                            <option value="admin">Administrateur</option>
                            <option value="technicien">Technicien</option>
                            <option value="direction">Direction</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Partagez votre expérience :</label>
                        <textarea rows="5" placeholder="Décrivez votre transition vers les outils libres, les défis rencontrés, les succès..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Partager</button>
                </form>
            `
        },
        'add-resource': {
            title: '📤 Ajouter une ressource',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Type de ressource :</label>
                        <select required>
                            <option value="">Choisir...</option>
                            <option value="tutorial">Tutoriel</option>
                            <option value="script">Script technique</option>
                            <option value="guide">Guide pédagogique</option>
                            <option value="case-study">Étude de cas</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Titre :</label>
                        <input type="text" placeholder="Titre de votre ressource" required>
                    </div>
                    <div class="form-group">
                        <label>Description :</label>
                        <textarea rows="4" placeholder="Décrivez votre ressource..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Lien ou fichier :</label>
                        <input type="url" placeholder="https://...">
                    </div>
                    <button type="submit" class="btn btn-primary">Ajouter</button>
                </form>
            `
        },
        'suggest-feature': {
            title: '💭 Suggérer une amélioration',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Type de suggestion :</label>
                        <select required>
                            <option value="">Choisir...</option>
                            <option value="feature">Nouvelle fonctionnalité</option>
                            <option value="improvement">Amélioration</option>
                            <option value="bug">Correction de bug</option>
                            <option value="content">Contenu</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Votre suggestion :</label>
                        <textarea rows="5" placeholder="Décrivez votre idée d'amélioration..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Envoyer</button>
                </form>
            `
        }
    };
    
    const content = modalContent[modalType];
    if (content) {
        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.body;
        modal.classList.add('active');
        
        // Gérer la soumission du formulaire
        const form = modalBody.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('🎉 Merci pour votre contribution ! Elle sera examinée par l\'équipe NIRD.', 'success');
                closeModal();
            });
        }
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('active');
}

// Animations au scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observer tous les éléments à animer
    document.querySelectorAll('.mission-card, .community-card, .pillar, .action-btn').forEach(el => {
        observer.observe(el);
    });
}

// Ajout des animations CSS dynamiques
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes firework {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-group label {
        font-weight: 700;
        color: var(--primary-color);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: var(--border-radius);
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--accent-color);
    }
`;
document.head.appendChild(style);

// Easter eggs et interactions amusantes
document.addEventListener('keydown', function(e) {
    // Konami Code pour débloquer des bonus
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        unlockEasterEgg();
        window.konamiSequence = [];
    }
});

function unlockEasterEgg() {
    gameState.budget += 1000;
    updateStats();
    showNotification('🎮 Code Konami activé ! +1000€ de budget bonus !', 'achievement');
    
    // Animation spéciale
    document.body.style.animation = 'rainbow 2s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Système de sauvegarde local
function saveGameState() {
    localStorage.setItem('nird-village-state', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('nird-village-state');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
        updateStats();
        updateActionButtons();
    }
}

// Auto-sauvegarde
setInterval(saveGameState, 10000); // Sauvegarde toutes les 10 secondes

// Charger l'état au démarrage
window.addEventListener('load', loadGameState);

// Partage social
function shareProgress() {
    const text = `Je viens de transformer mon école en Village Numérique Résistant ! 🏘️ Autonomie: ${gameState.autonomy}%, Économies: ${gameState.savings}€ 💚 Découvrez NIRD !`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mon Village NIRD',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Share
        navigator.clipboard.writeText(text + ' ' + window.location.href);
        showNotification('📋 Lien de partage copié !', 'success');
    }
}

// Accessibilité - Support clavier pour les éléments interactifs
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('action-btn')) {
            e.target.click();
        }
    }
});

// Fonction utilitaire pour générer des couleurs aléatoires pour les animations
function getRandomColor() {
    const colors = ['#ff6b35', '#32cd32', '#87ceeb', '#dda0dd', '#f0e68c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

console.log("🏘️ Village NIRD initialisé ! Bienvenue dans l'aventure du numérique libre !");$
// Formulaire Évaluation Établissement
document.getElementById('ee-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Simulation envoi (console + localStorage)
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  console.log('📊 ÉVALUATION EE soumise:', data);
  
  // Sauvegarde locale
  const evaluations = JSON.parse(localStorage.getItem('nird-evaluations') || '[]');
  evaluations.push({
    ...data,
    timestamp: new Date().toISOString(),
    resistanceLevel: calculateResistanceLevel(data)
  });
  localStorage.setItem('nird-evaluations', JSON.stringify(evaluations));
  
  // Animation succès
  this.innerHTML = `
    <div class="evaluation-success">
      <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
      <h3>Merci ${data.nomEtablissement} !</h3>
      <p>Votre évaluation a été enregistrée.<br>
      Vous faites partie du Village Numérique Résistant !</p>
      <button type="button" class="btn btn-secondary" onclick="location.reload()">Nouvelle évaluation</button>
    </div>
  `;
  
  showNotification(`🏫 ${data.nomEtablissement} a rejoint la résistance NIRD !`, 'success');
  
  // Analytics fictif
  gameState.evaluationsSubmitted = (gameState.evaluationsSubmitted || 0) + 1;
});

// Calcul niveau résistance
function calculateResistanceLevel(data) {
  let score = 0;
  if (data.dependanceBigTech === 'Faible' || data.dependanceBigTech === 'Aucune') score += 30;
  if (data.osPrincipal === 'Linux') score += 40;
  if (data.actionsPrevues) score += 30;
  return Math.min(100, score);
}
