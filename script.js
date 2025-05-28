// Configuration et initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAljojXHODwHjStePWkhthWLRzrw3pUslQ",
    authDomain: "la-voie-du-salut-36409.firebaseapp.com",
    projectId: "la-voie-du-salut-36409",
    storageBucket: "la-voie-du-salut-36409.firebasestorage.app",
    messagingSenderId: "61439310820",
    appId: "1:61439310820:web:52bfe8b862666ac13d25f1",
    measurementId: "G-G9S1ST8K3R"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registered');
    }).catch(err => console.error('Service Worker registration failed:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('homePage');
    const indexPage = document.getElementById('indexPage');
    const readingPage = document.getElementById('readingPage');
    const settingsPanel = document.getElementById('settingsPanel');
    const favoritesPage = document.getElementById('favoritesPage');
    const notesPage = document.getElementById('notesPage');
    const arabicText = document.getElementById('arabicText');
    const textContent = document.getElementById('textContent');
    const suraTitle = document.getElementById('suraTitle');
    const languageSelect = document.getElementById('languageSelect');
    const themeSelect = document.getElementById('themeSelect');
    const fontSelect = document.getElementById('fontSelect');
    const fontSize = document.getElementById('fontSize');
    const favoritesList = document.getElementById('favoritesList');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    const customizePanel = document.getElementById('customizePanel');
    const voiceSelectPanel = document.getElementById('voiceSelectPanel');
    const voiceSelect = document.getElementById('voiceSelect');
    const voicePlayBtn = document.querySelector('.voice-play-btn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let notes = JSON.parse(localStorage.getItem('notes')) || {};
    let currentSura = 1;
    let isPlaying = false;
    let synth = window.speechSynthesis;
    let currentFontSize = 16;

    // Contenu des 44 sourates en arabe, anglais et français avec paragraphes pour les 5 premières
    const suraContents = {
        1: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Préambule",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "Loin de nous l’esprit de dénigrer, mais près de nous l’esprit d’éveiller. Ainsi donc, motivé par l’amour de la vérité et le respect que j’ai envers tous les non-musulmans, je m’adresse à vous (homme de Dieu, frère dans la foi), avec la sincère intention de ne me permettre, après avoir médité la parole de Dieu, de garder le minimum que j’ai acquis. Il est écrit dans le livre de Josué ; Que ce livre de la loi ne s’éloigne pas de ta bouche, et médite-le jour et nuit, afin que tu prennes garde à faire selon tout ce qui y est écrit ; car alors, tu feras réussir tes voies, et alors, tu prospéreras. Dieu dit dans le Coran ; Et Nous avons rendu le Coran facile à retenir. L’un de vous souhaite-t-il apprendre ?",
                    "Accédez dans un voyage fascinant à travers les méandres de la spiritualité et découvrez la voie du salut qui vous attend. Ce livre est une invitation à la découverte de soi, à l’exploration de notre essence profonde et à la rencontre avec le divin qui sommeille en nous. Contemplez la voie du salut, une voie parsemée d’émerveillement, de transformation et de libération.",
                    "Laissez-vous porter par des analyses percutantes, des rubriques qui nourrissent l’esprit et des réflexions qui vont au-delà des frontières du temps et de l’espace. Préparez-vous à découvrir des perspectives nouvelles et à vous ouvrir à une réalité plus profonde et plus vraie. Plongez dans la sagesse véritable de l’Islam, laissez-vous guider par une quête spirituelle qui touchera votre cœur et éclairera votre chemin, explorez ses enseignements riches et laissez-vous toucher par la beauté et la lumière qui en émanent, sur la voie du salut.",
                    "Je vous suggère de vérifier chaque argument afin d’apprécier sa véracité. Je suis responsable de ce que j’écris, mais je ne suis point coupable de la compréhension que vous en faites. Néanmoins, je ne cesserai de vous amadouer, de vous éclaircir et de rendre les propos plus clairs.",
                    "Plongeons ensemble dans cette pantomime qui n’arrête de nous inviter. Hôtes serons-nous ? Écrivain serai-je ! Je noircis des pages pour orner le chemin et éclairer l’abysse. Assombrir pour ne pas sombrer. Pour extérioriser et évacuer nos gnoses, j’écris en argument et preuve pour nourrir votre méninge et cerner vos tohu-bohu. Certes, il ne sert à rien de lire pour passer, mais lisez pour comprendre.",
                    "Ouvrez votre esprit et laissez la vérité s’y installer. Ne consommez pas tout enseignement que l’on vous donne et puis on vous recommande de croire aveuglément. Jésus dit ; Ne soyez point comme le cheval, ni comme le mulet, qui sont sans intelligence. On note un passage dans le livre des Actes que les juifs examinaient chaque jour les Écritures pour voir si ce qu’on leur disait était exact. Alors, il faut tout analyser comme il est recommandé dernièrement dans le livre de 1 Thessaloniciens «N’éteignez pas l’esprit, ne méprisez pas les prophéties, mais examinez tout et retenez ce qui est bon. » Que vous soyez en quête de réponses, d’épanouissement spirituel ou simplement d’une connexion plus profonde avec votre être intérieur, ce livre sera votre compagnon fidèle dans cette quête sacrée.",
                    "La quintessence de ma sagacité scintille les anfractuosités de mon farfadet ahuri. Préparez-vous à être transporté vers des horizons ignorés, où la clarté, la paix et la félicité éternelle vous barguignent. Aérez votre cœur et votre esprit pour comprendre les lignes de ces pages, alors que vous découvrez la voie du salut qui étincèlera votre trajectoire vers une vie saine, remplie de paix, de tranquillité, d’apaisement et de pacification dans ce bas monde ainsi que dans l’au-delà. Lisons donc avec l’esprit du discernement et embrassons la plénitude morale qui nous attend.",
                    "Avec respect et amour",
                    "Ahmed Said Aidara"
                ]
            }
        },
        2: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Préface",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "Louange à Allah, le digne d’être adoré, je témoigne qu’il est la seule divinité. J’atteste que mouhamad et Jésus-Christ sont des messagers de la part d’Allah, que les prières et les bénédictions du Seigneur soient sur eux. Dans ce livre, ce sont les textes sacrés qui parlent. Avec attirance, l’ouvrage de mouhamad haydara s’impose par son degré d’argumentation et de pertinence. Il est bon d’inviter son prochain (non croyant) à devenir musulman, mais il serait meilleur qu’il soit certifié, assuré et textuel.",
                    "Aujourd’hui, mouhamad haydara donne la chance aux croyants de défendre leur religion, assure la foi de plusieurs musulmans que l’islam est la vérité et nous invite à appeler les non-musulmans à venir consulter l’islam. Dieu dit dans le Coran, sourate 16, verset 125 : « Par la sagesse et la bonne exhortation, appelle (les gens) au sentier de ton Seigneur. Et discute avec eux de la meilleure façon ». Bien sûr, cela peut se faire, on peut ne pas être d’accord et avoir des points de divergence, mais cela n’empêche pas de vivre en paix, en considération et en cohésion sociale.",
                    "L’auteur ne s’est pas mis ici à une attaque, mais à une étude comparative, à un avertissement. Cela fait de la voie du salut une invitation à son lecteur à entrer dans une sphère sérieuse qu’est la foi. Ce livre dévoile la Vraie Voie qui nous mène au Salut et qui est la clé du paradis.",
                    "La première partie est consacrée à une révision des bases de l’islam et un petit coup d’œil au christianisme. Il aborde ensuite des interrogations profondes sur l’existence humaine, le sens de notre création, notre destinée, en illuminant majestueusement le chemin vers le Salut. Après cela, arrive la section intéressante pour les Chrétiens. La deuxième et dernière partie est consacrée à la voie du salut composée de plusieurs chapitres, dans lesquels sont inclus un appel et un rappel. Scannons ensemble le Coran et la Bible !",
                    " Cheikh Abdallah Niass,",
                    " PDG de l’institut Al Mouyassar"
                ]
            }
        },
        3: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "LA GENESE<br>Au nom de Dieu, le Tout Miséricordieux, le Très Miséricordieux",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    " La Voie du Salut est un chemin que chaque âme doit découvrir et emprunter avec pleine conscience, une quête vers la rédemption et la paix éternelle. Ce livre se plonge dans les textes sacrés des grandes religions, cherchant à dévoiler l’unique vérité irréfutable. Il s’agit de découvrir la véritable voie menant au salut dans l’au-delà, un salut qui transcende les dogmes, nous éloignant ainsi de l’enfer dont chaque prophète a mis en garde son peuple.",

