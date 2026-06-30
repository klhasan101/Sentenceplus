import { Sentence, Category, EnglishFileLevel } from './types';

export interface EnglishFileLevelDetails {
  id: EnglishFileLevel;
  nameAr: string;
  nameEn: string;
  desc: string;
  color: 'emerald' | 'teal' | 'sky' | 'indigo' | 'purple' | 'rose';
}

export const ENGLISH_FILE_LEVELS: EnglishFileLevelDetails[] = [
  { id: 'Starter', nameAr: 'المبتدئ التمهيدي (Starter A1)', nameEn: 'Starter (A1)', desc: 'الأساسيات كالحروف، التعريف بالنفس وجمل الترحيب البسيطة.', color: 'emerald' },
  { id: 'Elementary', nameAr: 'المبتدئ (Elementary A2)', nameEn: 'Elementary (A2)', desc: 'التحدث عن الروتين اليومي، التفضيلات وصيغ الماضي والجمع.', color: 'teal' },
  { id: 'Pre-Intermediate', nameAr: 'دون المتوسط (Pre-Int B1.1)', nameEn: 'Pre-Intermediate (B1.1)', desc: 'التجارب الشخصية، الخطط المستقبلية، والنصائح والشرط الأول.', color: 'sky' },
  { id: 'Intermediate', nameAr: 'المتوسط (Intermediate B1.2)', nameEn: 'Intermediate (B1.2)', desc: 'المبني للمجهول، الشرط الثاني، الكلام المنقول وتاريخ العادات.', color: 'indigo' },
  { id: 'Upper-Intermediate', nameAr: 'فوق المتوسط (Upper-Int B2)', nameEn: 'Upper-Intermediate (B2)', desc: 'الندم، الاستنتاج الماضي، المستقبل التام والروابط المتقدمة.', color: 'purple' },
  { id: 'Advanced', nameAr: 'المتقدم (Advanced C1)', nameEn: 'Advanced (C1)', desc: 'الانعكاس النحوي، الصياغات الافتراضية، التوكيد الصارم وبلاغة الجمل.', color: 'rose' }
];

export const CATEGORIES: Category[] = [
  {
    id: 'daily',
    nameAr: 'أساسيات الحياة اليومية',
    nameEn: 'Daily Basics',
    iconName: 'MessageSquare',
    description: 'التحيات اليومية، الردود الشائعة، والعبارات الأساسية للتواصل اليومي.'
  },
  {
    id: 'travel',
    nameAr: 'السفر والاتجاهات',
    nameEn: 'Travel & Directions',
    iconName: 'Plane',
    description: 'المطار، حجز التذاكر، السؤال عن الطرق، الفنادق والمواصلات.'
  },
  {
    id: 'business',
    nameAr: 'العمل والشركات',
    nameEn: 'Work & Business',
    iconName: 'Briefcase',
    description: 'المقابلات الشخصية، الاجتماعات، المحادثات المهنية ورسائل البريد الإلكتروني.'
  },
  {
    id: 'shopping',
    nameAr: 'التسوق والمطاعم',
    nameEn: 'Shopping & Dining',
    iconName: 'ShoppingBag',
    description: 'طلب الطعام، السؤال عن الأسعار، الدفع، والاستفسار عن المنتجات.'
  },
  {
    id: 'social',
    nameAr: 'التواصل الاجتماعي',
    nameEn: 'Social & Friendship',
    iconName: 'Users',
    description: 'التعارف، بناء الصداقات، تبادل أرقام الهواتف، وتقديم الدعوات.'
  },
  {
    id: 'health',
    nameAr: 'الصحة والطوارئ',
    nameEn: 'Health & Emergencies',
    iconName: 'HeartPulse',
    description: 'وصف الأعراض للطبيب، شراء الدواء، وطلب المساعدة العاجلة.'
  },
  {
    id: 'emotions',
    nameAr: 'المشاعر والتعبير عن الذات',
    nameEn: 'Feelings & Emotions',
    iconName: 'Smile',
    description: 'التعبير عن السعادة، الحزن، التعب، الغضب والآراء الشخصية.'
  },
  {
    id: 'idioms',
    nameAr: 'التعبيرات والاصطلاحات',
    nameEn: 'Common Idioms',
    iconName: 'Sparkles',
    description: 'أمثال وتعبيرات مجازية شائعة جداً يستخدمها المتحدثون الأصليون.'
  }
];

