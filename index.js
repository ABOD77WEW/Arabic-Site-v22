
const { useState, useEffect, useRef, useMemo } = React;

const SectionType = {
    START: 'البداية', PREFACE: 'تمهيد', POET: 'تعريف بالشاعر', VERSES: 'الأبيات',
    VOCABULARY: 'معاني المفردات', ANALYSIS: 'التحليل', QUESTIONS: 'الأسئلة'
};

const POEM_VERSES = [
    { firstHalf: "نبئيه عن شأنه نبئيه", secondHalf: "واصدقيه الحديث لا تكذبيه" },
    { firstHalf: "هو عمرو المضروب أمس ولكن", secondHalf: "هو زيد في يومه فاحذريه" },
    { firstHalf: "لقنته حوادث الدهر درسا", secondHalf: "نال منه مرونة التفقية" },
    { firstHalf: "إن شعبي يا حادثات الليالي", secondHalf: "هو شعبي إن كنت لا تعرفيه" },
    { firstHalf: "أرغم الأنف من بنياتك السود", secondHalf: "فباتت مذعورة تّتقيه" },
    { firstHalf: "أنت يا حادثات أهون قدراً", secondHalf: "أن تسدي طريقه فاتركيه" },
    { firstHalf: "لا تغري بشأنه لو تنزى", secondHalf: "ألماً من جراحه في بنيه" },
    { firstHalf: "فلئن خانه التقدم حينا", secondHalf: "لم يخنه وعي النبيل النبيه" },
    { firstHalf: "خطوات تبغي الأمام وعزم", secondHalf: "صامد أو ينال ما يبتغيه" },
    { firstHalf: "خطوة العلم خطوة لا تجارى", secondHalf: "ويد العلم خير ما يقتنيه" },
    { firstHalf: "والقويّ الأبي من تخذ العلم", secondHalf: "سلاحاً يصول في غاصبيه" },
    { firstHalf: "يا شباب البلاد يا أمل الجيل", secondHalf: "ويا منية الرجاء النزيه" },
    { firstHalf: "أنتم مطمح البصائر والأبصار", secondHalf: "للشعب نقطة التنويه" },
    { firstHalf: "واسعوا نحوه خطاكم وردوا", secondHalf: "فيه رأي الخمول بالتسفيه" },
    { firstHalf: "استردوا بعزمه فائت المجد", secondHalf: "طموحاً فالمجد في طامحيه" },
    { firstHalf: "واستعينوا به لكل عظيم", secondHalf: "فهو نعم المعين للمصطفيه" },
    { firstHalf: "يا نداء الحياة أنت حيي", secondHalf: "والهوى فيك صادق التوجيه" },
    { firstHalf: "قم فعبر عما تريد لعلي", secondHalf: "أركب الصعب دون ما تتقيه" },
    { firstHalf: "إن يكن سامك الزمان عذاباً", secondHalf: "فقديماً كم سام من يبتليه" }
];

const VOCABULARY_DATA = [
    { word: "نبئيه", meaning: "أخبره وأعلمه بالخبر الهام." },
    { word: "تنزي", meaning: "وثب وقفز بشدة من فرط الألم." },
    { word: "حوادث", meaning: "وقائع الدهر ومصائبه وتقلباته." },
    { word: "التفقية", meaning: "الفهم والوعي والإدراك العميق." },
    { word: "تخذ", meaning: "اتخذ واعتمد سلاحاً أو وسيلة." },
    { word: "بنياتك السود", meaning: "كناية عن دواهي ومصائب الليالي الشديدة." },
    { word: "تتقيه", meaning: "تخشاه وتتجنبه وتحذر منه." },
    { word: "تسدي", meaning: "تغلق وتعترض الطريق وتمنع المرور." },
    { word: "سامك", meaning: "أذاقك العذاب أو كلفك ما يشق عليك." },
    { word: "النبيه", meaning: "الفطن الذكي الذي يدرك بواطن الأمور." },
    { word: "يبتغيه", meaning: "يطلبه ويريده ويسعى خلفه." },
    { word: "لا تجارى", meaning: "لا يمكن سبقها أو منافستها لعظمتها." },
    { word: "يقتنيه", meaning: "يمتلكه ويحرص على الاحتفاظ به." },
    { word: "الأبي", meaning: "عزيز النفس الذي يرفض الذل والهوان." },
    { word: "يصول", meaning: "يجول بقوة ويهجم على الخصم باقتدار." },
    { word: "غاصبيه", meaning: "الذين سلبوا الحقوق والأرض بالقوة." },
    { word: "منية", meaning: "أقصى غاية أو أمنية يرجى تحقيقها." },
    { word: "التنويه", meaning: "الإشادة والذكر الحسن والرفعة." },
    { word: "الخمول", meaning: "الكسل والفتور والضعة والنسيان." },
    { word: "التسفيه", meaning: "الاستخفاف والتحقير والنسبة إلى الجهل." }
];

const POEM_QUESTIONS = [
    { id: 1, text: "ما الغرض الأساسي من استخدام الشاعر لأسلوب الأمر 'نبئيه' و 'اصدقيه' في مطلع القصيدة؟", options: ["النصح والتحفيز والاعتزاز", "الاستعطاف والتمني", "السخرية من الحوادث", "التعجب من حال الدهر"], correctIndex: 0 },
    { id: 2, text: "يرى الشاعر أن 'مرونة التفقية' هي سلاح الشعب. ما الدلالة العميقة لهذا التعبير؟", options: ["الضعف أمام الأزمات المتتالية", "تجاهل الواقع والهروب منه", "القدرة على الفهم والتعامل بحكمة مع الشدائد", "القوة العسكرية الصرفة"], correctIndex: 2 },
    { id: 3, text: "لماذا وصف الشاعر حادثات الليالي بأنها 'أهون قدراً' من أن تسد طريق الشعب؟", options: ["لقلة عدد هذه الحوادث وبساطتها", "لتجاهله المتعمد للمخاطر المحيطة", "لصغر مساحة التحديات التي واجهها", "لإيمانه الراسخ بعظمة وعزيمة شعبه"], correctIndex: 3 },
    { id: 4, text: "ما العلاقة التي أراد الشاعر إبرازها في قوله: 'فلئن خانه التقدم حيناً / لم يخنه وعي النبيل النبيه'؟", options: ["تأكيد الفشل الدائم في التقدم", "علاقة تضاد بين الظروف المادية وقوة الوعي", "نفي وجود أي وعي حقيقي لدى الشعب", "علاقة توافق بين الفقر والجهل"], correctIndex: 1 },
    { id: 5, text: "في البيت 'ويد العلم خير ما يقتنيه'، لماذا خص الشاعر 'اليد' بالذكر في سياق العلم؟", options: ["ليرمز إلى الجانب العملي والفعلي والمنتج للعلم", "لأن العلم يكتب باليد فقط", "للإشارة إلى القوة الجسدية للمتعلمين", "لمدح جمال الخط العربي في الكتابة"], correctIndex: 0 },
    { id: 6, text: "كيف وظف الشاعر رمزي 'عمرو' و 'زيد' في البيت الثاني للقصيدة؟", options: ["ذكر أسماء أشخاص حقيقيين عاصرهم", "لمدح قبائل معينة في ذلك الزمان", "للتعبير عن التغيير الجذري والتبدل في الشخصية العمانية", "للدعوة إلى التفرقة بين أفراد المجتمع"], correctIndex: 2 },
    { id: 7, text: "ما الرسالة التي يريد الشاعر إيصالها للشباب بوصفهم 'منية الرجاء النزيه'؟", options: ["أنهم مجرد عبء على مقدرات الوطن", "ضرورة ابتعادهم عن ميادين العلم", "أنهم لا يملكون أي تأثير في نهضة الشعب", "أنهم الأمل الصافي الذي تتحقق به الأحلام الوطنية"], correctIndex: 3 },
    { id: 8, text: "لماذا ربط الشاعر بين 'العزم' و 'استرداد المجد' في نداءاته؟", options: ["لأن الإرادة هي المحرك الأساسي لاستعادة الحضارة", "لأن المجد يأتي بمحض الصدفة والحظ", "لأن المجد إرث قديم لا يمكن تجديده", "للتقليل من شأن المجد في حياة الشعوب"], correctIndex: 0 },
    { id: 9, text: "ما القيمة التربوية التي نستخلصها من دعوة الشاعر لرد 'رأي الخمول بالتسفيه'؟", options: ["التسامح مع الكسل والقبول به", "رفض الاستسلام والتقليل من شأن قيم التكاسل", "الخوف من آراء الآخرين والانسحاب", "قبول الواقع الراكد كما هو دون تغيير"], correctIndex: 1 },
    { id: 10, text: "ما دلالة مخاطبة الشاعر للنهضة بلقب 'يا نداء الحياة'؟", options: ["التعبير عن اليأس من إصلاح الواقع", "الشعور بالتعب من متطلبات العصر", "اعتبار النهضة هي الروح الجديدة التي تحيي الأمل والوطن", "الرغبة في الانعزال عن صخب الحياة"], correctIndex: 2 }
];

