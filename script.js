// Initialisation Firebase et Gemini
let userId = null;
const chapters = {
    fr: {
        1: { title: "Chapitre 1 : L’Aube Nouvelle", content: document.getElementById('chapter1')?.innerHTML },
        2: { title: "Chapitre 2 : Les Ombres du Passé", content: document.getElementById('chapter2')?.innerHTML },
        3: { title: "Chapitre 3 : La Quête de Clara", content: document.getElementById('chapter3')?.innerHTML },
        4: { title: "Chapitre 4 : Révélations", content: document.getElementById('chapter4')?.innerHTML },
        5: { title: "Chapitre 5 : Vers la Lumière", content: document.getElementById('chapter5')?.innerHTML }
    },
    en: {
        1: { title: "Chapter 1: The New Dawn", content: "<p>In a village nestled in the mountains, dawn rose with a promise of renewal...</p>" },
        2: { title: "Chapter 2: Shadows of the Past", content: "<p>Clara’s path led her to a dense forest...</p>" },
        3: { title: "Chapter 3: Clara’s Quest", content: "<p>Clara met an old hermit...</p>" },
        4: { title: "Chapter 4: Revelations", content: "<p>In the cave, Clara faced visions...</p>" },
        5: { title: "Chapter 5: Toward the Light", content: "<p>Back in the village, Clara shared her discoveries...</p>" }
    },
    ar: {
        1: { title: "الفصل الأول: الفجر الجديد", content: "<p>في قرية تقع بين الجبال، طلع الفجر بوعد بالتجديد...</p>" },
        2: { title: "الفصل الثاني: ظلال الماضي", content: "<p>قاد درب كلارا إلى غابة كثيفة...</p>" },
        3: { title: "الفصل الثالث: بحث كلارا", content: "<p>التقت كلارا بناسك عجوز...</p>" },
        4: { title: "الفصل الرابع: الوحي", content: "<p>في الكهف، واجهت كلارا رؤى...</p>" },
        5: { title: "الفصل الخامس: نحو النور", content: "<p>عادت كلارا إلى القرية وشاركت اكتشافاتها...</p>" }
    }
};

// Gestion de l'authentification
function initializeAuth() {
    try {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                userId = user.uid;
                loadUserPreferences();
                console.log('Utilisateur connecté:', userId);
            } else {
                console.log('Utilisateur non connecté, redirection vers paramètres');
                window.location.href = 'parametres.html';
            }
        });
    } catch (error) {
        console.error('Erreur initialisation Firebase:', error);
    }
}

// Page d'accueil
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    localStorage.setItem('lastPage', page);

    // Animations accueil
    if (page === 'index.html') {
        const animatedElements = document.querySelectorAll('.title, .details-row, .section-label, .description');
        animatedElements.forEach(el => {
            const startY = getComputedStyle(el).transform.includes('translateY') ? 
                parseInt(el.style.transform.replace(/[^0-9-]/g, '')) : 0;
            el.style.setProperty('--start-y', startY + 'px');
        });

        const startButton = document.getElementById('startButton');
        if (startButton) {
            console.log('Bouton Commencer trouvé');
            startButton.addEventListener('click', () => {
                console.log('Clic sur Commencer, redirection vers sommaire.html');
                localStorage.setItem('lastPage', 'index.html');
                window.location.href = 'sommaire.html';
            });
        }
    }

    // Sommaire
    if (page === 'sommaire.html') {
        const chapterCards = document.querySelectorAll('.chapter-card');
        chapterCards.forEach(card => {
            card.addEventListener('click', () => {
                const chapter = card.dataset.chapter;
                localStorage.setItem('lastPage', 'sommaire.html');
                window.location.href = `lecture.html?chapter=${chapter}`;
            });
        });
        loadProgress();
    }

    // Lecture
    if (page === 'lecture.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const chapterNum = urlParams.get('chapter') || '1';
        loadChapter(chapterNum);
        setupReadingFeatures();
    }

    // Favoris
    if (page === 'favoris.html') {
        loadFavorites();
    }

    // Barre inférieure
    const navIcons = document.querySelectorAll('.bottom-bar .icon');
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetPage = icon.dataset.page;
            localStorage.setItem('lastPage', page);
            window.location.href = targetPage;
        });
    });

    // Chat IA
    setupChatAI();

    // Initialiser Firebase
    initializeAuth();
});

// Charger les préférences utilisateur
async function loadUserPreferences() {
    if (!userId) return;
    try {
        const doc = await firebase.firestore().collection('users').doc(userId).get();
        if (doc.exists) {
            const data = doc.data();
            document.body.classList.toggle('dark-mode', data.theme === 'dark');
            document.body.classList.toggle('light-mode', data.theme !== 'dark');
            document.documentElement.style.fontSize = `${data.fontSize || 16}px`;
            const lang = data.language || 'fr';
            if (document.getElementById('languageSelect')) {
                document.getElementById('languageSelect').value = lang;
            }
            loadChapter(document.querySelector('.chapter')?.dataset?.chapter || '1', lang);
            console.log('Préférences chargées:', data);
        }
    } catch (error) {
        console.error('Erreur chargement préférences:', error);
    }
}

// Charger un chapitre
function loadChapter(chapterNum, lang = 'fr') {
    const bookContent = document.getElementById('bookContent');
    if (!bookContent) return;
    const chapterData = chapters[lang][chapterNum];
    if (chapterData) {
        bookContent.innerHTML = `
            <h1>La Voie du Salut - Chercheur de Vérité</h1>
            <div class="chapter" data-chapter="${chapterNum}">${chapterData.title}</div>
            ${chapterData.content}
        `;
        trackProgress(chapterNum);
    }
}

// Fonctionnalités de lecture
function setupReadingFeatures() {
    const backButton = document.getElementById('backButton');
    const themeToggle = document.getElementById('themeToggle');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const readAloud = document.getElementById('readAloud');
    const favorite = document.getElementById('favorite');
    const languageSelect = document.getElementById('languageSelect');

    if (backButton) {
        backButton.addEventListener('click', () => {
            localStorage.setItem('lastPage', 'lecture.html');
            window.location.href = 'sommaire.html';
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            firebase.firestore().collection('users').doc(userId).update({ theme });
        });
    }

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            let fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
            fontSize = Math.min(fontSize + 2, 24);
            document.documentElement.style.fontSize = `${fontSize}px`;
            firebase.firestore().collection('users').doc(userId).update({ fontSize });
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            let fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
            fontSize = Math.max(fontSize - 2, 10);
            document.documentElement.style.fontSize = `${fontSize}px`;
            firebase.firestore().collection('users').doc(userId).update({ fontSize });
        });
    }

   