" À travers ce voyage spirituel, il est question d’explorer la religion divine. En effet, penser à Dieu est une chose sérieuse et fondamentale. Pour que nos œuvres ne soient vaines, chercher le véritable Dieu qui est digne d’adoration doit constituer le but de chaque être humain qui croit à l’existence d’une vie après la mort.",

" La religion est un système de croyances fondé sur deux liens essentiels : un lien « vertical » entre l’homme et Dieu, et un lien « horizontal » entre les membres d’une communauté humaine.",

" L’étymologie du mot « religion » repose sur deux racines principales : • Le verbe *religare*, qui signifie « relier » : relier les hommes à Dieu (le lien vertical) et les hommes entre eux (le lien horizontal). • Le verbe *religere*, qui évoque l’idée de se recueillir, de réfléchir et de revenir sur soi-même, renvoyant ainsi la religion à une dimension intérieure, définie par la foi.",

" La religion désigne l’ensemble des croyances, des dogmes et des pratiques qui régissent les relations de l’être humain avec le sacré ou la divinité, c’est-à-dire avec une forme de transcendance divine. Malgré la diversité des traditions religieuses, une constante émerge : la croyance en une vie après la mort, à laquelle seuls les fidèles auront accès.",

" Il y a différentes religions monothéistes (Christianisme, Islam, Judaïsme), polythéistes (hindouisme, le shintoïsme) et même des religions sans dieu… (bouddhisme, athée…), etc. Néanmoins, cette diversité présente de nombreux points communs.",

" La religion, en tant qu’ensemble de croyances, soulève la question de la relation entre foi et raison. La religion n’a rien à voir avec aucune forme de savoir ou de connaissance. La connaissance humaine n’a que deux sources de provenance possibles, ou bien la connaissance est le produit de l’expérience, ou bien, elle est le résultat de la réflexion, c’est-à-dire du raisonnement intellectuel fondé sur la logique.",

" Toute religion comprend des croyances relatives à une réalité autre (le surnaturel, le divin, le sacré) et supérieure à la réalité naturelle et humaine (profane) qui la transcende tout en se manifestant en elle. Ce dernier détermine le sens et la valeur. Des mythes racontent, plus qu’ils n’expliquent, l’origine et la finalité du monde naturel et de la condition humaine, par exemple pourquoi et comment l’homme est devenu souffrant, travailleur, mortel…",
                    