const BASE_SENTENCES: Sentence[] = [
  // Daily Basics
  {
    id: 'd1',
    english: 'How have you been?',
    arabic: 'كيف كانت أحوالك؟ (كيف حالك مؤخراً؟)',
    category: 'daily',
    pronunciation: 'هاو هاف يو بين؟',
    explanation: 'تُستخدم للسؤال عن حال شخص لم تره منذ فترة قصيرة أو طويلة.'
  },
  {
    id: 'd2',
    english: 'It is nice to meet you.',
    arabic: 'سعدت بلقائك.',
    category: 'daily',
    pronunciation: 'إت إز نايس تو ميت يو.',
    explanation: 'عبارة مهذبة تُقال عند مقابلة شخص ما لأول مرة.'
  },
  {
    id: 'd3',
    english: 'Long time no see!',
    arabic: 'لم نلتقِ منذ فترة طويلة!',
    category: 'daily',
    pronunciation: 'لونج تايم نو سي!',
    explanation: 'تعبير غير رسمي يُستخدم عند رؤية شخص لم تره منذ مدة طويلة.'
  },
  {
    id: 'd4',
    english: 'What do you do for a living?',
    arabic: 'ماذا تعمل لكسب عيشك؟ (ما هي مهنتك؟)',
    category: 'daily',
    pronunciation: 'وات دو يو دو فور أ ليفينج؟',
    explanation: 'السؤال الأكثر شيوعاً وتهذيباً للسؤال عن وظيفة شخص ما.'
  },
  {
    id: 'd5',
    english: 'Could you repeat that, please?',
    arabic: 'هل يمكنك إعادة ذلك، من فضلك؟',
    category: 'daily',
    pronunciation: 'كود يو ريبيت ذات، بليز؟',
    explanation: 'طريقة مهذبة لطلب إعادة الكلام إذا لم تسمعه أو تفهمه.'
  },
  {
    id: 'd6',
    english: 'I really appreciate your help.',
    arabic: 'أنا حقاً أقدر مساعدتك.',
    category: 'daily',
    pronunciation: 'آي ريلي أبريشييت يور هيلب.',
    explanation: 'طريقة قوية لقول "شكراً لك" مع إظهار الامتنان العميق.'
  },
  {
    id: 'd7',
    english: 'Sorry to bother you.',
    arabic: 'آسف لإزعاجك.',
    category: 'daily',
    pronunciation: 'سوري تو باذر يو.',
    explanation: 'تُقال قبل طرح سؤال أو طلب من شخص يبدو مشغولاً.'
  },
  {
    id: 'd8',
    english: 'What is going on here?',
    arabic: 'ما الذي يجري هنا؟',
    category: 'daily',
    pronunciation: 'وات إز جوينج أون هير؟',
    explanation: 'للسؤال عن سبب التجمع أو حدوث نشاط معين.'
  },
  {
    id: 'd9',
    english: 'It doesn\'t matter.',
    arabic: 'لا يهم / ليس مهماً.',
    category: 'daily',
    pronunciation: 'إت دزنت ماتر.',
    explanation: 'تُستخدم للقول بأن هذا الشيء ليس ذا أهمية أو لن يؤثر.'
  },
  {
    id: 'd10',
    english: 'Make yourself at home.',
    arabic: 'تفضل كأنك في منزلك (اعتبر البيت بيتك).',
    category: 'daily',
    pronunciation: 'ميك يورسيلف أت هوم.',
    explanation: 'تُقال لترحيب الضيف وجعله يشعر بالراحة والحرية.'
  },
  {
    id: 'd11',
    english: 'What\'s the weather like today?',
    arabic: 'كيف يبدو الطقس اليوم؟',
    category: 'daily',
    pronunciation: 'واتس ذي ويذر لايك توداي؟',
    explanation: 'السؤال المعتاد لمعرفة حالة الجو.'
  },
  {
    id: 'd12',
    english: 'That sounds like a great idea!',
    arabic: 'هذا يبدو فكرة رائعة!',
    category: 'daily',
    pronunciation: 'ذات ساوندز لايك أ جريت آيديا!',
    explanation: 'لإظهار الحماس والموافقة على اقتراح شخص ما.'
  },
  {
    id: 'd13',
    english: 'I didn\'t catch your name.',
    arabic: 'لم ألتقط اسمك (لم أسمع اسمك جيداً).',
    category: 'daily',
    pronunciation: 'آي ديدنت كاتش يور نيم.',
    explanation: 'طريقة لبقة للاعتراف بأنك نسيت الاسم أو لم تسمعه بوضوح.'
  },
  {
    id: 'd14',
    english: 'Take care of yourself.',
    arabic: 'انتبه لنفسك (رافقتك السلامة).',
    category: 'daily',
    pronunciation: 'تيك كير أوف يورسيلف.',
    explanation: 'عبارة وداع ودية ودافئة تُقال للأصدقاء والعائلة.'
  },
  {
    id: 'd15',
    english: 'No worries, everything is fine.',
    arabic: 'لا تقلق، كل شيء على ما يرام.',
    category: 'daily',
    pronunciation: 'نو وريرز، إيفريثينج إز فاين.',
    explanation: 'لطمأنة الشخص الآخر بأن الأمور تسير بشكل جيد.'
  },

  // Travel
  {
    id: 't1',
    english: 'Where is the nearest subway station?',
    arabic: 'أين تقع أقرب محطة مترو أنفاق؟',
    category: 'travel',
    pronunciation: 'وير إز ذي نيرست سابواي ستيشن؟',
    explanation: 'سؤال أساسي للمسافرين للتنقل داخل المدن الكبرى.'
  },
  {
    id: 't2',
    english: 'I would like to book a room, please.',
    arabic: 'أود حجز غرفة، من فضلك.',
    category: 'travel',
    pronunciation: 'آي وود لايك تو بوك أ روم، بليز.',
    explanation: 'الصيغة الرسمية لحجز غرفة في فندق.'
  },
  {
    id: 't3',
    english: 'Is breakfast included in the price?',
    arabic: 'هل وجبة الإفطار مشمولة في السعر؟',
    category: 'travel',
    pronunciation: 'إز بريكفاست إنكلودد إن ذي برايس؟',
    explanation: 'سؤال شائع جداً عند حجز الفنادق للتأكد من المزايا.'
  },
  {
    id: 't4',
    english: 'Could you show me on the map?',
    arabic: 'هل يمكنك أن تريني على الخريطة؟',
    category: 'travel',
    pronunciation: 'كود يو شو مي أون ذي ماب؟',
    explanation: 'مفيد جداً عند الاستفسار عن مكان محدد من المرشد أو المارة.'
  },
  {
    id: 't5',
    english: 'What time is boarding for this flight?',
    arabic: 'في أي وقت يبدأ صعود الطائرة لهذه الرحلة؟',
    category: 'travel',
    pronunciation: 'وات تايم إز بوردينج فور ذيس فلايت؟',
    explanation: 'للاستفسار في المطار لتجنب تفويت موعد الطائرة.'
  },
  {
    id: 't6',
    english: 'Can I have a window seat, please?',
    arabic: 'هل يمكنني الحصول على مقعد بجانب النافذة، من فضلك؟',
    category: 'travel',
    pronunciation: 'كان آي هاف أ ويندو سيت، بليز؟',
    explanation: 'لطلب مقعد مفضل أثناء تسجيل الوصول في المطار.'
  },
  {
    id: 't7',
    english: 'My luggage has not arrived yet.',
    arabic: 'حقائبي لم تصل بعد.',
    category: 'travel',
    pronunciation: 'ماي لاجيج هاز نوت أرايفد يت.',
    explanation: 'يُستخدم للإبلاغ عن الحقائب المفقودة في قسم الأمتعة بالمطار.'
  },
  {
    id: 't8',
    english: 'How much is the taxi fare to downtown?',
    arabic: 'كم تبلغ أجرة التاكسي إلى وسط المدينة؟',
    category: 'travel',
    pronunciation: 'هاو ماتش إز ذي تاكسي فير تو داون تاون؟',
    explanation: 'للاتفاق مع السائق قبل الركوب تجنباً للأسعار المبالغ فيها.'
  },
  {
    id: 't9',
    english: 'Excuse me, I am lost. Can you help me?',
    arabic: 'معذرة، أنا تائه. هل يمكنك مساعدتي؟',
    category: 'travel',
    pronunciation: 'إكسكيوز مي، آي آم لوست. كان يو هيلب مي؟',
    explanation: 'تعبير لبق ومباشر لطلب المساعدة عند فقدان الطريق.'
  },
  {
    id: 't10',
    english: 'What are the top tourist attractions here?',
    arabic: 'ما هي أهم المعالم السياحية هنا؟',
    category: 'travel',
    pronunciation: 'وات آر ذي توب توريست أتراكشنز هير؟',
    explanation: 'للاستفسار من مكتب الاستعلامات السياحية أو موظفي الفندق.'
  },
  {
    id: 't11',
    english: 'Could I get a receipt, please?',
    arabic: 'هل يمكنني الحصول على إيصال، من فضلك؟',
    category: 'travel',
    pronunciation: 'كود آي جت أ ريسيت، بليز؟',
    explanation: 'طلب فاتورة أو إيصال دفع، وهو أمر ضروري في السفر للمصاريف.'
  },
  {
    id: 't12',
    english: 'Is it safe to walk around here at night?',
    arabic: 'هل المشي هنا في الليل آمن؟',
    category: 'travel',
    pronunciation: 'إز إت سيف تو واك أراوند هير أت نايت؟',
    explanation: 'سؤال مهم للسلامة الشخصية عند استكشاف مناطق جديدة.'
  },

  // Business / Work
  {
    id: 'b1',
    english: 'Let\'s schedule a meeting to discuss this further.',
    arabic: 'دعونا نحدد موعداً للاجتماع لمناقشة هذا الأمر بشكل أكبر.',
    category: 'business',
    pronunciation: 'لتس سكيدجول أ ميتينج تو ديسكاس ذيس فيرذر.',
    explanation: 'صيغة شائعة في بيئة العمل لتنظيم مناقشة لاحقة.'
  },
  {
    id: 'b2',
    english: 'I will get back to you as soon as possible.',
    arabic: 'سأرد عليك (أتواصل معك مجدداً) في أقرب وقت ممكن.',
    category: 'business',
    pronunciation: 'آي ويل جت باك تو يو أز سون أز بوسبل.',
    explanation: 'تعبير احترافي للرد السريع ريثما تتوفر لديك المعلومات.'
  },
  {
    id: 'b3',
    english: 'Can we wrap up the discussion for today?',
    arabic: 'هل يمكننا إنهاء المناقشة لهذا اليوم؟',
    category: 'business',
    pronunciation: 'كان وي راب أب ذي ديسكاشن فور توداي؟',
    explanation: 'الفعل المركب "wrap up" يعني إنهاء أو تلخيص موضوع ما.'
  },
  {
    id: 'b4',
    english: 'I think we are on the same page.',
    arabic: 'أعتقد أننا متفقون (على نفس الموجة/الخط).',
    category: 'business',
    pronunciation: 'آي ثينك وي آر أون ذي سيم بيج.',
    explanation: 'تعبير اصطلاحي يعني التطابق في الرأي والفهم التام للموضوع.'
  },
  {
    id: 'b5',
    english: 'Could you please forward me that email?',
    arabic: 'هل يمكنك من فضلك إعادة توجيه هذا البريد الإلكتروني إلي؟',
    category: 'business',
    pronunciation: 'كود يو بليز فوروارد مي ذات إيميل؟',
    explanation: 'طلب مألوف لمشاركة الرسائل والملفات داخل الشركة.'
  },
  {
    id: 'b6',
    english: 'What is the deadline for this project?',
    arabic: 'ما هو الموعد النهائي لتسليم هذا المشروع؟',
    category: 'business',
    pronunciation: 'وات إز ذي ديدلاين فور ذيس بروجكت؟',
    explanation: 'كلمة "deadline" تعني آخر موعد لإنهاء العمل وهي حيوية.'
  },
  {
    id: 'b7',
    english: 'I would like to apply for the position.',
    arabic: 'أود التقدم بطلب للحصول على هذا المنصب (الوظيفة).',
    category: 'business',
    pronunciation: 'آي وود لايك تو أبلاي فور ذي بوزيشن.',
    explanation: 'جملة افتتاحية رسمية تُكتب في رسالة التغطية (Cover Letter).'
  },
  {
    id: 'b8',
    english: 'Let\'s think outside the box for this problem.',
    arabic: 'دعونا نفكر خارج الصندوق لحل هذه المشكلة.',
    category: 'business',
    pronunciation: 'لتس ثينك آوتسايد ذي بوكس فور ذيس بروبلم.',
    explanation: 'تعبير شهير يحث على التفكير الإبداعي وغير التقليدي.'
  },
  {
    id: 'b9',
    english: 'We need to cut down on unnecessary expenses.',
    arabic: 'نحن بحاجة إلى خفض النفقات غير الضرورية.',
    category: 'business',
    pronunciation: 'وي نيد تو كات داون أون أنيسيسري إكسبنسز.',
    explanation: 'الفعل المركب "cut down on" يعني التقليل والحد من.'
  },
  {
    id: 'b10',
    english: 'Thank you for your valuable feedback.',
    arabic: 'شكراً لك على ملاحظاتك القيمة.',
    category: 'business',
    pronunciation: 'ثانك يو فور يور فاليوبل فيدباك.',
    explanation: 'طريقة مهذبة لإنهاء النقاش أو تقييم الأداء مع العملاء.'
  },

  // Shopping & Dining
  {
    id: 's1',
    english: 'Do you have this in a larger size?',
    arabic: 'هل لديكم هذا المقاس بحجم أكبر؟',
    category: 'shopping',
    pronunciation: 'دو يو هاف ذيس إن أ لارجر سايز؟',
    explanation: 'تُستخدم عند تجربة الملابس أو الأحذية للبحث عن مقاس أكبر.'
  },
  {
    id: 's2',
    english: 'Can I pay by credit card or cash only?',
    arabic: 'هل يمكنني الدفع ببطاقة الائتمان أم نقداً فقط؟',
    category: 'shopping',
    pronunciation: 'كان آي بي باي كريدت كارد أور كاش أونلي؟',
    explanation: 'للاستفسار عن طرق الدفع المتاحة قبل الشراء.'
  },
  {
    id: 's3',
    english: 'I would like to order the grilled chicken.',
    arabic: 'أود طلب الدجاج المشوي.',
    category: 'shopping',
    pronunciation: 'آي وود لايك تو أوردر ذي جريلد تشيكن.',
    explanation: 'جملة قياسية لطلب صنف محدد في المطعم.'
  },
  {
    id: 's4',
    english: 'Could we have the bill, please?',
    arabic: 'هل يمكننا الحصول على الفاتورة، من فضلك؟',
    category: 'shopping',
    pronunciation: 'كود وي هاف ذي بيل، بليز؟',
    explanation: 'الطريقة الأكثر تهذيباً لطلب الحساب في المطاعم والمقاهي.'
  },
  {
    id: 's5',
    english: 'Is there any discount on this item?',
    arabic: 'هل هناك أي خصم على هذه السلعة؟',
    category: 'shopping',
    pronunciation: 'إز ذير إني ديسكاونت أون ذيس آيتم؟',
    explanation: 'للسؤال عن العروض والخصومات في المحلات التجارية.'
  },
  {
    id: 's6',
    english: 'Where are the fitting rooms located?',
    arabic: 'أين تقع غرف قياس الملابس؟',
    category: 'shopping',
    pronunciation: 'وير آر ذي فيتينج رومز لوكيتد؟',
    explanation: 'سؤال أساسي في متاجر الملابس لتجربة اللباس.'
  },
  {
    id: 's7',
    english: 'Does this dish contain any nuts?',
    arabic: 'هل يحتوي هذا الطبق على أي مكسرات؟',
    category: 'shopping',
    pronunciation: 'دز ذيس ديش كونتين إني ناتس؟',
    explanation: 'سؤال ضروري جداً للأشخاص الذين يعانون من الحساسية الغذائية.'
  },
  {
    id: 's8',
    english: 'This is not what I ordered.',
    arabic: 'هذا ليس ما طلبته.',
    category: 'shopping',
    pronunciation: 'ذيس إز نوت وات آي أوردرد.',
    explanation: 'تعبير مهذب لتنبيه النادل بوجود خطأ في الطبق المقدم.'
  },
  {
    id: 's9',
    english: 'Can I get this to go, please?',
    arabic: 'هل يمكنني الحصول على هذا سفري (خارج المطعم)، من فضلك؟',
    category: 'shopping',
    pronunciation: 'كان آي جت ذيس تو جو، بليز؟',
    explanation: 'تعبير "to go" يعني تيك أواي أو تعبئة الطعام لأكله في الخارج.'
  },
  {
    id: 's10',
    english: 'Do you offer a warranty on this product?',
    arabic: 'هل تقدمون ضماناً على هذا المنتج؟',
    category: 'shopping',
    pronunciation: 'دو يو أوفر أ وارانتي أون ذيس برودكت؟',
    explanation: 'مهم عند شراء الأجهزة الإلكترونية لمعرفة تفاصيل الكفالة.'
  },

  // Social & Friendship
  {
    id: 'so1',
    english: 'Would you like to hang out sometime?',
    arabic: 'هل تود أن نخرج معاً لبعض الوقت في وقت ما؟',
    category: 'social',
    pronunciation: 'وود يو لايك تو هانج آوت سام تايم؟',
    explanation: 'تعبير "hang out" غير رسمي ويعني قضاء وقت ممتع مع الأصدقاء.'
  },
  {
    id: 'so2',
    english: 'What are your plans for the weekend?',
    arabic: 'ما هي خططك لعطلة نهاية الأسبوع؟',
    category: 'social',
    pronunciation: 'وات آر يور بلانز فور ذي ويك إند؟',
    explanation: 'سؤال رائع لفتح حوار ودي ومعرفة الأنشطة المفضلة.'
  },
  {
    id: 'so3',
    english: 'Are you on social media?',
    arabic: 'هل أنت متواجد على مواقع التواصل الاجتماعي؟',
    category: 'social',
    pronunciation: 'آر يو أون سوشيال ميديا؟',
    explanation: 'سؤال معاصر ومقرب للتواصل وتبادل الحسابات.'
  },
  {
    id: 'so4',
    english: 'I have heard so much about you!',
    arabic: 'لقد سمعت الكثير عنك!',
    category: 'social',
    pronunciation: 'آي هاف هيرد سو ماتش أباوت يو!',
    explanation: 'تُقال بلطف عند لقاء شخص تحدث عنه الأصدقاء مسبقاً بشكل إيجابي.'
  },
  {
    id: 'so5',
    english: 'Please let me know if you need anything.',
    arabic: 'يرجى إعلامي إذا كنت بحاجة إلى أي شيء.',
    category: 'social',
    pronunciation: 'بليز لت مي نو إف يو نيد إني ثينج.',
    explanation: 'طريقة للتعبير عن الاستعداد التام لمساندة صديق أو زميل.'
  },
  {
    id: 'so6',
    english: 'That is really kind of you.',
    arabic: 'هذا لطف كبير منك.',
    category: 'social',
    pronunciation: 'ذات إز ريلي كايند أوف يو.',
    explanation: 'أفضل جملة لشكر شخص قدم لك معروفاً أو مدحاً.'
  },
  {
    id: 'so7',
    english: 'I am so glad you could make it.',
    arabic: 'أنا سعيد جداً لأنك تمكنت من الحضور.',
    category: 'social',
    pronunciation: 'آي آم سو جلاد يو كود ميك إت.',
    explanation: 'تعبير ترحيبي يُقال للضيف الذي حضر مناسبة قمت بدعوته إليها.'
  },
  {
    id: 'so8',
    english: 'We should keep in touch.',
    arabic: 'يجب أن نبقى على تواصل.',
    category: 'social',
    pronunciation: 'وي شود كيب إن تاتش.',
    explanation: 'يُقال عند توديع الأصدقاء للتأكيد على الرغبة في استمرار العلاقة.'
  },

  // Health & Emergency
  {
    id: 'h1',
    english: 'I have a terrible headache today.',
    arabic: 'أعاني من صداع رهيب اليوم.',
    category: 'health',
    pronunciation: 'آي هاف أ تيربل هيد ايك توداي.',
    explanation: 'لوصف ألم الرأس الشديد وتبرير عدم القدرة على العمل مثلاً.'
  },
  {
    id: 'h2',
    english: 'Please call an ambulance immediately!',
    arabic: 'أرجو الاتصال بالإسعاف فوراً!',
    category: 'health',
    pronunciation: 'بليز كول آن أمبيولانس إيميديتلي!',
    explanation: 'جملة طارئة لإنقاذ حياة شخص ما في حالات الخطر القصوى.'
  },
  {
    id: 'h3',
    english: 'Are you allergic to any medication?',
    arabic: 'هل تعاني من حساسية تجاه أي دواء؟',
    category: 'health',
    pronunciation: 'آر يو أليرجيك تو إني ميديكيشن؟',
    explanation: 'سؤال طبي قياسي يطرحه الأطباء قبل وصف العلاج.'
  },
  {
    id: 'h4',
    english: 'I need to make an appointment with the doctor.',
    arabic: 'أنا بحاجة لتحديد موعد مع الطبيب.',
    category: 'health',
    pronunciation: 'آي نيد تو ميك آن أباينتمنت وذ ذي دوكتور.',
    explanation: 'الاتصال بالعيادة لحجز موعد كشف طبي.'
  },
  {
    id: 'h5',
    english: 'Take this medicine after meals twice a day.',
    arabic: 'تناول هذا الدواء بعد الوجبات مرتين يومياً.',
    category: 'health',
    pronunciation: 'تيك ذيس ميديسن أفتر ميلز توايس أ داي.',
    explanation: 'إرشادات الصيدلي الشائعة لكيفية أخذ الجرعات.'
  },
  {
    id: 'h6',
    english: 'Where is the 24-hour pharmacy?',
    arabic: 'أين تقع الصيدلية التي تعمل على مدار 24 ساعة؟',
    category: 'health',
    pronunciation: 'وير إز ذي توينتي فور آور فارماسي؟',
    explanation: 'سؤال هام عند الحاجة لدواء عاجل في أوقات متأخرة.'
  },
  {
    id: 'h7',
    english: 'I feel dizzy and lightheaded.',
    arabic: 'أشعر بالدوار وبأن رأسي خفيف.',
    category: 'health',
    pronunciation: 'آي فيل ديزي آند لايت هيدد.',
    explanation: 'تعبير دقيق لشرح الشعور بالدوخة وعدم الاتزان للطبيب.'
  },

  // Feelings & Emotions
  {
    id: 'e1',
    english: 'I am absolutely thrilled for your success!',
    arabic: 'أنا متحمس وسعيد للغاية بنجاحك!',
    category: 'emotions',
    pronunciation: 'آي آم أبسولوتلي ثريلد فور يور سكسيس!',
    explanation: 'استخدام كلمة "thrilled" يعبر عن مستوى عالٍ جداً من الفرح والبهجة.'
  },
  {
    id: 'e2',
    english: 'I feel a bit under the weather today.',
    arabic: 'أشعر بالمرض/التعب قليلاً اليوم.',
    category: 'emotions',
    pronunciation: 'آي فيل أ بت أندر ذي ويذر توداي.',
    explanation: 'تعبير مجازي لطيف يعني أن الشخص متعب أو مريض خفيفاً.'
  },
  {
    id: 'e3',
    english: 'Don\'t take it to heart, it wasn\'t your fault.',
    arabic: 'لا تأخذ الأمر على محمل شخصي (في قلبك)، لم يكن هذا خطأك.',
    category: 'emotions',
    pronunciation: 'دونّت تيك إت تو هارت، إت وازنت يور فولت.',
    explanation: 'لمواساة شخص يشعر بالذنب أو الحزن حيال موقف ما.'
  },
  {
    id: 'e4',
    english: 'I am looking forward to our trip.',
    arabic: 'أنا أتطلع بشوق إلى رحلتنا.',
    category: 'emotions',
    pronunciation: 'آي آم لوكينج فوروارد تو آور تريب.',
    explanation: 'عبارة "look forward to" تعني الترقب الإيجابي لحدث مستقبلي.'
  },
  {
    id: 'e5',
    english: 'That is so frustrating!',
    arabic: 'هذا محبط للغاية!',
    category: 'emotions',
    pronunciation: 'ذات إز سو فرستريتينج!',
    explanation: 'للتعبير عن الضيق أو الغضب من تعطل أمر ما.'
  },

  // Common Idioms
  {
    id: 'i1',
    english: 'It is a piece of cake.',
    arabic: 'إنه أمر في غاية السهولة (مثل قطعة حلوى).',
    category: 'idioms',
    pronunciation: 'إت إز أ بيس أوف كيك.',
    explanation: 'تعبير اصطلاحي شهير جداً يعني أن المهمة سهلة للغاية ولا تتطلب جهداً.'
  },
  {
    id: 'i2',
    english: 'Break a leg tonight!',
    arabic: 'بالتوفيق الليلة! (أتمنى لك أداءً رائعاً).',
    category: 'idioms',
    pronunciation: 'بريك أ ليج توداي!',
    explanation: 'يُقال للممثلين أو أي شخص مقبل على أداء أو عرض للتمني له بالتوفيق.'
  },
  {
    id: 'i3',
    english: 'Once in a blue moon.',
    arabic: 'نادراً جداً (مرة في عمر القمر الأزرق).',
    category: 'idioms',
    pronunciation: 'وانس إن أ بلو مون.',
    explanation: 'يُضرب لوصف الأشياء التي تحدث بشكل نادر جداً ومتباعد.'
  },
  {
    id: 'i4',
    english: 'Bite the bullet and do it.',
    arabic: 'تماسك واقبل الأمر الصعب وقم به (عض على الرصاصة).',
    category: 'idioms',
    pronunciation: 'بايت ذي بوليت آند دو إت.',
    explanation: 'يعني اتخاذ قرار صعب ولكن لا بد منه بقوة وجسارة.'
  },
  {
    id: 'i5',
    english: 'Don\'t cry over spilled milk.',
    arabic: 'لا تبكِ على اللبن المسكوب (ما مضى قد مضى).',
    category: 'idioms',
    pronunciation: 'دونّت كراي أوفر سبيلد ملك.',
    explanation: 'نصيحة بعدم التحسر أو الندم على أمور حدثت ولا يمكن تغييرها.'
  }
];