const VERSE_DETAILS = [
    {
        explanation: "يخاطب الشاعر هنا الدهر أو الحوادث، طالباً منها أن تخبر العالم عن عظمة شعب عُمان وعن تاريخه المجيد، مؤكداً على ضرورة الصدق في نقل حقائق هذا الشعب العريق الذي لا يعرف الكذب.",
        vocab: [{ word: "نبئيه", meaning: "أخبريه وأعلميه" }, { word: "اصدقيه", meaning: "قولي له الحقيقة" }, { word: "شأنه", meaning: "حاله ومكانته العالية" }],
        rhetoric: "استخدام أسلوب الأمر (نبئيه، اصدقيه) غرضه النصح والتحفيز وإبراز الفخر والاعتزاز بالهوية العمانية."
    },
    {
        explanation: "يشير الشاعر إلى التغير الذي طرأ على الشخصية العمانية؛ فهي لم تعد تلك الصورة النمطية القديمة، بل أصبحت شخصية واعية وحذرة، قادرة على مواكبة العصر ومواجهة التحديات.",
        vocab: [{ word: "عمرو وزيد", meaning: "كنايات عن التبدل والتغير" }, { word: "احذريه", meaning: "تنبهي لقدراته" }, { word: "المضروب", meaning: "المتداول والمشهور" }],
        rhetoric: "استخدام الرموز التراثية (عمرو، زيد) يعكس التغير الجذري في الوعي المجتمعي والتحول من النمطية إلى الحداثة."
    },
    {
        explanation: "لقد تعلم هذا الشعب من تجارب الماضي القاسية، فاكتسب مرونة وحكمة (التفقية) مكنته من فهم الواقع بشكل أعمق والتعامل مع الصعوبات بذكاء.",
        vocab: [{ word: "لقنته", meaning: "علمته" }, { word: "مرونة", meaning: "سلاسة وقدرة على التكيف" }, { word: "التفقية", meaning: "الإدراك والوعي العميق" }],
        rhetoric: "استعارة مكنية في (لقنته حوادث الدهر)، حيث شبه الدهر بالمعلم، مما يوحي بعمق التجربة والدروس القاسية."
    },
    {
        explanation: "يؤكد الشاعر أن شعبه لا يزال متمسكاً بهويته وقوته رغم توالي المحن والظروف الصعبة، متحدياً حادثات الليالي أن تنال من عزيمته.",
        vocab: [{ word: "حادثات", meaning: "مصائب" }, { word: "تعرفيه", meaning: "تدركي حقيقته" }, { word: "الليالي", meaning: "كناية عن الزمان المتقلب" }],
        rhetoric: "أسلوب النداء (يا حادثات الليالي) يحمل طابع التحدي والمواجهة، مما يبرز قوة الشاعر وثقته بشعبه."
    },
    {
        explanation: "لقد قهر هذا الشعب كل الصعاب الشديدة والمحن المظلمة، حتى أصبحت تلك المصائب نفسها تخشى مواجهته وتتجنبه خوفاً من بأسه.",
        vocab: [{ word: "بنياتك السود", meaning: "المصائب الكبرى" }, { word: "تتقيه", meaning: "تخشاه" }, { word: "أرغم الأنف", meaning: "أذل وأخضع الصعاب" }],
        rhetoric: "كناية عن القوة والسيادة في (أرغم الأنف)، واستخدام اللون (السود) للدلالة على شدة الكروب والمحن."
    },
    {
        explanation: "يخاطب المصائب مؤكداً أنها أقل شأناً وقدرة من أن تعيق مسيرة هذا الشعب أو تسد طريقه نحو النهضة، داعياً إياها لتركه في شأنه.",
        vocab: [{ word: "أهون", meaning: "أقل وأضعف" }, { word: "تسدي", meaning: "تغلقي" }, { word: "فاتركيه", meaning: "دعيه لشأنه ومساره" }],
        rhetoric: "استخدام اسم التفضيل (أهون) للتقليل من شأن الصعاب أمام الإرادة الشعبية الصلبة."
    },
    {
        explanation: "يحذر من الانخداع بآثار الألم التي قد تظهر على الشعب نتيجة المحن؛ فهي مجرد جراح سطحية لا تنال من الجوهر الصلب والعزيمة الوثابة.",
        vocab: [{ word: "تنزى", meaning: "وثب من الألم" }, { word: "تغري", meaning: "تخادعي" }, { word: "بنيه", meaning: "أبناؤه المخلصون" }],
        rhetoric: "استخدام الفعل (تنزى) يوحي بشدة الألم وحيويته، والتحذير في (لا تغري) يعكس الوعي بالجوهر لا المظهر."
    },
    {
        explanation: "إذا كان الزمن قد أخر تقدم الشعب مادياً في فترة ما، فإن وعيه وفطنته ونباهته ظلت حاضرة دائماً، وهي المحرك الحقيقي للعودة للصدارة.",
        vocab: [{ word: "خانه", meaning: "غدر به" }, { word: "النبيه", meaning: "الفطن" }, { word: "وعي", meaning: "إدراك وفهم صحيح" }],
        rhetoric: "المقابلة بين (خانه التقدم) و (لم يخنه وعي) تبرز الانتصار المعنوي والفكري على الظروف المادية."
    },
    {
        explanation: "إن خطوات هذا الشعب تتجه بثبات نحو المستقبل، مدعومة بعزم صلب لا يلين حتى يحقق أهدافه وتطلعاته العظيمة.",
        vocab: [{ word: "تبغي", meaning: "تريد" }, { word: "صامد", meaning: "راسخ وثابت" }, { word: "يبتغيه", meaning: "يطلبه ويسعى إليه" }],
        rhetoric: "تشخيص للخطوات في (تبغي الأمام)، مما يوحي بالحيوية والإصرار على بلوغ الغايات."
    },
    {
        explanation: "يؤكد الشاعر أن طريق العلم هو الطريق الوحيد الذي لا يمكن منافسته، وأن امتلاك ناصية العلم هو أعظم ما يمكن أن يحققه الإنسان لرفعة نفسه ووطنه.",
        vocab: [{ word: "تجارى", meaning: "تجارى أو تسابق" }, { word: "يقتنيه", meaning: "يمتلكه" }, { word: "يد العلم", meaning: "كناية عن قوة المعرفة" }],
        rhetoric: "كناية عن القوة والإنتاج في (يد العلم)، وتكرار لفظ (العلم) يؤكد على محورية المعرفة في النهضة."
    },
    {
        explanation: "الإنسان القوي العزيز هو من يجعل العلم سلاحه الحقيقي؛ فبالعلم يستطيع الدفاع عن حقوقه واسترداد ما سلب منه من قبل الطامعين.",
        vocab: [{ word: "الأبي", meaning: "عزيز النفس" }, { word: "يصول", meaning: "يهجم بقوة" }, { word: "غاصبيه", meaning: "سالبو الحقوق" }],
        rhetoric: "تشبيه العلم بالسلاح في قوله (تخذ العلم سلاحاً)، مما يوضح الدور الدفاعي والسيادي للمعرفة."
    },
    {
        explanation: "ينادي الشاعر شباب الوطن، واصفاً إياهم بأنهم الأمل الحقيقي والغاية الطاهرة التي يتطلع إليها الجميع لبناء مستقبل مشرق.",
        vocab: [{ word: "منية", meaning: "أمنية وغاية" }, { word: "النزيه", meaning: "الخالص من العيوب" }, { word: "أمل الجيل", meaning: "محور التطلعات" }],
        rhetoric: "النداء المكرر (يا شباب، يا أمل الجيل، يا منية) غرضه التشويق وبث الحماس في نفوس الجيل الصاعد."
    },
    {
        explanation: "أنتم أيها الشباب محط أنظار الجميع وتطلعاتهم؛ فبكم يجد الشعب ذكره الحسن ورفعتة بين الأمم، فأنتم نقطة الضوء والتنويه.",
        vocab: [{ word: "مطمح", meaning: "غاية الأمل" }, { word: "التنويه", meaning: "الإشادة والذكر" }, { word: "البصائر", meaning: "العقول المستنيرة" }],
        rhetoric: "الجمع بين (البصائر) و (الأبصار) يدل على الشمولية؛ فأنتم محط تقدير العقل والعيان معاً."
    },
    {
        explanation: "يدعو الشباب للسعي الجاد والعمل، والرد على أصحاب الآراء الخاملة والكسولة بالاستخفاف بها (التسفيه) والتركيز على العمل المنتج.",
        vocab: [{ word: "الخمول", meaning: "الكسل" }, { word: "التسفيه", meaning: "الاستحقار" }, { word: "واسعوا", meaning: "اجتهدوا في الحركة" }],
        rhetoric: "المقابلة بين السعي الفعال وازدراء الخمول ترسم منهجاً عملياً للنجاح الوطني."
    },
    {
        explanation: "حث على استرداد المجد التاريخي من خلال العزم والطموح؛ فالمجد لا يناله إلا من يمتلك الشجاعة للحلم والسعي خلفه.",
        vocab: [{ word: "فائت", meaning: "ما مضى" }, { word: "طموحاً", meaning: "تطلعاً للأفضل" }, { word: "طامحيه", meaning: "المتطلعون للمعالي" }],
        rhetoric: "استخدام فعل الأمر (استردوا) يدل على القدرة والامتلاك، وربطه بالطموح يؤكد أن المستقبل يصنعه الحالمون."
    },
    {
        explanation: "يدعو للاستعانة بالعزم والعلم في كل أمر عظيم؛ فهما أعظم معين للإنسان المختار الذي يسعى للمعالي والتميز.",
        vocab: [{ word: "المعين", meaning: "المتساعد" }, { word: "المصطفيه", meaning: "المختارين" }, { word: "عظيم", meaning: "الأمر الجلل والهام" }],
        rhetoric: "استخدام (نعم المعين) هو أسلوب مدح يبرز قيمة الاستعانة بالعلم في المهام الجسيمة."
    },
    {
        explanation: "يحيي الشاعر 'نداء الحياة' (النهضة)، مؤكداً أن المحبة له والتوجه نحوه هو التوجه الصادق والنافع للوطن وللفرد.",
        vocab: [{ word: "حيي", meaning: "تحية وإكبار" }, { word: "صادق التوجيه", meaning: "الوجهة الصحيحة" }, { word: "الهوى", meaning: "المحبة والميل" }],
        rhetoric: "تشخيص لنداء الحياة في (يا نداء الحياة أنت حيي)، مما يعطي الطموح صفة الكائن الحي الذي يخاطب."
    },
    {
        explanation: "يدعو الشاعر للانطلاق والتعبير عن الطموحات، معلناً استعداده لخوض أصعب التحديات دون خوف أو تراجع في سبيل تحقيق النداء.",
        vocab: [{ word: "أركب الصعب", meaning: "أواجه التحديات" }, { word: "تتقيه", meaning: "تخشاه" }, { word: "عبر", meaning: "أفصح وأظهر" }],
        rhetoric: "استعارة مكنية في (أركب الصعب)، حيث صور الصعوبات دابة تركب، مما يدل على الشجاعة والسيطرة."
    },
    {
        explanation: "يختم بالتذكير بأن المعاناة والابتلاء جزء من مسيرة العظماء قديماً؛ فالزمان يختبر الصادقين في عزائمهم قبل أن يمنحهم النجاح والمجد.",
        vocab: [{ word: "سامك", meaning: "أذاقك" }, { word: "يبتليه", meaning: "يختبره" }, { word: "قديما", meaning: "منذ العصور الغابرة" }],
        rhetoric: "استخدام الأسلوب الخبري في الختام لتقرير حقيقة أزلية؛ وهي أن المجد ضريبة الصبر على الابتلاء."
    }
];