" Les croyances revendiquent la vérité, mais cette vérité échappe aux moyens humains de démonstration rationnelle, d’observation ou d’expérimentation. Ce sont des « dogmes », des vérités dites « révélées » qui proviennent du divin et sont transmises aux hommes à travers une tradition orale ou des textes considérés comme sacrés. La religion repose également sur une révélation intérieure, suscitant des émotions et des sentiments profonds mêlant crainte, tremblement et fascination, où l’homme se sent dépassé par une force mystérieuse, d’une grandeur incommensurable, et se perçoit comme une créature fragile et insignifiante.",

" Toute religion comprend également des règles de vie, une morale définissant les valeurs, le bien et le mal, posant des obligations et interdits, à valeur absolue, car provenant de la transcendance divine. Ces règles régissent les relations des hommes entre eux, les mœurs, mais aussi les relations des hommes au divin. Toute religion, en effet, impose une pratique cultuelle : des cérémonies, des prières, des sacrifices, des rituels ponctuent la vie et ses événements cruciaux, correspondant à un passage et un renouvellement, comme la naissance, la puberté, le mariage, la mort…",

" Enfin, ces croyances sont presque toujours transmises et ces cultes orchestrés par des hommes médiateurs privilégiés entre le commun des mortels et le divin. Ils détiennent parfois un très grand pouvoir politique comme dans les monarchies de droit divin ou les théocraties.",

" « La religion sans la conscience morale n’est qu’un culte superstitieux », disait Emmanuel Kant.",

" « La religion est un projet de société. Donc il est tout à fait possible de la concilier avec les faits de société. D’ailleurs, c’est ce qui doit être la norme. Mais à cause des incompréhensions, ça devient difficile. Les gens pensent souvent que la religion est venue pour tout interdire. Ce qui n’est pas le cas. L’Islam n’est pas venu uniquement pour les musulmans, il est apparu pour réguler la société humaine. Aujourd’hui, le constat est que la religion est polluée par certaines coutumes ou par la politique. De sorte qu’on n’arrive plus à faire la distinction entre les différentes composantes. De nos jours, c’est la société qui transforme la religion. Alors que c’est le contraire qui devait se produire. » El Hadji Malick Sy (RTA) disait souvent que, dans ce pays, les coutumes et les autres pratiques vont toujours prendre le dessus sur la religion. Parce que c’est ancré en nous. La religion doit être intégrée dans la société afin de l’orienter. Ça peut se faire. » Propos de Sidy Lamine Niass dans son œuvre, *L’Apocalypse Salvatrice*.",

" L’islam est la soumission à la volonté totale du Créateur Unique des cieux et de la terre. L’islam est une religion monothéiste (croyance en un seul Dieu), Muhammad est le dernier prophète envoyé par l’Éternel Dieu et a été annoncé dans l’Ancien et le Nouveau Testament. Les adeptes de l’islam sont appelés les musulmans.",

" Les fondements de l’islam reposent sur le Coran, étant la parole révélée de Dieu (Allah) ; telle que transmise à Muhammad. Les enseignements et les pratiques de l’islam sont également basés sur les hadiths, qui sont les paroles et les actions du prophète Muhammad.",
                    
"« La croyance en un Dieu unique, Allah, qui est sans associé ni égal. Votre foi – ô vous les adolescents ! – en Celui à qui appartiennent les petits et les grands consiste en ce que vous croyez en Dieu, aux Anges, aux Livres révélés de Celui qui guide l’homme ou la femme engagée dans la Voie de Dieu. Au jour du Jugement dernier, aux Nobles Envoyés de Dieu et au Décret Divin (...). Votre foi en votre Seigneur est d’attester que Son Existence est réelle. Il est le Primordial sans commencement, Il est le Subsistant sans fin, Il est différent de la totalité des créatures, Il se suffit à Lui-Même, (...). Il est Unique, Il n’a point de second, Il n’a jamais cessé – qu’Il soit Exalté ! – de prouver Sa Grandeur dans toutes Ses Manifestations. Il est Singulier, Lui qui est l’Unique, dans Son Essence, Ses Attributs et l’ensemble de Ses Actes ; (...). Il n’a de second ni dans Son Essence, ni dans Ses Attributs, ni dans Ses Actes, et Il élit qui Il veut. Puissance et Volonté Lui reviennent nécessairement ; par conséquent, adorez-Le et vénérez-Le.",
"La croyance en les anges, qui sont des êtres spirituels créés par Dieu. La croyance en eux est d’affirmer et d’être à la fois convaincu que leur existence est indiscutable et qu’ils sont préservés des péchés. Ils sont des créatures qui n’excrètent ni matières fécales, ni urine ; ils sont des êtres totalement purifiés. Aucun des Anges de Dieu ne mange (paix sur eux) ni ne boit. Ils sont des serviteurs placés dans une honorabilité éternelle et aucun d’entre eux ne désobéit à Allah. Chacun accomplit les ordres qu’il reçoit de la part de Dieu. Leur Seigneur, le Subsistant, les a créés à partir de la lumière, cela est sans équivoque. Célébrer la Gloire de leur Seigneur reste leur breuvage. Le sanctifier constitue leur nourriture, n’en doutez point !",
                    "La croyance en les prophètes et messagers de Dieu, y compris Adam, Noé, Abraham, Moïse, Jésus et Muhammad. Votre croyance aux Envoyés est d’avoir foi en eux et d’admettre l’authenticité du Message reçu de leur Seigneur. Quant à eux, la Sincérité, la fidélité et la Transmission sont nécessaires à leur égard. Le Mensonge, le Parjure et la Dissimulation sont déclarés illégaux à leur endroit par Celui qui rétribue. Je veux dire qu’ils sont dans leur totalité inadmissibles pour les Envoyés ; soyez constants à prier sur eux, ô bonhommes ! Admettez qu’ils sont passibles de tout ce qui, parmi les accidents, n’engendre pas de handicaps pour les exigences du public, à l’instar de la maladie. Si elle n’est pas de celles qui sont repoussantes, telles que la lèpre et la ladrerie, car chacun d’eux (les Prophètes) est d’une parfaite honorabilité. Quant à vendre, acheter, se marier et tous les autres actes du genre, de ce qui est licite auprès de Dieu, cela ne fait qu’augmenter leurs avantages auprès du Tout-Généreux ; le Plus Noble et le Plus Digne de Reconnaissance. Quant à la preuve de leur Sincérité, ce sont les Miracles qui leur proviennent du Majestueux.",
                    "Le nombre des Envoyés est de trois cent treize (...). Quant à l’ensemble des Prophètes et des Envoyés, leur nombre s’élève à cent vingt-quatre mille (...). Que le Plus Pur Salut de Dieu, accompagné de Sa Prière, soit sur eux, sans fin. »",
                    "4. La croyance en les livres sacrés révélés par Dieu, d’abord le Coran. Votre croyance aux Livres (sacrés) est de reconnaître que leur Révélation est véridique et que le Message qu’ils véhiculent dans leur totalité est vrai, sans aucun doute ; celui qui a foi en eux gagne en élévation. Leur nombre correspond à cent quatre ; parmi eux, dix ont été révélés au Prophète Adam, selon la source bien établie. Cinquante ont été révélés à son fils Seth ; trente à Esdras ; dix à l’Ami de Dieu (Il s’agit du Prophète Abraham), dans l’ordre de succession. Parmi eux, la Thora (Pentateuque) fut confiée à Moïse, l’Évangile à Jésus. Les Psaumes furent reçus par David, tout comme le Discernement (le Coran) fut destiné au Louangé (Al Mahmoud ; le Prophète Muhammad). Sur eux la Paix et le Salut, aussi longtemps qu’ils auront l’Estime du Maître des créatures.",

