document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation de l’application...');

    // Vérifications des dépendances
    if (!window.firebase) {
        console.error('Erreur : Firebase SDK non chargé. Vérifiez firebase.js.');
        return;
    }
    if (!window.chapters) {
        console.error('Erreur : book-content.js non chargé ou incorrect. Vérifiez le fichier.');
        return;
    }

    // Protection contre le copier-coller
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && (e.key === 'p' || e.key === 's')) e.preventDefault();
    });

    // Variables globales
    let currentLanguage = localStorage.getItem('language') || 'fr';
    let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;
    let volume = parseInt(localStorage.getItem('volume')) || 100;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    let chatHistory = [];
    let currentSpeech = null;
    const sections = ['preamble', 'foreword'].concat(chapters.map(c => `chapter${c.chapter}`));

    // Générer les sections des chapitres dynamiquement
    const main = document.querySelector('main');
    console.log('Génération des sections des chapitres...');
    chapters.forEach(chapter => {
        const section = document.createElement('section');
        section.id = `chapter${chapter.chapter}`;
        section.className = 'chapter';
        section.innerHTML = `
            <button class="close-btn" title="Retour">✖</button>
            <div class="chapter-header">
                <h2>Chapitre ${chapter.chapter}</h2>
                <span class="favorite" data-chapter="chapter${chapter.chapter}" title="Favoris">⭐</span>
            </div>
            <div class="content" data-lang="fr"></div>
            <div class="content" data-lang="en" style="display: none;"></div>
            <div class="content" data-lang="ar" style="display: none;"></div>
            <div class="chapter-nav">
                <button class="prev-btn">← Précédent</button>
                <button class="next-btn">Suivant →</button>
            </div>
        `;
        main.appendChild(section);
    });

    // Générer le sommaire
    const chapterList = document.getElementById('chapter-list');
    if (!chapterList) {
        console.error('Erreur : #chapter-list non trouvé dans le DOM.');
        return;
    }
    console.log('Génération du sommaire...');
    chapterList.innerHTML = '';
    ['preamble', 'foreword'].forEach(id => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${id}">${id === 'preamble' ? 'Préambule' : 'Avant-propos'}</a>`;
        chapterList.appendChild(li);
    });
    chapters.forEach(chapter => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#chapter${chapter.chapter}">Chapitre ${chapter.chapter}</a>`;
        chapterList.appendChild(li);
    });

    // Charger le contenu
    function loadBookContent() {
        console.log('Chargement du contenu...');
        const preamble = document.getElementById('preamble');
        const foreword = document.getElementById('foreword');
        if (preamble) {
            preamble.querySelector('.content[data-lang="fr"]').innerHTML = `
                <p>Ce livre est une quête vers la lumière intérieure. Chaque page vous invite à réfléchir, à ressentir, à grandir.</p>
                <p>Ahmed Said Aidara vous guide avec des mots simples mais profonds, éclairant le chemin du salut.</p>
            `;
            preamble.querySelector('.content[data-lang="en"]').innerHTML = `
                <p>This book is a quest for inner light. Each page invites you to reflect, feel, and grow.</p>
                <p>Ahmed Said Aidara guides you with simple yet profound words, illuminating the path to salvation.</p>
            `;
            preamble.querySelector('.content[data-lang="ar"]').innerHTML = `
                <p>هذا الكتاب هو رحلة نحو النور الداخلي. كل صفحة تدعوك للتفكير، الشعور، والنمو.</p>
                <p>أحمد سعيد أيدارا يرشدك بكلمات بسيطة ولكنها عميقة، مضيئًا طريق الخلاص.</p>
            `;
        } else {
            console.error('Section preamble non trouvée.');
        }
        if (foreword) {
            foreword.querySelector('.content[data-lang="fr"]').innerHTML = `
                <p>Avant de commencer, ouvrez votre cœur. Ce voyage est personnel, mais universel.</p>
                <p>Chaque chapitre est une étape vers la paix intérieure et la compréhension divine.</p>
            `;
            foreword.querySelector('.content[data-lang="en"]').innerHTML = `
                <p>Before you begin, open your heart. This journey is personal, yet universal.</p>
                <p>Each chapter is a step toward inner peace and divine understanding.</p>
            `;
            foreword.querySelector('.content[data-lang="ar"]').innerHTML = `
                <p>قبل أن تبدأ، افتح قلبك. هذه الرحلة شخصية، لكنها عالمية.</p>
                <p>كل فصل خطوة نحو السلام الداخلي والفهم الإلهي.</p>
            `;
        } else {
            console.error('Section foreword non trouvée.');
        }
        chapters.forEach(chapter => {
            const section = document.getElementById(`chapter${chapter.chapter}`);
            if (!section) {
                console.error(`Section chapter${chapter.chapter} non trouvée.`);
                return;
            }
            section.querySelector('.content[data-lang="fr"]').innerHTML = `<p>${chapter.fr}</p>`;
            section.querySelector('.content[data-lang="en"]').innerHTML = `<p>${chapter.en}</p>`;
            section.querySelector('.content[data-lang="ar"]').innerHTML = `<p>${chapter.ar}</p>`;
            section.querySelector('h2').textContent = `Chapitre ${chapter.chapter}`;
        });
    }

    try {
        loadBookContent();
    } catch (error) {
        console.error('Erreur lors du chargement du contenu :', error);
    }

    // Authentification Firebase
    const userInfo = document.getElementById('user-info');
    const authForms = document.getElementById('auth-forms');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userStatus = document.getElementById('user-status');
    const authError = document.getElementById('auth-error');

    if (!userInfo || !authForms || !userName || !userEmail || !userStatus || !authError) {
        console.error('Erreur : Éléments du profil non trouvés dans le DOM.');
        return;
    }

    firebase.auth().onAuthStateChanged(async user => {
        console.log('État utilisateur :', user ? user.email : 'non connecté');
        if (user) {
            userInfo.style.display = 'block';
            authForms.style.display = 'none';
            userName.textContent = user.displayName || 'Utilisateur';
            userEmail.textContent = user.email;
            userStatus.textContent = '🔵';
            try {
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const data = userDoc.data();
                    currentLanguage = data.language || 'fr';
                    fontSize = data.fontSize || 16;
                    volume = data.volume || 100;
                    favorites = data.favorites || [];
                    progress = data.progress || {};
                    chatHistory = data.chatHistory || [];
                    document.body.classList.toggle('dark', data.theme === 'dark');
                    updateLanguage();
                    updateFontSize();
                    updateFavoritesList();
                    updateChatHistory();
                    document.getElementById('profile-language').value = currentLanguage;
                    document.getElementById('profile-font-size').value = fontSize;
                    document.getElementById('font-size-value').textContent = `${fontSize}px`;
                    document.getElementById('profile-volume').value = volume;
                    document.getElementById('volume-value').textContent = `${volume}%`;
                    document.getElementById('theme-toggle').querySelector('.icon').textContent = data.theme === 'dark' ? '☀️' : '🌙';
                    document.getElementById('profile-theme').checked = data.theme === 'dark';
                }
            } catch (error) {
                console.error('Erreur Firestore :', error);
            }
        } else {
            userInfo.style.display = 'none';
            authForms.style.display = 'block';
            userStatus.textContent = '';
            currentLanguage = localStorage.getItem('language') || 'fr';
            fontSize = parseInt(localStorage.getItem('fontSize')) || 16;
            volume = parseInt(localStorage.getItem('volume')) || 100;
            favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            progress = JSON.parse(localStorage.getItem('progress')) || {};
            chatHistory = [];
            updateLanguage();
            updateFontSize();
            updateFavoritesList();
            updateChatHistory();
        }
        updateChatButtonVisibility();
    });

    // Inscription
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async e => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            console.log('Inscription :', email);
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                await userCredential.user.updateProfile({ displayName: name });
                await db.collection('users').doc(userCredential.user.uid).set({
                    language: currentLanguage,
                    theme: document.body.classList.contains('dark') ? 'dark' : 'light',
                    fontSize,
                    volume,
                    favorites,
                    progress,
                    chatHistory: []
                });
                authError.textContent = '';
                signupForm.reset();
            } catch (error) {
                authError.textContent = error.message;
            }
        });
    }

    // Connexion
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async e => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            console.log('Connexion :', email);
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                authError.textContent = '';
                loginForm.reset();
            } catch (error) {
                authError.textContent = error.message;
            }
        });
    }

    // Déconnexion
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            console.log('Déconnexion');
            try {
                await firebase.auth().signOut();
                authError.textContent = '';
            } catch (error) {
                authError.textContent = error.message;
            }
        });
    }

    // Réinitialisation mot de passe
    const resetPassword = document.getElementById('reset-password');
    if (resetPassword) {
        resetPassword.addEventListener('click', async e => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            console.log('Réinitialisation :', email);
            if (!email) {
                authError.textContent = 'Entrez votre e-mail.';
                return;
            }
            try {
                await firebase.auth().sendPasswordResetEmail(email);
                authError.textContent = 'E-mail envoyé !';
            } catch (error) {
                authError.textContent = error.message;
            }
        });
    }

    // Mode sombre
    const themeToggle = document.getElementById('theme-toggle');
    const profileTheme = document.getElementById('profile-theme');
    async function toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
        profileTheme.checked = isDark;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (firebase.auth().currentUser) {
            try {
                await db.collection('users').doc(firebase.auth().currentUser.uid).update({ theme: isDark ? 'dark' : 'light' });
            } catch (error) {
                console.error('Erreur thème :', error);
            }
        }
    }
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (profileTheme) profileTheme.addEventListener('change', toggleTheme);
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.querySelector('.icon').textContent = '☀️';
        profileTheme.checked = true;
    }

    // Taille police
    const profileFontSize = document.getElementById('profile-font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    if (profileFontSize && fontSizeValue) {
        profileFontSize.addEventListener('input', async () => {
            fontSize = parseInt(profileFontSize.value);
            fontSizeValue.textContent = `${fontSize}px`;
            updateFontSize();
            localStorage.setItem('fontSize', fontSize);
            if (firebase.auth().currentUser) {
                try {
                    await db.collection('users').doc(firebase.auth().currentUser.uid).update({ fontSize });
                } catch (error) {
                    console.error('Erreur police :', error);
                }
            }
        });
    }
    function updateFontSize() {
        document.querySelectorAll('section, section *').forEach(el => el.style.fontSize = `${fontSize}px`);
        document.querySelectorAll('.prev-btn, .next-btn, .close-btn, .favorite, .chat-message').forEach(el => el.style.fontSize = `${fontSize * 0.9}px`);
    }
    if (profileFontSize) {
        profileFontSize.value = fontSize;
        fontSizeValue.textContent = `${fontSize}px`;
        updateFontSize();
    }

    // Volume lecture vocale
    const profileVolume = document.getElementById('profile-volume');
    const volumeValue = document.getElementById('volume-value');
    if (profileVolume && volumeValue) {
        profileVolume.addEventListener('input', async () => {
            volume = parseInt(profileVolume.value);
            volumeValue.textContent = `${volume}%`;
            localStorage.setItem('volume', volume);
            if (currentSpeech) currentSpeech.volume = volume / 100;
            if (firebase.auth().currentUser) {
                try {
                    await db.collection('users').doc(firebase.auth().currentUser.uid).update({ volume });
                } catch (error) {
                    console.error('Erreur volume :', error);
                }
            }
        });
        profileVolume.value = volume;
        volumeValue.textContent = `${volume}%`;
    }

    // Langue
    const languageToggle = document.getElementById('language-toggle');
    const profileLanguage = document.getElementById('profile-language');
    async function updateLanguage() {
        console.log(`Langue : ${currentLanguage}`);
        document.querySelectorAll('.content').forEach(content => {
            content.style.display = content.dataset.lang === currentLanguage ? 'block' : 'none';
        });
        document.querySelectorAll('#chapter-list a').forEach(link => {
            const id = link.getAttribute('href').substring(1);
            if (id === 'preamble') link.textContent = currentLanguage === 'fr' ? 'Préambule' : currentLanguage === 'en' ? 'Preamble' : 'المقدمة';
            else if (id === 'foreword') link.textContent = currentLanguage === 'fr' ? 'Avant-propos' : currentLanguage === 'en' ? 'Foreword' : 'التمهيد';
            else link.textContent = currentLanguage === 'fr' ? `Chapitre ${id.replace('chapter', '')}` :
                                  currentLanguage === 'en' ? `Chapter ${id.replace('chapter', '')}` :
                                  `الفصل ${id.replace('chapter', '')}`;
        });
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && id !== 'preamble' && id !== 'foreword') {
                const header = section.querySelector('h2');
                const num = id.replace('chapter', '');
                header.textContent = currentLanguage === 'fr' ? `Chapitre ${num}` :
                                    currentLanguage === 'en' ? `Chapter ${num}` :
                                    `الفصل ${num}`;
            }
        });
        localStorage.setItem('language', currentLanguage);
        profileLanguage.value = currentLanguage;
        if (firebase.auth().currentUser) {
            try {
                await db.collection('users').doc(firebase.auth().currentUser.uid).update({ language: currentLanguage });
            } catch (error) {
                console.error('Erreur langue :', error);
            }
        }
        updateChatButtonVisibility();
    }
    if (languageToggle) {
        languageToggle.addEventListener('click', async () => {
            currentLanguage = currentLanguage === 'fr' ? 'en' : currentLanguage === 'en' ? 'ar' : 'fr';
            await updateLanguage();
        });
    }
    if (profileLanguage) {
        profileLanguage.addEventListener('change', async () => {
            currentLanguage = profileLanguage.value;
            await updateLanguage();
        });
    }
    updateLanguage();

    // Navigation
    const sectionsElements = document.querySelectorAll('section');
    const homeBtn = document.getElementById('home-btn');
    const menuBtn = document.getElementById('menu-btn');
    const startBtn = document.getElementById('start-btn');
    const profileBtn = document.getElementById('profile-btn');
    if (homeBtn) homeBtn.addEventListener('click', goToHome);
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sectionsElements.forEach(s => s.classList.remove('active'));
            document.getElementById('table-of-contents').classList.add('active');
            updateChatButtonVisibility();
        });
    }
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            sectionsElements.forEach(s => s.classList.remove('active'));
            document.getElementById('table-of-contents').classList.add('active');
            updateChatButtonVisibility();
        });
    }
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            sectionsElements.forEach(s => s.classList.remove('active'));
            document.getElementById('profile').classList.add('active');
            updateChatButtonVisibility();
        });
    }
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', goToHome);
    });
    function goToHome() {
        sectionsElements.forEach(s => s.classList.remove('active'));
        document.getElementById('home').classList.add('active');
        updateChatButtonVisibility();
        if (currentSpeech) {
            speechSynthesis.cancel();
            currentSpeech = null;
            document.getElementById('voice-toggle').querySelector('.icon').textContent = '🔊';
        }
    }
    document.querySelectorAll('#chapter-list a, #favorites-list a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sectionsElements.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.add('active');
            } else {
                console.error(`Section ${targetId} non trouvée.`);
            }
            updateChatButtonVisibility();
        });
    });

    // Navigation chapitres
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentId = btn.closest('section').id;
            const index = sections.indexOf(currentId);
            if (index > 0) {
                sectionsElements.forEach(s => s.classList.remove('active'));
                document.getElementById(sections[index - 1]).classList.add('active');
                updateChatButtonVisibility();
            }
        });
    });
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentId = btn.closest('section').id;
            const index = sections.indexOf(currentId);
            if (index < sections.length - 1) {
                sectionsElements.forEach(s => s.classList.remove('active'));
                document.getElementById(sections[index + 1]).classList.add('active');
                updateChatButtonVisibility();
            }
        });
    });

    // Favoris et progression
    async function updateFavoritesList() {
        const favoritesList = document.getElementById('favorites-list');
        if (!favoritesList) return;
        favoritesList.innerHTML = '';
        favorites.forEach(id => {
            const title = id === 'preamble' ? (currentLanguage === 'fr' ? 'Préambule' : currentLanguage === 'en' ? 'Preamble' : 'المقدمة') :
                         id === 'foreword' ? (currentLanguage === 'fr' ? 'Avant-propos' : currentLanguage === 'en' ? 'Foreword' : 'التمهيد') :
                         currentLanguage === 'fr' ? `Chapitre ${id.replace('chapter', '')}` :
                         currentLanguage === 'en' ? `Chapter ${id.replace('chapter', '')}` :
                         `الفصل ${id.replace('chapter', '')}`;
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${id}">${title}</a><div class="progress-bar"><div class="progress" style="width: ${progress[id] || 0}%"></div></div>`;
            favoritesList.appendChild(li);
        });
        document.querySelectorAll('#favorites-list a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                sectionsElements.forEach(s => s.classList.remove('active'));
                document.getElementById(targetId).classList.add('active');
                updateChatButtonVisibility();
            });
        });
        if (firebase.auth().currentUser) {
            try {
                await db.collection('users').doc(firebase.auth().currentUser.uid).update({ favorites });
            } catch (error) {
                console.error('Erreur favoris :', error);
            }
        }
    }
    document.querySelectorAll('.favorite').forEach(star => {
        const id = star.dataset.chapter;
        if (favorites.includes(id)) {
            star.classList.add('active');
            star.textContent = '★';
        }
        star.addEventListener('click', async () => {
            if (!favorites.includes(id)) {
                favorites.push(id);
                star.classList.add('active');
                star.textContent = '★';
            } else {
                favorites = favorites.filter(f => f !== id);
                star.classList.remove('active');
                star.textContent = '⭐';
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            await updateFavoritesList();
        });
    });
    const favoritesBtn = document.getElementById('favorites-btn');
    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', () => {
            sectionsElements.forEach(s => s.classList.remove('active'));
            document.getElementById('favorites').classList.add('active');
            updateChatButtonVisibility();
        });
    }
    async function trackProgress() {
        const activeSection = document.querySelector('section.active');
        if (!activeSection?.classList.contains('chapter') || ['favorites', 'table-of-contents', 'profile'].includes(activeSection.id)) return;
        const id = activeSection.id;
        const content = activeSection.querySelector(`.content[data-lang="${currentLanguage}"]`);
        if (!content) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const contentHeight = content.scrollHeight - window.innerHeight;
        const percent = contentHeight > 0 ? Math.min(100, (scrollTop / contentHeight) * 100) : 100;
        progress[id] = Math.max(progress[id] || 0, percent);
        localStorage.setItem('progress', JSON.stringify(progress));
        await updateFavoritesList();
        if (firebase.auth().currentUser) {
            try {
                await db.collection('users').doc(firebase.auth().currentUser.uid).update({ progress });
            } catch (error) {
                console.error('Erreur progression :', error);
            }
        }
    }
    window.addEventListener('scroll', trackProgress);
    updateFavoritesList();

    // Lecture vocale
    const voiceToggle = document.getElementById('voice-toggle');
    const voiceSelect = document.getElementById('voice-select');
    let voices = [];
    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = '<option value="">Voix par défaut</option>';
        voices.forEach((voice, i) => {
            if (voice.lang.startsWith('fr') || voice.lang.startsWith('en') || voice.lang.startsWith('ar')) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            }
        });
    }
    speechSynthesis.onvoiceschanged = populateVoiceList;
    populateVoiceList();
    if (voiceToggle) {
        voiceToggle.addEventListener('click', () => {
            const activeSection = document.querySelector('section.active');
            if (!activeSection?.classList.contains('chapter')) return;
            if (currentSpeech) {
                speechSynthesis.cancel();
                currentSpeech = null;
                voiceToggle.querySelector('.icon').textContent = '🔊';
                return;
            }
            const id = activeSection.id;
            let text = '';
            if (id === 'preamble') {
                text = activeSection.querySelector(`.content[data-lang="${currentLanguage}"]`).textContent;
            } else if (id === 'foreword') {
                text = activeSection.querySelector(`.content[data-lang="${currentLanguage}"]`).textContent;
            } else {
                const chapterNum = parseInt(id.replace('chapter', ''));
                const chapter = chapters.find(c => c.chapter === chapterNum);
                text = chapter ? chapter[currentLanguage] : '';
            }
            if (!text) {
                console.error(`Aucun texte pour ${id}.`);
                return;
            }
            currentSpeech = new SpeechSynthesisUtterance(text);
            currentSpeech.lang = currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'en' ? 'en-US' : 'ar-SA';
            currentSpeech.volume = volume / 100;
            if (voiceSelect.value) currentSpeech.voice = voices[voiceSelect.value];
            currentSpeech.onend = () => {
                currentSpeech = null;
                voiceToggle.querySelector('.icon').textContent = '🔊';
            };
            speechSynthesis.speak(currentSpeech);
            voiceToggle.querySelector('.icon').textContent = '⏹️';
        });
    }
    if (voiceSelect) {
        voiceSelect.addEventListener('change', () => {
            if (currentSpeech) {
                speechSynthesis.cancel();
                voiceToggle.click();
            }
        });
    }

    // Chat Gemini
    const chatModal = document.getElementById('chat-modal');
    const chatHistoryDiv = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatClearBtn = document.getElementById('chat-clear-btn');
    const chatBtn = document.getElementById('chat-btn');
    const chatCloseBtn = document.querySelector('.chat-close-btn');

    function updateChatButtonVisibility() {
        const activeSection = document.querySelector('section.active');
        if (chatBtn) {
            chatBtn.style.display = activeSection?.classList.contains('chapter') && !['favorites', 'table-of-contents', 'profile'].includes(activeSection.id) ? 'block' : 'none';
            if (chatBtn.style.display === 'none') chatModal.style.display = 'none';
        }
    }
    if (chatBtn) chatBtn.addEventListener('click', () => chatModal.style.display = 'flex');
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => chatModal.style.display = 'none');
    function updateChatHistory() {
        if (!chatHistoryDiv) return;
        chatHistoryDiv.innerHTML = '';
        chatHistory.forEach(msg => {
            const div = document.createElement('div');
            div.className = `chat-message ${msg.role}`;
            div.textContent = msg.content;
            chatHistoryDiv.appendChild(div);
        });
        chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
    }
    async function saveChatHistory() {
        if (firebase.auth().currentUser) {
            try {
                await db.collection('users').doc(firebase.auth().currentUser.uid).update({ chatHistory });
            } catch (error) {
                console.error('Erreur sauvegarde chat :', error);
            }
        }
    }
    function getBookContext() {
        let context = '';
        context += `Préambule:\n${document.getElementById('preamble')?.querySelector('.content[data-lang="fr"]').textContent}\n\n`;
        context += `Avant-propos:\n${document.getElementById('foreword')?.querySelector('.content[data-lang="fr"]').textContent}\n\n`;
        chapters.forEach(chapter => {
            context += `Chapitre ${chapter.chapter}:\n${chapter.fr}\n\n`;
        });
        return context;
    }
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', async () => {
            const message = chatInput.value.trim();
            if (!message) return;
            chatHistory.push({ role: 'user', content: message });
            updateChatHistory();
            chatInput.value = '';
            const bookContext = getBookContext();
            const prompt = `
                Tu es un assistant spécialisé dans *La Voie du Salut* d'Ahmed Said Aidara. Réponds uniquement aux questions liées au livre, en utilisant ce contexte :

                **Contexte** :
                ${bookContext}

                **Instructions** :
                - Réponds seulement si la question concerne le livre.
                - Si hors sujet, réponds exactement : "Désolé, mon créateur 'Ahmed Said Aidara' m'autorise à répondre uniquement aux questions liées à son livre 'La Voie du Salut'."
                - Langue : ${currentLanguage === 'fr' ? 'français' : currentLanguage === 'en' ? 'anglais' : 'arabe'}.
                - Question : ${message}
            `;
            try {
                const response = await fetch('https://api.gemini.com/v1/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer VOTRE_CLE_API_GEMINI',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gemini-pro',
                        prompt,
                        max_tokens: 500,
                        temperature: 0.7
                    })
                });
                const data = await response.json();
                let reply = data.choices[0].text.trim();
                if (!reply.includes('Désolé') && !bookContext.toLowerCase().includes(message.toLowerCase())) {
                    reply = currentLanguage === 'fr' ? "Désolé, mon créateur 'Ahmed Said Aidara' m'autorise à répondre uniquement aux questions liées à son livre 'La Voie du Salut'." :
                            currentLanguage === 'en' ? "Sorry, my creator 'Ahmed Said Aidara' authorizes me to respond only to questions related to his book 'The Path to Salvation'." :
                            "عذرًا، خالقي 'أحمد سعيد أيدارا' يسمح لي بالرد فقط على الأسئلة المتعلقة بكتابه 'طريق الخلاص'.";
                }
                chatHistory.push({ role: 'assistant', content: reply });
                updateChatHistory();
                await saveChatHistory();
            } catch (error) {
                console.error('Erreur Gemini :', error);
                const errorMsg = currentLanguage === 'fr' ? 'Erreur de communication.' :
                                currentLanguage === 'en' ? 'Communication error.' :
                                'خطأ في التواصل.';
                chatHistory.push({ role: 'assistant', content: errorMsg });
                updateChatHistory();
            }
        });
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') chatSendBtn.click();
        });
    }
    if (chatClearBtn) {
        chatClearBtn.addEventListener('click', async () => {
            chatHistory = [];
            updateChatHistory();
            await saveChatHistory();
        });
    }

    // Initialisation
    updateChatButtonVisibility();
    updateChatHistory();
    console.log('Application initialisée.');
});