const App = () => {
    const [activeSection, setActiveSection] = useState(SectionType.START);
    const [selectedVerseIndex, setSelectedVerseIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tvSlideIndex, setTvSlideIndex] = useState(0);
    const [showFinalTitle, setShowFinalTitle] = useState(false);
    const [quizMode, setQuizMode] = useState('menu'); // menu, individual, group
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answerStatus, setAnswerStatus] = useState('idle');
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isVerseExplanationOpen, setIsVerseExplanationOpen] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const mainContentRef = useRef(null);

    // Group Quiz States
    const [groupTimer, setGroupTimer] = useState(90);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerSpeed, setTimerSpeed] = useState(1000);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const audioRef = useRef(null);
    const [isAudioOpen, setIsAudioOpen] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioCurrentTime, setAudioCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);

    // Random Screen States
    const [isRandomScreenOpen, setIsRandomScreenOpen] = useState(false);
    const [tvSpinning, setTvSpinning] = useState(false);
    const [tvHighlightIndex, setTvHighlightIndex] = useState(null);
    const [tvHistory, setTvHistory] = useState([]);
    const [tvWinner, setTvWinner] = useState(null); // For popup
    const [isPoetImageToggled, setIsPoetImageToggled] = useState(false);
    const [pPressCount, setPPressCount] = useState(0);
    const [isPoroonVisible, setIsPoroonVisible] = useState(false);
    const [vocabPPressCount, setVocabPPressCount] = useState(0);
    const [isTanzilVisible, setIsTanzilVisible] = useState(false);
    const [isTanzil2Visible, setIsTanzil2Visible] = useState(false);


    const groupQuestion = {
        text: "لماذا اعتبر الشاعر أن 'يد العلم' هي خير ما يقتنيه الإنسان؟ وكيف يسهم هذا الاقتناء في صياغة هوية الشعب وقوته أمام التحديات؟",
        answer: "اعتبر الشاعر العلم خير ما يقتنيه الإنسان لأنه السلاح الأوحد الذي لا يُجارى، وهو المحرك الأساسي للقوة والريادة. ويسهم هذا الاقتناء في صياغة هوية الشعب من خلال الوعي والنباهة، مما يجعله قادراً على مواجهة التحديات واسترداد أمجاده التاريخية بثبات وعزيمة."
    };

    const sections = Object.values(SectionType);
    const motionSteps = [
        { title: SectionType.PREFACE, desc: "مقدمة تحليلية عميقة تمهد الطريق لفهم المقاصد الوطنية والنهضوية للقصيدة." },
        { title: SectionType.POET, desc: "سيرة ذاتية مفصلة عن 'أمير البيان' عبدالله الخليلي، نشأته، دواوينه، ومكانته الأدبية." },
        { title: SectionType.VERSES, desc: "عرض تفاعلي شامل لأبيات القصيدة مع ميزات التكبير والتنقل الذكي عبر لوحة المفاتيح." },
        { title: SectionType.VOCABULARY, desc: "معجم لغوي مفسر لأهم المفردات بأسلوب يساعد على الحفظ والاستيعاب السريع." },
        { title: SectionType.ANALYSIS, desc: "وقفة نقدية فنية تستكشف الصور الجمالية والأساليب البلاغية التي صاغها الشاعر." },
        { title: SectionType.QUESTIONS, desc: "تحدي تفاعلي متطور لقياس مستوى الإدراك والفهم للقيم التربوية والوطنية." }
    ];

    const shuffledVocabulary = useMemo(() => [...VOCABULARY_DATA].sort(() => Math.random() - 0.5), [activeSection]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedVerseIndex === null) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setSelectedVerseIndex(p => p < POEM_VERSES.length - 1 ? p + 1 : p);
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setSelectedVerseIndex(p => p > 0 ? p - 1 : p);
            else if (e.key === 'Escape') setSelectedVerseIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedVerseIndex]);

    useEffect(() => {
        if (activeSection === SectionType.START && !isLoading && !showFinalTitle) {
            const interval = setInterval(() => {
                setTvSlideIndex(p => {
                    if (p === motionSteps.length - 1) { clearInterval(interval); setShowFinalTitle(true); return p; }
                    return p + 1;
                });
            }, 4500);
            return () => clearInterval(interval);
        }
    }, [activeSection, isLoading, showFinalTitle]);

    useEffect(() => {
        if (showFinalTitle) {
            const t = setTimeout(() => { setActiveSection(SectionType.PREFACE); setShowFinalTitle(false); setTvSlideIndex(0); }, 3500);
            return () => clearTimeout(t);
        }
    }, [showFinalTitle]);

    useEffect(() => {
        const handlePKeyPress = (e) => {
            if (e.key.toLowerCase() === 'p') {
                if (activeSection === SectionType.QUESTIONS) {
                    setPPressCount(prev => {
                        const next = prev + 1;
                        if (next >= 5) {
                            setIsPoroonVisible(true);
                            return 0;
                        }
                        return next;
                    });
                } else if (activeSection === SectionType.VOCABULARY) {
                    setVocabPPressCount(prev => {
                        const next = prev + 1;
                        if (next >= 2) {
                            setIsTanzilVisible(true);
                            return 0;
                        }
                        return next;
                    });
                } else if (isVerseExplanationOpen) {
                    setIsTanzil2Visible(true);
                }
            }
        };
        window.addEventListener('keydown', handlePKeyPress);
        return () => window.removeEventListener('keydown', handlePKeyPress);
    }, [activeSection, isVerseExplanationOpen]);

    const playSound = (type) => {
        try {
            const a = new (window.AudioContext || window.webkitAudioContext)();
            const g = a.createGain(); g.connect(a.destination);
            const o = a.createOscillator(); o.connect(g);
            const now = a.currentTime;

            if (type === 'startup') {
                [392, 523, 659, 783].forEach((f, i) => {
                    const o2 = a.createOscillator(), g2 = a.createGain();
                    o2.frequency.setValueAtTime(f, now + i * 0.1);
                    g2.gain.setValueAtTime(0, now + i * 0.1);
                    g2.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
                    g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
                    o2.connect(g2); g2.connect(a.destination); o2.start(now + i * 0.1); o2.stop(now + i * 0.1 + 0.6);
                });
                return;
            } else if (type === 'tick') {
                o.type = 'square'; o.frequency.setValueAtTime(1200, now);
                g.gain.setValueAtTime(0.02, now); g.gain.linearRampToValueAtTime(0, now + 0.05);
                o.start(now); o.stop(now + 0.05);
            } else if (type === 'heartbeat') {
                o.type = 'square'; o.frequency.setValueAtTime(2500, now);
                g.gain.setValueAtTime(0.1, now); g.gain.linearRampToValueAtTime(0, now + 0.08);
                o.start(now); o.stop(now + 0.09);
            } else if (type === 'finish') {
                [600, 800, 1000, 1200, 1500].forEach((f, i) => {
                    const o2 = a.createOscillator(), g2 = a.createGain();
                    o2.type = 'square';
                    o2.frequency.setValueAtTime(f, now + i * 0.15);
                    g2.gain.setValueAtTime(0.15, now + i * 0.15);
                    g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4);
                    o2.connect(g2); g2.connect(a.destination); o2.start(now + i * 0.15); o2.stop(now + i * 0.15 + 0.5);
                });
                return;
            } else if (type === 'correct') {
                o.frequency.setTargetAtTime(523, now, 0); o.frequency.exponentialRampToValueAtTime(880, now + 0.1);
                g.gain.setTargetAtTime(0.1, now, 0); g.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                o.start(); o.stop(now + 0.5);
            } else if (type === 'wrong') {
                o.frequency.setTargetAtTime(220, now, 0); o.frequency.exponentialRampToValueAtTime(110, now + 0.2);
                g.gain.setTargetAtTime(0.1, now, 0); g.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                o.start(); o.stop(now + 0.5);
            } else if (type === 'click') {
                o.frequency.setValueAtTime(800, now); g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                o.start(); o.stop(now + 0.05);
            } else {
                o.frequency.setTargetAtTime(440, now, 0);
                g.gain.setTargetAtTime(0.1, now, 0); g.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                o.start(); o.stop(now + 0.5);
            }
        } catch (e) { console.warn(e); }
    };

    useEffect(() => {
        let timer;
        if (timerRunning && groupTimer > 0) {
            timer = setInterval(() => {
                setGroupTimer(t => {
                    const next = t - 1;
                    if (next <= 10 && next > 0) playSound('heartbeat');
                    else if (next === 0) { playSound('finish'); setTimerRunning(false); }
                    return next > 0 ? next : 0;
                });
            }, timerSpeed);
        }
        return () => clearInterval(timer);
    }, [timerRunning, timerSpeed, groupTimer]);

    const handleAnswer = (index) => {
        if (answerStatus !== 'idle' || isSwiping) return;
        setSelectedOption(index);
        const correct = index === POEM_QUESTIONS[currentQuestionIndex].correctIndex;
        if (correct) {
            setAnswerStatus('correct'); setScore(s => s + 1); playSound('correct');
            setTimeout(() => {
                setIsSwiping(true);
                setTimeout(() => {
                    if (currentQuestionIndex < POEM_QUESTIONS.length - 1) {
                        setCurrentQuestionIndex(i => i + 1);
                        setAnswerStatus('idle');
                        setSelectedOption(null);
                    } else {
                        setShowResult(true);
                        if (score + 1 === 10) triggerConfetti();
                    }
                    setTimeout(() => setIsSwiping(false), 400);
                }, 400);
            }, 1000);
        } else {
            setAnswerStatus('wrong');
            playSound('wrong');
            setTimeout(() => { setAnswerStatus('idle'); setSelectedOption(null); }, 1500);
        }
    };

    useEffect(() => {
        if (selectedVerseIndex === null) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioPlaying(false);
                setIsAudioOpen(false);
            }
        } else {
            if (!audioRef.current) {
                audioRef.current = new Audio('نداء الحياة ل عبدالله بن علي الخليلي.mp3');
                audioRef.current.ontimeupdate = () => setAudioCurrentTime(audioRef.current.currentTime);
                audioRef.current.onloadedmetadata = () => setAudioDuration(audioRef.current.duration);
                audioRef.current.onended = () => setAudioPlaying(false);
            }
        }
    }, [selectedVerseIndex]);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (audioPlaying) {
            audioRef.current.pause();
            setAudioPlaying(false);
        } else {
            audioRef.current.play().catch(e => console.warn(e));
            setAudioPlaying(true);
        }
    };

    const seekAudio = (time) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setAudioCurrentTime(time);
    };

    const formatTime = (time) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const startTvSelection = () => {
        if (tvSpinning) return;
        setTvSpinning(true);
        const totalCards = 34;
        const available = Array.from({ length: 34 }, (_, i) => i + 1).filter(n => !tvHistory.includes(n));

        if (available.length === 0) {
            alert("جميع الأرقام ظهرت!");
            setTvSpinning(false);
            return;
        }

        const startTime = Date.now();
        const duration = 5000; // 5 seconds exact
        const interval = 180; // Slower, constant speed as requested

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            const randomPick = available[Math.floor(Math.random() * available.length)];
            setTvHighlightIndex(randomPick);

            if (elapsed < duration) {
                setTimeout(animate, interval);
            } else {
                const winner = available[Math.floor(Math.random() * available.length)];
                setTvHighlightIndex(winner);

                setTimeout(() => {
                    setTvHistory(prev => [winner, ...prev]);
                    setTvWinner(winner);
                    setTvSpinning(false);
                    playSound('finish');
                    setTimeout(() => setTvWinner(null), 3000);
                }, 400);
            }
        };
        animate();
    };



    const triggerConfetti = () => {
        const colors = ['#d97706', '#fbbf24', '#f59e0b', '#78350f'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${(Math.random() - 0.5) * 200}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            animation.onfinish = () => confetti.remove();
        }
    };

    useEffect(() => { if (!isLoading && mainContentRef.current) window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeSection, isLoading]);

    // Verse Navigation via Scroll
    useEffect(() => {
        const handleWheel = (e) => {
            if (selectedVerseIndex !== null && !isVerseExplanationOpen) {
                if (e.deltaY > 0) {
                    setSelectedVerseIndex(prev => Math.min(POEM_VERSES.length - 1, prev + 1));
                } else if (e.deltaY < 0) {
                    setSelectedVerseIndex(prev => Math.max(0, prev - 1));
                }
            }
        };
        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [selectedVerseIndex, isVerseExplanationOpen]);

    if (isLoading) return (
        <div className="fixed inset-0 z-[3000] bg-[#020617] flex items-center justify-center overflow-hidden font-['Cairo']">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-amber-600/10 rounded-full blur-[120px] animate-nebula-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/15 rounded-full blur-[120px] animate-nebula-slow-reverse"></div>
            </div>
            <div className="relative z-20 w-full max-w-[50rem] px-6 text-center">
                <div className="relative group p-[2px] overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_0_100px_rgba(217,119,6,0.2)] backdrop-blur-2xl">
                    <div className="relative bg-[#03081a]/95 rounded-[calc(2.5rem-2px)] p-10 md:p-16 flex flex-col items-center">
                        <h2 className="text-5xl md:text-[6.5rem] font-black text-white leading-none tracking-tighter filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                            نـداء <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-500 to-amber-900">الـحياة</span>
                        </h2>
                        <div className="flex flex-col items-center gap-2 mt-8">
                            <p className="text-amber-100/70 text-lg md:text-3xl font-bold italic tracking-wide">الشاعر عبدالله بن علي الخليلي</p>
                            <div className="h-px w-32 bg-amber-600/40 my-2"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-amber-500 font-black text-[10px] md:text-xs tracking-[0.5em] uppercase mb-1">برمجة وتصميم</span>
                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">عبدالله عامر الشبلي</h4>
                            </div>
                        </div>
                        <button onClick={() => { playSound('startup'); setIsLoading(false); }} className="mt-14 group relative px-16 md:px-32 py-5 md:py-7 bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white rounded-[1.8rem] text-xl md:text-4xl font-black shadow-[0_20px_50px_-10px_rgba(217,119,6,0.5)] transition-all active:scale-95 transform hover:-translate-y-1">دخول</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen flex flex-col bg-[#fafaf9] text-slate-900 overflow-x-hidden selection:bg-amber-200 font-['Cairo']`}>
            {selectedVerseIndex !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center light-themed-expansion p-6 animate-in fade-in duration-300">
                    <button onClick={() => setSelectedVerseIndex(null)} className="absolute top-8 left-8 p-4 rounded-full border-2 border-amber-600/20 text-amber-900 hover:bg-amber-100 hover:rotate-90 transition-all duration-500 bg-white shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="absolute top-4 right-0 flex flex-col items-end gap-4 z-[110]">
                        <button onClick={() => setIsAudioOpen(!isAudioOpen)} className={`mr-4 p-5 rounded-full shadow-2xl transition-all duration-500 bg-white border-2 ${isAudioOpen ? 'border-amber-500 scale-110' : 'border-amber-600/20 hover:scale-105'}`}>
                            <div className="flex items-center gap-1.5 h-8">
                                {[0.6, 1.2, 0.8, 1.4, 0.7].map((h, i) => (
                                    <div key={i} className={`w-1 rounded-full transition-all duration-500 neon-orange-wave ${audioPlaying ? 'animate-audio-wave' : ''}`} style={{ animationDelay: `${i * 0.15}s`, height: audioPlaying ? undefined : `${h * 10}px` }}></div>
                                ))}
                            </div>
                        </button>

                        {isAudioOpen && (
                            <div className="bg-white/95 backdrop-blur-xl p-5 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-amber-100 w-24 animate-in slide-in-from-top-4 duration-500 mr-4 flex flex-col items-center gap-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-lg shrink-0 group relative">
                                    <img src="./reciter_thumbnail.png"
                                        className="w-full h-full object-cover" alt="القارئ" onError={(e) => e.target.src = './poet_portrait.png'} />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] text-white font-black">المنشد</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-[10px] font-black text-slate-400 font-mono tracking-tighter">{formatTime(audioCurrentTime)}</span>
                                    <div className="relative w-2 h-40 bg-stone-100 rounded-full overflow-hidden group">
                                        <div
                                            className="absolute bottom-0 left-0 w-full bg-amber-600 transition-all duration-300"
                                            style={{ height: `${(audioCurrentTime / (audioDuration || 1)) * 100}%` }}
                                        ></div>
                                        <input
                                            type="range"
                                            min="0"
                                            max={audioDuration || 0}
                                            value={audioCurrentTime}
                                            onChange={(e) => seekAudio(parseFloat(e.target.value))}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            style={{ appearance: 'slider-vertical', WebkitAppearance: 'slider-vertical' }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 font-mono tracking-tighter">{formatTime(audioDuration)}</span>
                                </div>

                                <div className="flex flex-col items-center gap-5">
                                    <button onClick={() => seekAudio(Math.min(audioDuration, audioCurrentTime + 5))} className="p-2 text-slate-400 hover:text-amber-600 transition-colors rotate-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                                    </button>

                                    <button onClick={toggleAudio} className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-amber-500 transition-all active:scale-95">
                                        {audioPlaying ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M5 3l14 9-14 9V3z"></path></svg>
                                        )}
                                    </button>

                                    <button onClick={() => seekAudio(Math.max(0, audioCurrentTime - 5))} className="p-2 text-slate-400 hover:text-amber-600 transition-colors rotate-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center space-y-12">
                        <div className="flex flex-col items-center gap-10 pt-32 pb-16 px-10 md:px-24 verse-box-premium relative">
                            <div className="absolute top-[-2rem] right-1/2 translate-x-1/2 w-16 h-16 rounded-full border-4 border-amber-500 bg-white flex items-center justify-center font-black text-amber-600 text-2xl z-20 shadow-lg">{selectedVerseIndex + 1}</div>
                            <div className="poem-text text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-tight">{POEM_VERSES[selectedVerseIndex].firstHalf}</div>
                            <div className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
                            <div className="poem-text text-5xl md:text-7xl lg:text-8xl font-bold text-amber-600 leading-tight">{POEM_VERSES[selectedVerseIndex].secondHalf}</div>

                            {/* Explanation Trigger Button - Redesigned as a label hanging from the card */}
                            <button
                                onClick={() => { playSound('click'); setIsVerseExplanationOpen(true); }}
                                className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 px-10 py-3 bg-slate-900 border-x-2 border-b-2 border-amber-500 rounded-b-3xl shadow-2xl transition-all duration-300 hover:bg-amber-600 group active:translate-y-1"
                            >
                                <span className="font-black text-white text-lg tracking-[0.2em]">عرض الشـرح</span>
                            </button>
                        </div>
                    </div>

                    {/* Verse Explanation Overlay - YouTube Channel Edition */}
                    {isVerseExplanationOpen && (
                        <div className="fixed inset-0 z-[200] bg-stone-100 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 overflow-hidden font-['Cairo']">
                            {/* Close Button - Floating Minimalist */}
                            <button
                                onClick={() => setIsVerseExplanationOpen(false)}
                                className="absolute top-6 left-6 w-14 h-14 rounded-full bg-white/80 hover:bg-amber-600 border border-amber-200 text-amber-900 hover:text-white flex items-center justify-center transition-all duration-500 z-[220] backdrop-blur-md group shadow-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="w-full h-full flex flex-col overflow-y-auto bg-[#fafaf9]">

                                {/* 1. YouTube-Style Header (3-Part Banner Area) */}
                                <div className="relative w-full h-[30vh] md:h-[45vh] shrink-0 border-b border-white/5 flex shadow-2xl">
                                    {/* Part 1: Background (Middle/Right) */}
                                    <div className="w-1/3 h-full relative">
                                        <img src="./التsقاط.PNG" className="w-full h-full object-cover" alt="Banner Bg 1" />
                                        {isTanzil2Visible && (
                                            <div className="tanzil2-banner-sitter animate-tanzil-entry">
                                                <img src="./تنزيل (2).png" className="w-full h-full object-contain" alt="Tanzil 2" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Part 2: Background (Middle/Right) */}
                                    <div className="w-1/3 h-full border-x border-white/5">
                                        <img src="./التsقاط.PNG" className="w-full h-full object-cover" alt="Banner Bg 2" />
                                    </div>
                                    {/* Part 3: Banner Image (Far Left in RTL) */}
                                    <div className="w-1/3 h-full relative">
                                        <img src="./banner.png" className="w-full h-full object-cover" alt="Verse Banner" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent opacity-40"></div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-black/20 pointer-events-none"></div>
                                </div>

                                {/* 2. Channel Info Section (Verse Identity) */}
                                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mt-10 relative z-10">
                                    <div className="flex flex-col md:flex-row items-end md:items-center gap-8 text-right">
                                        {/* "Channel Avatar" - Verse Number */}
                                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-900 border-[6px] border-[#0a0f1e] shadow-2xl flex items-center justify-center overflow-hidden shrink-0 group relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <span className="text-6xl md:text-8xl font-black text-amber-500 z-10 drop-shadow-lg">{selectedVerseIndex + 1}</span>
                                        </div>

                                        <div className="flex-1 pb-4">
                                            <div className="flex items-center justify-end gap-3 mb-2">
                                                <span className="px-4 py-1.5 bg-amber-600 text-white text-xs font-black rounded-full shadow-lg shadow-amber-600/20">بيت شعري مُحقق</span>
                                                <h3 className="text-slate-500 font-black text-sm tracking-widest">تحليل "نداء الحياة"</h3>
                                            </div>
                                            <h2 className="text-amber-600 text-4xl md:text-6xl lg:text-7xl font-black font-['Tajawal'] leading-tight drop-shadow-2xl">
                                                {POEM_VERSES[selectedVerseIndex].firstHalf}
                                            </h2>
                                            <div className="text-slate-800 text-2xl md:text-4xl font-bold mt-4 opacity-100 font-['Amiri'] border-r-4 border-amber-600 pr-6">
                                                {POEM_VERSES[selectedVerseIndex].secondHalf}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Navigation Tabs (Simplified) */}
                                    <div className="flex justify-end gap-10 mt-12 border-b border-white/5 pb-4">
                                        <button className="text-amber-500 font-black text-xl border-b-4 border-amber-500 pb-4 px-4">الشرح والتحليل</button>
                                    </div>

                                    {/* Content Area - Redesigned like General Idea */}
                                    <div className="flex flex-col gap-10 py-12 px-2 md:px-0 max-w-7xl mx-auto w-full">

                                        {/* 1. Explanation Card (Redesigned) */}
                                        <div className="bg-amber-600 border-[8px] border-amber-700/30 p-12 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                            <div className="relative z-10 text-center">
                                                <div className="mb-8 border-b-2 border-white/20 pb-4 inline-block">
                                                    <span className="text-white font-black text-2xl tracking-[0.5em] uppercase">البيان والشرح</span>
                                                </div>
                                                <p className="text-3xl md:text-5xl lg:text-5xl font-bold text-white leading-[2.2] font-['Amiri'] drop-shadow-md">
                                                    {VERSE_DETAILS[selectedVerseIndex].explanation}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 2. Rhetoric & Vocabulary Grid */}
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                                            {/* Rhetoric Card (Bala'gha) */}
                                            <div className="lg:col-span-7 bg-white p-12 md:p-16 rounded-[4rem] border-4 border-amber-500/20 shadow-xl relative overflow-hidden group h-full">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
                                                <div className="flex items-center justify-end gap-4 mb-8">
                                                    <h4 className="text-slate-900 text-4xl font-black font-['Tajawal']">جماليات البلاغة</h4>
                                                    <div className="w-16 h-1.5 bg-amber-600 rounded-full"></div>
                                                </div>
                                                <div className="bg-amber-50 p-10 rounded-[2.5rem] border-r-8 border-amber-500 shadow-inner">
                                                    <p className="text-slate-800 text-2xl md:text-3xl font-bold leading-[2] font-['Cairo'] text-justify italic">
                                                        {VERSE_DETAILS[selectedVerseIndex].rhetoric}
                                                    </p>
                                                </div>
                                                <div className="mt-10 flex items-center justify-start gap-4 text-amber-600 opacity-40">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                                                    <span className="font-black text-lg tracking-widest uppercase">لمسة بلاغية</span>
                                                </div>
                                            </div>

                                            {/* Vocabulary Sidebar (Compact) */}
                                            <div className="lg:col-span-5 flex flex-col gap-6">
                                                <div className="flex items-center justify-between px-6 mb-2">
                                                    <div className="w-24 h-1 bg-amber-600/20 rounded-full"></div>
                                                    <h4 className="text-slate-900 text-3xl font-black">معجم البيت</h4>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    {VERSE_DETAILS[selectedVerseIndex].vocab.map((v, i) => (
                                                        <div key={i} className="group p-8 bg-white border border-stone-100 rounded-[3rem] hover:border-amber-500 transition-all duration-300 hover:translate-y-[-5px] shadow-lg">
                                                            <div className="flex items-center justify-between gap-6">
                                                                <div className="flex-1 text-right">
                                                                    <span className="text-amber-600 text-3xl font-black block mb-2 font-['Amiri']">{v.word}</span>
                                                                    <p className="text-slate-600 text-xl font-bold leading-relaxed">{v.meaning}</p>
                                                                </div>
                                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-500 flex items-center justify-center font-black text-xl shadow-xl">
                                                                    {i + 1}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Footer Spacer */}
                                <div className="py-20 text-center opacity-10">
                                    <span className="font-black text-4xl tracking-tighter">نداء الحياة 2026</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <header className="no-print sticky top-0 z-50">
                <div className="h-2 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 w-full shadow-md"></div>
                <div className={`backdrop-blur-xl border-b transition-all duration-500 py-4 bg-white/95 border-stone-200 shadow-xl`}>
                    <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
                        <h1 className={`text-3xl md:text-5xl font-black transition-colors text-slate-900`}>قصيدة <span className="text-amber-600">نـداء الـحـيـاة</span></h1>
                        <nav className="flex flex-wrap justify-center gap-2 p-1 rounded-[2.5rem] border bg-stone-100/50 max-w-5xl mx-auto backdrop-blur-md">
                            {sections.map((s) => (
                                <button key={s} onClick={() => { playSound('click'); setActiveSection(s); }} className={`px-4 py-2.5 rounded-[2rem] font-black text-xs md:text-base transition-all ${activeSection === s ? 'bg-amber-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-amber-700'}`}>{s}</button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
            <main ref={mainContentRef} className="flex-grow flex flex-col items-center justify-start p-2 md:p-4">
                <div key={activeSection} className="w-full max-w-5xl scale-[0.88] md:scale-[0.92] origin-top section-transition">
                    {activeSection === SectionType.START ? (
                        <div className="relative w-full py-6 flex flex-col items-center justify-center">
                            <div className="absolute inset-0 bg-stone-200/40 rounded-[3rem] border border-stone-200 shadow-inner"></div>
                            <div className="relative p-3 bg-gradient-to-br from-slate-700 to-slate-950 rounded-[3rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden">
                                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#d97706_0%,transparent_25%,#fbbf24_50%,transparent_75%,#d97706_100%)] opacity-20 animate-spin-slow"></div>
                                <div className="relative w-[300px] md:w-[760px] aspect-video bg-[#010208] rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center border border-white/5">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.2),transparent_70%)]"></div>
                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center pt-16">
                                        {showFinalTitle ? (
                                            <div className="space-y-4 animate-finale-reveal">
                                                <h2 className="text-4xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">شرح قصيدة <br /><span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">نداء الحياة</span></h2>
                                                <p className="text-lg md:text-2xl text-amber-200/60 font-black italic">للشاعر عبدالله بن علي الخليلي</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="relative w-full h-[30%] flex items-center justify-between px-12 md:px-20">
                                                    <div className="absolute top-1/2 left-12 right-12 md:left-20 md:right-20 h-1 bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
                                                        <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-amber-600 to-amber-400 transition-all duration-700 shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ width: `${(tvSlideIndex / (motionSteps.length - 1)) * 100}%` }}></div>
                                                    </div>
                                                    {motionSteps.map((step, idx) => (
                                                        <div key={idx} className="relative z-20 flex items-center justify-center w-6 h-6 md:w-10">
                                                            <div className={`w-4 h-4 md:w-8 md:h-8 rounded-full border-2 transition-all duration-500 ${idx <= tvSlideIndex ? 'bg-amber-500 border-white scale-125 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-slate-900 border-white/10'}`}></div>
                                                            <div className="absolute -bottom-10 whitespace-nowrap text-white text-[9px] md:text-sm font-black transition-opacity duration-500" style={{ opacity: idx === tvSlideIndex ? 1 : 0.4 }}>{step.title}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div key={tvSlideIndex} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 w-full max-w-2xl mt-12 text-right flex items-center gap-8 animate-explainer-reveal shadow-2xl">
                                                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-3xl md:text-5xl font-black text-amber-500 drop-shadow-lg">{tvSlideIndex + 1}</div>
                                                    <div className="flex-1 space-y-2">
                                                        <h4 className="text-2xl md:text-4xl font-black text-white">{motionSteps[tvSlideIndex].title}</h4>
                                                        <p className="text-base md:text-xl text-amber-50/80 font-bold leading-relaxed">{motionSteps[tvSlideIndex].desc}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex flex-col items-center -mt-1 scale-90 md:scale-100">
                                <div className="w-20 md:w-32 h-10 md:h-14 bg-gradient-to-b from-slate-800 to-slate-950 border-x-2 border-white/10 flex items-center justify-center font-black text-3xl md:text-5xl text-amber-500 font-mono italic shadow-2xl">
                                </div>
                                <div className="w-40 md:w-80 h-4 bg-slate-900 rounded-t-[2rem]"></div>
                            </div>
                        </div>
                    ) : activeSection === SectionType.PREFACE ? (
                        <div className="w-full space-y-16 pb-24 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            {/* Glowing Header Section */}
                            <div className="relative inline-block mt-10">
                                <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
                                <h2 className="relative text-6xl md:text-9xl font-black tracking-tighter text-shine mb-4">
                                    لماذا <span className="text-slate-900">نـداء الـحياة؟</span>
                                </h2>
                                <div className="h-2 w-48 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full"></div>
                            </div>

                            <div className="max-w-6xl mx-auto px-4">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 text-right">

                                    {/* Main Hero Card - Intro */}
                                    <div className="md:col-span-12 lg:col-span-12 bg-white/80 backdrop-blur-2xl p-10 md:p-14 rounded-[4rem] border border-amber-500/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] bento-card relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/10 transition-colors"></div>
                                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 border-r-8 border-amber-500 pr-8 leading-tight">التمهيد</h3>
                                        <p className="text-2xl md:text-4xl font-bold text-slate-800 leading-[1.6]">
                                            ليست "نداء الحياة" مجرد أبيات، بل هي <span className="text-amber-600 font-black relative animate-vision-glow">رؤية نهضويّة</span> صاغها عبدالله الخليلي لترسم ملامح الشخصية العمانية المتوثبة للمستقبل، وتستنهض الهمم لبناء حضارة لا تعرف التوقف.
                                        </p>
                                    </div>



                                    {/* 4 Pillars Header */}
                                    <div className="md:col-span-12 text-right mt-12 mb-4">
                                        <h4 className="text-3xl md:text-4xl font-black text-slate-900 border-r-8 border-amber-500 pr-6">ما تناقشه القصيدة :</h4>
                                    </div>

                                    {/* 4 Pillars Grid */}
                                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                                        <div className="bg-amber-50 p-8 rounded-[3rem] border-r-[10px] border-amber-600 bento-card relative group">
                                            <img src="./box.png" className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 z-20 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" alt="Box" />
                                            <div className="text-amber-600 font-black text-5xl mb-6 opacity-30 italic">1</div>
                                            <h4 className="text-2xl font-black mb-4 text-slate-900 italic">إرادة النهوض</h4>
                                            <p className="text-lg text-slate-600 font-bold leading-relaxed">استرداد الأمجاد المسلوبة لا يأتي بالصمت، بل عبر العزم الصادق والعمل الجاد والمستمر.</p>
                                        </div>

                                        <div className="bg-indigo-50 p-8 rounded-[3rem] border-r-[10px] border-indigo-600 bento-card relative group">
                                            <img src="./box.png" className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 z-20 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" alt="Box" />
                                            <div className="text-indigo-600 font-black text-5xl mb-6 opacity-30 italic">2</div>
                                            <h4 className="text-2xl font-black mb-4 text-slate-900 italic">سلطة العلم</h4>
                                            <p className="text-lg text-slate-600 font-bold leading-relaxed">جعل العلم هو السلاح الأوحد والخير الذي يجب أن يقتنيه الإنسان لمواجهة قوى الجهل والتبعية.</p>
                                        </div>

                                        <div className="bg-emerald-50 p-8 rounded-[3rem] border-r-[10px] border-emerald-600 bento-card relative group">
                                            <img src="./box.png" className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 z-20 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" alt="Box" />
                                            <div className="text-emerald-600 font-black text-5xl mb-6 opacity-30 italic">3</div>
                                            <h4 className="text-2xl font-black mb-4 text-slate-900 italic">دور الشباب</h4>
                                            <p className="text-lg text-slate-600 font-bold leading-relaxed">الشباب هم همزة الوصل ونقطة التنويه، والرهان الحقيقي الذي يعقد عليه الشعب آماله العريضة.</p>
                                        </div>

                                        <div className="bg-rose-50 p-8 rounded-[3rem] border-r-[10px] border-rose-600 bento-card relative group">
                                            <img src="./box.png" className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 z-20 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" alt="Box" />
                                            <div className="text-rose-600 font-black text-5xl mb-6 opacity-30 italic">4</div>
                                            <h4 className="text-2xl font-black mb-4 text-slate-900 italic">تحدي الحوادث</h4>
                                            <p className="text-lg text-slate-600 font-bold leading-relaxed">زرع روح التحدي أمام "حادثات الليالي" والإيمان بأن الصعاب هي مجرد اختبار لصقل معادن العظماء.</p>
                                        </div>

                                    </div>



                                </div>
                            </div>
                        </div>
                    ) : activeSection === SectionType.POET ? (
                        <div className="w-full max-w-5xl mx-auto py-8 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <div className="premium-card p-12 md:p-16 text-center space-y-12 relative overflow-hidden">

                                <div className="flex flex-col items-center relative z-10">
                                    <div className="poet-orbital-border group cursor-pointer" onClick={() => setIsPoetImageToggled(!isPoetImageToggled)}>
                                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-white p-2 shadow-2xl animate-float transition-all duration-500 group-hover:scale-105">
                                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-600">
                                                <img
                                                    src={isPoetImageToggled ? "./ZRT_AL_BORNE.png" : "./poet_portrait.png"}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                                    alt="الشاعر"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 mt-8">عبدالله بن علي <span className="text-amber-700">الخليلي</span></h2>
                                    <div className="flex items-center gap-4 mt-12">
                                        <div className="h-px w-8 bg-amber-600/30"></div>
                                        <p className="text-2xl md:text-3xl font-black text-amber-600 tracking-[0.2em] italic uppercase">أمير البيان</p>
                                        <div className="h-px w-8 bg-amber-600/30"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10 border-y border-amber-600/10 relative z-10">
                                    <div className="p-4 rounded-3xl hover:bg-amber-50/50 transition-all hover:-translate-y-1"><p className="text-slate-400 text-xs font-black uppercase mb-2">تاريخ الميلاد</p><p className="text-3xl font-bold text-slate-800">1922م - سمائل</p></div>
                                    <div className="p-4 rounded-3xl hover:bg-amber-50/50 transition-all hover:-translate-y-1"><p className="text-slate-400 text-xs font-black uppercase mb-2">تاريخ الوفاة</p><p className="text-3xl font-bold text-slate-800">2000م - مسقط</p></div>
                                    <div className="p-4 rounded-3xl hover:bg-amber-50/50 transition-all hover:-translate-y-1"><p className="text-slate-400 text-xs font-black uppercase mb-2">المكانة الأدبية</p><p className="text-3xl font-bold text-slate-800">رائد المدرسة التقليدية</p></div>
                                </div>
                                <div className="text-right space-y-8 bg-amber-50/40 p-10 rounded-[3rem] border border-amber-100/50 shadow-inner relative z-10">
                                    <h4 className="text-4xl font-black border-r-8 border-amber-600 pr-6 text-slate-900">سيرة ملهمة</h4>
                                    <p className="text-2xl text-slate-700 font-bold text-justify leading-relaxed">وُلد الشاعر في سمائل ونشأ في بيت علم. لقب بـ <span className="text-amber-700">"أمير البيان"</span> لقدرته الفذة على تطويع اللغة لخدمة قضايا الأمة. تميز أسلوبه بالرصانة والجمع بين الأصالة والمعاصرة والجزالة اللغوية التي تميزت بها مدرسة سمائل الأدبية.</p>
                                </div>
                                <div className="py-12 relative z-10">
                                    <h3 className="text-4xl font-black text-slate-900 mb-12 inline-block border-b-4 border-amber-500 pb-2">من مؤلفاته الشعرية</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                                        <div className="flex flex-col items-center gap-6 group">
                                            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-600/20 group-hover:border-amber-500 transition-all duration-500 group-hover:scale-[1.02]">
                                                <img src="./wahi_al_abqariya.png"
                                                    className="w-full h-full object-cover" alt="وحي العبقرية" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-800 group-hover:text-amber-700 transition-colors">وحي العبقرية</h4>
                                        </div>
                                        <div className="flex flex-col items-center gap-6 group">
                                            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-600/20 group-hover:border-amber-500 transition-all duration-500 group-hover:scale-[1.02]">
                                                <img src="./ala_rikab_al_jumhur.png"
                                                    className="w-full h-full object-cover" alt="على ركاب الجمهور" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-800 group-hover:text-amber-700 transition-colors">على ركاب الجمهور</h4>
                                        </div>
                                        <div className="flex flex-col items-center gap-6 group">
                                            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-600/20 group-hover:border-amber-500 transition-all duration-500 group-hover:scale-[1.02]">
                                                <img src="./diwan_al_khalili.PNG"
                                                    className="w-full h-full object-cover" alt="ديوان الخليلي" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-800 group-hover:text-amber-700 transition-colors">ديوان الخليلي (الأعمال الكاملة)</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeSection === SectionType.VERSES ? (
                        <div className="bg-white rounded-[3rem] shadow-xl p-6 md:p-12 text-center animate-in fade-in duration-500">
                            <h3 className="text-5xl md:text-7xl font-black border-b-8 border-amber-500 inline-block mb-12">الأبـيـات الـشـعـريـة</h3>
                            <div className="space-y-6 max-w-4xl mx-auto">
                                {POEM_VERSES.map((v, i) => (
                                    <div key={i} onClick={() => setSelectedVerseIndex(i)} className="flex flex-col items-center group cursor-pointer hover:bg-amber-50/50 py-6 rounded-[2.5rem] transition-all border border-transparent hover:border-amber-100">
                                        <div className="poem-text text-3xl md:text-5xl font-bold mb-4 group-hover:text-amber-800 transition-colors">{v.firstHalf}</div>
                                        <div className="flex items-center gap-6 w-full px-12">
                                            <div className="flex-1 h-px bg-stone-100"></div>
                                            <div className="bg-stone-900 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm group-hover:bg-amber-600 group-hover:text-white transition-all">{i + 1}</div>
                                            <div className="flex-1 h-px bg-stone-100"></div>
                                        </div>
                                        <div className="poem-text text-3xl md:text-5xl font-bold mt-4 text-slate-500 group-hover:text-amber-900 transition-colors">{v.secondHalf}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : activeSection === SectionType.QUESTIONS ? (
                        <div className="w-full max-w-4xl mx-auto py-4">
                            {quizMode === 'menu' ? (
                                <div className="flex flex-col md:flex-row gap-10 justify-center items-center py-12">
                                    <div className="relative">
                                        <button onClick={() => { playSound('click'); setQuizMode('individual'); }} className="relative p-12 w-[380px] h-[440px] bg-white border-2 border-stone-200 rounded-[3rem] text-center hover:border-amber-500 transition-all group shadow-2xl overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-900 rounded-2xl mx-auto mb-8 flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-[0_10px_30px_rgba(217,119,6,0.2)]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            </div>
                                            <h3 className="text-4xl font-black text-slate-900 relative z-10">الأسئلة الفردية</h3>
                                            <p className="text-slate-500 text-base font-bold mt-4 relative z-10">10 أسئلة متدرجة الصعوبة</p>
                                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-600/5 rounded-full blur-3xl group-hover:bg-amber-600/10 transition-all"></div>
                                        </button>

                                        {isPoroonVisible && (
                                            <div className="absolute top-2 left-[calc(100%-56px)] w-64 h-64 animate-poroon-entry z-[100] pointer-events-none">
                                                <div className="poroon-speech-bubble">ايه اللي حصل</div>
                                                <img src="./poroon.png" className="w-full h-full object-contain" alt="Poroon" />
                                            </div>
                                        )}
                                    </div>

                                    <button onClick={() => { playSound('click'); setQuizMode('group'); }} className="relative p-12 w-[380px] h-[440px] bg-white border-2 border-stone-200 rounded-[3rem] text-center hover:border-amber-500 transition-all group shadow-2xl overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-900 rounded-2xl mx-auto mb-8 flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-[0_10px_30px_rgba(217,119,6,0.2)]">
                                            <div className="relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900 relative z-10">تحـدي الـمجموعة</h3>
                                        <p className="text-slate-500 text-base font-bold mt-4 relative z-10">نقاش وتحليل جماعي</p>
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-600/5 rounded-full blur-3xl group-hover:bg-amber-600/10 transition-all"></div>
                                    </button>
                                </div>
                            ) : quizMode === 'group' ? (
                                <div className="flex flex-col items-center gap-12 py-10 animate-in fade-in duration-700">
                                    <div className="w-full flex justify-between items-center px-6">
                                        <button onClick={() => { playSound('click'); setQuizMode('menu'); setTimerRunning(false); setIsAnswerVisible(false); }} className="px-6 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-400 font-black hover:text-white transition-all flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                                            خروج
                                        </button>
                                        <button onClick={() => { playSound('click'); setGroupTimer(90); setTimerRunning(false); setIsAnswerVisible(false); }} className="px-6 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-400 font-black hover:text-amber-500 transition-all">إعادة تصفير</button>
                                    </div>

                                    {/* Timer and Image Container */}
                                    <div className="w-full flex flex-col items-center">
                                        {/* Realistic Stopwatch Design - Shrunk */}
                                        <div className="relative group/stopwatch scale-[0.6] md:scale-75 z-20 -mb-8">
                                            {/* Orbiting Ring Decoration */}
                                            <div className="absolute -inset-10 pointer-events-none">
                                                <div className="absolute inset-0 border-[2px] border-amber-500/30 rounded-full animate-[spin_10s_linear_infinite] opacity-40"></div>
                                                <div className="absolute inset-0 border-[1px] border-cyan-400/20 rounded-full rotate-45 animate-[spin_15s_linear_infinite_reverse] scale-110"></div>
                                            </div>

                                            <div className={`relative w-[240px] h-[240px] rounded-full bg-[#373a3c] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_4px_10px_rgba(255,255,255,0.1)] flex items-center justify-center border-[10px] border-[#2d2f31] transition-all duration-300 ${groupTimer <= 10 && groupTimer > 0 ? 'animate-stopwatch-alarm scale-105' : 'scale-100'}`}>

                                                {/* Crown/Top Button */}
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 z-20">
                                                    <div className="w-full h-6 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-lg shadow-lg border-b-4 border-stone-500"></div>
                                                    <div className="w-8 h-4 bg-stone-500 mx-auto -mt-1 rounded-sm"></div>
                                                </div>

                                                {/* Left Button (Red) */}
                                                <button
                                                    onClick={() => { playSound('click'); setGroupTimer(90); setTimerRunning(false); }}
                                                    className="absolute -top-4 -left-1 -rotate-[35deg] w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-700 rounded-xl shadow-xl border-b-4 border-rose-900 active:translate-y-1 transition-all group/red"
                                                >
                                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-rose-300 rounded-full opacity-0 group-hover/red:opacity-50"></div>
                                                </button>

                                                {/* Right Button (Green) */}
                                                <button
                                                    onClick={() => { playSound('click'); setTimerRunning(!timerRunning); }}
                                                    className="absolute -top-4 -right-1 rotate-[35deg] w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-xl shadow-xl border-b-4 border-emerald-900 active:translate-y-1 transition-all group/green"
                                                >
                                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-emerald-300 rounded-full opacity-0 group-hover/green:opacity-50"></div>
                                                </button>

                                                {/* Inner Glowing Ring */}
                                                <div className="absolute inset-3 rounded-full border-2 border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>

                                                {/* Digital Screen Area */}
                                                <div className="relative w-40 h-24 bg-[#c0e0e0] rounded-2xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] border-4 border-[#1a1c1d] flex flex-col items-center justify-center overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#8ab7b7] to-transparent opacity-30"></div>

                                                    <div className={`text-4xl font-['Digital-7'] font-black tracking-[-1px] transition-colors duration-300 ${groupTimer <= 10 && groupTimer > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                                                        00:{Math.floor(groupTimer / 60).toString().padStart(2, '0')}:{(groupTimer % 60).toString().padStart(2, '0')}
                                                    </div>
                                                </div>

                                                {/* Decorative Wires */}
                                                <div className="absolute -inset-6 border-[1px] border-amber-300/30 rounded-full -rotate-12 pointer-events-none"></div>
                                                <div className="absolute -inset-6 border-[1px] border-cyan-300/30 rounded-full rotate-12 pointer-events-none"></div>
                                            </div>
                                        </div>

                                        <div className="w-full max-w-[95%] z-10">
                                            <div className="premium-image-border w-full max-w-7xl mx-auto shadow-[0_50px_100px_rgba(0,0,0,0.1)] scale-110">
                                                <img src="./التقاط.PNG" alt="Group Challenge Question" className="w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Answer Section - Analysis Style */}
                                    <div className="w-full max-w-5xl space-y-10 mt-6 px-2">

                                        <div className="flex flex-col gap-8">
                                            <button
                                                onClick={() => { playSound('correct'); setIsAnswerVisible(!isAnswerVisible); }}
                                                className={`py-10 rounded-[4rem] text-4xl font-black transition-all shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95
                                                    ${isAnswerVisible ? 'bg-slate-900 text-white border-b-8 border-amber-600' : 'bg-white border-[4px] border-stone-100 text-amber-600 hover:border-amber-500'}`}
                                            >
                                                {isAnswerVisible ? 'إغلاق نافذة التحليل' : 'استعراض مفاتيح الإجابة'}
                                            </button>

                                            {isAnswerVisible && (
                                                <div className="animate-in slide-in-from-bottom-10 duration-700">
                                                    <div className="bg-amber-600 border-[8px] border-amber-700/30 p-16 md:p-24 rounded-[5rem] shadow-[0_60px_120px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                                        <div className="relative z-10 flex flex-col items-center text-center">
                                                            <h4 className="text-white font-black text-5xl border-b-2 border-white/30 pb-6 inline-block font-['Amiri']">الإجابة :</h4>
                                                            <p className="text-3xl md:text-6xl font-bold text-white leading-[2.2] font-['Amiri'] drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)] mt-8">
                                                                {groupQuestion.answer}
                                                            </p>
                                                        </div>
                                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            ) : showResult ? (
                                <div className="text-center space-y-12 py-16 animate-celebration">
                                    <div className="w-72 h-72 mx-auto border-[16px] border-amber-600 rounded-[4rem] flex flex-col items-center justify-center bg-white shadow-[0_40px_100px_rgba(217,119,6,0.3)] relative rotate-3">
                                        <div className="absolute inset-0 bg-amber-500/10 rounded-[3.5rem] animate-pulse"></div>
                                        <span className="text-[10rem] font-black text-slate-900 leading-none z-10">{score}</span>
                                        <span className="text-amber-600 font-black text-2xl uppercase tracking-[0.3em] mt-1 z-10">الدرجة النهائية</span>
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 drop-shadow-2xl">
                                        {score === 10 ? 'عبقري.. إجابة كاملة! 🎊' : 'أحسنت.. نتيجة مشرفة! ✨'}
                                    </h2>
                                    <button onClick={() => { playSound('click'); setQuizMode('menu'); setScore(0); setShowResult(false); setCurrentQuestionIndex(0); }} className="px-16 py-8 bg-slate-900 text-white rounded-[2.5rem] text-4xl font-black hover:bg-amber-600 transition-all shadow-2xl hover:scale-105 active:scale-95">العودة للرئيسية</button>
                                </div>
                            ) : (
                                <div className="space-y-12 min-h-[700px] flex flex-col">
                                    {/* Premium Header */}
                                    <div className="flex items-center justify-between bg-white/50 backdrop-blur-md p-6 rounded-[3rem] border border-amber-100 shadow-xl">
                                        <button onClick={() => setQuizMode('menu')} className="px-8 py-3 bg-white text-slate-500 hover:text-rose-600 font-black text-xl rounded-2xl flex items-center gap-3 transition-all shadow-sm border border-stone-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            إغلاق
                                        </button>

                                        <div className="flex items-center gap-8">
                                            <button
                                                onClick={() => setIsRandomScreenOpen(true)}
                                                className="px-8 py-3 bg-amber-600 text-white font-black text-xl rounded-2xl hover:bg-slate-900 transition-all flex items-center gap-3 shadow-lg shadow-amber-600/20"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="3" rx="2" /><path d="M7 21h10" /><path d="M9 21v2" /><path d="M15 21v2" /></svg>
                                                سحب عشوائي
                                            </button>
                                            <div className="text-right">
                                                <span className="text-slate-400 font-black text-sm block tracking-widest uppercase">المستوى الحالي</span>
                                                <span className="text-slate-900 font-black text-3xl">سؤال {currentQuestionIndex + 1} <span className="text-amber-500">/ 10</span></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Question Display */}
                                    <div className={`relative ${isSwiping ? 'animate-swipe-card' : ''}`}>
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl"></div>
                                        <div className={`p-16 md:p-24 bg-white border-[6px] rounded-[5rem] text-center transition-all duration-500 shadow-2xl relative overflow-hidden group/q
                                            ${answerStatus === 'correct' ? 'border-emerald-500' : answerStatus === 'wrong' ? 'border-rose-600 animate-shake' : 'border-amber-500/20'}`}>
                                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
                                            <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.3] font-['Tajawal']">{POEM_QUESTIONS[currentQuestionIndex].text}</h2>
                                            <div className="mt-12 flex justify-center gap-2">
                                                {Array.from({ length: 10 }).map((_, i) => (
                                                    <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i <= currentQuestionIndex ? 'w-8 bg-amber-600' : 'w-4 bg-stone-100'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Options Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 pb-12">
                                        {POEM_QUESTIONS[currentQuestionIndex].options.map((o, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(idx)}
                                                disabled={answerStatus !== 'idle'}
                                                className={`group relative p-10 rounded-[3.5rem] text-3xl font-black text-right border-[4px] transition-all duration-300 transform active:scale-95
                                                    ${selectedOption === idx
                                                        ? (answerStatus === 'correct' ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)]' : 'bg-rose-600 border-rose-400 text-white animate-shake')
                                                        : 'bg-white text-slate-800 border-stone-100 hover:border-amber-500 hover:translate-y-[-8px] shadow-xl hover:shadow-amber-500/10'}`}
                                            >
                                                <div className={`absolute top-1/2 -translate-y-1/2 right-6 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl font-black transition-all
                                                    ${selectedOption === idx ? 'bg-white/20 text-white' : 'bg-amber-600/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'}`}>
                                                    {['أ', 'ب', 'ج', 'د'][idx]}
                                                </div>
                                                <span className="block pr-24 leading-snug">{o}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : activeSection === SectionType.VOCABULARY ? (
                        <div className="w-full space-y-12 pb-24 text-center animate-in fade-in duration-700">
                            <div className="relative inline-block">
                                <h2 className="text-6xl md:text-8xl font-black leading-none mb-4">مـفردات <span className="text-amber-600">الـنـص</span></h2>
                                <div className="h-1.5 w-32 bg-amber-500 mx-auto rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
                                {shuffledVocabulary.map((item, idx) => (
                                    <div key={idx} className={`bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-lg hover:border-amber-500 transition-all duration-300 hover:translate-y-[-5px] flex flex-col gap-4 text-right group relative ${idx === 0 ? 'overflow-visible' : 'overflow-hidden'}`}>
                                        {idx === 0 && isTanzilVisible && (
                                            <div className="tanzil-sitter animate-tanzil-entry">
                                                <img src="./تنزيل.png" className="w-full h-full object-contain" alt="Tanzil" />
                                            </div>
                                        )}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/10 transition-colors"></div>
                                        <div className="flex items-center justify-between">
                                            <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-xl text-sm font-black">المفردة {idx + 1}</span>
                                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 font-['Amiri']">{item.word}</h3>
                                        </div>
                                        <div className="h-px w-full bg-stone-100"></div>
                                        <p className="text-xl md:text-2xl text-slate-600 font-bold leading-relaxed">{item.meaning}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : activeSection === SectionType.ANALYSIS ? (
                        <div className="w-full space-y-16 pb-24 text-right animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            {/* Section Header */}
                            <div className="text-center space-y-4">
                                <h2 className="text-6xl md:text-9xl font-black leading-none">التحليل <span className="text-amber-600">الأدبي</span></h2>
                            </div>

                            {/* General Idea Card - Redesigned */}
                            <div className="max-w-6xl mx-auto px-4">
                                <div className="bg-amber-600 border-[8px] border-amber-700/30 p-16 md:p-24 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(217,119,6,0.3)] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="mb-12 relative">
                                            <span className="text-white font-black text-2xl tracking-[0.5em] uppercase border-b-2 border-white/30 pb-2">الفكرة العامة</span>
                                        </div>

                                        <div className="relative">
                                            <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.8] font-['Amiri'] drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                                                الدعوة إلى النهضة والتمسك بالعلم والقيم الوطنية لاستعادة الأمجاد ومواجهة تحديات الزمن.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full"></div>
                                </div>
                            </div>

                            {/* Partial Ideas */}
                            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2 bg-stone-50 border-r-[12px] border-amber-600 p-12 rounded-[3.5rem] shadow-inner">
                                    <h3 className="text-4xl font-black text-slate-900 mb-10 border-b-2 border-stone-200 pb-6">الأفكار الجزئية:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { t: "ثبات الشعب وصموده أمام تقلبات ومصاعب الدهر.", r: "١ - ٤" },
                                            { t: "أهمية الوعي والعلم كونهما السلاح الأقوى للإنسان.", r: "٥ - ١٠" },
                                            { t: "توجيه النداء لشباب الوطن كونهم أمل الأمة ومنارتها.", r: "١١ - ١٣" },
                                            { t: "الحث على استرداد المجد بالعزيمة والاستعانة بالعلم.", r: "١٤ - ١٦" },
                                            { t: "التذكير بأن الشدائد هي ضريبة المجد وامتحان الصابرين.", r: "١٧ - ١٩" }
                                        ].map((idea, i) => (
                                            <div key={i} className="flex flex-col gap-3 p-6 bg-white rounded-3xl shadow-sm border border-stone-100 hover:border-amber-500 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="px-4 py-1.5 bg-amber-600 text-white text-sm font-black rounded-full">الفكرة {i + 1}</span>
                                                    <span className="text-amber-600 font-bold">الأبيات: ({idea.r})</span>
                                                </div>
                                                <p className="text-2xl md:text-3xl font-bold text-slate-700 leading-snug">{idea.t}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Aesthetic & Rhetoric Split */}
                            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Aesthetic Images */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b-4 border-emerald-500 pb-4">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900">الصور الجمالية</h3>
                                    </div>
                                    <div className="space-y-6">
                                        {[
                                            { t: "\"يد العلم\"", d: "استعارة مكنية صورت العلم إنساناً له يد تعطي وتدير الأمور.", v: "٩" },
                                            { t: "\"لقنته حوادث الدهر درساً\"", d: "استعارة مكنية صورت الدهر معلماً يقدم الدروس الدرامية.", v: "٣" },
                                            { t: "\"أرغم الأنف\"", d: "كناية عن الهزيمة والذل للعدو والانكسار أمام قوة الحق.", v: "٥" },
                                            { t: "\"أركب الصعب\"", d: "استعارة مكنية صورت الشدائد دابة تُركب، للإشارة إلى الشجاعة.", v: "١٨" },
                                            { t: "\"نداء الحياة\"", d: "استعارة مكنية صورت الحياة إنساناً ينادي على أبنائه للنهضة.", v: "١٧" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl hover:border-emerald-500 transition-all hover:translate-x-[-8px] relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="text-2xl font-black text-emerald-600">{item.t}</h4>
                                                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-black italic">البيت: {item.v}</span>
                                                </div>
                                                <p className="text-xl md:text-2xl font-bold text-slate-600 leading-relaxed">{item.d}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rhetorical Devices */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b-4 border-amber-600 pb-4">
                                        <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900">الأساليب البلاغية</h3>
                                    </div>
                                    <div className="space-y-6">
                                        {[
                                            { t: "\"نبئيه ... اصدقيه\"", d: "أسلوب إنشائي (أمر) غرضه النصح والإرشاد والتحفيز.", v: "١" },
                                            { t: "\"خانه ... لم يخنه\"", d: "طباق سلب يبرز التناقض بين الظروف المادية والوعي الداخلي.", v: "٨" },
                                            { t: "\"البصائر والأبصار\"", d: "جناس ناقص يعطي جرساً موسيقياً ويجذب انتباه القارئ.", v: "١٣" },
                                            { t: "\"يا شباب البلاد\"", d: "أسلوب إنشائي (نداء) غرضه التشريف والتحبب واستنهاض الهمم.", v: "١١" },
                                            { t: "\"سامك الزمان عذابا\"", d: "استعارة مكنية غرضها توضيح قسوة الاختبارات الزمنية.", v: "١٩" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl hover:border-amber-600 transition-all hover:translate-x-[-8px] relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="text-2xl font-black text-amber-600">{item.t}</h4>
                                                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-sm font-black italic">البيت: {item.v}</span>
                                                </div>
                                                <p className="text-xl md:text-2xl font-bold text-slate-600 leading-relaxed">{item.d}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                    }
                </div >
            </main >
            <footer className={`pt-12 pb-10 border-t-[6px] border-amber-600 mt-auto bg-[#020617] text-white`}>
                <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-10">
                    <div className="bg-white/5 border border-white/10 px-10 py-6 rounded-[2.5rem] text-center border-b-4 border-amber-500 shadow-xl">
                        <span className="text-amber-500 font-black text-xs md:text-sm tracking-[0.4em] uppercase block mb-3 opacity-70">برمجة وتصميم</span>
                        <p className="text-2xl md:text-4xl font-black">عبدالله عامر <span className="text-amber-500">الشبلي</span></p>
                    </div>
                    <div className="opacity-20 text-center"><p className="text-xs md:text-sm font-black tracking-widest uppercase">منصة "نداء الحياة" التفاعلية</p><p className="text-[10px] mt-1">© {new Date().getFullYear()}</p></div>
                </div>
            </footer>
            {
                isRandomScreenOpen && (
                    <>
                        <div className="tv-overlay animate-in fade-in duration-500">
                            <div className="wall-background"></div>

                            <button
                                onClick={() => { if (!tvSpinning) setIsRandomScreenOpen(false); }}
                                className="tv-close z-[2100]"
                            >
                                ✕
                            </button>

                            <div className="tv-container">
                                <div className="tv-screen">
                                    {Array.from({ length: 34 }, (_, i) => i + 1).map(num => (
                                        <div
                                            key={num}
                                            className={`tv-card ${tvHighlightIndex === num ? 'active' : ''} ${tvHistory.includes(num) && tvHighlightIndex !== num ? 'history' : ''}`}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={`tv-logo flex items-center gap-2 ${tvSpinning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={startTvSelection}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={tvSpinning ? 'animate-spin' : ''}>
                                        <path d="M3 12a9 9 0 0 1 9-9 9.75 0 0 1 6.74 2.74L21 8" />
                                        <path d="M21 3v5h-5" />
                                        <path d="M21 12a9 9 0 0 1-9 9 9.75 0 0 1-6.74-2.74L3 16" />
                                        <path d="M3 21v-5h5" />
                                    </svg>
                                    {tvSpinning ? 'جاري السحب' : 'سحب رقم'}
                                </div>
                            </div>

                            {/* Sidebar for History */}
                            <div className="tv-sidebar z-[2050]">
                                <div className="sidebar-header">سـجل الأرقـام</div>
                                <div className="sidebar-list">
                                    {tvHistory.map((num, i) => (
                                        <div key={i} className="sidebar-item">{num}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Winner Popup */}
                        <div className={`winner-popup ${tvWinner ? 'show' : ''}`}>
                            <div className="winner-label">الرقم المختار</div>
                            <div className="winner-number">{tvWinner}</div>
                        </div>
                    </>
                )
            }
        </div >
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