"5. La croyance en la vie après la mort et au Jour du Jugement. Votre croyance en ce Jour est d’être convaincu de son avènement et de ce qu’il comporte. Réveille-toi ! Ce jour inclut des événements tels que : la Résurrection, le Grand Rassemblement, la Balance, la Vasque (Al Hawd), le Paradis et l’Enfer, ainsi que le Pont, le Passage (sur le pont), le Règlement de Compte, l’intercession du Prophète et le Châtiment (cruel). À chaque individu sera demandé des comptes jusque dans les moindres détails : le Qitmir, le Fatîl et le Naqîr.",

"La distinction lexicologique entre ces termes est la suivante : Naqîr désigne l’enveloppe extérieure de la graine de datte. Fatîl est ce qui est dans le creux du noyau. Qitmir désigne la membranule blanche et translucide, selon la glose.",
                    "Il y aura également un règlement entre une victime sans corne et un coupable cornu, en signe de loyauté. (...) La Mort, l’Interrogatoire et le Châtiment dans la tombe font aussi partie du Grand Jour, sache-le. Car le processus de la Résurrection comprend deux étapes : la petite, qui commence dès la mort de tout être humain, et la grande, qui survient après le Souffle dans la Trompette (...).",

"L’islam et ses principes éthiques et sociaux", 
"L’islam est une religion qui englobe de nombreux aspects de la vie quotidienne de ses adeptes. En plus des croyances et des pratiques religieuses que j’ai mentionnées précédemment, l’islam encourage aussi l’éthique, la moralité et la justice sociale.",

"L’éthique islamique repose sur des principes tels que l’honnêteté, la bienveillance, la générosité, le respect des autres et l’intégrité. Les musulmans sont incités à mener une vie équilibrée et à rechercher le bien-être physique, mental et spirituel.",

"La moralité occupe également une place importante dans l’islam. Les musulmans sont invités à se comporter de manière juste et équitable envers les autres, à respecter les droits des individus, à être bons envers leurs parents, leur famille et leurs voisins, et à traiter tous les êtres humains avec dignité et respect.",

"La justice sociale est un aspect essentiel de l’islam. Les musulmans sont encouragés à s’engager dans des actions bénéfiques pour la société, tels que le soutien aux pauvres, aux orphelins, aux veuves et aux personnes dans le besoin. L’islam met également l’accent sur l’éradication des injustices sociales, de la discrimination et de l’oppression.",

"Il convient de mentionner que l’islam encourage la recherche du savoir et de l’éducation. L’apprentissage est considéré comme une obligation pour chaque musulman. La science, les arts et la philosophie ont joué un rôle important dans l’histoire de l’islam, apportant des contributions significatives dans de nombreux domaines.",

"L’islam est une religion diversifiée, avec de nombreuses cultures et traditions différentes. Les pratiques et les coutumes varient selon les pays et les communautés musulmanes. Les différentes écoles de pensée au sein de l’islam peuvent interpréter certains aspects de la religion différemment.",

"Les fondements de l’islam",  
"L’une des bases fondamentales de l’islam est la croyance en un Dieu unique, appelé Allah. Les musulmans affirment que Muhammad est le dernier prophète envoyé par Allah pour transmettre Sa révélation, le Coran. Ce dernier est la parole de Dieu telle qu’elle a été révélée à Muhammad.",