// 30 Brand New English File Syllabus sentences for all 6 levels
const EXTRA_SENTENCES: Sentence[] = [
  // Starter (A1)
  {
    id: 'ef_st1',
    english: "What's your phone number?",
    arabic: "ما هو رقم هاتفك؟",
    category: "social",
    pronunciation: "واتس يور فون نمبر؟",
    explanation: "سؤال أساسي في المستوى المبتدئ للتعارف وتبادل أرقام الهواتف.",
    level: "Starter"
  },
  {
    id: 'ef_st2',
    english: "I am a student.",
    arabic: "أنا طالب.",
    category: "social",
    pronunciation: "آي آم أ ستيودنت.",
    explanation: "استخدام صيغة المضارع البسيط للفعل be للتعريف بالنفس والمهنة.",
    level: "Starter"
  },
  {
    id: 'ef_st3',
    english: "Where are you from?",
    arabic: "من أين أنت؟",
    category: "social",
    pronunciation: "وير آر يو فروم؟",
    explanation: "السؤال الكلاسيكي في الفصل الأول من كتاب English File للتعرف على جنسية الآخرين.",
    level: "Starter"
  },
  {
    id: 'ef_st4',
    english: "This is my friend, Sarah.",
    arabic: "هذه صديقتي، سارة.",
    category: "social",
    pronunciation: "ذيس إز ماي فريند، سارة.",
    explanation: "طريقة تقديم الأصدقاء والمعارف باستخدام أسماء الإشارة وصفات الملكية.",
    level: "Starter"
  },
  {
    id: 'ef_st5',
    english: "How do you spell your last name?",
    arabic: "كيف تتهجى اسم عائلتك؟",
    category: "social",
    pronunciation: "هاو دو يو سبيل يور لاست نيم؟",
    explanation: "مهارة أساسية للتدرب على الحروف الأبجدية الإنجليزية في المستوى التمهيدي.",
    level: "Starter"
  },
  // Elementary (A2)
  {
    id: 'ef_el1',
    english: "What time do you usually wake up?",
    arabic: "في أي وقت تستيقظ عادةً؟",
    category: "daily",
    pronunciation: "وات تايم دو يو يوجوالي ويك أب؟",
    explanation: "للسؤال عن الروتين اليومي باستخدام ظروف التكرار (usually) وزمن المضارع البسيط.",
    level: "Elementary"
  },
  {
    id: 'ef_el2',
    english: "She doesn't like spicy food.",
    arabic: "هي لا تحب الطعام الحار.",
    category: "shopping",
    pronunciation: "شي دزنت لايك سبايسي فود.",
    explanation: "صيغة النفي في المضارع البسيط للحديث عن الميول والتفضيلات الشخصية.",
    level: "Elementary"
  },
  {
    id: 'ef_el3',
    english: "Where did you go last weekend?",
    arabic: "أين ذهبت في عطلة نهاية الأسبوع الماضي؟",
    category: "daily",
    pronunciation: "وير ديد يو جو لاست ويك إند؟",
    explanation: "التدرب على زمن الماضي البسيط وصيغة السؤال باستخدام الفعل المساعد did.",
    level: "Elementary"
  },
  {
    id: 'ef_el4',
    english: "There are some apples in the fridge.",
    arabic: "يوجد بعض التفاح في الثلاجة.",
    category: "shopping",
    pronunciation: "ذير آر سام آبلز إن ذي فريدج.",
    explanation: "استخدام there are مع الأسماء المعدودة وصيغة الجمع في وصف المطبخ والمنزل.",
    level: "Elementary"
  },
  {
    id: 'ef_el5',
    english: "He is more friendly than his brother.",
    arabic: "إنه ودود أكثر من شقيقه.",
    category: "social",
    pronunciation: "هي إز مور فريندلي ذان هز براذر.",
    explanation: "قاعدة المقارنة بين الأشخاص باستخدام الصفات الطويلة والقصيرة.",
    level: "Elementary"
  },
  // Pre-Intermediate (B1.1)
  {
    id: 'ef_pi1',
    english: "Have you ever been to a concert?",
    arabic: "هل سبق لك وأن ذهبت إلى حفل موسيقي؟",
    category: "social",
    pronunciation: "هاف يو إيفر بين تو أ كونسرت؟",
    explanation: "استخدام زمن المضارع التام (Present Perfect) مع ever للسؤال عن الخبرات والتجارب الشخصية.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi2',
    english: "If it rains tomorrow, we will cancel the picnic.",
    arabic: "إذا أمطرت غداً، فسنلغي الرحلة.",
    category: "travel",
    pronunciation: "إف إت رينز تومورو، وي ويل كانسل ذي بيكنيك.",
    explanation: "الحالة الشرطية الأولى (First Conditional) للحديث عن احتمالات مستقبلية واقعية.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi3',
    english: "I am going to visit my relatives next week.",
    arabic: "أنا ذاهب لزيارة أقاربي الأسبوع المقبل.",
    category: "social",
    pronunciation: "آي آم جوينج تو فيزت ماي ريلاتيفز نيكست ويك.",
    explanation: "التعبير عن الخطط والنوايا المستقبلية المؤكدة باستخدام صيغة be going to.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi4',
    english: "You should try this local dish; it is delicious!",
    arabic: "يجب أن تجرب هذا الطبق المحلي، إنه لذيذ!",
    category: "shopping",
    pronunciation: "يو شود تراي ذيس لوكال ديش، إت إز ديليشس!",
    explanation: "تقديم النصيحة والاقتراح للأصدقاء والمسافرين باستخدام فعل المودال should.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi5',
    english: "We have lived here since 2018.",
    arabic: "لقد عشنا هنا منذ عام 2018.",
    category: "daily",
    pronunciation: "وي هاف ليفد هير سينس تو ثاوزند آند إيتين.",
    explanation: "التدرب على المضارع التام للتعبير عن حدث بدأ في الماضي وما زال مستمراً باستخدام since.",
    level: "Pre-Intermediate"
  },
  // Intermediate (B1.2)
  {
    id: 'ef_int1',
    english: "This novel was written by a famous author.",
    arabic: "هذه الرواية كُتبت بواسطة مؤلف مشهور.",
    category: "daily",
    pronunciation: "ذيس نوفل واز ريتن باي أ فيموس أوثر.",
    explanation: "صيغة المبني للمجهول (Passive Voice) في الماضي البسيط للتركيز على الحدث بدلاً من الفاعل.",
    level: "Intermediate"
  },
  {
    id: 'ef_int2',
    english: "If I had a million dollars, I would travel around the world.",
    arabic: "لو كان لدي مليون دولار، لكنت سافرت حول العالم.",
    category: "emotions",
    pronunciation: "إف آي هاد أ ميليون دولارز، آي وود ترافل أراوند ذي ويرلد.",
    explanation: "الحالة الشرطية الثانية (Second Conditional) للتعبير عن مواقف خيالية وغير محتملة في الحاضر.",
    level: "Intermediate"
  },
  {
    id: 'ef_int3',
    english: "The flight which we booked was delayed by two hours.",
    arabic: "الرحلة التي حجزناها تأخرت لمدة ساعتين.",
    category: "travel",
    pronunciation: "ذي فلايت ويتش وي بوكت واز ديلايد باي تو آورز.",
    explanation: "استخدام ضمائر الوصل (Relative Pronouns) لربط الجمل وإعطاء معلومات إضافية عن الأشياء.",
    level: "Intermediate"
  },
  {
    id: 'ef_int4',
    english: "I used to play basketball when I was in high school.",
    arabic: "اعتدت أن ألعب كرة السلة عندما كنت في المدرسة الثانوية.",
    category: "social",
    pronunciation: "آي يوزد تو بلاي باسككتبول وين آي واز إن هاي سكول.",
    explanation: "صيغة used to للتعبير عن عادات قديمة في الماضي لم تعد موجودة الآن.",
    level: "Intermediate"
  },
  {
    id: 'ef_int5',
    english: "He told me that he had already finished the report.",
    arabic: "أخبرني أنه قد انتهى بالفعل من إعداد التقرير.",
    category: "business",
    pronunciation: "هي تولد مي ذات هي هاد أولريدي فينيشد ذي ريبورت.",
    explanation: "الكلام المنقول (Reported Speech) لنقل تصريحات الآخرين مع تغيير الأزمنة المناسبة.",
    level: "Intermediate"
  },
  // Upper-Intermediate (B2)
  {
    id: 'ef_ui1',
    english: "Although the test was difficult, she managed to pass it.",
    arabic: "على الرغم من أن الاختبار كان صعباً، إلا أنها تمكنت من اجتيازه.",
    category: "business",
    pronunciation: "أولذو ذي تيست واز ديفيكلت، شي مانجت تو باس إت.",
    explanation: "استخدام الروابط التناقضية (Although / Despite) لربط فكرتين متعارضتين بذكاء وجاذبية لغوية.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui2',
    english: "I wish I had studied harder when I was younger.",
    arabic: "أتمنى لو كنت قد درست بجد أكبر عندما كنت أصغر سناً.",
    category: "emotions",
    pronunciation: "آي ويش آي هاد ستاديد هاردر وين آي واز يونجر.",
    explanation: "التعبير عن الندم والحسرة على مواقف في الماضي باستخدام صيغة wish متبوعة بالماضي التام.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui3',
    english: "She must have forgotten her keys at the office.",
    arabic: "لا بد أنها نسيت مفاتيحها في المكتب.",
    category: "daily",
    pronunciation: "شي ماست هاف فورغوتن هير كيز أت ذي أوفيس.",
    explanation: "أفعال الاستنتاج في الماضي (Past Modals of Deduction) للتعبير عن شبه يقين بحدث ماضي.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui4',
    english: "By this time next year, I will have graduated from university.",
    arabic: "بمثل هذا الوقت من العام المقبل، سأكون قد تخرجت من الجامعة.",
    category: "business",
    pronunciation: "باي ذيس تايم نيكست يير، آي ويل هاف جرادويتيد فروم يونيفيرسيتي.",
    explanation: "زمن المستقبل التام (Future Perfect) للإشارة إلى حدث سيكون قد اكتمل قبل نقطة معينة في المستقبل.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui5',
    english: "I look forward to hearing from you soon.",
    arabic: "أتطلع بشوق للاستماع إليكم قريباً.",
    category: "business",
    pronunciation: "آي لوك فوروارد تو هيرينج فروم يو سون.",
    explanation: "صيغة رسمية ممتازة لختام رسائل البريد الإلكتروني في بيئة العمل، تتبعها دائماً صيغة gerund (verb+ing).",
    level: "Upper-Intermediate"
  },
  // Advanced (C1)
  {
    id: 'ef_ad1',
    english: "No sooner had I entered the house than the phone rang.",
    arabic: "ما كدت أدخل المنزل حتى رن الهاتف.",
    category: "daily",
    pronunciation: "نو سونر هاد آي إنترد ذي هاوس ذان ذي فون رانغ.",
    explanation: "قاعدة الانعكاس النحوي (Grammar Inversion) لإضافة طابع أدبي وبلاغي قوي ومتقدم للجملة.",
    level: "Advanced"
  },
  {
    id: 'ef_ad2',
    english: "Had I known about the changes, I would have acted differently.",
    arabic: "لو كنت علمت بالتغييرات، لكنت تصرفت بشكل مختلف.",
    category: "business",
    pronunciation: "هاد آي نون أباوت ذي تشينجز، آي وود هاف أكتيد ديفيرنتلي.",
    explanation: "الصيغة المتقدمة للحالة الشرطية الثالثة بحذف if واستخدام الانعكاس النحوي للشرط.",
    level: "Advanced"
  },
  {
    id: 'ef_ad3',
    english: "It is high time we took action to address this issue.",
    arabic: "حان الوقت لنتخذ إجراءً لمعالجة هذه القضية.",
    category: "business",
    pronunciation: "إت إز هاي تايم وي توك أكتشن تو أدريس ذيس إيشو.",
    explanation: "صيغة افتراضية (Unreal Past) تُستخدم للتأكيد على أن هذا الإجراء تأخر وينبغي البدء فيه فوراً.",
    level: "Advanced"
  },
  {
    id: 'ef_ad4',
    english: "She talked about her achievements as if she had won a Nobel prize.",
    arabic: "تحدثت عن إنجازاتها كما لو أنها فازت بجائزة نوبل.",
    category: "social",
    pronunciation: "شي تاكت أباوت هير أشيفمنتس آز إف شي هاد وان أ نوبل برايز.",
    explanation: "استخدام as if للتشبيه الافتراضي الخيالي متبوعاً بالماضي التام للتعبير عن عدم الواقعية.",
    level: "Advanced"
  },
  {
    id: 'ef_ad5',
    english: "Under no circumstances should you share your personal password.",
    arabic: "تحت أي ظرف من الظروف لا ينبغي عليك مشاركة كلمة مرورك الشخصية.",
    category: "daily",
    pronunciation: "أندر نو سيركامستانسز شود يو شير يور بيرسونال باسوورد.",
    explanation: "صيغة إنكار وانعكاس نحوي متقدمة جداً للتأكيد الصارم والتحذير المطلق.",
    level: "Advanced"
  },
  // Starter (A1) - Batch 2
  {
    id: 'ef_st6',
    english: "What is your email address?",
    arabic: "ما هو عنوان بريدك الإلكتروني؟",
    category: "social",
    pronunciation: "وات إز يور إيميل أدريس؟",
    explanation: "سؤال أساسي لتبادل معلومات الاتصال والبريد الإلكتروني في مستوى التعارف المبتدئ.",
    level: "Starter"
  },
  {
    id: 'ef_st7',
    english: "Nice to meet you.",
    arabic: "سعدت بلقائك.",
    category: "social",
    pronunciation: "نايس تو ميت يو.",
    explanation: "عبارة ترحيبية أساسية وشائعة تُقال عند التعرف على شخص جديد لأول مرة.",
    level: "Starter"
  },
  {
    id: 'ef_st8',
    english: "Can you help me, please?",
    arabic: "هل يمكنك مساعدتي من فضلك؟",
    category: "daily",
    pronunciation: "كان يو هيلب مي، بليز؟",
    explanation: "طريقة مهذبة وبسيطة للغاية لطلب المساعدة تناسب المتعلمين الجدد.",
    level: "Starter"
  },
  {
    id: 'ef_st9',
    english: "How much is this?",
    arabic: "كم سعر هذا؟",
    category: "shopping",
    pronunciation: "هاو ماتش إز ذيس؟",
    explanation: "السؤال الكلاسيكي والأكثر استخداماً للسؤال عن أسعار السلع أثناء التسوق والطلب.",
    level: "Starter"
  },
  {
    id: 'ef_st10',
    english: "See you tomorrow.",
    arabic: "أراك غداً.",
    category: "social",
    pronunciation: "سي يو تومورو.",
    explanation: "عبارة وداع ودية وشائعة تُستخدم بكثرة بين الأصدقاء والزملاء.",
    level: "Starter"
  },
  // Elementary (A2) - Batch 2
  {
    id: 'ef_el6',
    english: "I usually go to work by bus.",
    arabic: "أذهب إلى العمل بالحافلة عادةً.",
    category: "daily",
    pronunciation: "آي يوجوالي جو تو ويرك باي باس.",
    explanation: "وصف وسائل النقل المستخدمة والروتين اليومي باستخدام ظروف التكرار والمضارع البسيط.",
    level: "Elementary"
  },
  {
    id: 'ef_el7',
    english: "Where can I buy a ticket?",
    arabic: "أين يمكنني شراء تذكرة؟",
    category: "travel",
    pronunciation: "وير كان آي باي أ تيكت؟",
    explanation: "سؤال حيوي للمسافرين عند الرغبة في استخدام المواصلات العامة أو حجز الرحلات.",
    level: "Elementary"
  },
  {
    id: 'ef_el8',
    english: "He has a lot of hobbies.",
    arabic: "لديه الكثير من الهوايات.",
    category: "social",
    pronunciation: "هي هاز أ لوت أوف هوبيز.",
    explanation: "الحديث عن الاهتمامات والهوايات الشخصية باستخدام فعل الملكية المناسب للمفرد (has).",
    level: "Elementary"
  },
  {
    id: 'ef_el9',
    english: "It was very cold yesterday.",
    arabic: "كان الجو بارداً جداً أمس.",
    category: "daily",
    pronunciation: "إت واز فيري كولد يستردي.",
    explanation: "وصف حالة الطقس والتحدث عن أحداث وتجارب سابقة في الماضي البسيط.",
    level: "Elementary"
  },
  {
    id: 'ef_el10',
    english: "Would you like some tea?",
    arabic: "هل ترغب في بعض الشاي؟",
    category: "social",
    pronunciation: "وود يو لايك سام تي؟",
    explanation: "الصيغة الأكثر تهذيباً لتقديم الضيافة والعروض للأصدقاء والزوار.",
    level: "Elementary"
  },
  // Pre-Intermediate (B1.1) - Batch 2
  {
    id: 'ef_pi6',
    english: "I have been studying English for two years.",
    arabic: "أنا أدرس اللغة الإنجليزية منذ سنتين.",
    category: "daily",
    pronunciation: "آي هاف بين ستادينج إنجلش فور تو ييرز.",
    explanation: "استخدام زمن المضارع التام المستمر للتعبير عن حدث بدأ في الماضي وما زال مستمراً حتى الآن.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi7',
    english: "What would you do if you lost your passport?",
    arabic: "ماذا ستفعل لو فقدت جواز سفرك؟",
    category: "travel",
    pronunciation: "وات وود يو دو إف يو لوست يور باسبورت؟",
    explanation: "صيغة السؤال التخيلي في الحالة الشرطية الثانية للتعبير عن سيناريوهات غير محتملة في الحاضر.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi8',
    english: "The movie was so boring that we left early.",
    arabic: "الفيلم كان مملاً جداً لدرجة أننا غادرنا باكراً.",
    category: "social",
    pronunciation: "ذي موفي واز سو بورينج ذات وي لفت إيرلي.",
    explanation: "توظيف الأسلوب النحوي so + adjective + that للتعبير عن شدة النتيجة المترتبة على السبب.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi9',
    english: "You don't need to pay for the water; it is free.",
    arabic: "لا تحتاج لدفع ثمن الماء، فهو مجاني.",
    category: "shopping",
    pronunciation: "يو دونت نيد تو باي فور ذي ووتر، إت إز فري.",
    explanation: "التعبير عن عدم وجود ضرورة أو التزام باستخدام الصيغة اللغوية don't need to.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi10',
    english: "Could you tell me how to get to the station?",
    arabic: "هل يمكنك إخباري كيف أصل إلى المحطة؟",
    category: "travel",
    pronunciation: "كود يو تيل مي هاو تو غيت تو ذي ستيشن؟",
    explanation: "طريقة مهذبة لطلب الاتجاهات باستخدام السؤال غير المباشر بأسلوب رصين ومناسب.",
    level: "Pre-Intermediate"
  },
  // Intermediate (B1.2) - Batch 2
  {
    id: 'ef_int6',
    english: "I'm not sure if I can make it to the party.",
    arabic: "لست متأكداً إن كنت سأتمكن من القدوم إلى الحفلة.",
    category: "social",
    pronunciation: "آيم نوت شور إف آي كان ميك إت تو ذي بارتي.",
    explanation: "التعبير عن الشك والاعتذار بطريقة ودية باستخدام التعبير الاصطلاحي make it.",
    level: "Intermediate"
  },
  {
    id: 'ef_int7',
    english: "She suggested going to the Italian restaurant.",
    arabic: "اقترحت الذهاب إلى المطعم الإيطالي.",
    category: "social",
    pronunciation: "شي سوجيستد جوينج تو ذي إيتاليان ريستورانت.",
    explanation: "صيغة اقتراح متقدمة باستخدام الفعل suggest متبوعاً بصيغة المصدر verb+ing مباشرة.",
    level: "Intermediate"
  },
  {
    id: 'ef_int8',
    english: "The project must be completed by Friday.",
    arabic: "يجب إكمال المشروع بحلول يوم الجمعة.",
    category: "business",
    pronunciation: "ذي بروجكت ماست بي كومبليتد باي فرايداي.",
    explanation: "استخدام صيغة المبني للمجهول مع أفعال الإلزام والضرورة (must be + past participle).",
    level: "Intermediate"
  },
  {
    id: 'ef_int9',
    english: "I look forward to meeting you in person.",
    arabic: "أتطلع بشوق للقائك شخصياً.",
    category: "business",
    pronunciation: "آي لوك فوروارد تو ميتينج يو إن بيرسون.",
    explanation: "صيغة مهنية رائعة للتعبير عن الاهتمام والحماس للاجتماع بزميل عمل أو عميل وجهاً لوجه.",
    level: "Intermediate"
  },
  {
    id: 'ef_int10',
    english: "He succeeded in passing the interview despite the stress.",
    arabic: "نجح في اجتياز المقابلة رغم التوتر.",
    category: "business",
    pronunciation: "هي سكسيدد إن باسينج ذي إنترفيو ديسبايت ذي ستريس.",
    explanation: "استخدام حرف الجر in مع الفعل succeed متبوعاً بصيغة gerund للحديث عن الإنجازات الصعبة.",
    level: "Intermediate"
  },
  // Upper-Intermediate (B2) - Batch 2
  {
    id: 'ef_ui6',
    english: "I would rather stay home than go out tonight.",
    arabic: "أفضل البقاء في المنزل على الخروج الليلة.",
    category: "social",
    pronunciation: "آي وود راذر ستاي هوم ذان جو آوت تونايت.",
    explanation: "التعبير عن التفضيل الشخصي المباشر بين خيارين باستخدام الصيغة would rather + infinitive + than.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui7',
    english: "He denied having stolen the money.",
    arabic: "أنكر قيامه بسرقة المال.",
    category: "social",
    pronunciation: "هي دينايد هافينج ستولن ذي ماني.",
    explanation: "استخدام الفعل deny متبوعاً بصيغة التام المستمر (having + p.p.) للإشارة إلى حدث ماضٍ منفي.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui8',
    english: "I am not used to waking up so early.",
    arabic: "لست معتاداً على الاستيقاظ مبكراً جداً.",
    category: "daily",
    pronunciation: "آي آم نوت يوزد تو ويكينج أب سو إيرلي.",
    explanation: "الصيغة be used to + gerund تعني عدم التعود والانسجام مع حالة حالية صعبة.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui9',
    english: "The meeting has been called off due to bad weather.",
    arabic: "تم إلغاء الاجتماع بسبب سوء الأحوال الجوية.",
    category: "business",
    pronunciation: "ذي ميتينج هاز بين كولد أوف ديو تو باد ويذر.",
    explanation: "توظيف الفعل المركب call off بمعنى 'إلغاء' في زمن المضارع التام للمبني للمجهول.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui10',
    english: "You should have told me about the delay beforehand.",
    arabic: "كان ينبغي عليك إخباري بالتأخير مسبقاً.",
    category: "social",
    pronunciation: "يو شود هاف تولد مي أباوت ذي ديلاي بيفورهاند.",
    explanation: "استخدام should have + p.p. للتعبير عن النقد واللوم أو الندم على تصرف فائت في الماضي.",
    level: "Upper-Intermediate"
  },
  // Advanced (C1) - Batch 2
  {
    id: 'ef_ad6',
    english: "Seldom do we witness such a magnificent performance.",
    arabic: "نادراً ما نشهد مثل هذا الأداء الرائع.",
    category: "social",
    pronunciation: "سيلدوم دو وي ويتنس ساتش أ ماغنيفيسنت بيرفورمانس.",
    explanation: "الانعكاس النحوي (Inversion) باستخدام الظرف السلبي seldom لإعطاء نبرة أدبية بليغة وقوية.",
    level: "Advanced"
  },
  {
    id: 'ef_ad7',
    english: "It was of paramount importance that we act swiftly.",
    arabic: "كان من الأهمية بمكان أن نتصرف بسرعة.",
    category: "business",
    pronunciation: "إت واز أوف باراماونت إمبورتنس ذات وي أكت سويفتلي.",
    explanation: "استخدام الصفة المتقدمة of paramount importance مع تركيبة Subjunctive للتأكيد البالغ.",
    level: "Advanced"
  },
  {
    id: 'ef_ad8',
    english: "The company went bankrupt, thereby leaving many jobless.",
    arabic: "أفلست الشركة، وبذلك تركت الكثيرين بلا عمل.",
    category: "business",
    pronunciation: "ذي كومباني وينت بانكرابت، ذيرباي ليفينج ميني جوبلس.",
    explanation: "استخدام الرابط المتقدم thereby متبوعاً بـ gerund لربط النتيجة المترتبة مباشرة وبشكل رسمي.",
    level: "Advanced"
  },
  {
    id: 'ef_ad9',
    english: "Under no circumstances are you to leave the gate unlocked.",
    arabic: "تحت أي ظرف من الظروف لا يجب عليك ترك الباب غير مقفل.",
    category: "daily",
    pronunciation: "أندر نو سيركامستانسز آر يو تو ليف ذي غيت أنلوكت.",
    explanation: "صيغة انعكاس نحوي صارمة (Under no circumstances + verb + subject) للتحذيرات الحاسمة.",
    level: "Advanced"
  },
  {
    id: 'ef_ad10',
    english: "He is a hard worker, albeit a bit slow sometimes.",
    arabic: "إنه عامل مجد، وإن كان بطيئاً بعض الشيء في بعض الأحيان.",
    category: "business",
    pronunciation: "هي إز أ هارد ويركر، أولبيت أ بت سلو سامتايمز.",
    explanation: "استخدام الرابط المتقدم albeit (بمعنى 'وإن كان' أو 'رغم أن') للاستدراك الدقيق ذي الطابع البليغ.",
    level: "Advanced"
  },
  // Starter (A1) - Batch 3
  {
    id: 'ef_st11',
    english: "Where is the bathroom?",
    arabic: "أين الحمام؟",
    category: "daily",
    pronunciation: "وير إز ذي باثروم؟",
    explanation: "السؤال الأكثر حيوية وأهمية عند التواجد في مكان عام أو زيارة الآخرين.",
    level: "Starter"
  },
  {
    id: 'ef_st12',
    english: "How are you today?",
    arabic: "كيف حالك اليوم؟",
    category: "social",
    pronunciation: "هاو آر يو توداي؟",
    explanation: "عبارة تعارف وسؤال عن الحال ودية للغاية وتستخدم يومياً.",
    level: "Starter"
  },
  {
    id: 'ef_st13',
    english: "My name is John.",
    arabic: "اسمي جون.",
    category: "social",
    pronunciation: "ماي نيم إز جون.",
    explanation: "الصيغة الأساسية والأسهل للتعريف بالاسم الشخصي للمبتدئين.",
    level: "Starter"
  },
  {
    id: 'ef_st14',
    english: "What is this?",
    arabic: "ما هذا؟",
    category: "daily",
    pronunciation: "وات إز ذيس؟",
    explanation: "سؤال أساسي للإشارة والاستفسار عن الأشياء المحيطة بنا.",
    level: "Starter"
  },
  {
    id: 'ef_st15',
    english: "I don't understand.",
    arabic: "أنا لا أفهم.",
    category: "daily",
    pronunciation: "آي دونت أندرستاند.",
    explanation: "عبارة هامة جداً للتعبير عن عدم الاستيعاب وطلب المساعدة أو التوضيح.",
    level: "Starter"
  },
  // Elementary (A2) - Batch 3
  {
    id: 'ef_el11',
    english: "I have a sister and two brothers.",
    arabic: "لدي أخت وأخوان.",
    category: "social",
    pronunciation: "آي هاف أ سيستر آند تو براذرز.",
    explanation: "استخدام فعل الملكية have للحديث عن أفراد العائلة والأقارب.",
    level: "Elementary"
  },
  {
    id: 'ef_el12',
    english: "We watched a great movie last night.",
    arabic: "شاهدنا فيلماً رائعاً الليلة الماضية.",
    category: "social",
    pronunciation: "وي واتشت أ غريت موفي لاست نايت.",
    explanation: "التعبير عن الأنشطة الترفيهية في الماضي باستخدام الفعل المنتظم watched.",
    level: "Elementary"
  },
  {
    id: 'ef_el13',
    english: "Is there a supermarket near here?",
    arabic: "هل يوجد سوبرماركت قريب من هنا؟",
    category: "shopping",
    pronunciation: "إز ذير أ سوبرماركت نير هير؟",
    explanation: "السؤال عن وجود الخدمات القريبة باستخدام الصيغة الاستفهامية is there.",
    level: "Elementary"
  },
  {
    id: 'ef_el14',
    english: "I need to buy some new shoes.",
    arabic: "أحتاج إلى شراء بعض الأحذية الجديدة.",
    category: "shopping",
    pronunciation: "آي نيد تو باي سام نيو شوز.",
    explanation: "التعبير عن الحاجة والرغبة في التسوق باستخدام need to متبوعاً بالمصدر.",
    level: "Elementary"
  },
  {
    id: 'ef_el15',
    english: "She can speak English very well.",
    arabic: "يمكنها التحدث باللغة الإنجليزية بشكل جيد جداً.",
    category: "social",
    pronunciation: "شي كان سبيك إنجلش فيري ويل.",
    explanation: "التعبير عن القدرة والمهارة الشخصية باستخدام الفعل المساعد can.",
    level: "Elementary"
  },
  // Pre-Intermediate (B1.1) - Batch 3
  {
    id: 'ef_pi11',
    english: "He has already visited London twice.",
    arabic: "لقد زار لندن مرتين بالفعل.",
    category: "travel",
    pronunciation: "هي هاز أولريدي فيزتد لندن توايس.",
    explanation: "استخدام المضارع التام للتعبير عن الخبرات والتكرار مع الظرف already.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi12',
    english: "You must not take photos in the museum.",
    arabic: "يجب ألا تلتقط صوراً في المتحف.",
    category: "travel",
    pronunciation: "يو ماست نوت تيك فوتوز إن ذي ميوزيوم.",
    explanation: "التعبير عن المنع والتحريم الصارم باستخدام must not.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi13',
    english: "What are you doing this weekend?",
    arabic: "ماذا ستفعل في عطلة نهاية هذا الأسبوع؟",
    category: "social",
    pronunciation: "وات آر يو دوينج ذيس ويك إند؟",
    explanation: "السؤال عن الخطط المستقبلية القريبة باستخدام صيغة المضارع المستمر.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi14',
    english: "The school is located in the city center.",
    arabic: "تقع المدرسة في وسط المدينة.",
    category: "daily",
    pronunciation: "ذي سكول إز لوكيتد إن ذي سيتي سنتر.",
    explanation: "تحديد الموقع الجغرافي للمباني باستخدام صيغة المبني للمجهول البسيطة.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi15',
    english: "While I was cooking, the power went out.",
    arabic: "بينما كنت أطبخ، انقطعت الكهرباء.",
    category: "daily",
    pronunciation: "وايل آي واز كوكينغ، ذي باور وينت آوت.",
    explanation: "ربط حدثين في الماضي؛ أحدهما مستمر (الماضي المستمر) والآخر قاطعه (الماضي البسيط).",
    level: "Pre-Intermediate"
  },
  // Intermediate (B1.2) - Batch 3
  {
    id: 'ef_int11',
    english: "The match was called off because of the heavy rain.",
    arabic: "تم إلغاء المباراة بسبب المطر الغزير.",
    category: "social",
    pronunciation: "ذي ماتش واز كولد أوف بيكوز أوف ذي هيفي رين.",
    explanation: "استخدام الفعل المركب call off (يلغي) في زمن الماضي البسيط للمبني للمجهول.",
    level: "Intermediate"
  },
  {
    id: 'ef_int12',
    english: "I don't mind waiting for a few minutes.",
    arabic: "لا أمانع في الانتظار لبضع دقائق.",
    category: "social",
    pronunciation: "آي دونت مايند ويتينج فور أ فيو مينتس.",
    explanation: "استخدام الفعل mind متبوعاً بصيغة gerund للتعبير عن القبول والرحابة.",
    level: "Intermediate"
  },
  {
    id: 'ef_int13',
    english: "She is looking for a new job in marketing.",
    arabic: "إنها تبحث عن وظيفة جديدة في مجال التسويق.",
    category: "business",
    pronunciation: "شي إز لوكينج فور أ نيو جوب إن ماركتينج.",
    explanation: "استخدام الفعل المركب look for (يبحث عن) للتعبير عن النشاط الحالي.",
    level: "Intermediate"
  },
  {
    id: 'ef_int14',
    english: "If you practice every day, you will improve quickly.",
    arabic: "إذا تدربت كل يوم، فستتحسن بسرعة.",
    category: "daily",
    pronunciation: "إف يو براكتس إيفري داي، يو ويل إمبروف كويكلي.",
    explanation: "الحالة الشرطية الأولى للحديث عن نصيحة ونتيجة محتملة الحدوث في المستقبل.",
    level: "Intermediate"
  },
  {
    id: 'ef_int15',
    english: "We need to discuss the details of the contract.",
    arabic: "نحن بحاجة إلى مناقشة تفاصيل العقد.",
    category: "business",
    pronunciation: "وي نيد تو ديسكاس ذي ديتيلز أوف ذي كونتراكت.",
    explanation: "صيغة عمل مهنية ومباشرة للحديث عن متطلبات المهام باستخدام discuss.",
    level: "Intermediate"
  },
  // Upper-Intermediate (B2) - Batch 3
  {
    id: 'ef_ui11',
    english: "He is said to be the richest man in the town.",
    arabic: "يُقال إنه أغنى رجل في البلدة.",
    category: "social",
    pronunciation: "هي إز سيد تو بي ذي ريتشست مان إن ذي تاون.",
    explanation: "التقرير النحوي غير الشخصي (Impersonal Passive) لنقل الشائعات أو الأقوال العامة.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui12',
    english: "No matter what happens, I will always support you.",
    arabic: "مهما حدث، سأدعمك دائماً.",
    category: "emotions",
    pronunciation: "نو ماتر وات هابنز، آي ويل أولويز سبورت يو.",
    explanation: "استخدام أسلوب التوكيد no matter what للتعبير عن الدعم واللتزام المطلق.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui13',
    english: "The manager suggested that we postpone the meeting.",
    arabic: "اقترح المدير أن نؤجل الاجتماع.",
    category: "business",
    pronunciation: "ذي مانجر سوجيستد ذات وي بوستبون ذي ميتينج.",
    explanation: "استخدام صيغة Subjunctive مع الفعل suggest للتعبير عن القرارات الرسمية.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui14',
    english: "I'd rather you didn't smoke in the house.",
    arabic: "أفضل ألا تدخن في المنزل.",
    category: "daily",
    pronunciation: "آيد راذر يو ديدنت سموك إن ذي هاوس.",
    explanation: "استخدام would rather متبوعة بضمير فاعل وفعل ماضي للتعبير عن تفضيل مهذب لعدم فعل شيء.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui15',
    english: "She succeeded in completing the race despite the injury.",
    arabic: "نجحت في إكمال السباق رغم الإصابة.",
    category: "social",
    pronunciation: "شي سكسيدد إن كومبليتينج ذي ريس ديسبايت ذي إنجري.",
    explanation: "استخدام succeed in + gerund للتأكيد على تخطي الصعاب والنجاح.",
    level: "Upper-Intermediate"
  },
  // Advanced (C1) - Batch 3
  {
    id: 'ef_ad11',
    english: "Had it not been for your advice, I would have failed.",
    arabic: "لولا نصيحتك، لكنت قد فشلت.",
    category: "social",
    pronunciation: "هاد إت نوت بين فور يور أدفايس، آي وود هاف فيلد.",
    explanation: "الصيغة الشرطية الثالثة المتقدمة جداً باستخدام الانعكاس للتعبير عن الامتنان والشرط الفائت.",
    level: "Advanced"
  },
  {
    id: 'ef_ad12',
    english: "Little did she know that the news would change her life.",
    arabic: "لم تكن تعلم إلا القليل أن الأخبار ستغير حياتها.",
    category: "emotions",
    pronunciation: "لتل ديد شي نو ذات ذي نيوِز وود تشينج هير لايف.",
    explanation: "استخدام الانعكاس النحوي مع الظرف السلبي little للتشويق وسرد الأحداث.",
    level: "Advanced"
  },
  {
    id: 'ef_ad13',
    english: "It is essential that everyone be present at the briefing.",
    arabic: "من الضروري أن يكون الجميع حاضرين في الإيجاز.",
    category: "business",
    pronunciation: "إت إز إسينشل ذات إيفريوان بي بريزنت أت ذي بريفينج.",
    explanation: "استخدام Subjunctive (be) مع الصفات المعبرة عن الضرورة والوجوب (essential).",
    level: "Advanced"
  },
  {
    id: 'ef_ad14',
    english: "The policy was implemented, albeit with some minor adjustments.",
    arabic: "تم تنفيذ السياسة، وإن كان ذلك مع بعض التعديلات الطفيفة.",
    category: "business",
    pronunciation: "ذي بوليسي واز إمبليمنتد، أولبيت وِذ سام ماينر أدجستمنتس.",
    explanation: "استخدام albeit (وإن كان) لربط الاستدراك والتحفظات بشكل موجز وأنيق في التقارير.",
    level: "Advanced"
  },
  {
    id: 'ef_ad15',
    english: "On no account should you touch the electric wires.",
    arabic: "لا يجب عليك بأي حال من الأحوال لمس الأسلاك الكهربائية.",
    category: "daily",
    pronunciation: "أندر نو سيركامستانسز شود يو تاتش ذي إلكتريك وايرز.",
    explanation: "صيغة انعكاس صارمة ومتقدمة جداً للتحذير ومنع المخاطر التام.",
    level: "Advanced"
  },
  // Starter (A1) - Batch 4
  {
    id: 'ef_st16',
    english: "Excuse me, what time is it?",
    arabic: "معذرة، كم الساعة؟",
    category: "daily",
    pronunciation: "إكسكيوز مي، وات تايم إز إت؟",
    explanation: "طريقة مهذبة وبسيطة للغاية للسؤال عن الوقت للمبتدئين.",
    level: "Starter"
  },
  {
    id: 'ef_st17',
    english: "Have a nice day!",
    arabic: "أتمنى لك يوماً سعيداً!",
    category: "social",
    pronunciation: "هاف أ نايس داي!",
    explanation: "عبارة توديع لطيفة وإيجابية تُقال بكثرة عند الوداع.",
    level: "Starter"
  },
  {
    id: 'ef_st18',
    english: "I am sorry, I am late.",
    arabic: "أنا آسف، لقد تأخرت.",
    category: "social",
    pronunciation: "آي آم سوري، آي آم ليت.",
    explanation: "عبارة اعتذار أساسية ومفيدة جداً للاستخدام عند التأخر.",
    level: "Starter"
  },
  {
    id: 'ef_st19',
    english: "Where do you live?",
    arabic: "أين تعيش؟",
    category: "social",
    pronunciation: "وير دو يو ليف؟",
    explanation: "سؤال أساسي في المحادثات للتعرف على مكان إقامة الآخرين.",
    level: "Starter"
  },
  {
    id: 'ef_st20',
    english: "Open your books, please.",
    arabic: "افتحوا كتبكم من فضلكم.",
    category: "daily",
    pronunciation: "أوبن يور بوكس، بليز.",
    explanation: "تعليمات صفية كلاسيكية ومهمة في المستوى التمهيدي الأول.",
    level: "Starter"
  },
  // Elementary (A2) - Batch 4
  {
    id: 'ef_el16',
    english: "I went shopping with my mother.",
    arabic: "ذهبت للتسوق مع والدتي.",
    category: "shopping",
    pronunciation: "آي وينت شوبينج وِذ ماي ماذر.",
    explanation: "التحدث عن الأنشطة الماضية والعائلة باستخدام الماضي البسيط للفعل go (went).",
    level: "Elementary"
  },
  {
    id: 'ef_el17',
    english: "What is your favorite sport?",
    arabic: "ما هي رياضتك المفضلة؟",
    category: "social",
    pronunciation: "وات إز يور فيفوريت سبورت؟",
    explanation: "السؤال عن الهوايات والتفضيلات الشخصية للمستويات المبتدئة.",
    level: "Elementary"
  },
  {
    id: 'ef_el18',
    english: "He doesn't have any money left.",
    arabic: "لم يتبقَ لديه أي نقود.",
    category: "shopping",
    pronunciation: "هي دزنت هاف إني ماني لفت.",
    explanation: "استخدام any في الجمل المنفية مع الأسماء غير المعدودة (money).",
    level: "Elementary"
  },
  {
    id: 'ef_el19',
    english: "We are studying English right now.",
    arabic: "نحن ندرس اللغة الإنجليزية الآن.",
    category: "daily",
    pronunciation: "وي آر ستادينج إنجلش رايت ناو.",
    explanation: "استخدام زمن المضارع المستمر للتعبير عن حدث يقع في لحظة التحدث.",
    level: "Elementary"
  },
  {
    id: 'ef_el20',
    english: "The library is next to the bank.",
    arabic: "المكتبة بجوار البنك.",
    category: "travel",
    pronunciation: "ذي لايبراري إز نيكست تو ذي بانك.",
    explanation: "وصف الأماكن واستخدام حروف الجر الخاصة بالمكان مثل next to.",
    level: "Elementary"
  },
  // Pre-Intermediate (B1.1) - Batch 4
  {
    id: 'ef_pi16',
    english: "He has already made a reservation.",
    arabic: "لقد قام بالحجز بالفعل.",
    category: "travel",
    pronunciation: "هي هاز أولريدي ميد أ ريزرفيشن.",
    explanation: "استخدام المضارع التام للتعبير عن حدث تم مؤخراً قبل موعده باستخدام already.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi17',
    english: "You should drink more water every day.",
    arabic: "يجب أن تشرب المزيد من الماء كل يوم.",
    category: "daily",
    pronunciation: "يو شود درينك مور ووتر إيفري داي.",
    explanation: "إسداء النصائح المفيدة للصحة الشخصية باستخدام فعل النصيحة should.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi18',
    english: "What will you do if the flight is canceled?",
    arabic: "ماذا ستفعل لو تم إلغاء الرحلة؟",
    category: "travel",
    pronunciation: "وات ويل يو دو إف ذي فلايت إز كانسلد؟",
    explanation: "سؤال باستخدام الحالة الشرطية الأولى للحديث عن مواقف مستقبلية متوقعة.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi19',
    english: "I am looking forward to the summer holiday.",
    arabic: "أتطلع بشوق لعطلة الصيف.",
    category: "travel",
    pronunciation: "آي آم لوكينج فوروارد تو ذي سامر هوليداي.",
    explanation: "استخدام التعبير look forward to للتعبير عن الحماس والانتظار السعيد لحدث مستقبل.",
    level: "Pre-Intermediate"
  },
  {
    id: 'ef_pi20',
    english: "The building was designed by a young architect.",
    arabic: "تم تصميم المبنى بواسطة مهندس معماري شاب.",
    category: "daily",
    pronunciation: "ذي بيلدنج واز ديزايند باي أ يونج آركيتكت.",
    explanation: "استخدام صيغة المبني للمجهول في الماضي البسيط للتركيز على المصمم والعمل الفني.",
    level: "Pre-Intermediate"
  },
  // Intermediate (B1.2) - Batch 4
  {
    id: 'ef_int16',
    english: "I'm going to take a rain check on that.",
    arabic: "سأؤجل قبول هذا العرض لوقت آخر.",
    category: "social",
    pronunciation: "آيم جوينج تو تيك أ رين تشيك أون ذات.",
    explanation: "تعبير اصطلاحي مهذب وممتاز لتأجيل دعوة أو عرض لوقت لاحق مناسب.",
    level: "Intermediate"
  },
  {
    id: 'ef_int17',
    english: "They managed to reach the summit before dark.",
    arabic: "تمكنوا من الوصول إلى القمة قبل حلول الظلام.",
    category: "travel",
    pronunciation: "ذي مانجد تو ريتش ذي ساميت بيفور دارك.",
    explanation: "استخدام الصيغة manage to متبوعة بالمصدر للتعبير عن النجاح في تخطي صعوبة معينة.",
    level: "Intermediate"
  },
  {
    id: 'ef_int18',
    english: "Please let me know if you require any assistance.",
    arabic: "يرجى إعلامي إذا كنت بحاجة إلى أي مساعدة.",
    category: "business",
    pronunciation: "بليز ليت مي نو إف يو ريكواير إني أسيستانس.",
    explanation: "صيغة بريد إلكتروني رسمية ومؤدبة للغاية في التعاملات المهنية والمكتبية.",
    level: "Intermediate"
  },
  {
    id: 'ef_int19',
    english: "The company decided to launch a new product.",
    arabic: "قررت الشركة إطلاق منتج جديد.",
    category: "business",
    pronunciation: "ذي كومباني ديسايدد تو لونش أ نيو برودكت.",
    explanation: "التعبير عن القرارات التنفيذية في بيئة الأعمال باستخدام الفعل launch.",
    level: "Intermediate"
  },
  {
    id: 'ef_int20',
    english: "I used to ride my bike to school every day.",
    arabic: "اعتدت أن أركب دراجتي إلى المدرسة كل يوم.",
    category: "daily",
    pronunciation: "آي يوزد تو رايد ماي بايك تو سكول إيفري داي.",
    explanation: "التعبير عن العادات والممارسات المتكررة القديمة في الماضي باستخدام used to.",
    level: "Intermediate"
  },
  // Upper-Intermediate (B2) - Batch 4
  {
    id: 'ef_ui16',
    english: "I would appreciate it if you could reply by Friday.",
    arabic: "سأكون ممتناً لو تمكنت من الرد بحلول يوم الجمعة.",
    category: "business",
    pronunciation: "آي وود أبريشييت إت إف يو كود ريبلاي باي فرايداي.",
    explanation: "طريقة رسمية ومهذبة جداً لوضع موعد نهائي للرد على المراسلات الإلكترونية.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui17',
    english: "She is said to have won the championship twice.",
    arabic: "يُقال إنها فازت بالبطولة مرتين.",
    category: "social",
    pronunciation: "شي إز سيد تو هاف وان ذي تشامبيونشيب توايس.",
    explanation: "صيغة المبني للمجهول غير الشخصي في التقرير عن أحداث ماضية (is said to have + p.p.).",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui18',
    english: "Despite the traffic, we arrived on time.",
    arabic: "رغم حركة المرور، وصلنا في الوقت المحدد.",
    category: "travel",
    pronunciation: "ديسبايت ذي ترافيك، وي آرايفد أون تايم.",
    explanation: "استخدام رابط التناقض despite متبوعاً بالاسم لإبراز تخطي الصعوبات.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui19',
    english: "You must have mistaken me for someone else.",
    arabic: "لا بد أنك خلطت بيني وبين شخص آخر.",
    category: "social",
    pronunciation: "يو ماست هاف ميستيكن مي فور ساموان إلس.",
    explanation: "أفعال الاستنتاج والافتراض في الماضي (must have + p.p.) للتعبير عن يقين بوقوع خطأ.",
    level: "Upper-Intermediate"
  },
  {
    id: 'ef_ui20',
    english: "I wish I hadn't eaten so much cake.",
    arabic: "أتمنى لو لم آكل هذا القدر الكبير من الكعكة.",
    category: "emotions",
    pronunciation: "آي ويش آي هادنت إيتن سو ماتش كيك.",
    explanation: "التعبير عن الندم على فعل حدث في الماضي باستخدام wish متبوعة بالماضي التام المنفي.",
    level: "Upper-Intermediate"
  },
  // Advanced (C1) - Batch 4
  {
    id: 'ef_ad16',
    english: "On no account should you disclose this information.",
    arabic: "لا يجب عليك بأي حال من الأحوال الكشف عن هذه المعلومات.",
    category: "business",
    pronunciation: "أون نو أكاونت شود يو ديسكلوز ذيس إنفورميشن.",
    explanation: "صيغة تحذير وانعكاس نحوي صارمة جداً ومتقدمة للحفاظ على سرية المعلومات.",
    level: "Advanced"
  },
  {
    id: 'ef_ad17',
    english: "Had I known the truth, I wouldn't have agreed.",
    arabic: "لو كنت عرفت الحقيقة، لما كنت وافقت.",
    category: "social",
    pronunciation: "هاد آي نون ذي تروث، آي وودنت هاف أغريد.",
    explanation: "الصيغة الشرطية الثالثة المتقدمة بحذف if واستخدام الانعكاس النحوي للندم أو الافتراض.",
    level: "Advanced"
  },
  {
    id: 'ef_ad18',
    english: "It is of vital importance that she attend the briefing.",
    arabic: "من الأهمية البالغة أن تحضر هي الاجتماع التوجيهي.",
    category: "business",
    pronunciation: "إت إز أوف فايتل إمبورتنس ذات شي أتيند ذي بريفينج.",
    explanation: "صيغة Subjunctive باستخدام مصدر الفعل (attend) مع الصفات الدالة على الضرورة القصوى.",
    level: "Advanced"
  },
  {
    id: 'ef_ad19',
    english: "He decided to resign, thereby causing a crisis in the firm.",
    arabic: "قرر الاستقالة، وبذلك تسبب في أزمة في الشركة.",
    category: "business",
    pronunciation: "هي ديسايدد تو ريزاين، ذيرباي كوزينج أ كرايسس إن ذي فيرم.",
    explanation: "استخدام thereby مع صيغة gerund للتعبير عن التسبب المباشر في نتيجة تالية بأسلوب متطور.",
    level: "Advanced"
  },
  {
    id: 'ef_ad20',
    english: "Seldom do we come across such a brilliant idea.",
    arabic: "نادراً ما نصادف مثل هذه الفكرة الرائعة.",
    category: "daily",
    pronunciation: "سيلدوم دو وي كام أكراس ساتش أ بريليانت آيديا.",
    explanation: "الانعكاس النحوي بتقديم الظرف السلبي seldom والفعل المساعد للتعبير عن الندرة الشديدة بأسلوب بليغ.",
    level: "Advanced"
  }
];

