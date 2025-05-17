const chapters = [
  {
    chapter: 1,
    fr: "Dans le silence de l’aube, la vérité s’éveille. Le cœur de l’homme cherche une voie, une lumière. Ce chapitre inaugure notre voyage vers le salut, où chaque mot est un pas et chaque pensée, une prière.",
    en: "In the silence of dawn, truth awakens. Man’s heart seeks a path, a light. This chapter opens our journey toward salvation, where each word is a step and each thought, a prayer.",
    ar: "في صمت الفجر، تستيقظ الحقيقة. قلب الإنسان يبحث عن طريق ونور. هذا الفصل يفتتح رحلتنا نحو الخلاص، حيث كل كلمة خطوة، وكل فكرة دعاء."
  },
  {
    chapter: 2,
    fr: "La foi ne naît pas du hasard, mais d’un appel intérieur. Quand le monde crie, l’âme écoute. C’est dans cette écoute que s’ancre le début de toute transformation véritable.",
    en: "Faith is not born of chance, but from an inner calling. When the world screams, the soul listens. It is in this listening that true transformation begins.",
    ar: "الإيمان لا يولد من صدفة، بل من نداء داخلي. عندما يصرخ العالم، تُنصت الروح. وفي هذا الإصغاء تبدأ التحولات الحقيقية."
  },
  {
    chapter: 3,
    fr: "Le doute est l’ombre de la certitude. Il faut l’accueillir, non le fuir. Car dans l’ombre du doute, brille souvent la lumière de la vérité la plus pure.",
    en: "Doubt is the shadow of certainty. It must be welcomed, not feared. For within the shadow of doubt often shines the light of the purest truth.",
    ar: "الشك هو ظل اليقين. يجب أن نرحب به، لا أن نهرب منه. ففي ظل الشك، يتلألأ غالبًا نور الحقيقة الأصفى."
  },
  {
    chapter: 4,
    fr: "Chaque pas vers la lumière est une victoire sur l’obscurité. Ce chapitre rappelle que le chemin est parfois ardu, mais que la persévérance éclaire chaque détour.",
    en: "Each step toward the light is a victory over darkness. This chapter reminds us that the path can be tough, but perseverance lights every twist.",
    ar: "كل خطوة نحو النور هي انتصار على الظلام. يذكرنا هذا الفصل أن الطريق قد يكون صعبًا، لكن المثابرة تضيء كل منعطف."
  },
  {
    chapter: 5,
    fr: "L’amour véritable transcende les barrières. Il unit les âmes et donne sens à la quête du salut. Ce chapitre explore la force unificatrice de l’amour divin.",
    en: "True love transcends barriers. It unites souls and gives meaning to the quest for salvation. This chapter explores the unifying power of divine love.",
    ar: "الحب الحقيقي يتجاوز الحواجز. يوحد الأرواح ويعطي معنى للسعي نحو الخلاص. يستكشف هذا الفصل قوة الحب الإلهي الموحدة."
  },
  {
    chapter: 6,
    fr: "Le pardon est un pont vers la liberté intérieure. Libérer l’autre, c’est surtout se libérer soi-même. Ce chapitre invite à ouvrir ce pont vers la paix.",
    en: "Forgiveness is a bridge to inner freedom. To free the other is mostly to free oneself. This chapter invites us to open that bridge toward peace.",
    ar: "المغفرة جسر نحو الحرية الداخلية. تحرير الآخر هو في الغالب تحرير الذات. يدعونا هذا الفصل لفتح ذلك الجسر نحو السلام."
  },
  {
    chapter: 7,
    fr: "La sagesse s’acquiert dans le silence et l’écoute. Ce chapitre souligne l’importance de l’humilité pour recevoir les vérités profondes qui guident le salut.",
    en: "Wisdom is gained in silence and listening. This chapter highlights the importance of humility to receive the deep truths that guide salvation.",
    ar: "تُكتسب الحكمة في الصمت والاستماع. يسلط هذا الفصل الضوء على أهمية التواضع لتلقي الحقائق العميقة التي ترشد إلى الخلاص."
  },
  {
    chapter: 8,
    fr: "La prière est un dialogue entre l’âme et l’infini. Ce chapitre invite à cultiver ce lien sacré pour avancer avec confiance sur le chemin du salut.",
    en: "Prayer is a dialogue between the soul and the infinite. This chapter invites cultivating this sacred bond to move forward with confidence on the path to salvation.",
    ar: "الصلاة حوار بين الروح واللانهاية. يدعو هذا الفصل إلى تنمية هذا الرابط المقدس للتقدم بثقة في طريق الخلاص."
  },
  {
    chapter: 9,
    fr: "Le sacrifice n’est pas une perte, mais un gain spirituel. Ce chapitre explore comment renoncer au superflu ouvre la porte à l’essentiel.",
    en: "Sacrifice is not a loss but a spiritual gain. This chapter explores how letting go of the superfluous opens the door to the essential.",
    ar: "التضحية ليست خسارة بل مكسب روحي. يستكشف هذا الفصل كيف يفتح التخلي عن الزائد باب الجوهر."
  },
  {
    chapter: 10,
    fr: "L’espérance est la flamme qui éclaire même les nuits les plus sombres. Ce chapitre encourage à nourrir cette flamme intérieure qui jamais ne s’éteint.",
    en: "Hope is the flame that lights even the darkest nights. This chapter encourages nurturing this inner flame that never goes out.",
    ar: "الأمل هو الشعلة التي تضيء حتى أحلك الليالي. يشجع هذا الفصل على تغذية هذه الشعلة الداخلية التي لا تنطفئ أبداً."
  },
  {
    chapter: 11,
    fr: "Le chemin du salut est pavé de choix. Ce chapitre rappelle que chaque décision, même minime, façonne notre destin spirituel.",
    en: "The path to salvation is paved with choices. This chapter reminds us that every decision, even small, shapes our spiritual destiny.",
    ar: "طريق الخلاص مرصوف بالخيارات. يذكرنا هذا الفصل أن كل قرار، حتى لو كان صغيرًا، يشكل مصيرنا الروحي."
  },
  {
    chapter: 12,
    fr: "La vérité est un phare qui ne vacille jamais. Ce chapitre invite à chercher cette lumière même lorsque les vents du doute soufflent fort.",
    en: "Truth is a beacon that never wavers. This chapter invites seeking this light even when the winds of doubt blow strong.",
    ar: "الحقيقة هي منارة لا تتذبذب أبداً. يدعو هذا الفصل إلى البحث عن هذا النور حتى عندما تهب رياح الشك بقوة."
  },
  {
    chapter: 13,
    fr: "L’humilité ouvre les portes de la sagesse. Ce chapitre montre que reconnaître ses limites est la première étape vers la grandeur spirituelle.",
    en: "Humility opens the doors of wisdom. This chapter shows that recognizing one’s limits is the first step toward spiritual greatness.",
    ar: "التواضع يفتح أبواب الحكمة. يظهر هذا الفصل أن الاعتراف بالحدود هو الخطوة الأولى نحو العظمة الروحية."
  },
  {
    chapter: 14,
    fr: "La compassion est un langage universel. Ce chapitre révèle comment elle peut guérir les blessures du monde et rapprocher les cœurs.",
    en: "Compassion is a universal language. This chapter reveals how it can heal the wounds of the world and bring hearts closer.",
    ar: "الرحمة هي لغة عالمية. يكشف هذا الفصل كيف يمكنها شفاء جراح العالم وتقريب القلوب."
  },
  {
    chapter: 15,
    fr: "Le pardon est le souffle qui renouvelle l’âme. Ce chapitre invite à libérer les chaînes du passé pour embrasser la liberté du présent.",
    en: "Forgiveness is the breath that renews the soul. This chapter invites releasing the chains of the past to embrace the freedom of the present.",
    ar: "المغفرة هي النفس الذي يجدد الروح. يدعو هذا الفصل إلى تحرير قيود الماضي لاحتضان حرية الحاضر."
  },
  {
    chapter: 16,
    fr: "La paix intérieure est le trésor caché du salut. Ce chapitre guide vers les pratiques qui cultivent ce joyau précieux au cœur de chaque être.",
    en: "Inner peace is the hidden treasure of salvation. This chapter guides toward practices that cultivate this precious jewel in the heart of every being.",
    ar: "السلام الداخلي هو الكنز المخفي للخلاص. يوجه هذا الفصل نحو الممارسات التي تزرع هذه الجوهرة الثمينة في قلب كل كائن."
  },
  {
    chapter: 17,
    fr: "La patience est la clé qui déverrouille les portes du temps. Ce chapitre enseigne comment attendre avec foi le moment juste pour chaque chose.",
    en: "Patience is the key that unlocks the doors of time. This chapter teaches how to wait with faith for the right moment for everything.",
    ar: "الصبر هو المفتاح الذي يفتح أبواب الزمن. يعلّم هذا الفصل كيفية الانتظار بالإيمان للحظة المناسبة لكل شيء."
  },
  {
    chapter: 18,
    fr: "La sagesse est un arbre aux racines profondes. Ce chapitre explique comment l’expérience nourrit ces racines pour une croissance durable.",
    en: "Wisdom is a tree with deep roots. This chapter explains how experience nourishes these roots for sustainable growth.",
    ar: "الحكمة شجرة ذات جذور عميقة. يشرح هذا الفصل كيف تغذي التجربة هذه الجذور لنمو مستدام."
  },
  {
    chapter: 19,
    fr: "Le courage est la flamme qui brille dans la nuit de l’incertitude. Ce chapitre encourage à affronter les peurs avec détermination et lumière.",
    en: "Courage is the flame that shines in the night of uncertainty. This chapter encourages facing fears with determination and light.",
    ar: "الشجاعة هي الشعلة التي تضيء في ليل عدم اليقين. يشجع هذا الفصل على مواجهة المخاوف بالعزيمة والنور."
  },
  {
    chapter: 20,
    fr: "L’espérance est un oiseau qui chante au cœur des tempêtes. Ce chapitre invite à écouter ce chant pour trouver force et renouveau.",
    en: "Hope is a bird that sings in the heart of storms. This chapter invites listening to this song to find strength and renewal.",
    ar: "الأمل هو طائر يغني في قلب العواصف. يدعو هذا الفصل إلى الاستماع إلى هذه الأغنية للعثور على القوة والتجدد."
  },
  {
    chapter: 21,
    fr: "La vérité libère, même quand elle dérange. Ce chapitre explore le courage nécessaire pour embrasser cette liberté avec authenticité.",
    en: "Truth frees, even when it disturbs. This chapter explores the courage needed to embrace this freedom with authenticity.",
    ar: "الحقيقة تحرر، حتى عندما تزعج. يستكشف هذا الفصل الشجاعة اللازمة لاحتضان هذه الحرية بصدق."
  },
  {
    chapter: 22,
    fr: "L’amour de soi est la fondation du salut. Ce chapitre rappelle que se chérir est le premier pas pour aimer les autres véritablement.",
    en: "Self-love is the foundation of salvation. This chapter reminds that cherishing oneself is the first step to truly loving others.",
    ar: "حب الذات هو أساس الخلاص. يذكرنا هذا الفصل أن تقدير الذات هو الخطوة الأولى لمحبة الآخرين حقاً."
  },
  {
    chapter: 23,
    fr: "Le silence est un sanctuaire où l’âme se ressource. Ce chapitre invite à cultiver ce refuge intérieur pour mieux entendre la voix divine.",
    en: "Silence is a sanctuary where the soul recharges. This chapter invites cultivating this inner refuge to better hear the divine voice.",
    ar: "الصمت هو ملاذ تعيد فيه الروح شحن طاقتها. يدعو هذا الفصل إلى تنمية هذا الملجأ الداخلي لسماع الصوت الإلهي بشكل أفضل."
  },
  {
    chapter: 24,
    fr: "La gratitude transforme chaque instant en bénédiction. Ce chapitre enseigne comment voir le monde avec des yeux reconnaissants et ouverts.",
    en: "Gratitude transforms every moment into a blessing. This chapter teaches how to see the world with grateful and open eyes.",
    ar: "الامتنان يحول كل لحظة إلى نعمة. يعلّم هذا الفصل كيف نرى العالم بعينين ممتنّتين ومنفتحتين."
  },
  {
    chapter: 25,
    fr: "La confiance est un pont fragile qui relie le cœur à l’espoir. Ce chapitre révèle les moyens de renforcer ce pont pour traverser les épreuves.",
    en: "Trust is a fragile bridge linking the heart to hope. This chapter reveals ways to strengthen this bridge to overcome trials.",
    ar: "الثقة جسر هش يربط القلب بالأمل. يكشف هذا الفصل طرق تقوية هذا الجسر لعبور المحن."
  },
  {
    chapter: 26,
    fr: "La lumière intérieure éclaire les sentiers cachés. Ce chapitre invite à découvrir cette lumière pour éviter les pièges du doute et de la peur.",
    en: "Inner light illuminates hidden paths. This chapter invites discovering this light to avoid traps of doubt and fear.",
    ar: "النور الداخلي يضيء الطرق الخفية. يدعو هذا الفصل لاكتشاف هذا النور لتجنب فخاخ الشك والخوف."
  },
  {
    chapter: 27,
    fr: "La simplicité est la clé d’une vie harmonieuse. Ce chapitre montre comment alléger le poids du superflu pour mieux goûter l’essentiel.",
    en: "Simplicity is the key to a harmonious life. This chapter shows how to lighten the weight of the superfluous to better enjoy the essential.",
    ar: "البساطة هي مفتاح الحياة المتناغمة. يوضح هذا الفصل كيف نخفف عبء الزائد للاستمتاع بالجوهر بشكل أفضل."
  },
  {
    chapter: 28,
    fr: "L’humilité est le berceau de la grandeur spirituelle. Ce chapitre explique que reconnaître ses faiblesses ouvre la voie à la véritable force.",
    en: "Humility is the cradle of spiritual greatness. This chapter explains that recognizing one’s weaknesses opens the way to true strength.",
    ar: "التواضع هو مهد العظمة الروحية. يشرح هذا الفصل أن الاعتراف بالضعف يفتح الطريق إلى القوة الحقيقية."
  },
  {
    chapter: 29,
    fr: "La joie authentique naît d’un cœur en paix. Ce chapitre explore les sources de cette joie durable au-delà des plaisirs éphémères.",
    en: "Authentic joy arises from a peaceful heart. This chapter explores the sources of this lasting joy beyond fleeting pleasures.",
    ar: "الفرح الحقيقي ينبع من قلب مسالم. يستكشف هذا الفصل مصادر هذا الفرح الدائم بعيدًا عن المتع الزائلة."
  },
  {
    chapter: 30,
    fr: "Le service aux autres est un chemin vers soi-même. Ce chapitre montre comment donner sans attendre enrichit l’âme et le monde.",
    en: "Service to others is a path to oneself. This chapter shows how giving without expecting enriches the soul and the world.",
    ar: "الخدمة للآخرين هي طريق نحو الذات. يوضح هذا الفصل كيف أن العطاء بلا انتظار يثري الروح والعالم."
  },
  {
    chapter: 31,
    fr: "La vérité intérieure guide au-delà des apparences. Ce chapitre invite à écouter cette voix discrète qui révèle le sens profond de la vie.",
    en: "Inner truth guides beyond appearances. This chapter invites listening to this quiet voice that reveals life’s deeper meaning.",
    ar: "الحقيقة الداخلية تهدي أبعد من المظاهر. يدعو هذا الفصل للاستماع إلى هذا الصوت الهادئ الذي يكشف المعنى العميق للحياة."
  },
  {
    chapter: 32,
    fr: "La liberté véritable naît de la conscience. Ce chapitre explore comment la prise de conscience libère des chaînes invisibles.",
    en: "True freedom is born from awareness. This chapter explores how awareness frees from invisible chains.",
    ar: "الحرية الحقيقية تولد من الوعي. يستكشف هذا الفصل كيف يحرر الوعي من القيود غير المرئية."
  },
  {
    chapter: 33,
    fr: "La persévérance transforme les obstacles en tremplins. Ce chapitre encourage à voir chaque difficulté comme une opportunité de croissance.",
    en: "Perseverance transforms obstacles into stepping stones. This chapter encourages seeing every difficulty as a growth opportunity.",
    ar: "المثابرة تحول العقبات إلى درجات سلم. يشجع هذا الفصل على رؤية كل صعوبة كفرصة للنمو."
  },
  {
    chapter: 34,
    fr: "Le cœur ouvert attire la lumière. Ce chapitre invite à ouvrir son être pour recevoir les bienfaits invisibles du salut.",
    en: "An open heart attracts light. This chapter invites opening oneself to receive the invisible blessings of salvation.",
    ar: "القلب المفتوح يجذب النور. يدعو هذا الفصل إلى فتح الذات لتلقي النعم الخفية للخلاص."
  },
  {
    chapter: 35,
    fr: "La méditation est le souffle de l’âme. Ce chapitre montre comment cette pratique nourrit le calme et la clarté intérieure.",
    en: "Meditation is the breath of the soul. This chapter shows how this practice nurtures calm and inner clarity.",
    ar: "التأمل هو نفس الروح. يوضح هذا الفصل كيف تغذي هذه الممارسة الهدوء والوضوح الداخلي."
  },
  {
    chapter: 36,
    fr: "Le respect de la création est un acte de foi. Ce chapitre révèle le lien sacré entre le salut et la protection de notre monde.",
    en: "Respect for creation is an act of faith. This chapter reveals the sacred link between salvation and protecting our world.",
    ar: "احترام الخلق هو فعل إيمان. يكشف هذا الفصل الصلة المقدسة بين الخلاص وحماية عالمنا."
  },
  {
    chapter: 37,
    fr: "L’altruisme élève l’âme. Ce chapitre révèle comment penser aux autres enrichit notre propre quête spirituelle.",
    en: "Altruism elevates the soul. This chapter reveals how thinking of others enriches our own spiritual quest.",
    ar: "الإيثار يرفع الروح. يكشف هذا الفصل كيف أن التفكير في الآخرين يغني سعينا الروحي."
  },
  {
    chapter: 38,
    fr: "La confiance en soi est un pilier du salut. Ce chapitre montre comment cultiver cette force intérieure face aux défis de la vie.",
    en: "Self-confidence is a pillar of salvation. This chapter shows how to cultivate this inner strength facing life’s challenges.",
    ar: "الثقة بالنفس هي عمود الخلاص. يوضح هذا الفصل كيفية زراعة هذه القوة الداخلية في مواجهة تحديات الحياة."
  },
  {
    chapter: 39,
    fr: "L’altruisme élève l’âme. Ce chapitre révèle comment penser aux autres enrichit notre propre quête spirituelle.",
    en: "Altruism elevates the soul. This chapter reveals how thinking of others enriches our own spiritual quest.",
    ar: "الإيثار يرفع الروح. يكشف هذا الفصل كيف أن التفكير في الآخرين يغني سعينا الروحي."
  },
  {
    chapter: 40,
    fr: "La joie partagée est un trésor multiplié. Ce chapitre invite à répandre la joie pour amplifier la lumière du salut autour de soi.",
    en: "Shared joy is a multiplied treasure. This chapter invites spreading joy to amplify the light of salvation around us.",
    ar: "الفرح المشترك هو كنز مضاعف. يدعو هذا الفصل إلى نشر الفرح لتكبير نور الخلاص حولنا."
  },
  {
    chapter: 41,
    fr: "Le chemin spirituel est un art de vivre. Ce chapitre rappelle que chaque instant est une toile où peindre sa quête du salut.",
    en: "The spiritual path is an art of living. This chapter reminds that every moment is a canvas to paint one’s quest for salvation.",
    ar: "الطريق الروحي هو فن الحياة. يذكر هذا الفصل أن كل لحظة هي لوحة نرسم عليها سعينا للخلاص."
  },
  {
    chapter: 42,
    fr: "Le salut est un horizon infini. Ce dernier chapitre ouvre la porte à une quête sans fin, où chaque fin est un nouveau commencement.",
    en: "Salvation is an infinite horizon. This final chapter opens the door to an endless quest, where every ending is a new beginning.",
    ar: "الخلاص هو أفق لا نهاية له. يفتح هذا الفصل الأخير الباب لسعي لا نهائي، حيث كل نهاية بداية جديدة."
  }
];