"La pratique religieuse principale de l’islam repose sur les cinq piliers suivants :",  
"1. La profession de foi (chahada) : Les musulmans déclarent leur foi en disant : « Il n’y a de Dieu qu’Allah et Muhammad est Son prophète ». Cela constitue une affirmation de la croyance en l’unicité de Dieu et en la prophétie de Muhammad.",  
"2. La prière (salât) : Les musulmans sont tenus d’accomplir cinq prières quotidiennes à des moments spécifiques de la journée. Ces prières impliquent des mouvements physiques et sont accompagnées de récitations du Coran.",
"3. L’aumône (zakât) : Les musulmans doivent donner une partie de leur richesse aux moins fortunés, généralement sous forme d’aumône annuelle calculée en fonction de leurs biens.",

"4. Le jeûne (sawm) : Pendant le mois du Ramadan, les musulmans s’abstiennent de manger, de boire et d’avoir des relations sexuelles du lever au coucher du soleil. Le jeûne est un moyen d’auto-purification, de renforcement de la foi, de discipline et de compassion envers les moins fortunés.",

"5. Le pèlerinage à La mecque (hajj) : Les musulmans qui en ont les moyens financiers et physiques sont tenus de faire le pèlerinage à La Mecque une fois dans leur vie. Le hajj est une expérience spirituelle intense qui rassemble des millions de musulmans du monde entier.",

"L’islam, la famille et les relations interreligieuses.",

"L’islam accorde également une grande importance à la famille et aux liens sociaux. Le mariage est considéré comme un engagement sérieux entre un homme et une femme, fondé sur l’amour, le respect mutuel et la coopération. Les parents sont considérés comme les premiers éducateurs des enfants et l’entraide entre les membres de la famille est encouragée.",

"En ce qui concerne les relations avec les autres religions, l’islam prône le respect mutuel et le dialogue interreligieux. Les musulmans sont appelés à vivre en harmonie avec les personnes de différentes croyances et à promouvoir la paix et la justice. L’islam reconnaît également les prophètes et les textes sacrés antérieurs, tels que Jésus et l’Évangile.",

"Le christianisme : Origine et croyances fondamentales",

"Le christianisme est une religion qui trouve ses origines au Proche-Orient. Les chrétiens considèrent Jésus-Christ comme le Messie annoncé par les prophètes de l’Ancien Testament. La foi en la résurrection de Jésus est au cœur du christianisme, car elle symbolise pour les croyants le début d’un espoir d’éternité libéré du mal. La foi chrétienne, qu’elle soit catholique, orthodoxe ou protestante, repose sur la croyance en la Trinité divine : le Père, le Fils et le Saint-Esprit. Elle repose également sur la certitude de la rédemption des péchés obtenue par la Passion et la Résurrection de Jésus.",

"Les principes fondamentaux du christianisme",

"Les principes du christianisme incluent l’amour de Dieu et l’amour du prochain. Jésus est vu comme le Fils de Dieu et le Messie. Le message central du christianisme est celui du salut par la grâce de Dieu. Les chrétiens croient que Jésus a donné sa vie en sacrifice pour racheter l’humanité de ses péchés et offrir la possibilité d’une réconciliation avec Dieu. Cette croyance en la rédemption par le Christ est au cœur de la foi chrétienne.",

"Valeurs et principes moraux",

