// Initialisation Firebase (définie dans firebase.js)
let userId = null;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
        loadUserPreferences();
    } else {
        window.location.href = 'parametres.html'; // Redirige vers connexion si non authentifié
    }
});

// Page d'accueil
document.addEventListener('DOMContentLoaded', () => {
    // Animations accueil
    const animatedElements = document.querySelectorAll('.title, .details-row, .section-label, .description');
    animatedElements.forEach(el => {
        const startY = getComputedStyle(el).transform === 'matrix(1, 0, 0, 1, 0, 0)' ? 
            el.style.transform.replace('translateY(', '').replace('px)', '') : 0;
        el.style.setProperty('--start-y', startY + 'px');
    });

    // Bouton Commencer
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', () => {
            localStorage.setItem('lastPage', 'index.html');
            window.location.href = 'sommaire.html';
        });
    }
});

// Charger les préférences utilisateur
async function loadUserPreferences() {
    if (!userId) return;
    try {
        const doc = await firebase.firestore().collection('users').doc(userId).get();
        if (doc.exists) {
            const data = doc.data();
            document.body.classList.toggle('dark-mode', data.theme === 'dark');
            document.documentElement.style.fontSize = `${data.fontSize || 16}px`;
            // Appliquer langue, voix, etc.
        }
    } catch (error) {
        console.error('Erreur chargement préférences:', error);
    }
}

// Protection anti-copie
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('print', e => e.preventDefault());
