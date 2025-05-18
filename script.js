// Initialisation
let userId = null;
const chapters = {
    fr: {
        1: {
            title: "Chapitre 1 : L’Aube Nouvelle",
            content: `
                <div class="chapter" data-chapter="1">Chapitre 1 : L’Aube Nouvelle</div>
                <p>Dans un village niché au creux des montagnes, l’aube se levait avec une promesse de renouveau. Les rayons du soleil caressaient les toits de chaume, éveillant les âmes endormies. Clara, une jeune femme au regard perçant, contemplait l’horizon. Elle sentait que ce jour marquerait un tournant dans sa vie.</p>
                <p class="verse">« La vérité est une lumière qui guide ceux qui osent la chercher. »</p>
                <p>Clara avait grandi avec les récits anciens, des histoires de sagesse transmises par ses aînés. Mais une question la hantait : quelle était la source de cette vérité dont tout le monde parlait ? Elle décida de quitter le village, emportant avec elle un vieux carnet et une foi inébranlable. Son voyage commença par un sentier escarpé, où chaque pas renforçait sa détermination.</p>
            `
        },
        2: {
            title: "Chapitre 2 : Les Ombres du Passé",
            content: `
                <div class="chapter" data-chapter="2">Chapitre 2 : Les Ombres du Passé</div>
                <p>Le chemin de Clara la mena à une forêt dense, où les arbres murmuraient des secrets oubliés. Chaque pas semblait réveiller des échos du passé. Elle découvrit une pierre gravée, usée par le temps, portant une inscription : « Connais-toi, et tu connaîtras l’univers. »</p>
                <p class="verse">« Les ombres ne sont que des reflets de la lumière ignorée. »</p>
                <p>Intriguée, Clara s’assit et ouvrit son carnet. Elle y consigna ses pensées, mêlant les mots de la pierre à ses propres réflexions. La nuit tomba, et une étrange sensation de présence l’envahit. Était-elle seule ? Une ombre passa, rapide, mais elle choisit de ne pas fuir. Son courage grandissait.</p>
            `
        },
        3: {
            title: "Chapitre 3 : La Quête de Clara",
            content: `
                <div class="chapter" data-chapter="3">Chapitre 3 : La Quête de Clara</div>
                <p>Les jours suivants, Clara rencontra un vieil ermite, un homme dont les yeux semblaient porter le poids des siècles. Il lui parla d’un livre ancien, *La Voie du Salut*, censé contenir les réponses à toutes les questions de l’âme. Mais ce livre, dit-il, ne se révélait qu’à ceux qui étaient prêts à affronter leurs propres peurs.</p>
                <p class="verse">« Le courage naît là où la peur s’efface. »</p>
                <p>Clara accepta le défi. L’ermite lui indiqua une grotte sacrée, un lieu où elle devrait méditer et écouter la voix intérieure. Avec détermination, elle s’y rendit, prête à découvrir ce que le destin lui réservait. Chaque pas vers la grotte était un pas vers l’inconnu.</p>
            `
        },
        4: {
            title: "Chapitre 4 : Révélations",
            content: `
                <div class="chapter" data-chapter="4">Chapitre 4 : Révélations</div>
                <p>Dans la grotte, Clara passa des heures en silence, affrontant des visions de son passé et de ses doutes. Puis, une lumière douce envahit l’espace, et elle sentit une paix profonde. Des mots s’inscrivirent dans son esprit : « La vérité est en toi, elle l’a toujours été. »</p>
                <p class="verse">« Cherche au-dedans, et tu trouveras l’éternel. »</p>
                <p>Clara comprit que le livre n’était pas un objet physique, mais une métaphore pour la connaissance intérieure. Elle écrivit frénétiquement dans son carnet, capturant chaque révélation. Cette expérience transforma sa vision du monde et d’elle-même.</p>
            `
        },
        5: {
            title: "Chapitre 5 : Vers la Lumière",
            content: `
                <div class="chapter" data-chapter="5">Chapitre 5 : Vers la Lumière</div>
                <p>De retour au village, Clara partagea ses découvertes. Ses paroles, simples mais puissantes, touchèrent les cœurs. Le village, autrefois divisé par les doutes, s’unit dans une quête commune de vérité. Clara devint un guide, non par autorité, mais par l’exemple.</p>
                <p class="verse">« La lumière que tu portes éclaire le chemin des autres. »</p>
                <p>Et ainsi, l’aube nouvelle ne fut pas seulement un lever de soleil, mais un éveil des âmes, guidées par la foi et la sagesse de Clara. Le village prospéra, et son histoire inspira d’autres à chercher leur propre vérité.</p>
            `
        }
    },
    en: {
        1: {
            title: "Chapter 1: The New Dawn",
            content: `
                <div class="chapter" data-chapter="1">Chapter 1: The New Dawn</div>
                <p>In a village nestled in the mountains, dawn rose with a promise of renewal. Sunrays caressed the thatched roofs, awakening sleeping souls. Clara, a young woman with piercing eyes, gazed at the horizon. She felt this day would mark a turning point in her life.</p>
                <p class="verse">"Truth is a light that guides those who dare to seek it."</p>
                <p>Clara grew up with ancient tales, stories of wisdom passed down by elders. But one question haunted her: what was the source of this truth everyone spoke of? She decided to leave the village, carrying an old notebook and unwavering faith. Her journey began on a steep path, each step strengthening her resolve.</p>
            `
        },
        2: {
            title: "Chapter 2: Shadows of the Past",
            content: `
                <div class="chapter" data-chapter="2">Chapter 2: Shadows of the Past</div>
                <p>Clara’s path led to a dense forest, where trees whispered forgotten secrets. Each step seemed to awaken echoes of the past. She found a weathered stone, inscribed with: “Know thyself, and thou shalt know the universe.”</p>
                <p class="verse">"Shadows are but reflections of ignored light."</p>
                <p>Intrigued, Clara sat and opened her notebook. She jotted down her thoughts, blending the stone’s words with her reflections. Night fell, and a strange sense of presence enveloped her. Was she alone? A shadow darted by, but she chose not to flee. Her courage grew.</p>
            `
        },
        3: {
            title: "Chapter 3: Clara’s Quest",
            content: `
                <div class="chapter" data-chapter="3">Chapter 3: Clara’s Quest</div>
                <p>In the following days, Clara met an old hermit, his eyes heavy with centuries. He spoke of an ancient book, *The Way of Salvation*, said to hold answers to all soul’s questions. But the book, he said, revealed itself only to those ready to face their fears.</p>
                <p class="verse">"Courage is born where fear fades."</p>
                <p>Clara accepted the challenge. The hermit directed her to a sacred cave, a place to meditate and listen to the inner voice. With determination, she went, ready to uncover what fate held. Each step toward the cave was a step into the unknown.</p>
            `
        },
        4: {
            title: "Chapter 4: Revelations",
            content: `
                <div class="chapter" data-chapter="4">Chapter 4: Revelations</div>
                <p>In the cave, Clara spent hours in silence, confronting visions of her past and doubts. Then, a soft light filled the space, and she felt profound peace. Words formed in her mind: “The truth is within you, it always has been.”</p>
                <p class="verse">"Seek within, and you will find the eternal."</p>
                <p>Clara realized the book was not physical but a metaphor for inner knowledge. She wrote frantically in her notebook, capturing each revelation. This experience transformed her view of the world and herself.</p>
            `
        },
        5: {
            title: "Chapter 5: Toward the Light",
            content: `
                <div class="chapter" data-chapter="5">Chapter 5: Toward the Light</div>
                <p>Back in the village, Clara shared her discoveries. Her simple yet powerful words touched hearts. The village, once divided by doubts, united in a common quest for truth. Clara became a guide, not by authority, but by example.</p>
                <p class="verse">"The light you carry illuminates others’ paths."</p>
                <p>Thus, the new dawn was not just a sunrise but an awakening of souls, guided by Clara’s faith and wisdom. The village thrived, and her story inspired others to seek their truth.</p>
            `
        }
    },
    ar: {
        1: {
            title: "الفصل الأول: الفجر الجديد",
            content: `
                <div class="chapter" data-chapter="1">الفصل الأول: الفجر الجديد</div>
                <p>في قرية تقع بين الجبال، طلع الفجر بوعد بالتجديد. أشعة الشمس لامست أسقف القش، مُوقظةً النفوس النائمة. كلارا، امرأة شابة ذات عينين ثاقبتين، تأملت الأفق. شعرت أن هذا اليوم سيُحدث نقطة تحول في حياتها.</p>
                <p class="verse">"الحقيقة نور يهدي من يجرؤ على البحث عنها."</p>
                <p>نشأت كلارا مع الحكايات القديمة، قصص الحكمة التي نقلها شيوخ القرية. لكن سؤالاً ظل يطاردها: ما هو مصدر هذه الحقيقة التي يتحدث عنها الجميع؟ قررت مغادرة القرية، حاملةً دفترًا قديمًا وإيمانًا لا يتزعزع. بدأت رحلتها على درب وعر، كل خطوة تعزز عزمها.</p>
            `
        },
        2: {
            title: "الفصل الثاني: ظلال الماضي",
            content: `
                <div class="chapter" data-chapter="2">الفصل الثاني: ظلال الماضي</div>
                <p>قاد درب كلارا إلى غابة كثيفة، حيث همست الأشجار بأسرار منسية. كل خطوة أيقظت أصداء الماضي. اكتشفت حجرًا منقوشًا، متآكلًا بالزمن، يحمل كتابة: "اعرف نفسك، ستعرف الكون."</p>
                <p class="verse">"الظلال ليست سوى انعكاسات للنور المهجور."</p>
                <p>فضولية، جلست كلارا وفتحت دفترها. دونت أفكارها، ممزوجة بكلمات الحجر وتأملاتها. حلّ الليل، وشعور غريب بالحضور غمرها. هل كانت وحدها؟ مر ظل بسرعة، لكنها اختارت ألا تهرب. نمت شجاعتها.</p>
            `
        },
        3: {
            title: "الفصل الثالث: بحث كلارا",
            content: `
                <div class="chapter" data-chapter="3">الفصل الثالث: بحث كلارا</div>
                <p>في الأيام التالية، التقت كلارا بناسك عجوز، عيناه تحملان ثقل القرون. تحدث عن كتاب قديم، *طريق الخلاص*، يُقال إنه يحوي إجابات لجميع أسئلة الروح. لكن الكتاب، قال، لا يظهر إلا لمن هم مستعدون لمواجهة مخاوفهم.</p>
                <p class="verse">"الشجاعة تولد حيث يتلاشى الخوف."</p>
                <p>قبلت كلارا التحدي. أرشدها الناسك إلى كهف مقدس، مكان للتأمل والإصغاء للصوت الداخلي. بتصميم، ذهبت، مستعدة لاكتشاف ما يخبئه القدر. كل خطوة نحو الكهف كانت خطوة إلى المجهول.</p>
            `
        },
        4: {
            title: "الفصل الرابع: الوحي",
            content: `
                <div class="chapter" data-chapter="4">الفصل الرابع: الوحي</div>
                <p>في الكهف، قضت كلارا ساعات في صمت، تواجه رؤى من ماضيها وشكوكها. ثم، ملأ نور خافت المكان، وشعرت بسلام عميق. تشكلت كلمات في ذهنها: "الحقيقة في داخلك، كانت دائمًا كذلك."</p>
                <p class="verse">"ابحث في الداخل، ستجد الأبدي."</p>
                <p>أدركت كلارا أن الكتاب ليس شيئًا ماديًا، بل استعارة للمعرفة الداخلية. كتبت بحماس في دفترها، مسجلة كل وحي. غيّرت هذه التجربة رؤيتها للعالم ولنفسها.</p>
            `
        },
        5: {
            title: "الفصل الخامس: نحو النور",
            content: `
                <div class="chapter" data-chapter="5">الفصل الخامس: نحو النور</div>
                <p>عادت كلارا إلى القرية وشاركت اكتشافاتها. كلماتها، بسيطة لكنها قوية، لامست القلوب. القرية، التي كانت مقسمة بالشكوك، اتحدت في بحث مشترك عن الحقيقة. أصبحت كلارا مرشدة، ليس بالسلطة، بل بالقدوة.</p>
                <p class="verse">"النور الذي تحمله يضيء دروب الآخرين."</p>
                <p>وهكذا، لم يكن الفجر الجديد مجرد شروق شمس، بل إيقاظ للنفوس، بقيادة إيمان وحكمة كلارا. ازدهرت القرية، وقصتها ألهمت آخرين للبحث عن حقيقتهم.</p>
            `
        }
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
                if (window.location.pathname.includes('sommaire.html')) loadProgress();
                if (window.location.pathname.includes('favoris.html')) loadFavorites();
                if (window.location.pathname.includes('lecture.html')) {
                    const chapterNum = new URLSearchParams(window.location.search).get('chapter') || '1';
                    loadChapter(chapterNum);
                }
            } else {
                console.log('Utilisateur non connecté, redirection vers paramètres');
                localStorage.setItem('lastPage', window.location.pathname.split('/').pop());
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
    console.log('Page chargée:', page);

    // Animations accueil
    if (page === 'index.html') {
        const animatedElements = document.querySelectorAll('.title, .details-row, .section-label, .description');
        animatedElements.forEach(el => el.style.setProperty('--start-y', '60px'));
        const startButton = document.getElementById('startButton');
        if (startButton) {
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
                console.log(`Clic sur chapitre ${chapter}, redirection vers lecture.html`);
                localStorage.setItem('lastPage', 'sommaire.html');
                window.location.href = `lecture.html?chapter=${chapter}`;
            });
        });
    }

    // Lecture
    if (page === 'lecture.html') {
        setupReadingFeatures();
    }

    // Favoris
    if (page === 'favoris.html') {
        const favoritesList = document.getElementById('favoritesList');
        if (favoritesList) {
            favoritesList.addEventListener('click', e => {
                const card = e.target.closest('.chapter-card');
                if (card) {
                    const chapter = card.dataset.chapter;
                    console.log(`Clic sur favori chapitre ${chapter}, redirection vers lecture.html`);
                    localStorage.setItem('lastPage', 'favoris.html');
                    window.location.href = `lecture.html?chapter=${chapter}`;
                }
            });
        }
    }

    // Barre inférieure
    const navIcons = document.querySelectorAll('.bottom-bar .icon');
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetPage = icon.dataset.page;
            console.log(`Clic sur icône, redirection vers ${targetPage}`);
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
                document.getElementById('languageSelect').addEventListener('change', () => {
                    const newLang = document.getElementById('languageSelect').value;
                    firebase.firestore().collection('users').doc(userId).update({ language: newLang });
                    const chapterNum = new URLSearchParams(window.location.search).get('chapter') || '1';
                    loadChapter(chapterNum, newLang);
                });
            }
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
            ${chapterData.content}
        `;
        trackProgress(chapterNum);
        console.log(`Chapitre ${chapterNum} chargé en ${lang}`);
    }
}

// Suivi de la progression
function trackProgress(chapterNum) {
    const bookContent = document.getElementById('bookContent');
    if (!bookContent || !userId) return;
    bookContent.addEventListener('scroll', () => {
        const scrollTop = bookContent.scrollTop;
        const scrollHeight = bookContent.scrollHeight - bookContent.clientHeight;
        const progress = scrollHeight ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;
        firebase.firestore().collection('users').doc(userId).collection('progress').doc(`chapter${chapterNum}`)
            .set({ progress }, { merge: true });
        console.log(`Progression chapitre ${chapterNum}: ${progress}%`);
    });
}

// Charger la progression
async function loadProgress() {
    if (!userId) return;
    try {
        const snapshot = await firebase.firestore().collection('users').doc(userId).collection('progress').get();
        snapshot.forEach(doc => {
            const chapterNum = doc.id.replace('chapter', '');
            const progress = doc.data().progress || 0;
            const card = document.querySelector(`.chapter-card[data-chapter="${chapterNum}"]`);
            if (card) {
                card.querySelector('.progress-fill').style.width = `${progress}%`;
            }
        });
        console.log('Progression chargée');
    } catch (error) {
        console.error('Erreur chargement progression:', error);
    }
}

// Charger les favoris
async function loadFavorites() {
    if (!userId) return;
    const favoritesList = document.getElementById('favoritesList');
    if (!favoritesList) return;
    try {
        const snapshot = await firebase.firestore().collection('users').doc(userId).collection('favorites').get();
        favoritesList.innerHTML = '';
        snapshot.forEach(doc => {
            const chapterNum = doc.id.replace('chapter', '');
            const card = document.createElement('div');
            card.className = 'chapter-card';
            card.dataset.chapter = chapterNum;
            card.innerHTML = `
                <h2>${chapters.fr[chapterNum].title}</h2>
                <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
            `;
            favoritesList.appendChild(card);
        });
        loadProgress();
        console.log('Favoris chargés');
    } catch (error) {
        console.error('Erreur chargement favoris:', error);
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

    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log('Clic sur Retour, redirection vers sommaire.html');
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
            console.log(`Thème changé: ${theme}`);
        });
    }

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            let fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
            fontSize = Math.min(fontSize + 2, 24);
            document.documentElement.style.fontSize = `${fontSize}px`;
            firebase.firestore().collection('users').doc(userId).update({ fontSize });
            console.log(`Zoom avant: ${fontSize}px`);
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            let fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
            fontSize = Math.max(fontSize - 2, 10);
            document.documentElement.style.fontSize = `${fontSize}px`;
            firebase.firestore().collection('users').doc(userId).update({ fontSize });
            console.log(`Zoom arrière: ${fontSize}px`);
        });
    }

    if (readAloud) {
        readAloud.addEventListener('click', () => {
            const text = document.getElementById('bookContent').innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            const voiceSelect = document.getElementById('voiceSelect')?.value || 'female';
            utterance.lang = document.getElementById('languageSelect').value;
            utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes(voiceSelect)) || null;
            speechSynthesis.speak(utterance);
            console.log('Lecture vocale démarrée');
        });
    }

    if (favorite) {
        favorite.addEventListener('click', () => {
            const chapterNum = new URLSearchParams(window.location.search).get('chapter') || '1';
            const isFavorited = favorite.classList.contains('favorited');
            if (isFavorited) {
                firebase.firestore().collection('users').doc(userId).collection('favorites').doc(`chapter${chapterNum}`).delete();
                favorite.classList.remove('favorited');
                favorite.innerHTML = 'star_border';
                console.log(`Chapitre ${chapterNum} retiré des favoris`);
            } else {
                firebase.firestore().collection('users').doc(userId).collection('favorites').doc(`chapter${chapterNum}`).set({});
                favorite.classList.add('favorited');
                favorite.innerHTML = 'star';
                console.log(`Chapitre ${chapterNum} ajouté aux favoris`);
            }
        });
        // Vérifier si favori
        firebase.firestore().collection('users').doc(userId).collection('favorites').doc(`chapter${new URLSearchParams(window.location.search).get('chapter') || '1'}`)
            .get().then(doc => {
                if (doc.exists) {
                    favorite.classList.add('favorited');
                    favorite.innerHTML = 'star';
                }
            });
    }
}

// Chat IA
function setupChatAI() {
    const aiBtn = document.getElementById('aiAssistantBtn');
    const aiChatContainer = document.getElementById('aiChatContainer');
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    const aiSendBtn = document.getElementById('aiSendBtn');
    const aiUserInput = document.getElementById('aiUserInput');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiTypingIndicator = document.getElementById('aiTypingIndicator');

    if (aiBtn) {
        aiBtn.addEventListener('click', () => {
            aiChatContainer.classList.toggle('active');
            console.log('Chat IA ouvert/fermé');
        });
    }

    if (aiCloseBtn) {
        aiCloseBtn.addEventListener('click', () => {
            aiChatContainer.classList.remove('active');
            console.log('Chat IA fermé');
        });
    }

    if (aiSendBtn && aiUserInput) {
        aiSendBtn.addEventListener('click', sendMessage);
        aiUserInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    async function sendMessage() {
        const message = aiUserInput.value.trim();
        if (!message) return;
        aiChatMessages.innerHTML += `<div class="message user-message">${message}</div>`;
        aiUserInput.value = '';
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        aiTypingIndicator.classList.add('active');
        console.log('Message utilisateur envoyé:', message);

        // Simuler Gemini (limité à L’Aube Nouvelle)
        const response = await queryGemini(message);
        aiTypingIndicator.classList.remove('active');
        aiChatMessages.innerHTML += `<div class="message ai-message">${response}</div>`;
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        console.log('Réponse IA:', response);
    }

    async function queryGemini(prompt) {
        // Simulation de réponse
        const chapterContext = Object.values(chapters.fr).map(c => c.content).join(' ');
        if (prompt.toLowerCase().includes('clara') || prompt.toLowerCase().includes('aube nouvelle')) {
            return `Clara est une chercheuse de vérité dans *L’Aube Nouvelle*. Elle entreprend un voyage spirituel pour découvrir la source de la vérité, guidée par des rencontres et des révélations. Voulez-vous des détails sur un chapitre spécifique ?`;
        }
        return `Je peux répondre aux questions sur *L’Aube Nouvelle*. Posez-moi une question spécifique sur Clara ou les chapitres !`;
    }
}

// Protection anti-copie
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('print', e => e.preventDefault());