"Le christianisme incite ses adeptes à vivre selon des valeurs morales élevées, telles que l’amour, la compassion, la justice et le pardon. Cette vision éthique guide les chrétiens dans leur vie quotidienne, en les encourageant à pratiquer ces valeurs envers autrui."
                ]
            }
        },
        4: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "LA GENESE<br>Au nom de Dieu, le Tout Miséricordieux, le Très Miséricordieux",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        5: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        6: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        7: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        8: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        9: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        10: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        11: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        12: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        13: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        14: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        15: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        16: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        17: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        18: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        19: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        20: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        21: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        22: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        23: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        24: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        25: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        26: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        27: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        28: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        29: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        30: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        31: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        32: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        33: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        34: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        35: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        36: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        37: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        38: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        39: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُم",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O mankind, fear your Lord, who created you from one soul...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô hommes, craignez votre Seigneur qui vous a créés d'une seule âme...",
            paragraphs: {
                ar: [
                    "سورة النساء هي سورة مدنية تُركز على حقوق المرأة والعدالة الاجتماعية، مع التأكيد على أهمية تقوى الله في جميع التعاملات.",
                    "تتناول السورة مواضيع مثل الميراث، الزواج، والمعاملات العادلة، داعية إلى بناء مجتمع قائم على العدل والرحمة."
                ],
                en: [
                    "Surah An-Nisa is a Medinan surah that focuses on women’s rights and social justice, emphasizing the importance of God-consciousness in all dealings.",
                    "The surah addresses topics such as inheritance, marriage, and fair transactions, calling for the establishment of a society based on justice and compassion."
                ],
                fr: [
                    "La sourate An-Nisa est une sourate médinoise qui se concentre sur les droits des femmes et la justice sociale, soulignant l'importance de la conscience de Dieu dans toutes les interactions.",
                    "La sourate aborde des sujets tels que l'héritage, le mariage et les transactions équitables, appelant à la construction d'une société fondée sur la justice et la compassion."
                ]
            }
        },
        40: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ أَوْفُوا۟ بِٱلْعُقُودِ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>O you who have believed, fulfill [all] contracts...",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ô vous qui avez cru, remplissez les contrats...",
            paragraphs: {
                ar: [
                    "سورة المائدة هي سورة مدنية تُركز على الأحكام الشرعية والعقود، مع التأكيد على أهمية الوفاء بالعهود والالتزام بالأخلاق.",
                    "تتضمن السورة توجيهات حول العلاقات مع أهل الكتاب، وتدعو إلى العدل والإحسان في التعامل مع الآخرين."
                ],
                en: [
                    "Surah Al-Ma’idah is a Medinan surah that focuses on legal rulings and contracts, emphasizing the importance of fulfilling commitments and adhering to ethical principles.",
                    "The surah includes guidance on relations with the People of the Book and calls for justice and kindness in dealing with others."
                ],
                fr: [
                    "La sourate Al-Ma’idah est une sourate médinoise qui se concentre sur les règles juridiques et les contrats, soulignant l'importance de respecter les engagements et d'adhérer aux principes éthiques.",
                    "La sourate inclut des directives sur les relations avec les Gens du Livre et appelle à la justice et à la bienveillance dans les interactions avec autrui."
                ]
            }
        },
        41: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Praise be to Allah, the Lord of all the worlds",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Louange à Allah, Seigneur des mondes",
            paragraphs: {
                ar: [
                    "سورة الفاتحة هي أول سورة في القرآن الكريم وتُعتبر مفتاح القرآن. تُسمى أيضًا أم الكتاب لأنها تُلخص المبادئ الأساسية للإيمان والعبادة.",
                    "تتضمن هذه السورة الدعاء والتضرع إلى الله، حيث يطلب المؤمن الهداية إلى الصراط المستقيم، مما يجعلها ركيزة أساسية في الصلاة اليومية."
                ],
                en: [
                    "Surah Al-Fatiha is the first chapter of the Quran and is considered the key to the Quran. It is also called the Mother of the Book as it encapsulates the fundamental principles of faith and worship.",
                    "This surah includes a supplication and plea to Allah, where the believer seeks guidance on the straight path, making it a cornerstone of daily prayers."
                ],
                fr: [
                    "La sourate Al-Fatiha est le premier chapitre du Coran et est considérée comme la clé du Coran. Elle est aussi appelée la Mère du Livre, car elle résume les principes fondamentaux de la foi et de l'adoration.",
                    "Cette sourate comprend une supplication et une imploration à Allah, où le croyant demande la guidance sur le droit chemin, ce qui en fait une base essentielle des prières quotidiennes."
                ]
            }
        },
        42: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۖ فِيهِ هُدًى لِّلْمُتَّقِينَ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>This is the Book about which there is no doubt, a guidance for those conscious of Allah",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Ceci est le Livre au sujet duquel il n'y a aucun doute, un guide pour les pieux",
            paragraphs: {
                ar: [
                    "سورة البقرة هي أطول سورة في القرآن الكريم، وهي سورة مدنية تتناول العديد من الأحكام والتشريعات التي تنظم حياة المسلمين.",
                    "تبدأ السورة بالحديث عن القرآن ككتاب هداية، وتؤكد على أهمية التقوى والإيمان بالله كأساس لفهم الدين وتطبيق تعاليمه."
                ],
                en: [
                    "Surah Al-Baqarah is the longest chapter in the Quran, a Medinan surah that addresses many laws and regulations governing the lives of Muslims.",
                    "The surah begins by discussing the Quran as a book of guidance, emphasizing the importance of piety and faith in Allah as the foundation for understanding and applying its teachings."
                ],
                fr: [
                    "La sourate Al-Baqarah est la plus longue sourate du Coran, une sourate médinoise qui aborde de nombreuses lois et règles régissant la vie des musulmans.",
                    "La sourate commence par parler du Coran comme un livre de guidance, soulignant l'importance de la piété et de la foi en Allah comme fondement pour comprendre et appliquer ses enseignements."
                ]
            }
        },
        43: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        },
        44: {
            ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ<br>الم ۝ ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
            en: "In the name of Allah, the Most Gracious, the Most Merciful<br>Alif Lam Mim. Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence",
            fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux<br>Alif Lam Mim. Allah, il n'y a de divinité sauf Lui, le Vivant, le Subsistant",
            paragraphs: {
                ar: [
                    "سورة آل عمران هي سورة مدنية تُركز على تعزيز الإيمان وتوحيد الله، وتتناول قصص الأنبياء وأهمية الصبر والثبات في مواجهة التحديات.",
                    "تؤكد هذه السورة على وحدانية الله وصفاته العظيمة، مما يدعو المؤمنين إلى التفكر في عظمة الخالق والالتزام بتعاليمه."
                ],
                en: [
                    "Surah Aal-E-Imran is a Medinan surah that focuses on strengthening faith and the oneness of Allah, addressing stories of prophets and the importance of patience and steadfastness in facing challenges.",
                    "This surah emphasizes the oneness of Allah and His great attributes, encouraging believers to reflect on the Creator’s majesty and adhere to His teachings."
                ],
                fr: [
                    "La sourate Aal-E-Imran est une sourate médinoise qui met l'accent sur le renforcement de la foi et l'unicité d'Allah, abordant les histoires des prophètes et l'importance de la patience et de la fermeté face aux défis.",
                    "Cette sourate insiste sur l'unicité d'Allah et Ses attributs grandioses, incitant les croyants à réfléchir sur la majesté du Créateur et à suivre Ses enseignements."
                ]
            }
        }
    };

    // Navigation
    document.querySelector('.start-btn').addEventListener('click', () => {
        homePage.style.display = 'none';
        indexPage.style.display = 'block';
    });

    document.querySelectorAll('.index-page li').forEach(li => {
        li.addEventListener('click', () => {
            currentSura = parseInt(li.getAttribute('data-sura'));
            updateContent();
            indexPage.style.display = 'none';
            readingPage.style.display = 'block';
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (indexPage.style.display !== 'none') {
                indexPage.style.display = 'none';
                homePage.style.display = 'block';
            } else if (settingsPanel.style.display !== 'none') {
                settingsPanel.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (favoritesPage.style.display !== 'none') {
                favoritesPage.style.display = 'none';
                readingPage.style.display = 'block';
            } else if (notesPage.style.display !== 'none') {
                notesPage.style.display = 'none';
                readingPage.style.display = 'block';
            }
        });
    });

    // Retour au sommaire depuis la page de lecture
    document.querySelectorAll('.index-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            readingPage.style.display = 'none';
            indexPage.style.display = 'block';
            customizePanel.style.display = 'none';
        });
    });

    // Navigation entre chapitres
    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentSura > 1) {
            currentSura--;
            updateContent();
        }
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        if (currentSura < 44) {
            currentSura++;
            updateContent();
        }
    });

    // Paramètres
    document.querySelector('.settings-btn').addEventListener('click', () => {
        readingPage.style.display = 'none';
        settingsPanel.style.display = 'block';
    });

    languageSelect.addEventListener('change', () => {
        updateContent();
    });

    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value === 'dark' ? 'dark' : '';
    });

    fontSelect.addEventListener('change', (e) => {
        arabicText.style.fontFamily = e.target.value;
        textContent.style.fontFamily = e.target.value;
    });

    fontSize.addEventListener('input', (e) => {
        arabicText.style.fontSize = `${e.target.value}px`;
        textContent.style.fontSize = `${e.target.value}px`;
    });

    // Favoris
    document.querySelector('.favorite-btn').addEventListener('click', () => {
        if (!favorites.includes(currentSura) && currentSura >= 1 && currentSura <= 44) {
            favorites.push(currentSura);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavorites();
        }
    });

    document.querySelector('.favorites-btn').addEventListener('click', () => {
        favoritesPage.style.display = favoritesPage.style.display === 'none' ? 'block' : 'none';
        readingPage.style.display = favoritesPage.style.display === 'block' ? 'none' : 'block';
        updateFavorites();
    });

    function updateFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(sura => {
            if (sura >= 1 && sura <= 44 && suraContents[sura]) {
                const li = document.createElement('li');
                li.innerHTML = `<span class="sura-number">${sura}</span> Surat ${sura}<br>Nombre aya ${suraContents[sura].ar.split('<br>').length - 1} <i class="fas fa-mosque"></i>`;
                li.addEventListener('click', () => {
                    currentSura = sura;
                    updateContent();
                    favoritesPage.style.display = 'none';
                    readingPage.style.display = 'block';
                });
                favoritesList.appendChild(li);
            }
        });
    }
    updateFavorites();

    // Personnalisation
    document.querySelector('.customize-btn').addEventListener('click', () => {
        customizePanel.style.display = customizePanel.style.display === 'none' ? 'flex' : 'none';
    });

    document.querySelector('.close-customize-btn').addEventListener('click', () => {
        customizePanel.style.display = 'none';
    });

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = document.getElementById('readingContent');
            content.style.backgroundColor = btn.getAttribute('data-color');
            // Appliquer la couleur au body pour éviter les espaces
            document.body.style.backgroundColor = btn.getAttribute('data-color');
        });
    });

    // Zoom
    document.querySelector('.zoom-in-btn').addEventListener('click', () => {
        currentFontSize = Math.min(currentFontSize + 2, 30);
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
    });

    document.querySelector('.zoom-out-btn').addEventListener('click', () => {
        currentFontSize = Math.max(currentFontSize - 2, 12);
        arabicText.style.fontSize = `${currentFontSize}px`;
        textContent.style.fontSize = `${currentFontSize}px`;
    });

    // Lecture à haute voix
    document.querySelector('.voice-select-btn').addEventListener('click', () => {
        voiceSelectPanel.style.display = voiceSelectPanel.style.display === 'none' ? 'block' : 'none';
    });

    document.querySelector('.close-voice-btn').addEventListener('click', () => {
        voiceSelectPanel.style.display = 'none';
    });

    voicePlayBtn.addEventListener('click', () => {
        if (isPlaying) {
            synth.cancel();
            isPlaying = false;
            voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
        } else {
            const textToRead = languageSelect.value === 'ar' ? arabicText.innerText : textContent.innerText;
            if (textToRead) {
                const utterance = new SpeechSynthesisUtterance(textToRead);
                const voices = synth.getVoices();
                const selectedVoiceName = voiceSelect.value.split('-')[0].trim(); // Extrait le nom (ex. "Fatima")
                utterance.voice = voices.find(voice => voice.name.toLowerCase().includes(selectedVoiceName.toLowerCase())) || voices[0];
                utterance.lang = languageSelect.value === 'ar' ? 'ar-SA' : (languageSelect.value === 'en' ? 'en-US' : 'fr-FR');
                synth.speak(utterance);
                isPlaying = true;
                voicePlayBtn.innerHTML = '<i class="fas fa-pause"></i> Lecture à haute voix';
                utterance.onend = () => {
                    isPlaying = false;
                    voicePlayBtn.innerHTML = '<i class="fas fa-play"></i> Lecture à haute voix';
                };
            }
        }
    });

    // Notes
    document.querySelector('.note-btn').addEventListener('click', () => {
        readingPage.style.display = 'none';
        notesPage.style.display = 'block';
        updateNotes();
    });

    document.querySelector('.add-category-btn').addEventListener('click', () => {
        const categoryName = document.getElementById('newCategory').value.trim();
        if (categoryName) {
            if (!notes[categoryName]) {
                notes[categoryName] = '';
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            updateNotes();
            document.getElementById('newCategory').value = '';
        }
    });

    function updateNotes() {
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.innerHTML = '';
        for (const category in notes) {
            const div = document.createElement('div');
            div.className = 'category';
            div.innerHTML = `
                <h3>${category}</h3>
                <textarea>${notes[category]}</textarea>
            `;
            div.querySelector('textarea').addEventListener('input', (e) => {
                notes[category] = e.target.value;
                localStorage.setItem('notes', JSON.stringify(notes));
            });
            categoriesList.appendChild(div);
        }
    }

    // Assistant IA
    document.querySelector('.ai-btn').addEventListener('click', () => {
        alert('Assistant IA : Posez une question sur le livre (API Gemini à intégrer)');
    });

    // Recherche intelligente
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        searchResults.style.display = searchTerm ? 'block' : 'none';
        searchResults.innerHTML = '';

        if (searchTerm) {
            const allText = {};
            for (let sura = 1; sura <= 44; sura++) {
                ['ar', 'en', 'fr'].forEach(lang => {
                    if (suraContents[sura] && suraContents[sura][lang]) {
                        const lines = suraContents[sura][lang].split('<br>');
                        lines.forEach((line, index) => {
                            if (line.toLowerCase().includes(searchTerm)) {
                                if (!allText[sura]) allText[sura] = {};
                                if (!allText[sura][lang]) allText[sura][lang] = [];
                                allText[sura][lang].push({ text: line, lineIndex: index });
                            }
                        });
                    }
                });
            }

            for (let sura in allText) {
                for (let lang in allText[sura]) {
                    allText[sura][lang].forEach(result => {
                        const div = document.createElement('div');
                        div.className = 'result-item';
                        div.innerHTML = `<strong>Surat ${sura} (${lang.toUpperCase()})</strong><br>${result.text}`;
                        div.addEventListener('click', () => {
                            currentSura = parseInt(sura);
                            languageSelect.value = lang;
                            updateContent();
                            const lines = suraContents[currentSura][lang].split('<br>');
                            arabicText.innerHTML = suraContents[currentSura][lang];
                            textContent.innerHTML = suraContents[currentSura][lang];
                            if (lang === 'ar') {
                                arabicText.style.display = 'block';
                                textContent.style.display = 'none';
                            } else {
                                arabicText.style.display = 'none';
                                textContent.style.display = 'block';
                            }
                            const targetElement = lang === 'ar' ? arabicText : textContent;
                            const targetLines = targetElement.innerHTML.split('<br>');
                            targetLines[result.lineIndex] = `<span style="background: yellow">${targetLines[result.lineIndex]}</span>`;
                            targetElement.innerHTML = targetLines.join('<br>');
                            targetElement.scrollTop = targetElement.scrollHeight * (result.lineIndex / targetLines.length);
                            searchResults.style.display = 'none';
                            searchBar.value = '';
                        });
                        searchResults.appendChild(div);
                    });
                }
            }
        }
    });

    // Connexion/Inscription
    document.querySelectorAll('.auth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const username = btn.parentElement.querySelector('input[type="text"]').value;
            const password = btn.parentElement.querySelector('input[type="password"]').value;
            if (btn.textContent === 'Se connecter') {
                auth.signInWithEmailAndPassword(username, password)
                    .then((userCredential) => {
                        alert(`Connexion réussie avec ${username}`);
                    })
                    .catch((error) => {
                        alert('Erreur de connexion : ' + error.message);
                    });
            } else {
                auth.createUserWithEmailAndPassword(username, password)
                    .then((userCredential) => {
                        alert(`Inscription réussie pour ${username}`);
                    })
                    .catch((error) => {
                        alert('Erreur d\'inscription : ' + error.message);
                    });
            }
        });
    });

    function updateContent() {
    const content = suraContents[currentSura] && suraContents[currentSura][languageSelect.value];
    suraTitle.textContent = `Surat ${currentSura}`;
    if (content) {
        const lines = content.split('<br>');
        const bismillahLine = lines[0];
        const rest = lines.slice(1).join('<br>');
        const paragraphs = suraContents[currentSura].paragraphs[languageSelect.value] || [];
        const paragraphsHTML = paragraphs.map(para => `<p class="paragraph">${para}</p>`).join('');
        
        if (languageSelect.value === 'ar') {
            arabicText.innerHTML = `<span class="bismillah">${bismillahLine}</span><br>${rest}<br><div class="paragraphs">${paragraphsHTML}</div>`;
            textContent.style.display = 'none';
            arabicText.style.display = 'block';
        } else {
            textContent.innerHTML = `<span class="bismillah">${bismillahLine}</span><br>${rest}<br><div class="paragraphs">${paragraphsHTML}</div>`;
            arabicText.style.display = 'none';
            textContent.style.display = 'block';
        }
    } else {
        arabicText.innerHTML = 'Contenu non disponible';
        textContent.innerHTML = 'Content not available';
        arabicText.style.display = 'block';
        textContent.style.display = 'none';
    }
}

    // Sécurité
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.key === 'PrintScreen') {
            e.preventDefault();
        }
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());
});
