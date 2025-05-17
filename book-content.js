// Contenu du livre "La Voie du Salut" (exemple fictif)
const bookContent = {
    preamble: {
        title: {
            fr: "Préambule",
            en: "Preamble",
            ar: "المقدمة"
        },
        content: {
            fr: `
                <p>Le voyage vers la vérité commence par un pas humble, une volonté de chercher au-delà des ombres du quotidien. *La Voie du Salut* est plus qu’un livre ; c’est une invitation à explorer les profondeurs de l’âme humaine et à découvrir la lumière qui réside en chacun de nous. Ce préambule pose les fondations d’une quête spirituelle, où chaque chapitre est une étape vers l’éveil.</p>
                <p>Dans un monde marqué par le chaos et l’incertitude, l’auteur, Ahmed Said Aidara, propose une réflexion intemporelle sur la foi, l’espoir et la résilience. Ce texte s’adresse à ceux qui osent questionner, à ceux qui cherchent un sens plus grand. Préparez-vous à un voyage intérieur, où chaque mot est une lanterne dans l’obscurité.</p>
            `,
            en: `
                <p>The journey toward truth begins with a humble step, a willingness to seek beyond the shadows of daily life. *The Path to Salvation* is more than a book; it is an invitation to explore the depths of the human soul and discover the light within each of us. This preamble lays the foundation for a spiritual quest, where each chapter is a step toward awakening.</p>
                <p>In a world marked by chaos and uncertainty, the author, Ahmed Said Aidara, offers a timeless reflection on faith, hope, and resilience. This text speaks to those who dare to question, to those seeking a greater meaning. Prepare for an inner journey, where every word is a lantern in the darkness.</p>
            `,
            ar: `
                <p>تبدأ الرحلة نحو الحقيقة بخطوة متواضعة، برغبة في البحث وراء ظلال الحياة اليومية. *طريق الخلاص* ليس مجرد كتاب؛ بل هو دعوة لاستكشاف أعماق الروح البشرية واكتشاف النور الكامن في كل منا. هذه المقدمة تضع الأساس لسعي روحي، حيث كل فصل هو خطوة نحو اليقظة.</p>
                <p>في عالم يعمه الفوضى وعدم اليقين، يقدم المؤلف، أحمد سعيد أيدارا، تأملاً خالداً حول الإيمان والأمل والصمود. هذا النص يخاطب أولئك الذين يجرؤون على التساؤل، أولئك الذين يبحثون عن معنى أعظم. استعد لرحلة داخلية، حيث كل كلمة هي فانوس في الظلام.</p>
            `
        }
    },
    foreword: {
        title: {
            fr: "Avant-propos",
            en: "Foreword",
            ar: "التمهيد"
        },
        content: {
            fr: `
                <p>Cher lecteur, ce livre est né d’un désir profond de partager une vision d’espoir et de guidance. *La Voie du Salut* n’est pas un simple récit, mais un compagnon pour ceux qui cherchent à comprendre leur place dans l’univers. Chaque chapitre est conçu pour éclairer un aspect de la condition humaine, de la lutte intérieure à la paix extérieure.</p>
                <p>En écrivant ce livre, j’ai puisé dans les enseignements de la vie, les expériences des âmes croisées sur mon chemin, et une foi inébranlable en un avenir meilleur. Que ce texte soit pour vous une source d’inspiration, un miroir de vos propres aspirations, et un guide vers la sérénité.</p>
            `,
            en: `
                <p>Dear reader, this book was born from a deep desire to share a vision of hope and guidance. *The Path to Salvation* is not merely a story, but a companion for those seeking to understand their place in the universe. Each chapter is designed to illuminate an aspect of the human condition, from inner struggles to outer peace.</p>
                <p>In writing this book, I drew from life’s teachings, the experiences of souls I’ve met along the way, and an unwavering faith in a brighter future. May this text be a source of inspiration, a mirror of your own aspirations, and a guide toward serenity.</p>
            `,
            ar: `
                <p>أيها القارئ العزيز، ولد هذا الكتاب من رغبة عميقة في مشاركة رؤية الأمل والهداية. *طريق الخلاص* ليس مجرد قصة، بل رفيق لمن يسعون لفهم مكانهم في الكون. تم تصميم كل فصل لإلقاء الضوء على جانب من جوانب الحالة البشرية، من الصراعات الداخلية إلى السلام الخارجي.</p>
                <p>في كتابة هذا الكتاب، استمددت من تعاليم الحياة، وتجارب الأرواح التي قابلتها في طريقي، وإيمان لا يتزعزع بمستقبل أفضل. فليكن هذا النص مصدر إلهام لك، ومرآة لطموحاتك الخاصة، ودليلًا نحو الصفاء.</p>
            `
        }
    },
    chapters: [
        {
            id: "chapter1",
            title: {
                fr: "Chapitre 1 : Le Premier Pas",
                en: "Chapter 1: The First Step",
                ar: "الفصل الأول: الخطوة الأولى"
            },
            content: {
                fr: `
                    <p>Amadou se tenait au sommet d’une colline, le vent caressant son visage fatigué. Il avait marché pendant des jours, guidé par une étoile qu’il voyait dans ses rêves. Cette étoile, disait-il, était le signe d’un destin plus grand. Mais aujourd’hui, ses doutes pesaient lourd. Était-il vraiment sur la bonne voie ?</p>
                    <p>La vallée en contrebas s’étendait, verdoyante et pleine de promesses. Pourtant, Amadou savait que chaque pas vers l’inconnu était un défi. Il se remémora les paroles de son maître : « La vérité ne se trouve pas en restant immobile. » Prenant une profonde inspiration, il descendit la colline, déterminé à poursuivre.</p>
                    <p>Sur son chemin, il rencontra une vieille femme assise près d’un puits. Elle lui offrit de l’eau et un sourire. « Où vas-tu, voyageur ? » demanda-t-elle. Amadou hésita, puis répondit : « Je cherche la lumière. » La femme hocha la tête, comme si elle comprenait. « Alors, souviens-toi : la lumière est déjà en toi. »</p>
                `,
                en: `
                    <p>Amadou stood atop a hill, the wind brushing his weary face. He had walked for days, guided by a star he saw in his dreams. That star, he said, was the sign of a greater destiny. But today, his doubts weighed heavily. Was he truly on the right path?</p>
                    <p>The valley below stretched out, green and full of promise. Yet, Amadou knew that each step into the unknown was a challenge. He recalled his master’s words: “Truth is not found by standing still.” Taking a deep breath, he descended the hill, determined to press on.</p>
                    <p>Along the way, he met an old woman sitting by a well. She offered him water and a smile. “Where are you going, traveler?” she asked. Amadou hesitated, then replied, “I seek the light.” The woman nodded, as if she understood. “Then remember: the light is already within you.”</p>
                `,
                ar: `
                    <p>وقف أمادو على قمة تل، والريح تداعب وجهه المتعب. كان قد سار لأيام، يهديه نجم رآه في أحلامه. هذا النجم، كما قال، كان علامة على مصير أعظم. لكن اليوم، كانت شكوكه تثقل كاهله. هل كان حقًا على الطريق الصحيح؟</p>
                    <p>امتد الوادي أدناه، أخضر ومليء بالوعود. ومع ذلك، كان أمادو يعلم أن كل خطوة نحو المجهول هي تحدٍ. تذكر كلمات أستاذه: "الحقيقة لا تُوجد بالوقوف ساكنًا." أخذ نفسًا عميقًا، ونزل التل، مصممًا على الاستمرار.</p>
                    <p>في طريقه، التقى بامرأة عجوز جالسة بالقرب من بئر. قدمت له الماء وابتسامة. "إلى أين أنت ذاهب، أيها المسافر؟" سألت. تردد أمادو، ثم أجاب: "أبحث عن النور." أومأت المرأة برأسها، كما لو أنها فهمت. "إذن تذكر: النور موجود بالفعل داخلك."</p>
                `
            }
        },
        {
            id: "chapter2",
            title: {
                fr: "Chapitre 2 : Les Échos de l’Âme",
                en: "Chapter 2: Echoes of the Soul",
                ar: "الفصل الثاني: أصداء الروح"
            },
            content: {
                fr: `
                    <p>La nuit était tombée, et Amadou s’était arrêté dans une clairière. Autour d’un feu modeste, il écoutait le chant des grillons. Mais ce n’était pas le seul son qui l’entourait. Dans son esprit, des voix anciennes murmuraient, des souvenirs qu’il ne comprenait pas encore.</p>
                    <p>Il sortit un vieux carnet, hérité de son père. Les pages jaunies contenaient des poèmes et des proverbes, chacun semblant porter une leçon. L’un d’eux disait : « L’âme parle quand le cœur est silencieux. » Amadou ferma les yeux, essayant d’écouter cette voix intérieure.</p>
                    <p>Alors qu’il méditait, une vision lui apparut : une rivière scintillante, bordée d’arbres dorés. Une voix douce lui parla : « Suis le courant, mais n’oublie pas d’où tu viens. » Lorsqu’il rouvrit les yeux, le feu crépitait toujours, mais il se sentait changé.</p>
                `,
                en: `
                    <p>Night had fallen, and Amadou had stopped in a clearing. Around a modest fire, he listened to the crickets’ song. But it wasn’t the only sound surrounding him. In his mind, ancient voices whispered, memories he didn’t yet understand.</p>
                    <p>He took out an old notebook, inherited from his father. The yellowed pages held poems and proverbs, each seeming to carry a lesson. One read: “The soul speaks when the heart is silent.” Amadou closed his eyes, trying to listen to that inner voice.</p>
                    <p>As he meditated, a vision came to him: a shimmering river, lined with golden trees. A gentle voice spoke: “Follow the current, but do not forget where you came from.” When he opened his eyes, the fire still crackled, but he felt transformed.</p>
                `,
                ar: `
                    <p>حل الليل، وتوقف أمادو في مكان مفتوح. حول نار متواضعة، استمع إلى أغنية الصراصير. لكنها لم تكن الأصوات الوحيدة التي تحيط به. في ذهنه، كانت أصوات قديمة تهمس، ذكريات لم يفهمها بعد.</p>
                    <p>أخرج دفترًا قديمًا، ورثه عن والده. كانت الصفحات المصفرة تحمل قصائد وأمثالاً، كل منها يبدو أنه يحمل درسًا. كتب أحدها: "الروح تتكلم عندما يكون القلب صامتًا." أغلق أمادو عينيه، محاولًا الاستماع إلى ذلك الصوت الداخلي.</p>
                    <p>أثناء تأمله، ظهرت له رؤية: نهر متلألئ، تصطف على ضفافه أشجار ذهبية. تحدث صوت رقيق: "اتبع التيار، لكن لا تنس من أين أتيت." عندما فتح عينيه، كانت النار لا تزال تتأجج، لكنه شعر بأنه تغير.</p>
                `
            }
        },
        // ... Chapitres 3 à 41 (exemple réduit pour brièveté, structure identique) ...
        {
            id: "chapter42",
            title: {
                fr: "Chapitre 42 : La Lumière Éternelle",
                en: "Chapter 42: The Eternal Light",
                ar: "الفصل الثاني والأربعون: النور الأبدي"
            },
            content: {
                fr: `
                    <p>Après des années de voyage, Amadou se tenait enfin devant la montagne sacrée. Le sommet, baigné de lumière, semblait toucher les étoiles. Chaque épreuve, chaque doute, l’avait conduit ici. Il sentit une paix profonde, comme si l’univers entier lui parlait.</p>
                    <p>Il gravit les derniers mètres, et au sommet, il trouva un autel simple, orné d’une flamme qui ne vacillait jamais. Une voix résonna, non pas dans ses oreilles, mais dans son cœur : « Tu as trouvé la voie, car tu as cru en toi. » Amadou sourit, sachant que son voyage ne faisait que commencer.</p>
                    <p>En redescendant, il savait qu’il porterait cette lumière partout où il irait. *La Voie du Salut* n’était pas une destination, mais un chemin éternel, un appel à vivre avec courage et amour.</p>
                `,
                en: `
                    <p>After years of journeying, Amadou stood before the sacred mountain. The summit, bathed in light, seemed to touch the stars. Every trial, every doubt, had led him here. He felt a profound peace, as if the entire universe were speaking to him.</p>
                    <p>He climbed the final meters, and at the summit, he found a simple altar, adorned with a flame that never flickered. A voice resounded, not in his ears, but in his heart: “You have found the path, for you believed in yourself.” Amadou smiled, knowing his journey was just beginning.</p>
                    <p>As he descended, he knew he would carry this light wherever he went. *The Path to Salvation* was not a destination, but an eternal path, a call to live with courage and love.</p>
                `,
                ar: `
                    <p>بعد سنوات من الترحال، وقف أمادو أمام الجبل المقدس. كانت القمة، المغطاة بالنور، تبدو وكأنها تلمس النجوم. كل محنة، كل شك، قادته إلى هنا. شعر بسلام عميق، كما لو أن الكون بأسره يتحدث إليه.</p>
                    <p>تسلق الأمتار الأخيرة، وعلى القمة، وجد مذبحًا بسيطًا، مزينًا بلهب لا يتلاشى أبدًا. صدى صوت، ليس في أذنيه، بل في قلبه: "لقد وجدت الطريق، لأنك آمنت بنفسك." ابتسم أمادو، عالمًا أن رحلته لم تبدأ بعد.</p>
                    <p>عندما نزل، عرف أنه سيحمل هذا النور أينما ذهب. *طريق الخلاص* لم يكن وجهة، بل طريقًا أبديًا، دعوة للعيش بشجاعة وحب.</p>
                `
            }
        }
    ]
};
