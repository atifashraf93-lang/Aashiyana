/* Aashiyana content. Urdu first, English alongside. General guidance for Pakistan; local conditions vary. */
(function (root) {
  'use strict';
  var G = '#5E9C4A', G2 = '#7DBB5F', DG = '#3F7A3A';

  var PLANTS = [
    { id: 'money', ur: 'منی پلانٹ', en: 'Money Plant', kind: 'vine', a: G, b: G2, where: ['indoor', 'balcony'], easy: true, water: 7,
      sun: 'ہلکی یا بالواسطہ روشنی', sunEn: 'Bright indirect light', waterTxt: 'ہفتے میں ایک بار، جب اوپر کی مٹی خشک ہو', soil: 'عام باغیچے کی مٹی یا صرف پانی کی بوتل میں', months: [1, 2, 3, 4, 5, 6, 7, 8],
      tip: 'ایک ٹہنی کاٹ کر پانی کی بوتل میں رکھ دیں، جڑیں نکل آئیں گی۔', tipEn: 'Cut a stem and keep it in water; roots appear in a few weeks.',
      warn: 'پتے بلی اور کتے کے لیے نقصان دہ ہیں۔', warnEn: 'Leaves are toxic to cats and dogs.' },
    { id: 'aloe', ur: 'ایلو ویرا (گھیکوار)', en: 'Aloe Vera', kind: 'aloe', a: '#6BA564', b: '#8CC17F', where: ['indoor', 'balcony', 'garden'], easy: true, water: 10,
      sun: 'تیز روشنی، کچھ دھوپ', sunEn: 'Bright light, some direct sun', waterTxt: 'دس دن میں ایک بار، زیادہ پانی سے جڑ گل جاتی ہے', soil: 'ریتیلی نکاسی والی مٹی', months: [2, 3, 4, 5, 6, 7, 8, 9],
      tip: 'گملے کے نیچے سوراخ ضرور رکھیں تاکہ پانی نہ رکے۔', tipEn: 'Always use a pot with drainage holes.', warn: '', warnEn: '' },
    { id: 'snake', ur: 'سانپ پودا (اسنیک پلانٹ)', en: 'Snake Plant', kind: 'spiky', a: '#3F7A3A', b: '#6C9F4E', where: ['indoor'], easy: true, water: 14,
      sun: 'کم روشنی بھی چل جاتی ہے', sunEn: 'Tolerates low light', waterTxt: 'دو ہفتے میں ایک بار، سردیوں میں مہینے میں ایک بار', soil: 'ہلکی نکاسی والی مٹی', months: [2, 3, 4, 5, 6, 7, 8, 9],
      tip: 'نظر انداز کیا جانے والا پودا ہے؛ زیادہ پانی اس کا سب سے بڑا دشمن ہے۔', tipEn: 'It thrives on neglect; overwatering is its biggest enemy.', warn: 'پتے بلی اور کتے کے لیے نقصان دہ ہیں۔', warnEn: 'Mildly toxic to pets.' },
    { id: 'tulsi', ur: 'تلسی', en: 'Holy Basil (Tulsi)', kind: 'herb', a: '#4E8F46', b: '#6FB05A', where: ['balcony', 'garden', 'kitchen'], easy: true, water: 2,
      sun: 'پوری دھوپ (۶ گھنٹے)', sunEn: 'Full sun, 6 hours', waterTxt: 'ہر دو دن بعد ہلکا پانی', soil: 'زرخیز مٹی میں کھاد ملائیں', months: [1, 2, 3, 4, 5],
      tip: 'پھول کی کلیاں توڑتے رہیں تاکہ پودا گھنا ہو۔', tipEn: 'Pinch off flower buds to keep it bushy.', warn: '', warnEn: '' },
    { id: 'mint', ur: 'پودینہ', en: 'Mint', kind: 'herb', a: '#3F9A5A', b: '#62B876', where: ['balcony', 'garden', 'kitchen'], easy: true, water: 2,
      sun: 'آدھی دھوپ، آدھا سایہ', sunEn: 'Partial shade', waterTxt: 'مٹی نم رکھیں، ہر دو دن بعد پانی', soil: 'نمی والی زرخیز مٹی', months: [1, 2, 3, 8, 9],
      tip: 'الگ گملے میں لگائیں کیونکہ یہ پھیلتا بہت ہے۔', tipEn: 'Grow in its own pot; it spreads aggressively.', warn: '', warnEn: '' },
    { id: 'coriander', ur: 'ہرا دھنیا', en: 'Coriander', kind: 'herb', a: '#5FAE4A', b: '#86CC6B', where: ['balcony', 'garden', 'kitchen'], easy: true, water: 2,
      sun: 'ہلکی دھوپ', sunEn: 'Light sun', waterTxt: 'مٹی نم رکھیں', soil: 'گہری ڈھیلی مٹی', months: [8, 9, 10, 11, 0, 1],
      tip: 'بیج رات بھر بھگو کر کے ہلکے سے کچل کر بوئیں۔', tipEn: 'Soak lightly crushed seeds overnight before sowing.', warn: '', warnEn: '' },
    { id: 'chilli', ur: 'ہری مرچ', en: 'Green Chilli', kind: 'chilli', a: '#4E8F46', b: '#E0412E', where: ['balcony', 'garden', 'kitchen'], easy: false, water: 3,
      sun: 'پوری دھوپ (کم از کم ۶ گھنٹے)', sunEn: 'Full sun, 6+ hours', waterTxt: 'ہر ۲ سے ۳ دن بعد پانی', soil: 'کھاد ملی زرخیز مٹی', months: [1, 2, 3, 5, 6],
      tip: 'ہر ۲۰ دن بعد گھر کی بنی کھاد دیں، پھل زیادہ آئے گا۔', tipEn: 'Feed every ~20 days for more fruit.', warn: '', warnEn: '' },
    { id: 'tomato', ur: 'ٹماٹر', en: 'Tomato', kind: 'fruit', a: '#4E8F46', b: '#E0412E', where: ['balcony', 'garden', 'kitchen'], easy: false, water: 2,
      sun: 'پوری دھوپ (۶ تا ۸ گھنٹے)', sunEn: 'Full sun, 6–8 hours', waterTxt: 'ہر دو دن بعد، پتوں کے بجائے جڑ میں پانی دیں', soil: 'گہری زرخیز مٹی', months: [0, 1, 7, 8],
      tip: 'پودے کو لکڑی کے سہارے سے باندھ دیں تاکہ پھل زمین پر نہ لگے۔', tipEn: 'Support the plant with a stake.', warn: '', warnEn: '' },
    { id: 'spinach', ur: 'پالک', en: 'Spinach', kind: 'leafy', a: '#2F7A3A', b: '#4E9A4A', where: ['balcony', 'garden', 'kitchen'], easy: true, water: 2,
      sun: 'ہلکی دھوپ، ٹھنڈا موسم', sunEn: 'Cool season, light sun', waterTxt: 'ہر دو دن بعد', soil: 'ڈھیلی زرخیز مٹی', months: [8, 9, 10, 11, 0],
      tip: 'باہر کے بڑے پتے کاٹتے رہیں، اندر سے نئے آتے رہیں گے۔', tipEn: 'Harvest outer leaves; new ones keep coming.', warn: '', warnEn: '' },
    { id: 'rose', ur: 'گلاب', en: 'Rose', kind: 'flower', a: '#3F7A3A', b: '#E04E7A', where: ['garden', 'balcony'], easy: false, water: 3,
      sun: 'پوری دھوپ (کم از کم ۶ گھنٹے)', sunEn: 'Full sun, 6+ hours', waterTxt: 'ہر ۲ سے ۳ دن بعد، صبح کے وقت', soil: 'گوبر یا کمپوسٹ ملی مٹی', months: [9, 10, 11, 0, 1],
      tip: 'مرجھائے پھول کاٹتے رہیں اور سردیوں میں ہلکی کانٹ چھانٹ کریں۔', tipEn: 'Remove faded blooms; prune lightly in winter.', warn: '', warnEn: '' },
    { id: 'jasmine', ur: 'موتیا', en: 'Jasmine (Motia)', kind: 'flower', a: '#3F7A3A', b: '#FFFFFF', where: ['garden', 'balcony'], easy: false, water: 3,
      sun: 'دھوپ والی جگہ', sunEn: 'Sunny spot', waterTxt: 'ہر ۲ سے ۳ دن بعد', soil: 'نکاسی والی مٹی', months: [1, 2, 3],
      tip: 'پھول کے بعد کانٹ چھانٹ کریں تاکہ اگلی بار زیادہ پھول آئیں۔', tipEn: 'Prune after flowering for more blooms next time.', warn: '', warnEn: '' },
    { id: 'rani', ur: 'رات کی رانی', en: 'Night Jasmine (Raat ki Rani)', kind: 'flower', a: '#3F7A3A', b: '#F2F2D0', where: ['garden', 'balcony'], easy: true, water: 4,
      sun: 'دھوپ یا ہلکا سایہ', sunEn: 'Sun or light shade', waterTxt: 'ہر ۴ دن بعد', soil: 'عام باغیچے کی مٹی', months: [1, 2, 3],
      tip: 'خوشبو رات کو تیز ہوتی ہے، سونے کے کمرے کی کھڑکی کے بالکل ساتھ نہ رکھیں۔', tipEn: 'Strongly scented at night; keep away from bedroom windows.', warn: '', warnEn: '' },
    { id: 'marigold', ur: 'گیندا', en: 'Marigold', kind: 'flower', a: '#4E8F46', b: '#F2A81E', where: ['garden', 'balcony'], easy: true, water: 3,
      sun: 'پوری دھوپ', sunEn: 'Full sun', waterTxt: 'ہر ۲ سے ۳ دن بعد', soil: 'عام مٹی', months: [1, 2, 8, 9],
      tip: 'مرجھائے پھول توڑیں تو نئے پھول جلدی آتے ہیں۔', tipEn: 'Deadhead to keep blooms coming.', warn: '', warnEn: '' },
    { id: 'sunflower', ur: 'سورج مکھی', en: 'Sunflower', kind: 'flower', a: '#4E8F46', b: '#F2B91E', where: ['garden'], easy: true, water: 3,
      sun: 'پوری دھوپ', sunEn: 'Full sun', waterTxt: 'ہر ۳ دن بعد', soil: 'گہری مٹی', months: [1, 2, 6, 7],
      tip: 'کھلی جگہ اور گہرا گملا یا زمین چاہیے کیونکہ جڑ لمبی ہوتی ہے۔', tipEn: 'Needs deep soil and space for its long roots.', warn: '', warnEn: '' },
    { id: 'lemon', ur: 'لیموں', en: 'Lemon', kind: 'fruit', a: '#3F7A3A', b: '#F2D21E', where: ['garden', 'balcony'], easy: false, water: 4,
      sun: 'پوری دھوپ', sunEn: 'Full sun', waterTxt: 'ہر ۴ دن بعد، گرمیوں میں زیادہ', soil: 'بڑے گملے میں اچھی نکاسی والی مٹی', months: [1, 2, 7, 8],
      tip: 'بڑے گملے میں لگائیں اور سال میں دو بار کھاد دیں۔', tipEn: 'Use a large pot; feed twice a year.', warn: '', warnEn: '' },
    { id: 'spider', ur: 'اسپائیڈر پلانٹ', en: 'Spider Plant', kind: 'aloe', a: '#7DBB5F', b: '#A7D88B', where: ['indoor', 'balcony'], easy: true, water: 5,
      sun: 'ہلکی روشنی، براہِ راست دھوپ نہیں', sunEn: 'Bright indirect light', waterTxt: 'ہر ۵ دن بعد', soil: 'ہلکی زرخیز مٹی', months: [2, 3, 4, 5, 6, 7, 8],
      tip: 'چھوٹے بچے پودے کاٹ کر نئے گملے میں لگا دیں۔', tipEn: 'Replant the little offshoots to get new plants.', warn: '', warnEn: '' },
    { id: 'areca', ur: 'ایریکا پام', en: 'Areca Palm', kind: 'palm', a: '#4E9A4A', b: '#78B85A', where: ['indoor', 'balcony'], easy: false, water: 5,
      sun: 'تیز بالواسطہ روشنی', sunEn: 'Bright indirect light', waterTxt: 'ہر ۵ دن بعد، پتوں پر چھینٹے', soil: 'ہلکی نکاسی والی مٹی', months: [2, 3, 4, 5, 6, 7, 8],
      tip: 'تیز دھوپ سے پتے جل جاتے ہیں، کھڑکی سے ذرا ہٹا کر رکھیں۔', tipEn: 'Harsh sun scorches the leaves; keep it away from the window.', warn: '', warnEn: '' },
    { id: 'cactus', ur: 'کیکٹس (ناگ پھنی)', en: 'Cactus', kind: 'cactus', a: '#4E8F5A', b: '#E26E8D', where: ['indoor', 'balcony'], easy: true, water: 14,
      sun: 'تیز دھوپ', sunEn: 'Bright direct sun', waterTxt: 'مہینے میں ایک دو بار، سردیوں میں تقریباً نہیں', soil: 'ریت ملی کیکٹس والی مٹی', months: [2, 3, 4, 5, 6, 7, 8],
      tip: 'پانی بہت کم دیں؛ یہ زیادہ پانی سے مرتا ہے، کم پانی سے نہیں۔', tipEn: 'It dies from too much water, not too little.', warn: 'کانٹوں سے بچوں کو دور رکھیں۔', warnEn: 'Keep spines away from children.' },
    { id: 'curry', ur: 'کڑی پتہ', en: 'Curry Leaf', kind: 'leafy', a: '#2F7A3A', b: '#4E9A4A', where: ['balcony', 'garden', 'kitchen'], easy: true, water: 3,
      sun: 'پوری دھوپ', sunEn: 'Full sun', waterTxt: 'ہر ۳ دن بعد، سردیوں میں کم', soil: 'اچھی نکاسی والی مٹی', months: [1, 2, 3, 7, 8],
      tip: 'بڑے گملے میں لگائیں؛ پتے توڑتے رہیں تو پودا گھنا ہوتا ہے۔', tipEn: 'Use a large pot; regular picking keeps it bushy.', warn: '', warnEn: '' },
    { id: 'onion', ur: 'ہری پیاز', en: 'Spring Onion', kind: 'spiky', a: '#5FAE4A', b: '#86CC6B', where: ['balcony', 'kitchen'], easy: true, water: 2,
      sun: 'ہلکی سے تیز دھوپ', sunEn: 'Light to full sun', waterTxt: 'ہر دو دن بعد', soil: 'ڈھیلی مٹی', months: [8, 9, 10, 1, 2],
      tip: 'بازار کی ہری پیاز کی جڑ والا حصہ پانی یا مٹی میں لگائیں، دوبارہ اگ آئے گی۔', tipEn: 'Replant the root end of shop-bought spring onions; they regrow.', warn: '', warnEn: '' },
    { id: 'okra', ur: 'بھنڈی', en: 'Okra (Lady Finger)', kind: 'fruit', a: '#4E8F46', b: '#6FA84A', where: ['balcony', 'garden', 'kitchen'], easy: false, water: 2,
      sun: 'پوری دھوپ، گرم موسم', sunEn: 'Full sun, warm weather', waterTxt: 'ہر دو دن بعد', soil: 'گہری زرخیز مٹی', months: [1, 2, 5, 6],
      tip: 'بیج رات بھر بھگو کر بوئیں؛ پھل چھوٹے ہوں تو ہی توڑ لیں۔', tipEn: 'Soak seeds overnight; harvest pods while small.', warn: '', warnEn: '' },
    { id: 'periwinkle', ur: 'سدا بہار', en: 'Periwinkle', kind: 'flower', a: '#3F7A3A', b: '#E06AA0', where: ['garden', 'balcony'], easy: true, water: 3,
      sun: 'دھوپ والی جگہ', sunEn: 'Sunny spot', waterTxt: 'ہر ۳ دن بعد، گرمی میں بھی پھول دیتا ہے', soil: 'عام مٹی', months: [1, 2, 3, 7, 8],
      tip: 'بہت کم دیکھ بھال میں سال بھر پھول دیتا ہے۔', tipEn: 'Blooms almost all year with little care.', warn: 'کھانے کے لیے نہیں؛ بچوں اور جانوروں سے دور رکھیں۔', warnEn: 'Not edible; keep from children and pets.' },
    { id: 'peace', ur: 'پیس للی', en: 'Peace Lily', kind: 'leafy', a: '#2F6F3A', b: '#F4F1E6', where: ['indoor'], easy: true, water: 5,
      sun: 'کم روشنی چل جاتی ہے', sunEn: 'Low to medium light', waterTxt: 'ہر ۵ دن بعد؛ پتے جھکیں تو پانی مانگ رہا ہے', soil: 'نم رکھنے والی ہلکی مٹی', months: [2, 3, 4, 5, 6, 7, 8],
      tip: 'سفید پھول کے لیے ہلکی روشنی دیں اور پتوں کی گرد صاف کرتے رہیں۔', tipEn: 'Give gentle light for white blooms and wipe dust off leaves.', warn: 'پتے بچوں اور پالتو جانوروں کے لیے نقصان دہ ہیں۔', warnEn: 'Toxic to children and pets.' },
    { id: 'ginger', ur: 'ادرک', en: 'Ginger', kind: 'aloe', a: '#5FAE4A', b: '#86CC6B', where: ['balcony', 'kitchen'], easy: false, water: 3,
      sun: 'ہلکی دھوپ / آدھا سایہ', sunEn: 'Partial shade', waterTxt: 'مٹی نم رکھیں، ہر ۳ دن بعد', soil: 'ڈھیلی، ہوا دار، کھاد ملی مٹی', months: [2, 3, 4],
      tip: 'کھلی آنکھوں والی تازہ ادرک کا ٹکڑا لگائیں؛ تیار ہونے میں ۸ سے ۱۰ مہینے لگتے ہیں۔', tipEn: 'Plant a piece with visible buds; takes 8–10 months to mature.', warn: '', warnEn: '' }
  ];

  var MONTHS = [['جنوری', 'January'], ['فروری', 'February'], ['مارچ', 'March'], ['اپریل', 'April'], ['مئی', 'May'], ['جون', 'June'],
    ['جولائی', 'July'], ['اگست', 'August'], ['ستمبر', 'September'], ['اکتوبر', 'October'], ['نومبر', 'November'], ['دسمبر', 'December']];

  var PESTS = [
    { ur: 'پتے پیلے ہو جانا', en: 'Yellow leaves', cause: 'عموماً زیادہ پانی یا نکاسی کی خرابی', causeEn: 'Usually overwatering or poor drainage', fix: 'پانی کم کریں، گملے کے سوراخ چیک کریں، مٹی خشک ہونے دیں۔', fixEn: 'Water less, check drainage holes, let soil dry.' },
    { ur: 'پتوں کے کنارے بھورے ہونا', en: 'Brown leaf tips', cause: 'کم نمی، زیادہ دھوپ یا پانی کی کمی', causeEn: 'Dry air, too much sun, or underwatering', fix: 'پودے کو ہلکی روشنی میں رکھیں اور باقاعدگی سے پانی دیں۔', fixEn: 'Move to gentler light and water regularly.' },
    { ur: 'چھوٹے سبز یا کالے کیڑے (افڈز)', en: 'Aphids', cause: 'نرم نئی کونپلوں پر رس چوسنے والے کیڑے', causeEn: 'Sap-sucking insects on soft new growth', fix: 'پانی کی دھار سے دھوئیں، پھر ہلکے صابن والا پانی یا نیم کا تیل چھڑکیں۔', fixEn: 'Rinse with water, then spray mild soapy water or neem oil.' },
    { ur: 'سفید مکھی', en: 'Whitefly', cause: 'پتوں کے نیچے چھوٹی سفید مکھیاں', causeEn: 'Tiny white flies under leaves', fix: 'نیم کے تیل کا سپرے ہر ۵ دن بعد، اور پیلے چپکنے والے کارڈ لگائیں۔', fixEn: 'Neem oil every 5 days and yellow sticky cards.' },
    { ur: 'پتوں پر سفید پاؤڈر', en: 'Powdery mildew', cause: 'پھپھوندی، زیادہ نمی اور ہوا کی کمی', causeEn: 'Fungus from humidity and poor airflow', fix: 'متاثرہ پتے کاٹیں، پودوں میں فاصلہ رکھیں، نیم کا تیل یا ۱ حصہ دودھ ۹ حصے پانی میں ملا کر چھڑکیں۔', fixEn: 'Remove affected leaves, space plants, spray neem oil or 1:9 milk and water.' },
    { ur: 'جڑ گلنا', en: 'Root rot', cause: 'پانی رکا رہنا', causeEn: 'Waterlogged soil', fix: 'پودا نکالیں، گلی جڑیں کاٹیں اور نئی خشک مٹی میں لگائیں۔', fixEn: 'Take the plant out, cut rotten roots and repot in fresh dry soil.' },
    { ur: 'مٹی میں چھوٹے مچھر', en: 'Fungus gnats', cause: 'ہمیشہ گیلی مٹی', causeEn: 'Constantly wet soil', fix: 'اوپر کی مٹی خشک ہونے دیں اور پانی کا وقفہ بڑھائیں۔', fixEn: 'Let the top soil dry and water less often.' }
  ];

  var WHERE = { indoor: ['گھر کے اندر', 'Indoor'], balcony: ['بالکونی', 'Balcony'], garden: ['صحن / لان', 'Garden'], kitchen: ['کچن گارڈن', 'Kitchen garden'] };

  var ROOMS = [
    { id: 'lounge', ur: 'ڈرائنگ / لاؤنج', en: 'Living room', scene: 'lounge', ideas: [
      ['رنگ بدلیں، دیوار نہیں', 'Change colours, not walls', 'صوفے پر ایک ہی رنگ کے دو یا تین کشن اور ایک سادہ کمبل رکھیں، کمرہ فوراً بدل جاتا ہے۔', 'Two or three same-tone cushions and a plain throw refresh a room instantly.'],
      ['ایک کونے میں پودا', 'A plant in one corner', 'خالی کونے میں ایک بڑا پودا (اسنیک پلانٹ یا ایریکا پام) رکھیں۔', 'Put one tall plant in an empty corner.'],
      ['گرم روشنی', 'Warm lighting', 'اوپر کی تیز ٹیوب کے بجائے میز کے لیمپ استعمال کریں، شام کو ماحول نرم ہو جاتا ہے۔', 'Table lamps feel softer than a bright overhead tube.'],
      ['کم سامان', 'Less clutter', 'سطحوں پر صرف تین چیزیں رکھیں: ایک پودا، ایک کتاب، ایک سجاوٹ۔', 'Keep three things per surface: a plant, a book, one ornament.']
    ] },
    { id: 'bedroom', ur: 'سونے کا کمرہ', en: 'Bedroom', scene: 'bedroom', ideas: [
      ['سادہ بستر', 'Simple bedding', 'ہلکے رنگ کی چادر اور ایک ہی ڈیزائن کے تکیے کمرے کو پرسکون بناتے ہیں۔', 'Light-coloured sheets and matching pillows calm the room.'],
      ['سرہانے کی دیوار', 'Headboard wall', 'بستر کے پیچھے ایک فریم یا ہاتھ سے بنی آرائشی چیز لگائیں۔', 'Hang a frame or handmade piece behind the bed.'],
      ['چھوٹی روشنی', 'Soft light', 'سائیڈ ٹیبل پر ہلکی پیلی روشنی والا لیمپ رکھیں۔', 'Use a warm bedside lamp.'],
      ['کھڑکی کا پردہ', 'Curtains', 'ہلکے اور بھاری پردے ملا کر لگائیں تاکہ دن کو روشنی اور رات کو پردہ رہے۔', 'Layer sheer and heavy curtains.']
    ] },
    { id: 'kitchen', ur: 'کچن', en: 'Kitchen', scene: 'kitchen', ideas: [
      ['شفاف ڈبے', 'Clear jars', 'دالیں اور مصالحے ایک جیسے شیشے کے ڈبوں میں رکھیں اور لیبل لگائیں۔', 'Store lentils and spices in matching glass jars with labels.'],
      ['کھڑکی پر جڑی بوٹیاں', 'Windowsill herbs', 'پودینہ، دھنیا اور تلسی چھوٹے گملوں میں کھڑکی پر رکھیں۔', 'Grow mint, coriander and basil on the sill.'],
      ['کھلی شیلف', 'Open shelf', 'خوبصورت برتن اور پیالے ایک شیلف پر سجائیں۔', 'Display your best bowls on an open shelf.']
    ] },
    { id: 'entrance', ur: 'داخلی دروازہ / صحن', en: 'Entrance & courtyard', scene: 'entrance', ideas: [
      ['دروازے کے دونوں طرف گملے', 'Pots on both sides', 'دروازے کے دونوں طرف ایک جیسے گملے رکھیں، پہلا تاثر اچھا بنتا ہے۔', 'Matching pots on both sides give a good first impression.'],
      ['نام کی تختی', 'Name plate', 'ہاتھ سے رنگی ہوئی نام کی تختی گھر کو اپنا پن دیتی ہے۔', 'A hand-painted name plate adds personality.'],
      ['فانوس', 'Lantern', 'دروازے کے پاس چھوٹا فانوس یا شمع دان رکھیں۔', 'Place a small lantern near the door.']
    ] },
    { id: 'balcony', ur: 'بالکونی / چھت', en: 'Balcony & terrace', scene: 'balcony', ideas: [
      ['گملوں کی قطار', 'Row of pots', 'ریلنگ کے ساتھ مختلف اونچائی کے گملے رکھیں۔', 'Place pots in varying heights along the railing.'],
      ['بیٹھنے کی جگہ', 'Sitting corner', 'ایک چھوٹی میز اور دو کرسیاں شام کی چائے کے لیے کافی ہیں۔', 'A small table and two chairs make an evening tea spot.'],
      ['جھنڈیاں اور لائٹس', 'String lights', 'شام کو جگمگانے کے لیے سولر لائٹس لگائیں، بجلی کا خرچ نہیں ہوتا۔', 'Solar string lights cost nothing to run.']
    ] },
    { id: 'wall', ur: 'دیوار کی سجاوٹ', en: 'Wall decor', scene: 'wall', ideas: [
      ['تصاویر کی دیوار', 'Gallery wall', 'مختلف سائز کے فریم زمین پر ترتیب دے کر دیکھیں، پھر دیوار پر لگائیں۔', 'Arrange frames on the floor first, then hang.'],
      ['خطاطی', 'Calligraphy', 'کوئی پسندیدہ آیت یا شعر خوبصورت فریم میں لگائیں۔', 'Frame a favourite verse or couplet.'],
      ['آئینہ', 'Mirror', 'آئینہ کمرے کو بڑا اور روشن دکھاتا ہے۔', 'A mirror makes a room look larger and brighter.']
    ] }
  ];

  var DIY = [
    { id: 'bottlepot', ur: 'پلاسٹک بوتل سے لٹکتا گملا', en: 'Hanging planter from a bottle', icon: 'bottle', cost: 'مفت', costEn: 'Free', time: '۳۰ منٹ', timeEn: '30 min',
      need: ['خالی پلاسٹک بوتل (۱.۵ لیٹر)', 'رسی', 'قینچی یا چاقو (بڑوں کی نگرانی میں)', 'مٹی اور پودا'], needEn: ['Empty 1.5 L bottle', 'Rope', 'Scissors or knife (adult only)', 'Soil and a plant'],
      steps: [['بوتل کو درمیان سے ایک طرف سے کاٹ کر کھڑکی نما حصہ بنائیں۔', 'Cut a window in one side of the bottle.'], ['نیچے چار چھوٹے سوراخ کریں تاکہ پانی نکل جائے۔', 'Make four drainage holes at the bottom.'], ['اوپر دونوں طرف سوراخ کر کے رسی گزاریں۔', 'Thread rope through holes on both sides near the top.'], ['مٹی بھریں اور پودا لگا دیں۔', 'Fill with soil and plant.'], ['بالکونی یا گرِل سے لٹکا دیں۔', 'Hang it from a balcony or grille.']] },
    { id: 'jarlight', ur: 'شیشے کے جار کا فانوس', en: 'Glass jar lantern', icon: 'jar', cost: '۱۰۰ روپے سے کم', costEn: 'Under Rs 100', time: '۲۰ منٹ', timeEn: '20 min',
      need: ['خالی شیشے کا جار', 'ٹی لائٹ موم بتی یا بیٹری والی ٹی لائٹ', 'رسی یا ربن', 'ریت یا چھوٹے پتھر'], needEn: ['Empty glass jar', 'Tea light or LED tea light', 'Twine or ribbon', 'Sand or small stones'],
      steps: [['جار کو دھو کر خشک کریں، لیبل اتار دیں۔', 'Wash the jar and peel off the label.'], ['نیچے ایک انچ ریت یا پتھر ڈالیں۔', 'Add an inch of sand or stones.'], ['گردن پر رسی لپیٹ کر ربن باندھ دیں۔', 'Wrap twine around the neck and tie a bow.'], ['ٹی لائٹ رکھیں۔ اصلی موم بتی ہو تو جار کو بچوں اور پردوں سے دور رکھیں۔', 'Place the tea light. If using a real flame, keep away from children and curtains.']] },
    { id: 'macrame', ur: 'رسی کا پودا لٹکانے والا', en: 'Rope plant hanger', icon: 'macrame', cost: '۲۰۰ روپے', costEn: 'About Rs 200', time: '۱ گھنٹہ', timeEn: '1 hour',
      need: ['موٹی سوتی رسی (۸ ٹکڑے، ہر ایک ۲ میٹر)', 'لکڑی یا دھات کا چھلا', 'قینچی', 'گملا'], needEn: ['Cotton rope (8 pieces, 2 m each)', 'A ring', 'Scissors', 'A pot'],
      steps: [['تمام رسیوں کو آدھا موڑ کر چھلے میں باندھ دیں۔', 'Fold all ropes in half and tie to the ring.'], ['چار چار رسیوں کے گروپ بنائیں۔', 'Make groups of four.'], ['ہر گروپ میں چھلے سے ۲۰ سینٹی میٹر نیچے گانٹھ لگائیں۔', 'Tie a knot in each group about 20 cm below the ring.'], ['ہر گروپ کی رسیاں دوسرے گروپ کے ساتھ ملا کر دوسری گانٹھ لگائیں۔', 'Join neighbouring strands and tie a second row of knots.'], ['سب سروں کو ایک گانٹھ میں باندھ دیں اور گملا رکھ کر لٹکائیں۔', 'Tie all ends together, insert the pot and hang.']] },
    { id: 'terracotta', ur: 'مٹی کے گملوں کی رنگائی', en: 'Painted terracotta pots', icon: 'paint', cost: '۳۰۰ روپے', costEn: 'About Rs 300', time: '۲ گھنٹے', timeEn: '2 hours',
      need: ['سادہ مٹی کے گملے', 'ایکریلک رنگ', 'برش', 'شفاف وارنش'], needEn: ['Plain terracotta pots', 'Acrylic paints', 'Brushes', 'Clear varnish'],
      steps: [['گملا دھو کر دھوپ میں خشک کریں۔', 'Wash the pot and dry it in the sun.'], ['پہلے ایک بنیادی رنگ لگائیں اور خشک ہونے دیں۔', 'Apply a base coat and let it dry.'], ['اپنے ڈیزائن بنائیں: نقطے، پٹیاں یا پھول۔', 'Paint designs such as dots, stripes or flowers.'], ['اوپر وارنش لگائیں تاکہ پانی سے رنگ خراب نہ ہو۔', 'Seal with varnish to protect from water.']] },
    { id: 'gallery', ur: 'فریموں کی دیوار', en: 'Gallery wall', icon: 'frames', cost: '۵۰۰ روپے سے', costEn: 'From Rs 500', time: '۱ گھنٹہ', timeEn: '1 hour',
      need: ['۴ سے ۶ فریم', 'خاندانی تصویریں یا آرٹ', 'ہتھوڑی اور کیل', 'ماپنے کا فیتہ'], needEn: ['4–6 frames', 'Photos or art', 'Hammer and nails', 'Measuring tape'],
      steps: [['فریموں کو زمین پر ترتیب دے کر تصویر کھینچ لیں۔', 'Lay out the frames on the floor and take a photo.'], ['فریموں کے درمیان ۵ سینٹی میٹر کا برابر فاصلہ رکھیں۔', 'Keep equal 5 cm gaps between frames.'], ['درمیانی فریم پہلے لگائیں، پھر باقی اس کے گرد۔', 'Hang the central frame first, then build outward.']] },
    { id: 'cushion', ur: 'پرانے دوپٹے سے کشن کور', en: 'Cushion cover from an old dupatta', icon: 'cushion', cost: 'مفت', costEn: 'Free', time: '۱ گھنٹہ', timeEn: '1 hour',
      need: ['پرانا دوپٹہ یا کپڑا', 'سوئی دھاگہ یا مشین', 'قینچی', 'کشن (۴۰×۴۰ سینٹی میٹر)'], needEn: ['Old dupatta or fabric', 'Needle and thread or machine', 'Scissors', 'A 40×40 cm cushion'],
      steps: [['کپڑے کا ایک ٹکڑا ۴۴×۸۸ سینٹی میٹر کاٹیں۔', 'Cut a 44×88 cm piece of fabric.'], ['الٹی طرف سے آدھا موڑیں تاکہ ۴۴×۴۴ بنے اور دونوں طرف سلائی کریں۔', 'Fold in half (right sides together) and sew both sides.'], ['سیدھا کر کے کنارہ اندر موڑ کر سی دیں یا بٹن لگائیں۔', 'Turn right side out and close the opening with stitches or a button.'], ['کشن ڈال دیں۔', 'Insert the cushion.']] }
  ];

  var HOBBIES = [
    { id: 'embroidery', ur: 'کڑھائی', en: 'Embroidery', icon: 'needle', level: 'ابتدائی', levelEn: 'Beginner', cost: '۳۰۰ سے ۵۰۰ روپے', costEn: 'Rs 300–500',
      about: 'کپڑے پر دھاگے سے نقش بنانا۔ کُشن، رومال اور کُرتے کی گردن سے شروع کریں۔', aboutEn: 'Decorating fabric with thread. Start with a cushion, a handkerchief or a kurta neckline.',
      need: ['کڑھائی کا فریم', 'رنگین دھاگے', 'سوئی', 'سوتی کپڑا'], needEn: ['Embroidery hoop', 'Coloured thread', 'Needle', 'Cotton fabric'],
      steps: [['کپڑا فریم میں کس کر لگائیں۔', 'Stretch fabric tight in the hoop.'], ['پنسل سے سادہ ڈیزائن بنائیں، جیسے پتی یا پھول۔', 'Draw a simple design in pencil.'], ['سیدھی ٹانکی (running stitch) سے شروع کریں، پھر چین ٹانکی سیکھیں۔', 'Start with running stitch, then learn chain stitch.'], ['روزانہ ۲۰ منٹ کی مشق کریں۔', 'Practice 20 minutes a day.']], earn: 'کڑھائی والے دوپٹے اور کُشن کور آرڈر پر بنائے جا سکتے ہیں۔', earnEn: 'Embroidered dupattas and cushion covers sell on order.' },
    { id: 'crochet', ur: 'کروشیہ', en: 'Crochet', icon: 'crochet', level: 'ابتدائی', levelEn: 'Beginner', cost: '۲۰۰ سے ۴۰۰ روپے', costEn: 'Rs 200–400',
      about: 'کانٹے (ہک) سے اون کی لڑیاں بُننا۔ پہلے چھوٹی چیزیں بنائیں: کوسٹر، بیگ، ٹوپی۔', aboutEn: 'Making fabric from yarn with a hook. Begin with small items: coasters, a bag, a hat.',
      need: ['کروشیہ ہک (۴ ملی میٹر)', 'کپاس یا اون کا دھاگہ', 'قینچی'], needEn: ['Crochet hook (4 mm)', 'Cotton or wool yarn', 'Scissors'],
      steps: [['سلپ ناٹ اور چین ٹانکے سیکھیں۔', 'Learn the slip knot and chain stitch.'], ['ایک سیدھی قطار چین کی بنا کر اس پر سنگل کروشیہ لگائیں۔', 'Make a chain and work single crochet along it.'], ['چوکور ٹکڑا بنائیں، پھر اسے کوسٹر کی صورت دیں۔', 'Make a square and turn it into a coaster.'], ['اگلا قدم: چھوٹا ٹوکری نما بیگ۔', 'Next: a small basket.']], earn: 'بچوں کے سوئیٹر، بیگ اور سجاوٹ کی چیزیں آن لائن بک سکتی ہیں۔', earnEn: 'Baby sweaters, bags and decor sell online.' },
    { id: 'knitting', ur: 'اون کی بُنائی', en: 'Knitting', icon: 'knit', level: 'ابتدائی', levelEn: 'Beginner', cost: '۳۰۰ سے ۶۰۰ روپے', costEn: 'Rs 300–600',
      about: 'دو سلائیوں سے سویٹر، مفلر اور ٹوپیاں بنانا؛ سردیوں کے لیے بہترین مشغلہ۔', aboutEn: 'Making sweaters, scarves and hats with two needles; ideal for winter.',
      need: ['بُنائی کی سلائیاں', 'موٹی اون', 'قینچی'], needEn: ['Knitting needles', 'Chunky wool', 'Scissors'],
      steps: [['۲۰ ٹانکے ڈالیں (cast on)۔', 'Cast on 20 stitches.'], ['ہر قطار سیدھی بُنیں (garter stitch)۔', 'Knit every row (garter stitch).'], ['۳۰ سینٹی میٹر ہو جائیں تو ٹانکے بند کریں۔', 'Cast off at 30 cm.'], ['پہلی چیز: چھوٹا مفلر۔', 'First project: a small scarf.']], earn: 'سردیوں میں مفلر اور ٹوپیاں اچھی بکتی ہیں۔', earnEn: 'Scarves and hats sell well in winter.' },
    { id: 'mehndi', ur: 'مہندی ڈیزائن', en: 'Mehndi (henna) art', icon: 'mehndi', level: 'درمیانہ', levelEn: 'Intermediate', cost: '۱۰۰ سے ۲۰۰ روپے', costEn: 'Rs 100–200',
      about: 'ہاتھوں اور پاؤں پر مہندی کے نقش۔ پہلے کاغذ پر پرنٹ شدہ ڈیزائن کی نقل کریں۔', aboutEn: 'Henna patterns on hands and feet. Practise on paper first.',
      need: ['تازہ مہندی کون', 'کاغذ اور پین', 'لیموں اور چینی کا گھول'], needEn: ['Fresh henna cones', 'Paper and pen', 'Lemon-sugar mixture'],
      steps: [['پہلے کاغذ پر بیل، پتی، نقطے اور جالی بنانے کی مشق کریں۔', 'Practise vines, leaves, dots and lattices on paper.'], ['کون کا سرا بہت باریک کاٹیں۔', 'Cut the cone tip very fine.'], ['کلائی کے اوپر سادہ بیل سے شروع کریں۔', 'Start with a simple vine on the wrist.'], ['لگانے کے بعد لیموں چینی کا گھول روئی سے لگائیں تاکہ رنگ گہرا آئے۔', 'Dab lemon-sugar on top to deepen the colour.']], earn: 'شادی اور عید پر مہندی کے آرڈر عام ہیں۔', earnEn: 'Wedding and Eid bookings are common.' },
    { id: 'baking', ur: 'بیکنگ', en: 'Baking', icon: 'cake', level: 'ابتدائی', levelEn: 'Beginner', cost: '۵۰۰ روپے سے', costEn: 'From Rs 500',
      about: 'کیک، کوکیز، بریڈ اور کپ کیکس۔ ناپ تول سے بیکنگ بہتر ہوتی ہے۔', aboutEn: 'Cakes, cookies, bread and cupcakes. Baking rewards precise measuring.',
      need: ['اوون', 'ڈیجیٹل ترازو', 'ناپنے کے کپ', 'کیک ٹن'], needEn: ['Oven', 'Digital scale', 'Measuring cups', 'Cake tin'],
      steps: [['پہلے سادہ وینیلا کیک کی ترکیب بار بار بنائیں۔', 'Master a simple vanilla cake first.'], ['اوون کو پہلے سے گرم کریں اور ہر بار ایک ہی درجہ حرارت رکھیں۔', 'Always preheat the oven.'], ['کیک ٹھنڈا ہو کر ہی سجائیں۔', 'Decorate only when completely cool.'], ['پھر کوکیز اور کپ کیکس آزمائیں۔', 'Then try cookies and cupcakes.']], earn: 'سالگرہ کے کیک اور کپ کیکس کے آرڈر محلے میں بآسانی ملتے ہیں۔', earnEn: 'Birthday cakes and cupcakes sell well locally.' },
    { id: 'candle', ur: 'موم بتی سازی', en: 'Candle making', icon: 'candle', level: 'درمیانہ', levelEn: 'Intermediate', cost: '۵۰۰ سے ۱۰۰۰ روپے', costEn: 'Rs 500–1000',
      about: 'خوشبو دار موم بتیاں گھر کی سجاوٹ اور تحفے کے لیے مقبول ہیں۔', aboutEn: 'Scented candles are popular for decor and gifts.',
      need: ['سویا یا پیرافن موم', 'بتی (wick)', 'شیشے کا جار', 'خوشبو کا تیل', 'بین میری برتن'], needEn: ['Soy or paraffin wax', 'Wick', 'Glass jar', 'Fragrance oil', 'Double boiler'],
      steps: [['موم کو پانی کے برتن کے اوپر رکھ کر پگھلائیں؛ کبھی براہِ راست آگ پر نہیں۔', 'Melt wax over simmering water, never directly on flame.'], ['خوشبو ملائیں۔', 'Stir in the fragrance.'], ['بتی جار کے درمیان سیدھی رکھ کر موم ڈالیں۔', 'Centre the wick and pour.'], ['۲۴ گھنٹے ٹھنڈا ہونے دیں۔', 'Let it set for 24 hours.']], earn: 'تحفوں اور سجاوٹ کے لیے اچھا چلتا ہے۔', earnEn: 'Good for gifts and decor.', safety: 'گرم موم سے بچیں اور بچوں کو دور رکھیں۔', safetyEn: 'Hot wax burns; keep children away.' },
    { id: 'painting', ur: 'پینٹنگ اور خطاطی', en: 'Painting & calligraphy', icon: 'brush', level: 'ابتدائی', levelEn: 'Beginner', cost: '۴۰۰ سے ۸۰۰ روپے', costEn: 'Rs 400–800',
      about: 'کینوس، پتھر یا مٹی کے گملے پر رنگ بھرنا یا خطاطی کرنا۔', aboutEn: 'Painting on canvas, stones or pots, or writing calligraphy.',
      need: ['ایکریلک رنگ', 'برش', 'کینوس یا کارڈ شیٹ', 'پانی کا پیالہ'], needEn: ['Acrylic paints', 'Brushes', 'Canvas or card', 'Water jar'],
      steps: [['تین رنگ لے کر ملا کر نئے رنگ بنانے کی مشق کریں۔', 'Mix three colours to learn new shades.'], ['سادہ شکلیں: پھول، پتے، چاند ستارے۔', 'Paint simple shapes: flowers, leaves, moon and stars.'], ['خطاطی کے لیے پہلے موٹے قلم سے الف ب پ کی مشق کریں۔', 'For calligraphy, practise basic letters with a broad pen.']], earn: 'فریم اور تحفے کی پینٹنگز بیچی جا سکتی ہیں۔', earnEn: 'Framed paintings make good gifts and sales.' },
    { id: 'sewing', ur: 'سلائی', en: 'Stitching & tailoring', icon: 'machine', level: 'درمیانہ', levelEn: 'Intermediate', cost: 'مشین ۱۵ ہزار سے', costEn: 'Machine from ~Rs 15,000',
      about: 'اپنے اور بچوں کے کپڑے سینا؛ یہ سب سے منافع بخش گھریلو ہنر ہے۔', aboutEn: 'Sewing clothes for yourself and your children; one of the best home skills for income.',
      need: ['سلائی مشین', 'ناپ کا فیتہ', 'کپڑا کاٹنے کی قینچی', 'چاک'], needEn: ['Sewing machine', 'Measuring tape', 'Fabric scissors', 'Tailor’s chalk'],
      steps: [['پہلے کاغذ پر سیدھی لکیر کی سلائی کی مشق کریں۔', 'Practise straight lines on paper.'], ['پھر کشن کور اور پاجامہ جیسی سادہ چیزیں بنائیں۔', 'Then make cushion covers and simple trousers.'], ['ناپ لینا اور پیٹرن بنانا سیکھیں۔', 'Learn taking measurements and drafting patterns.']], earn: 'محلے کی خواتین کے لیے سلائی اور ایلٹریشن مسلسل آمدنی ہے۔', earnEn: 'Stitching and alterations give steady local income.' },
    { id: 'business', ur: 'گھر بیٹھے کام کے آئیڈیاز', en: 'Home business ideas', icon: 'shop', level: 'سب کے لیے', levelEn: 'All levels', cost: 'کم سرمایہ', costEn: 'Low capital',
      about: 'اپنے ہنر کو آمدنی بنائیں۔ ایک وقت میں ایک ہی چیز سے شروع کریں۔', aboutEn: 'Turn a skill into income. Start with one product at a time.',
      need: ['واٹس ایپ بزنس', 'اچھی تصویریں', 'قیمت کا حساب'], needEn: ['WhatsApp Business', 'Good photos', 'Price calculation'],
      steps: [['ایک ہنر چنیں: کیک، کڑھائی، پودے یا سلائی۔', 'Choose one skill: cakes, embroidery, plants or stitching.'], ['لاگت کا حساب لگا کر ۳۰ سے ۵۰ فیصد منافع رکھیں۔', 'Calculate cost and add a 30–50% margin.'], ['صاف تصویریں کھینچ کر واٹس ایپ اور فیس بک پر لگائیں۔', 'Photograph neatly and post on WhatsApp and Facebook.'], ['پہلے جاننے والوں سے آرڈر لیں، پھر آہستہ آہستہ بڑھائیں۔', 'Start with people you know, then grow.']], earn: 'پودوں کی نرسری گھر کے صحن میں بھی چل سکتی ہے۔', earnEn: 'A small plant nursery can even run from your courtyard.' }
  ];

  root.AashiyanaData = { PLANTS: PLANTS, PESTS: PESTS, MONTHS: MONTHS, WHERE: WHERE, ROOMS: ROOMS, DIY: DIY, HOBBIES: HOBBIES };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.AashiyanaData;
})(typeof self !== 'undefined' ? self : this);