// Helper to determine levels for existing sentences if they don't have one
export function getSentenceLevel(id: string): 'Starter' | 'Elementary' | 'Pre-Intermediate' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced' {
  if (id.startsWith('ef_st')) return 'Starter';
  if (id.startsWith('ef_el')) return 'Elementary';
  if (id.startsWith('ef_pi')) return 'Pre-Intermediate';
  if (id.startsWith('ef_int')) return 'Intermediate';
  if (id.startsWith('ef_ui')) return 'Upper-Intermediate';
  if (id.startsWith('ef_ad')) return 'Advanced';

  // Fallbacks for original sentences:
  const num = parseInt(id.replace(/\D/g, '')) || 1;
  const prefix = id.replace(/\d/g, '');

  if (prefix === 'd') {
    if (num <= 3) return 'Starter';
    if (num <= 7) return 'Elementary';
    if (num <= 10) return 'Pre-Intermediate';
    if (num <= 13) return 'Intermediate';
    return 'Upper-Intermediate';
  }
  if (prefix === 't') {
    if (num <= 3) return 'Elementary';
    if (num <= 6) return 'Pre-Intermediate';
    if (num <= 9) return 'Intermediate';
    return 'Upper-Intermediate';
  }
  if (prefix === 'b') {
    if (num <= 2) return 'Pre-Intermediate';
    if (num <= 5) return 'Intermediate';
    if (num <= 8) return 'Upper-Intermediate';
    return 'Advanced';
  }
  if (prefix === 's') {
    if (num <= 3) return 'Elementary';
    if (num <= 6) return 'Pre-Intermediate';
    if (num <= 8) return 'Intermediate';
    return 'Upper-Intermediate';
  }
  if (prefix === 'so') {
    if (num <= 2) return 'Elementary';
    if (num <= 4) return 'Pre-Intermediate';
    if (num <= 6) return 'Intermediate';
    return 'Upper-Intermediate';
  }
  if (prefix === 'h') {
    if (num <= 2) return 'Pre-Intermediate';
    if (num <= 5) return 'Intermediate';
    return 'Upper-Intermediate';
  }
  if (prefix === 'e') {
    if (num <= 2) return 'Intermediate';
    if (num <= 4) return 'Upper-Intermediate';
    return 'Advanced';
  }
  if (prefix === 'i') {
    if (num <= 2) return 'Intermediate';
    if (num <= 4) return 'Upper-Intermediate';
    return 'Advanced';
  }
  return 'Intermediate';
}

// Map existing ones plus new ones and export them as CORE_SENTENCES
export const CORE_SENTENCES: Sentence[] = [
  ...BASE_SENTENCES.map(s => ({
    ...s,
    level: s.level || getSentenceLevel(s.id)
  })),
  ...EXTRA_SENTENCES
];

