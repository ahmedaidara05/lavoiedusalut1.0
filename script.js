// Charger le contenu du livre
let bookContent = [];
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        bookContent = data;
        initChapters();
    });

// Navigation
let lastPage = 'home';

function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');
    lastPage = page;
    document.querySelector('.nav-bar').style.display = (page === 'home' || page === 'settings') ? 'none' : 'flex';
}

// Retour à la dernière page
function navigateBack() {
    navigate(lastPage);
}

// Liste des chapitres
function initChapters() {
    const chapterList = document.querySelector('.chapter-list');
    chapterList.innerHTML = '';
    for (let i = 1; i <= 44; i++) {
        const div = document.createElement('div');
        div.textContent = `Chapitre ${i}`;
        div.onclick = () => {
            currentChapter = i;
            loadChapter(i);
            navigate('reading');
        };
        chapterList.appendChild(div);
    }
}

// Gestion du contenu du chapitre
let currentChapter = 1;
function loadChapter(chapter) {
    const content = bookContent[chapter - 1][document.getElementById('language').value];
    document.getElementById('chapter-content').innerHTML = `<h2>Chapitre ${chapter}</h2><p>${content}</p>`;
}

// Mode sombre/clair
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-toggle').innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

document.getElementById('settings-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('settings-theme').innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Zoom
let fontSize = 16;
document.getElementById('zoom-in').addEventListener('click', () => {
    fontSize += 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('zoom-out').addEventListener('click', () => {
    if (fontSize > 12) fontSize -= 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('settings-zoom-in').addEventListener('click', () => {
    fontSize += 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('settings-zoom-out').addEventListener('click', () => {
    if (fontSize > 12) fontSize -= 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

// Changement de langue
document.getElementById('language').addEventListener('change', () => loadChapter(currentChapter));
document.getElementById('settings-language').addEventListener('change', () => {
    document.getElementById('language').value = document.getElementById('settings-language').value;
    loadChapter(currentChapter);
});

// Lecture à voix haute
let voices = [];
let utterance = null;
function populateVoices() {
    voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = '';
    voices.slice(0, 4).forEach((voice, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = populateVoices;

document.getElementById('read-aloud').addEventListener('click', () => {
    if (utterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.getElementById('read-aloud').innerHTML = '<i class="fas fa-volume-up"></i>';
        return;
    }
    const text = document.getElementById('chapter-content').textContent;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[document.getElementById('voice-select').value];
    utterance.lang = document.getElementById('language').value;
    speechSynthesis.speak(utterance);
    document.getElementById('read-aloud').innerHTML = '<i class="fas fa-stop"></i>';
});

// Auto-scroll
let scrolling = false;
document.getElementById('auto-scroll').addEventListener('click', () => {
    scrolling = !scrolling;
    document.getElementById('auto-scroll').innerHTML = scrolling ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-scroll"></i>';
    if (scrolling) {
        const content = document.getElementById('chapter-content');
        let scrollSpeed = 1;
        const scroll = () => {
            if (scrolling) {
                content.scrollTop += scrollSpeed;
                if (content.scrollTop >= content.scrollHeight - content.clientHeight) {
                    scrolling = false;
                    document.getElementById('auto-scroll').innerHTML = '<i class="fas fa-scroll"></i>';
                }
                requestAnimationFrame(scroll);
            }
        };
        scroll();
    }
});

// Favoris
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
function updateFavorites() {
    const favoriteList = document.querySelector('.favorite-list');
    favoriteList.innerHTML = '';
    favorites.forEach(chapter => {
        const div = document.createElement('div');
        div.textContent = `Chapitre ${chapter}`;
        div.onclick = () => {
            currentChapter = chapter;
            loadChapter(chapter);
            navigate('reading');
        };
        favoriteList.appendChild(div);
    });
}

document.getElementById('favorite').addEventListener('click', () => {
    if (!favorites.includes(currentChapter)) {
        favorites.push(currentChapter);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavorites();
    }
});

// Connexion/Inscription
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        document.getElementById('user-name').textContent = username;
        alert('Connexion réussie !');
    }
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        document.getElementById('user-name').textContent = username;
        alert('Inscription réussie !');
    }
}

// Sécurité
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'p' || e.key === 'c' || e.key === 's')) {
        e.preventDefault();
    }
});

// Initialisation
updateFavorites();
populateVoices();
