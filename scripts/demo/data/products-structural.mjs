// Structural departments: cement & concrete, steel, plumbing.
//
// `unit` is a unit key that already exists in the units table. `customUnit` is
// used only where no seeded unit fits; the label is one string shown in both
// languages, so it is kept to a symbol (m³, m²) that reads correctly in Arabic
// and English alike.
//
// Prices are indicative Omani retail prices in OMR, chosen to look plausible in
// a demo. They are not a quotation.

export const STRUCTURAL_PRODUCTS = [
  // ── Cement ────────────────────────────────────────────────────────────────
  {
    sku: "CEM-OPC-50",
    cat: "cement",
    unit: "bag",
    nameEn: "Ordinary Portland Cement OPC 42.5N — 50 kg",
    nameAr: "إسمنت بورتلاندي عادي 42.5N — 50 كجم",
    descriptionEn:
      "General-purpose grey Portland cement for concrete, blockwork and rendering, supplied in sealed 50 kg paper sacks. Grade 42.5N gives normal early strength and is suitable for foundations, columns, slabs and general site mixes. Store off the ground on pallets and keep covered — shelf life is roughly three months from the bagging date.",
    descriptionAr:
      "إسمنت بورتلاندي رمادي متعدد الاستخدامات للخرسانة وأعمال البلوك والبياض، يُورّد في أكياس ورقية محكمة زنة 50 كجم. درجة 42.5N تمنح مقاومة مبكرة اعتيادية وتناسب الأساسات والأعمدة والأسقف والخلطات العامة في الموقع. يُخزّن على منصات بعيداً عن الأرض ويُغطّى جيداً، وصلاحيته نحو ثلاثة أشهر من تاريخ التعبئة.",
    price: 1.95,
    qty: 1200,
    delivery: 0.15,
    attributes: { standard: "OS/BS EN 197-1", grade: "42.5N", type: "CEM I", weightKg: 50, origin: "Oman" }
  },
  {
    sku: "CEM-SRC-50",
    cat: "cement",
    unit: "bag",
    nameEn: "Sulphate Resisting Cement SRC — 50 kg",
    nameAr: "إسمنت مقاوم للأملاح والكبريتات — 50 كجم",
    descriptionEn:
      "Low tricalcium-aluminate cement for concrete in contact with saline ground water, sabkha soils and coastal foundations. Strongly recommended for footings, ground beams and septic structures anywhere along the Omani coast, where ordinary cement deteriorates. Mix and place exactly as OPC; initial set is slightly slower.",
    descriptionAr:
      "إسمنت منخفض نسبة ألومينات الكالسيوم الثلاثية مخصص للخرسانة الملامسة للمياه الجوفية المالحة وتربة السبخة والأساسات الساحلية. يُنصح به بشدة للقواعد والجسور الأرضية وخزانات الصرف في المناطق الساحلية العُمانية حيث يتدهور الإسمنت العادي. يُخلط ويُصب كالإسمنت العادي تماماً مع تأخر بسيط في الشك الابتدائي.",
    price: 2.15,
    qty: 640,
    delivery: 0.15,
    attributes: { standard: "BS EN 197-1 SR", type: "CEM I SR 0", weightKg: 50, application: "Marine & sabkha", origin: "Oman" }
  },
  {
    sku: "CEM-WHT-50",
    cat: "cement",
    unit: "bag",
    nameEn: "White Portland Cement — 50 kg",
    nameAr: "إسمنت أبيض بورتلاندي — 50 كجم",
    descriptionEn:
      "High-brightness white cement for architectural finishes, decorative precast, terrazzo and tile grouting. Produced from low-iron raw materials, so it takes pigment cleanly when a coloured finish is required. Keep strictly away from grey cement and rusty tools, which stain the finished surface permanently.",
    descriptionAr:
      "إسمنت أبيض عالي اللمعان للتشطيبات المعمارية والمسبوقات الزخرفية والترازو وحشو البلاط. يُصنّع من مواد خام منخفضة الحديد، لذا يستقبل الأصباغ بنقاء عند الحاجة إلى تشطيب ملوّن. يُحفظ بمعزل تام عن الإسمنت الرمادي والعدد الصدئة لأنها تترك بقعاً دائمة على السطح النهائي.",
    price: 3.4,
    qty: 210,
    delivery: 0.15,
    attributes: { standard: "BS EN 197-1", brightness: "≥ 85%", weightKg: 50, application: "Architectural finish", origin: "UAE" }
  },
  {
    sku: "CEM-MAS-40",
    cat: "cement",
    unit: "bag",
    nameEn: "Masonry & Plaster Cement — 40 kg",
    nameAr: "إسمنت البياض والمباني — 40 كجم",
    descriptionEn:
      "Pre-blended masonry cement for block laying, internal plaster and external render. The built-in plasticiser gives a creamy, workable mortar that holds on the trowel and reduces the sand-cement mixes the crew has to judge by eye. Not a structural cement — do not use it for reinforced concrete.",
    descriptionAr:
      "إسمنت مباني جاهز الخلط لبناء البلوك والبياض الداخلي والقصارة الخارجية. يحتوي على ملدن مدمج يمنح مونة طرية سهلة التشغيل تثبت على المالج ويقلل الاعتماد على تقدير خلطات الرمل والإسمنت بالعين. ليس إسمنتاً إنشائياً ولا يُستخدم في الخرسانة المسلحة.",
    price: 1.75,
    qty: 480,
    delivery: 0.15,
    attributes: { standard: "BS EN 413-1", class: "MC 12.5", weightKg: 40, application: "Plaster & blockwork", origin: "Oman" }
  },

  // ── Sand & aggregate ──────────────────────────────────────────────────────
  {
    sku: "AGG-SND-WSH",
    cat: "sand-aggregate",
    unit: "custom",
    customUnit: "m³",
    nameEn: "Washed Concrete Sand — per m³",
    nameAr: "رمل مغسول للخرسانة — للمتر المكعب",
    descriptionEn:
      "Crushed and washed fine aggregate with the silt and salt content removed, graded for structural concrete and plaster. Washing matters in Oman: unwashed wadi sand carries chlorides that attack reinforcement from the inside years after casting. Delivered loose by tipper; minimum load applies outside Muscat.",
    descriptionAr:
      "ركام ناعم مكسّر ومغسول أُزيلت منه نسبة الطمي والأملاح، ومُدرّج للاستخدام في الخرسانة الإنشائية والبياض. الغسل مهم في عُمان: رمل الأودية غير المغسول يحمل كلوريدات تهاجم حديد التسليح من الداخل بعد سنوات من الصب. يُورّد سائباً بقلاب، ويُطبّق حد أدنى للحمولة خارج مسقط.",
    price: 7.5,
    qty: 400,
    delivery: 6.0,
    attributes: { standard: "BS 882", siltContent: "< 3%", washed: true, deliveryMode: "Tipper, loose", origin: "Oman" }
  },
  {
    sku: "AGG-GRV-20",
    cat: "sand-aggregate",
    unit: "custom",
    customUnit: "m³",
    nameEn: "Crushed Aggregate 20 mm — per m³",
    nameAr: "حصى مكسّر 20 مم — للمتر المكعب",
    descriptionEn:
      "Single-sized 20 mm crushed limestone aggregate for structural concrete, mass concrete and soakaway fill. Angular faces give good mechanical interlock and a stronger mix than rounded river gravel at the same cement content. Supplied clean and free of fines.",
    descriptionAr:
      "ركام حجر جيري مكسّر بمقاس موحّد 20 مم للخرسانة الإنشائية والخرسانة العادية وردم الآبار الامتصاصية. أوجهه الحادة تمنح تعشيقاً ميكانيكياً جيداً وخلطة أقوى من الحصى النهري المدوّر بنفس نسبة الإسمنت. يُورّد نظيفاً وخالياً من النواعم.",
    price: 8.5,
    qty: 350,
    delivery: 6.0,
    attributes: { standard: "BS 882", nominalSize: "20 mm", shape: "Angular crushed", origin: "Oman" }
  },
  {
    sku: "AGG-GRV-10",
    cat: "sand-aggregate",
    unit: "custom",
    customUnit: "m³",
    nameEn: "Crushed Aggregate 10 mm — per m³",
    nameAr: "حصى مكسّر 10 مم — للمتر المكعب",
    descriptionEn:
      "Fine 10 mm aggregate for thin sections, heavily reinforced members, screeds and precast work where 20 mm stone will not pass between the bars. Also used to fine-tune the grading of a mix that is coming out harsh and hard to place.",
    descriptionAr:
      "ركام ناعم مقاس 10 مم للقطاعات الرفيعة والعناصر كثيفة التسليح والصبّات الرقيقة وأعمال السابق الصب حيث لا يمر الحصى 20 مم بين الأسياخ. يُستخدم أيضاً لضبط تدرّج الخلطة عندما تخرج خشنة وصعبة الصب.",
    price: 8.75,
    qty: 220,
    delivery: 6.0,
    attributes: { standard: "BS 882", nominalSize: "10 mm", shape: "Angular crushed", origin: "Oman" }
  },
  {
    sku: "AGG-BSE-SUB",
    cat: "sand-aggregate",
    unit: "custom",
    customUnit: "m³",
    nameEn: "Granular Sub-Base Material — per m³",
    nameAr: "مواد ردم وأساس حبيبي — للمتر المكعب",
    descriptionEn:
      "Well-graded crushed material for backfilling foundations, raising plot levels and forming the compacted base under slabs, yards and access roads. Place and compact in layers of 200–250 mm; a single deep layer will never reach the required density however long the roller runs.",
    descriptionAr:
      "مواد مكسّرة جيدة التدرّج لردم الأساسات ورفع مناسيب الأرض وتكوين طبقة الأساس المدكوكة تحت الأرضيات والساحات وطرق الخدمة. تُفرد وتُدكّ على طبقات بسماكة 200–250 مم، فالطبقة العميقة الواحدة لن تصل إلى الكثافة المطلوبة مهما طال الدك.",
    price: 5.5,
    qty: 600,
    delivery: 6.0,
    attributes: { grading: "0–40 mm well graded", compaction: "200–250 mm layers", origin: "Oman" }
  },

  // ── Concrete admixtures ───────────────────────────────────────────────────
  {
    sku: "ADM-PLS-20",
    cat: "concrete-admixtures",
    unit: "piece",
    nameEn: "Concrete Plasticiser — 20 L Drum",
    nameAr: "ملدّن خرساني — درام 20 لتر",
    descriptionEn:
      "Water-reducing admixture that keeps concrete workable in Omani summer heat without adding water at the mixer. Typical dosage is 0.4–1.0% by weight of cement; it buys you placing time and raises final strength, because the water you did not add is water that never became a void. Chloride free, safe with reinforcement.",
    descriptionAr:
      "إضافة مخفّضة للماء تحافظ على قابلية تشغيل الخرسانة في حرارة الصيف العُماني دون إضافة ماء عند الخلاطة. الجرعة المعتادة 0.4–1.0% من وزن الإسمنت، وهي تمنح وقتاً أطول للصب وترفع المقاومة النهائية لأن الماء الذي لم يُضف لا يتحول إلى فراغات. خالٍ من الكلوريدات وآمن على حديد التسليح.",
    price: 18.5,
    qty: 45,
    delivery: 0.5,
    attributes: { standard: "BS EN 934-2", dosage: "0.4–1.0% of cement weight", volumeL: 20, chlorideFree: true }
  },
  {
    sku: "ADM-CUR-20",
    cat: "concrete-admixtures",
    unit: "piece",
    nameEn: "Concrete Curing Compound — 20 L Drum",
    nameAr: "مركّب معالجة الخرسانة — درام 20 لتر",
    descriptionEn:
      "Sprayed-on membrane that seals fresh concrete and holds the mixing water in while it hydrates, replacing days of hosing down a slab in 45 °C heat. One drum covers roughly 100–120 m² per coat. Apply as soon as the surface sheen disappears — the compound cannot save water that has already evaporated.",
    descriptionAr:
      "غشاء يُرشّ على الخرسانة الطازجة فيغلق سطحها ويحبس ماء الخلط أثناء الإماهة، ويغني عن أيام من رش السقف بالماء في حرارة 45 درجة. يغطي الدرام الواحد نحو 100–120 م² للطبقة الواحدة. يُطبّق فور اختفاء لمعان السطح، فالمركّب لا يعيد ماءً تبخّر أصلاً.",
    price: 22.0,
    qty: 38,
    delivery: 0.5,
    attributes: { standard: "ASTM C309", coverage: "100–120 m² per coat", volumeL: 20, base: "Wax emulsion" }
  },
  {
    sku: "ADM-BND-5",
    cat: "concrete-admixtures",
    unit: "piece",
    nameEn: "SBR Bonding Agent — 5 L",
    nameAr: "مادة ربط SBR — 5 لتر",
    descriptionEn:
      "Styrene-butadiene latex for bonding new concrete, screed or plaster to an existing hardened surface. Brush it onto the prepared substrate and place while still tacky, or gauge it into the mortar itself to improve adhesion and reduce shrinkage cracking on thin repairs.",
    descriptionAr:
      "مستحلب لاتكس ستايرين-بيوتادايين لربط الخرسانة أو الصبّة أو البياض الجديد بسطح قديم متصلّد. يُدهن على السطح المُجهّز ويُصبّ عليه وهو لا يزال لزجاً، أو يُضاف إلى المونة نفسها لتحسين الالتصاق وتقليل تشققات الانكماش في الترميمات الرقيقة.",
    price: 8.75,
    qty: 60,
    delivery: 0.3,
    attributes: { base: "SBR latex", volumeL: 5, use: "Bonding slurry or mortar additive" }
  },

  // ── Blocks & masonry ──────────────────────────────────────────────────────
  {
    sku: "BLK-HOL-20",
    cat: "blocks-masonry",
    unit: "piece",
    nameEn: "Hollow Concrete Block 200 × 200 × 400 mm",
    nameAr: "بلوك خرساني مجوف 200 × 200 × 400 مم",
    descriptionEn:
      "Standard load-bearing hollow block for external walls and party walls. The cavities cut weight, speed up laying and give a route for vertical reinforcement and services. Cured for a minimum of seven days before dispatch so the wall does not shrink and crack after plastering.",
    descriptionAr:
      "بلوك مجوف قياسي حامل للأحمال يُستخدم في الجدران الخارجية والفاصلة. التجاويف تقلل الوزن وتسرّع البناء وتتيح ممراً للتسليح الرأسي والتمديدات. يُعالَج سبعة أيام على الأقل قبل التوريد حتى لا ينكمش الجدار ويتشقق بعد البياض.",
    price: 0.32,
    qty: 9500,
    delivery: 0.02,
    attributes: { size: "200×200×400 mm", strength: "7 N/mm²", type: "Hollow load-bearing", weightKg: 17 }
  },
  {
    sku: "BLK-HOL-15",
    cat: "blocks-masonry",
    unit: "piece",
    nameEn: "Hollow Concrete Block 150 × 200 × 400 mm",
    nameAr: "بلوك خرساني مجوف 150 × 200 × 400 مم",
    descriptionEn:
      "Mid-width hollow block for internal partitions that still need reasonable sound separation and the ability to carry fixings. Lighter than the 200 mm block, so a mason lays more of them in a day, and it keeps more usable floor area inside small rooms.",
    descriptionAr:
      "بلوك مجوف بعرض متوسط للقواطع الداخلية التي تحتاج عزلاً صوتياً معقولاً وقدرة على تحمّل التثبيتات. أخف من بلوك 200 مم فيبني منه البنّاء عدداً أكبر في اليوم، كما يوفّر مساحة أرضية أكبر داخل الغرف الصغيرة.",
    price: 0.27,
    qty: 7200,
    delivery: 0.02,
    attributes: { size: "150×200×400 mm", strength: "7 N/mm²", type: "Hollow partition", weightKg: 13 }
  },
  {
    sku: "BLK-SOL-10",
    cat: "blocks-masonry",
    unit: "piece",
    nameEn: "Solid Concrete Block 100 × 200 × 400 mm",
    nameAr: "بلوك خرساني مصمت 100 × 200 × 400 مم",
    descriptionEn:
      "Solid block for thin partitions, boundary infill, kitchen and bathroom walls where tiles and heavy fittings will be hung. Being solid, it takes a plug anywhere on its face rather than only over the webs, which saves a lot of guesswork on site.",
    descriptionAr:
      "بلوك مصمت للقواطع الرفيعة وتعبئة الأسوار وجدران المطابخ والحمامات التي ستُعلّق عليها بلاطات وتجهيزات ثقيلة. لكونه مصمتاً يقبل التثبيت في أي موضع من وجهه لا فوق الأضلاع فقط، وهذا يوفّر كثيراً من التخمين في الموقع.",
    price: 0.24,
    qty: 5400,
    delivery: 0.02,
    attributes: { size: "100×200×400 mm", strength: "10 N/mm²", type: "Solid", weightKg: 15 }
  },
  {
    sku: "BLK-THR-20",
    cat: "blocks-masonry",
    unit: "piece",
    nameEn: "Thermal Insulated Block 200 mm (EPS Core)",
    nameAr: "بلوك حراري معزول 200 مم (قلب فلين)",
    descriptionEn:
      "Concrete block with an expanded-polystyrene core cast into the cavities, cutting heat transfer through external walls and reducing the air-conditioning load for the life of the building. Required by thermal regulations on many new villas. Laid exactly like a normal block — no change in technique.",
    descriptionAr:
      "بلوك خرساني مصبوب داخل تجاويفه قلب من البوليسترين المُمدد يقلل انتقال الحرارة عبر الجدران الخارجية ويخفّض حمل التكييف طوال عمر المبنى. مطلوب وفق اشتراطات العزل الحراري في كثير من الفلل الجديدة. يُبنى تماماً كالبلوك العادي دون أي تغيير في الطريقة.",
    price: 0.65,
    qty: 3100,
    delivery: 0.02,
    attributes: { size: "200×200×400 mm", core: "EPS insulated", uValue: "≈ 0.55 W/m²K", weightKg: 15 }
  },
  {
    sku: "BLK-KRB-STD",
    cat: "blocks-masonry",
    unit: "piece",
    nameEn: "Precast Kerbstone 500 × 300 × 150 mm",
    nameAr: "حجر أرصفة سابق الصب 500 × 300 × 150 مم",
    descriptionEn:
      "Heavy precast kerb for defining driveways, parking bays, garden edges and internal roads. Bed it on a concrete haunch rather than sand — kerbs laid straight onto fill move within the first season and the line never looks straight again.",
    descriptionAr:
      "حجر رصيف سابق الصب ثقيل لتحديد المداخل ومواقف السيارات وحواف الحدائق والطرق الداخلية. يُفرش على قاعدة خرسانية لا على رمل، فالأحجار المفروشة على الردم مباشرة تتحرك خلال الموسم الأول ولا يستقيم خطها بعدها أبداً.",
    price: 1.45,
    qty: 860,
    delivery: 0.08,
    attributes: { size: "500×300×150 mm", strength: "30 N/mm²", finish: "Grey precast", weightKg: 48 }
  },

  // ── Reinforcement steel ───────────────────────────────────────────────────
  {
    sku: "STL-RBR-08",
    cat: "rebar",
    unit: "piece",
    nameEn: "Deformed Rebar 8 mm × 12 m — Grade 60",
    nameAr: "حديد تسليح مضلّع 8 مم × 12 م — إجهاد 60",
    descriptionEn:
      "High-yield deformed bar in the standard 12 m mill length, used mainly for stirrups, ties and secondary distribution steel. The ribs are what transfer load into the concrete, so bars must arrive free of loose scale, oil and mud. Supplied straight, not coiled.",
    descriptionAr:
      "سيخ حديد مضلّع عالي المقاومة بالطول المصنعي القياسي 12 متراً، يُستخدم غالباً للكانات والأربطة وحديد التوزيع الثانوي. الأضلاع هي التي تنقل الإجهاد إلى الخرسانة، لذا يجب أن يصل السيخ خالياً من القشور السائبة والزيت والطين. يُورّد مستقيماً لا ملفوفاً.",
    price: 2.45,
    qty: 1400,
    delivery: 0.4,
    attributes: { diameterMm: 8, lengthM: 12, grade: "B500B / Grade 60", standard: "BS 4449", weightKg: 4.74 }
  },
  {
    sku: "STL-RBR-10",
    cat: "rebar",
    unit: "piece",
    nameEn: "Deformed Rebar 10 mm × 12 m — Grade 60",
    nameAr: "حديد تسليح مضلّع 10 مم × 12 م — إجهاد 60",
    descriptionEn:
      "Ten-millimetre high-yield bar for slab mesh, lintels, staircase steel and column ties in light residential work. Bends cleanly to the standard radii without cracking at the rib roots, which is the usual sign of an under-specified bar.",
    descriptionAr:
      "سيخ عالي المقاومة قطر 10 مم لشبكات الأسقف والعتبات وتسليح الدرج وكانات الأعمدة في الأعمال السكنية الخفيفة. يُثنى بنظافة على أنصاف الأقطار القياسية دون تشقق عند جذور الأضلاع، وهو العرض المعتاد للحديد غير المطابق.",
    price: 3.8,
    qty: 1150,
    delivery: 0.4,
    attributes: { diameterMm: 10, lengthM: 12, grade: "B500B / Grade 60", standard: "BS 4449", weightKg: 7.4 }
  },
  {
    sku: "STL-RBR-12",
    cat: "rebar",
    unit: "piece",
    nameEn: "Deformed Rebar 12 mm × 12 m — Grade 60",
    nameAr: "حديد تسليح مضلّع 12 مم × 12 م — إجهاد 60",
    descriptionEn:
      "The workhorse bar of Omani residential construction: slab main steel, beam bottom steel and column verticals in villas and small commercial buildings. Sold per 12 m length; cutting and bending to a schedule can be arranged with two working days' notice.",
    descriptionAr:
      "السيخ الأكثر استخداماً في البناء السكني العُماني: التسليح الرئيسي للأسقف والحديد السفلي للجسور والأسياخ الرأسية للأعمدة في الفلل والمباني التجارية الصغيرة. يُباع بالطول 12 متراً، ويمكن ترتيب القص والثني حسب الجدول بإشعار مسبق يومي عمل.",
    price: 5.45,
    qty: 1680,
    delivery: 0.4,
    attributes: { diameterMm: 12, lengthM: 12, grade: "B500B / Grade 60", standard: "BS 4449", weightKg: 10.66 }
  },
  {
    sku: "STL-RBR-16",
    cat: "rebar",
    unit: "piece",
    nameEn: "Deformed Rebar 16 mm × 12 m — Grade 60",
    nameAr: "حديد تسليح مضلّع 16 مم × 12 م — إجهاد 60",
    descriptionEn:
      "Sixteen-millimetre bar for column verticals, beam main steel and foundation rafts. At this diameter lap lengths and bend radii start to matter a great deal; follow the structural drawing rather than site habit, because a short lap is invisible once the concrete is poured.",
    descriptionAr:
      "سيخ قطر 16 مم للأسياخ الرأسية للأعمدة والتسليح الرئيسي للجسور واللبشة. عند هذا القطر يصبح طول التشريك ونصف قطر الثني بالغَي الأهمية، فاتّبع اللوحة الإنشائية لا العادة المتبعة في الموقع، لأن التشريك القصير يختفي تماماً بعد الصب.",
    price: 9.7,
    qty: 920,
    delivery: 0.4,
    attributes: { diameterMm: 16, lengthM: 12, grade: "B500B / Grade 60", standard: "BS 4449", weightKg: 18.95 }
  },
  {
    sku: "STL-RBR-20",
    cat: "rebar",
    unit: "piece",
    nameEn: "Deformed Rebar 20 mm × 12 m — Grade 60",
    nameAr: "حديد تسليح مضلّع 20 مم × 12 م — إجهاد 60",
    descriptionEn:
      "Heavy bar for raft foundations, transfer beams, retaining walls and multi-storey columns. Needs mechanical bending; it cannot be worked reliably by hand on site. Order against a bar bending schedule to avoid offcut waste, which is expensive at this size.",
    descriptionAr:
      "سيخ ثقيل للأساسات اللبشة والجسور الناقلة وجدران الاستناد وأعمدة المباني متعددة الطوابق. يحتاج ثنياً آلياً ولا يمكن تشكيله يدوياً في الموقع بشكل موثوق. يُطلب وفق جدول ثني الحديد لتفادي هدر البواقي، وهو هدر مكلف عند هذا المقاس.",
    price: 15.2,
    qty: 540,
    delivery: 0.5,
    attributes: { diameterMm: 20, lengthM: 12, grade: "B500B / Grade 60", standard: "BS 4449", weightKg: 29.6 }
  },
  {
    sku: "STL-MSH-A252",
    cat: "rebar",
    unit: "piece",
    nameEn: "Welded Steel Mesh A252 — 6 × 2.4 m Sheet",
    nameAr: "شبك حديد ملحوم A252 — لوح 6 × 2.4 م",
    descriptionEn:
      "Factory-welded reinforcement mesh, 8 mm wire at 200 mm centres both ways, for ground slabs, car-park decks and screeds. One sheet replaces an afternoon of cutting and tying loose bars, and the spacing is consistent in a way hand-tied steel rarely is.",
    descriptionAr:
      "شبك تسليح ملحوم في المصنع بأسلاك 8 مم على مسافات 200 مم في الاتجاهين، للأرضيات الخرسانية وأسطح المواقف والصبّات. اللوح الواحد يغني عن نصف يوم من قص الأسياخ وربطها، وتباعده منتظم بصورة نادراً ما يبلغها الحديد المربوط يدوياً.",
    price: 12.5,
    qty: 260,
    delivery: 0.8,
    attributes: { ref: "A252", wireMm: 8, pitchMm: 200, sheet: "6.0 × 2.4 m", standard: "BS 4483", weightKg: 45 }
  },

  // ── Steel sections ────────────────────────────────────────────────────────
  {
    sku: "STL-SQT-40",
    cat: "steel-sections",
    unit: "piece",
    nameEn: "Square Hollow Section 40 × 40 × 2 mm — 6 m",
    nameAr: "مواسير مربعة 40 × 40 × 2 مم — 6 م",
    descriptionEn:
      "Light structural tube for gates, grilles, shade frames, workshop benches and general fabrication. Supplied black (unpainted) in 6 m lengths, so it must be primed promptly — coastal humidity in Oman starts surface rust within days of cutting.",
    descriptionAr:
      "ماسورة إنشائية خفيفة للبوابات والمشبّكات وهياكل المظلات وطاولات الورش والتصنيع العام. تُورّد سوداء غير مدهونة بأطوال 6 أمتار، لذا يجب أساسها سريعاً، فرطوبة السواحل العُمانية تبدأ الصدأ السطحي خلال أيام من القص.",
    price: 5.9,
    qty: 320,
    delivery: 0.35,
    attributes: { section: "40×40 mm", thicknessMm: 2, lengthM: 6, finish: "Black (mill)", weightKg: 14.2 }
  },
  {
    sku: "STL-ANG-50",
    cat: "steel-sections",
    unit: "piece",
    nameEn: "Equal Angle 50 × 50 × 5 mm — 6 m",
    nameAr: "زاوية حديد متساوية 50 × 50 × 5 مم — 6 م",
    descriptionEn:
      "Hot-rolled equal angle for bracing, frames, door and window sub-frames, and shelving supports. The 5 mm leg takes a weld well and stays straight under load, which the thinner 3 mm angles do not once a span exceeds about a metre and a half.",
    descriptionAr:
      "زاوية حديد مدرفلة على الساخن للتدعيم والهياكل والإطارات الفرعية للأبواب والنوافذ وحوامل الأرفف. سماكة 5 مم تتحمل اللحام جيداً وتبقى مستقيمة تحت الحمل، بخلاف الزوايا الأرفع 3 مم عند تجاوز البحر متراً ونصف تقريباً.",
    price: 7.4,
    qty: 240,
    delivery: 0.35,
    attributes: { section: "50×50 mm", thicknessMm: 5, lengthM: 6, finish: "Hot rolled black", weightKg: 22.6 }
  },
  {
    sku: "STL-IBM-150",
    cat: "steel-sections",
    unit: "piece",
    nameEn: "I-Beam IPE 150 — 6 m",
    nameAr: "كمرة حديد IPE 150 — 6 م",
    descriptionEn:
      "Rolled steel I-section for lintels over wide openings, mezzanine floors, canopy beams and temporary propping. Delivery requires a crane or forklift at site — a 6 m IPE 150 is not a two-man lift and should not be treated as one.",
    descriptionAr:
      "قطاع حديد مدرفل على شكل I للعتبات فوق الفتحات الواسعة والميزانين وجسور المظلات والدعم المؤقت. يتطلب التوصيل وجود رافعة أو رافعة شوكية في الموقع، فكمرة IPE 150 بطول 6 أمتار ليست حملاً لرجلين ولا ينبغي التعامل معها كذلك.",
    price: 38.0,
    qty: 64,
    delivery: 2.5,
    attributes: { section: "IPE 150", heightMm: 150, lengthM: 6, standard: "EN 10025 S275", weightKg: 90 }
  },
  {
    sku: "STL-CCH-100",
    cat: "steel-sections",
    unit: "piece",
    nameEn: "C-Channel 100 × 50 × 3 mm — 6 m",
    nameAr: "قطاع حديد C بمقاس 100 × 50 × 3 مم — 6 م",
    descriptionEn:
      "Cold-formed C-purlin for roof and wall framing under profiled sheeting, and for light mezzanine joists. Pre-punched holes are not supplied as standard; drilling on site is straightforward but should be set out before the sections go up.",
    descriptionAr:
      "قطاع C مشكّل على البارد لعوارض الأسقف والجدران تحت الألواح المضلّعة، ولعوارض الميزانين الخفيفة. لا تُورّد الثقوب مسبقة التخريم بشكل قياسي، والتخريم في الموقع سهل لكن يجب توقيعه قبل تركيب القطاعات.",
    price: 11.5,
    qty: 180,
    delivery: 0.4,
    attributes: { section: "100×50 mm", thicknessMm: 3, lengthM: 6, type: "Cold-formed purlin", weightKg: 21 }
  },

  // ── Sheets & roofing ──────────────────────────────────────────────────────
  {
    sku: "STL-GISH-10",
    cat: "sheets-roofing",
    unit: "piece",
    nameEn: "Galvanised Steel Sheet 1.0 mm — 2.4 × 1.2 m",
    nameAr: "لوح حديد مجلفن 1.0 مم — 2.4 × 1.2 م",
    descriptionEn:
      "Zinc-coated flat sheet for ducting, cladding, flashings, cabinet fabrication and site hoarding. The galvanised coating protects the cut face only partially, so exposed edges should be sealed or folded rather than left raw.",
    descriptionAr:
      "لوح حديد مسطّح مطلي بالزنك لمجاري التكييف والتكسيات ومواسير التصريف وتصنيع الخزائن وأسوار المواقع. طبقة الجلفنة تحمي حافة القص جزئياً فقط، لذا تُغلق الحواف المكشوفة أو تُطوى بدلاً من تركها عارية.",
    price: 9.8,
    qty: 140,
    delivery: 0.6,
    attributes: { thicknessMm: 1.0, sheet: "2.4 × 1.2 m", coating: "Z275 galvanised", weightKg: 22.6 }
  },
  {
    sku: "STL-CHQ-30",
    cat: "sheets-roofing",
    unit: "piece",
    nameEn: "Chequered Steel Plate 3 mm — 2.4 × 1.2 m",
    nameAr: "لوح حديد مخرّم (نقشة) 3 مم — 2.4 × 1.2 م",
    descriptionEn:
      "Raised-pattern plate for stair treads, walkways, ramp covers, inspection chamber lids and truck bodies. The teardrop pattern keeps grip when the surface is wet or oily, which plain plate does not.",
    descriptionAr:
      "لوح حديد بنقشة بارزة لدرجات السلالم والممرات وأغطية المنحدرات وأغطية غرف التفتيش وصناديق الشاحنات. النقشة الدمعية تحافظ على التماسك عندما يكون السطح مبللاً أو زيتياً، وهو ما لا يوفره اللوح الأملس.",
    price: 34.5,
    qty: 48,
    delivery: 1.5,
    attributes: { thicknessMm: 3, sheet: "2.4 × 1.2 m", pattern: "Teardrop", weightKg: 72 }
  },
  {
    sku: "STL-RFS-COR",
    cat: "sheets-roofing",
    unit: "meter",
    nameEn: "Corrugated Roofing Sheet 0.5 mm — per metre",
    nameAr: "لوح تسقيف مموّج 0.5 مم — للمتر",
    descriptionEn:
      "Pre-painted corrugated steel sheet for car-park shades, store roofs, farm buildings and boundary screens. Cut to the length you need, so there is no cross-lap and no leak line across the roof. Fix through the crown of the corrugation with washered screws, never through the valley.",
    descriptionAr:
      "لوح حديد مموّج مطلي مسبقاً لمظلات المواقف وأسقف المخازن والمباني الزراعية وسواتر الأسوار. يُقصّ بالطول المطلوب فلا يوجد تراكب عرضي ولا خط تسريب عبر السقف. يُثبّت من قمة الموجة ببراغي ذات حلقات منع تسرّب، ولا يُثبّت أبداً من القاع.",
    price: 2.9,
    qty: 2400,
    delivery: 0.25,
    attributes: { thicknessMm: 0.5, coverWidthMm: 1000, finish: "Pre-painted PPGI", colours: "White / Blue / Brick red" }
  },

  // ── Welding supplies ──────────────────────────────────────────────────────
  {
    sku: "WLD-ROD-32",
    cat: "welding-supplies",
    unit: "box",
    nameEn: "Welding Electrodes E6013 3.2 mm — 5 kg",
    nameAr: "أقطاب لحام E6013 مقاس 3.2 مم — 5 كجم",
    descriptionEn:
      "General-purpose rutile electrodes for mild steel: easy arc striking, smooth bead, forgiving of an imperfect joint fit. Keep the packet sealed and dry — damp rods cause porosity, and porosity is exactly the defect nobody sees until the weld fails.",
    descriptionAr:
      "أقطاب روتيلية متعددة الاستخدامات للحديد الطري: سهلة في إشعال القوس، تعطي خطاً أملس، وتتسامح مع عدم انضباط التقاء الوصلة. تُحفظ العبوة مغلقة وجافة، فالأقطاب الرطبة تسبب مسامية، والمسامية هي بالضبط العيب الذي لا يراه أحد حتى تفشل اللحمة.",
    price: 4.2,
    qty: 190,
    delivery: 0.1,
    attributes: { classification: "AWS E6013", diameterMm: 3.2, weightKg: 5, current: "AC/DC" }
  },
  {
    sku: "WLD-CUT-115",
    cat: "welding-supplies",
    unit: "piece",
    nameEn: "Cutting Disc 115 × 1.2 mm — Metal",
    nameAr: "قرص قطع 115 × 1.2 مم — للمعادن",
    descriptionEn:
      "Thin reinforced abrasive disc for cutting rebar, angle, tube and sheet with a 115 mm angle grinder. Thin means fast and low heat, but it also means it will shatter if twisted in the cut — never use a cutting disc for grinding.",
    descriptionAr:
      "قرص كاشط رفيع مقوّى لقطع حديد التسليح والزوايا والمواسير والألواح بجلاخة 115 مم. الرفع يعني قطعاً أسرع وحرارة أقل، لكنه يعني أيضاً أنه ينكسر إذا التوى داخل القطع، فلا يُستخدم قرص القطع للتجليخ أبداً.",
    price: 0.35,
    qty: 1400,
    delivery: 0.0,
    attributes: { diameterMm: 115, thicknessMm: 1.2, bore: "22.2 mm", material: "Metal / stainless", standard: "EN 12413" }
  },
  {
    sku: "WLD-GRD-115",
    cat: "welding-supplies",
    unit: "piece",
    nameEn: "Grinding Disc 115 × 6 mm — Metal",
    nameAr: "قرص تجليخ 115 × 6 مم — للمعادن",
    descriptionEn:
      "Depressed-centre grinding wheel for dressing welds, removing scale and chamfering edges. Used at roughly a 30° angle to the work; laid flat it loads up, glazes over and stops cutting.",
    descriptionAr:
      "قرص تجليخ ذو مركز غائر لتسوية اللحامات وإزالة القشور وشطف الحواف. يُستخدم بزاوية 30 درجة تقريباً مع سطح العمل، أما استخدامه مسطّحاً فيؤدي إلى انسداده وتزجّجه وتوقفه عن القطع.",
    price: 0.55,
    qty: 980,
    delivery: 0.0,
    attributes: { diameterMm: 115, thicknessMm: 6, bore: "22.2 mm", material: "Metal", standard: "EN 12413" }
  },

  // ── PVC drainage pipes ────────────────────────────────────────────────────
  {
    sku: "PLB-PVC-110",
    cat: "pvc-pipes",
    unit: "piece",
    nameEn: "uPVC Drainage Pipe 110 mm × 6 m",
    nameAr: "أنبوب صرف uPVC 110 مم × 6 م",
    descriptionEn:
      "Main soil and waste pipe for WC connections, stacks and underground drainage runs. Supplied with one socketed end, so lengths join with solvent cement without a separate coupling. Lay underground runs at a fall of about 1:60 — steeper is not better, as the water outruns the solids and the line blocks.",
    descriptionAr:
      "أنبوب الصرف الرئيسي لتوصيلات المراحيض والمواسير الرأسية وخطوط الصرف تحت الأرض. يُورّد بطرف واحد ذي جلبة فتتصل الأطوال بغراء المذيب دون وصلة منفصلة. تُمدّ الخطوط تحت الأرض بميل 1:60 تقريباً، والميل الأشد ليس أفضل لأن الماء يسبق المواد الصلبة فينسد الخط.",
    price: 4.85,
    qty: 420,
    delivery: 0.3,
    attributes: { diameterMm: 110, lengthM: 6, pressureClass: "Drainage (non-pressure)", standard: "BS EN 1329", jointType: "Solvent socket" }
  },
  {
    sku: "PLB-PVC-75",
    cat: "pvc-pipes",
    unit: "piece",
    nameEn: "uPVC Drainage Pipe 75 mm × 6 m",
    nameAr: "أنبوب صرف uPVC 75 مم × 6 م",
    descriptionEn:
      "Branch waste pipe for showers, floor gullies, kitchen sinks and washing-machine outlets. Sits between the 50 mm branch and the 110 mm stack, and is the correct size for a shower tray that repeatedly drains too slowly on 50 mm.",
    descriptionAr:
      "أنبوب صرف فرعي للدشات ومصافي الأرضيات وأحواض المطابخ ومخارج الغسالات. يقع بين الفرع 50 مم والماسورة الرئيسية 110 مم، وهو المقاس الصحيح لصينية دش يتكرر بطء تصريفها على مقاس 50 مم.",
    price: 3.1,
    qty: 380,
    delivery: 0.25,
    attributes: { diameterMm: 75, lengthM: 6, standard: "BS EN 1329", jointType: "Solvent socket" }
  },
  {
    sku: "PLB-PVC-50",
    cat: "pvc-pipes",
    unit: "piece",
    nameEn: "uPVC Drainage Pipe 50 mm × 6 m",
    nameAr: "أنبوب صرف uPVC 50 مم × 6 م",
    descriptionEn:
      "Small-bore waste pipe for wash basins, bidets and condensate drains from split air-conditioning units. Light enough to chase into a block wall, and the size most commonly kept on the van for call-outs.",
    descriptionAr:
      "أنبوب صرف صغير القطر للمغاسل والشطافات وتصريف مياه التكثيف من وحدات التكييف المنفصلة. خفيف بما يكفي لتخديده داخل جدار البلوك، وهو المقاس الأكثر بقاءً في السيارة لأعمال الطوارئ.",
    price: 1.95,
    qty: 460,
    delivery: 0.2,
    attributes: { diameterMm: 50, lengthM: 6, standard: "BS EN 1329", jointType: "Solvent socket" }
  },

  // ── PPR water pipes ───────────────────────────────────────────────────────
  {
    sku: "PLB-PPR-20",
    cat: "ppr-pipes",
    unit: "piece",
    nameEn: "PPR Hot & Cold Water Pipe 20 mm × 4 m — PN20",
    nameAr: "أنبوب PPR للماء الحار والبارد 20 مم × 4 م — PN20",
    descriptionEn:
      "Polypropylene pressure pipe for concealed hot and cold water distribution, joined by heat fusion into a single continuous piece of plastic with no gasket to perish. PN20 is rated for hot water; do not substitute the thinner PN10 on a hot line however similar it looks.",
    descriptionAr:
      "أنبوب ضغط من البولي بروبلين لتوزيع الماء الحار والبارد المخفي، يُوصل باللحام الحراري فيصبح قطعة بلاستيكية واحدة متصلة دون حشية تتلف مع الزمن. تصنيف PN20 مخصص للماء الحار، ولا يجوز استبداله بالأرفع PN10 على خط حار مهما تشابه شكلهما.",
    price: 1.85,
    qty: 520,
    delivery: 0.15,
    attributes: { diameterMm: 20, lengthM: 4, pressureClass: "PN20", standard: "DIN 8077/8078", maxTempC: 70 }
  },
  {
    sku: "PLB-PPR-25",
    cat: "ppr-pipes",
    unit: "piece",
    nameEn: "PPR Hot & Cold Water Pipe 25 mm × 4 m — PN20",
    nameAr: "أنبوب PPR للماء الحار والبارد 25 مم × 4 م — PN20",
    descriptionEn:
      "The main distribution size, running from the tank or heater to the branch tees before reducing to 20 mm at each fixture. Using 20 mm throughout is the usual cause of a villa where the shower dies whenever a tap opens elsewhere.",
    descriptionAr:
      "مقاس التوزيع الرئيسي، يمتد من الخزان أو السخان إلى وصلات التفريع قبل التصغير إلى 20 مم عند كل قطعة صحية. استخدام مقاس 20 مم في كامل الشبكة هو السبب المعتاد لفيلا يضعف فيها الدش كلما فُتح صنبور آخر.",
    price: 2.65,
    qty: 410,
    delivery: 0.15,
    attributes: { diameterMm: 25, lengthM: 4, pressureClass: "PN20", standard: "DIN 8077/8078", maxTempC: 70 }
  },

  // ── Fittings & valves ─────────────────────────────────────────────────────
  {
    sku: "PLB-FIT-E110",
    cat: "pipe-fittings",
    unit: "piece",
    nameEn: "uPVC Elbow 110 mm — 87.5°",
    nameAr: "كوع uPVC 110 مم — 87.5 درجة",
    descriptionEn:
      "Swept 87.5° bend for the foot of a soil stack and for direction changes in buried drainage. Deliberately not a true 90° — the slight sweep keeps flow moving and is far less prone to blocking than a sharp corner.",
    descriptionAr:
      "كوع بانحناء 87.5 درجة لقاعدة ماسورة الصرف الرأسية ولتغيير الاتجاه في الصرف المدفون. ليس 90 درجة تماماً عن قصد، فالانحناء الطفيف يبقي التدفق مستمراً وهو أقل عرضة للانسداد بكثير من الزاوية الحادة.",
    price: 0.95,
    qty: 640,
    delivery: 0.05,
    attributes: { diameterMm: 110, angle: "87.5°", material: "uPVC", standard: "BS EN 1329" }
  },
  {
    sku: "PLB-FIT-T110",
    cat: "pipe-fittings",
    unit: "piece",
    nameEn: "uPVC Equal Tee 110 mm",
    nameAr: "تيّ uPVC متساوي 110 مم",
    descriptionEn:
      "Branch junction for connecting a WC or a floor drain into a 110 mm stack or underground run. Fit with the branch facing the direction of flow, not against it, or the main line will push waste up the branch.",
    descriptionAr:
      "وصلة تفريع لربط كرسي حمام أو مصفاة أرضية بماسورة 110 مم رأسية أو خط مدفون. يُركّب والفرع باتجاه سريان الماء لا عكسه، وإلا دفع الخط الرئيسي الفضلات إلى داخل الفرع.",
    price: 1.35,
    qty: 430,
    delivery: 0.05,
    attributes: { diameterMm: 110, type: "Equal tee", material: "uPVC", standard: "BS EN 1329" }
  },
  {
    sku: "PLB-FIT-PPR20E",
    cat: "pipe-fittings",
    unit: "piece",
    nameEn: "PPR Elbow 20 mm — 90°",
    nameAr: "كوع PPR 20 مم — 90 درجة",
    descriptionEn:
      "Fusion-welded 90° elbow for concealed PPR water pipework. Heat both socket and pipe for the time on the welding-machine chart, push straight home without twisting, and hold — twisting a fused joint is what produces the pinhole leak inside the wall.",
    descriptionAr:
      "كوع 90 درجة يُلحم حرارياً لشبكات مياه PPR المخفية. تُسخّن الجلبة والأنبوب للمدة المدوّنة في جدول آلة اللحام، ثم يُدفع مستقيماً دون لفّ ويُثبّت، فلَفّ الوصلة الملحومة هو سبب التسريب الشعري داخل الجدار.",
    price: 0.25,
    qty: 1800,
    delivery: 0.0,
    attributes: { diameterMm: 20, angle: "90°", material: "PPR", jointType: "Heat fusion" }
  },
  {
    sku: "PLB-GVL-25",
    cat: "pipe-fittings",
    unit: "piece",
    nameEn: 'Brass Gate Valve 1" — Threaded',
    nameAr: "محبس نحاس بوابة 1 بوصة — ملولب",
    descriptionEn:
      "Full-bore brass gate valve for tank outlets, riser isolation and garden lines. A gate valve is for full-open or full-closed service only — leaving one half open to throttle flow wears the seat and it will never seal again.",
    descriptionAr:
      "محبس بوابة نحاسي كامل الفتحة لمخارج الخزانات وعزل المواسير الصاعدة وخطوط الحدائق. محبس البوابة مخصص للفتح الكامل أو الإغلاق الكامل فقط، وتركه نصف مفتوح لخنق التدفق يُتلف المقعد فلا يُحكم الإغلاق بعدها أبداً.",
    price: 3.4,
    qty: 210,
    delivery: 0.05,
    attributes: { size: '1" (DN25)', material: "Brass", connection: "BSP threaded", maxPressure: "16 bar" }
  },
  {
    sku: "PLB-SOL-500",
    cat: "pipe-fittings",
    unit: "piece",
    nameEn: "uPVC Solvent Cement — 500 ml",
    nameAr: "غراء مذيب لأنابيب uPVC — 500 مل",
    descriptionEn:
      "Solvent weld cement that chemically fuses uPVC pipe and fitting into one component — it is not a glue and does not fill a loose joint. Apply a thin even coat to both faces, push fully home with a quarter turn, and leave undisturbed before pressurising.",
    descriptionAr:
      "غراء مذيب يدمج أنبوب uPVC والوصلة كيميائياً في قطعة واحدة، وهو ليس لاصقاً ولا يملأ وصلة مرتخية. يُدهن طبقة رقيقة متساوية على السطحين، ويُدفع حتى النهاية مع ربع لفة، ويُترك دون حركة قبل تشغيل الضغط.",
    price: 2.75,
    qty: 160,
    delivery: 0.05,
    attributes: { volumeMl: 500, material: "uPVC solvent cement", setTime: "Handle 15 min, pressurise 24 h" }
  },

  // ── Taps & sanitaryware ───────────────────────────────────────────────────
  {
    sku: "SAN-MIX-BAS",
    cat: "taps-basins",
    unit: "piece",
    nameEn: "Basin Mixer Tap — Chrome, Single Lever",
    nameAr: "خلاط مغسلة — كروم بمقبض واحد",
    descriptionEn:
      "Single-lever basin mixer in polished chrome over a brass body, supplied with two flexible connection hoses and a fixing set. The ceramic cartridge is the part that decides how long a tap lasts; this one uses a standard 35 mm cartridge that can be replaced rather than scrapping the tap.",
    descriptionAr:
      "خلاط مغسلة بمقبض واحد بطلاء كروم لامع على جسم نحاسي، يُورّد مع خرطومي توصيل مرنين وطقم تثبيت. خرطوشة السيراميك هي ما يحدد عمر الخلاط، وهذه خرطوشة قياسية 35 مم يمكن استبدالها بدل التخلص من الخلاط بالكامل.",
    price: 12.5,
    qty: 120,
    delivery: 0.2,
    attributes: { finish: "Polished chrome", body: "Brass", cartridgeMm: 35, includes: "2 flexible hoses + fixing set", warranty: "2 years" }
  },
  {
    sku: "SAN-MIX-SHW",
    cat: "taps-basins",
    unit: "set",
    nameEn: "Shower Mixer Set — Concealed Valve, Rain Head & Handset",
    nameAr: "طقم خلاط دش — محبس مخفي مع دش مطري ويدوي",
    descriptionEn:
      "Complete shower set: concealed thermostatic-style mixer valve, 200 mm rain head on a wall arm, handset with hose and slide rail, and a two-way diverter. The valve body is built into the wall, so it must be installed before tiling — retrofitting means breaking the finished wall.",
    descriptionAr:
      "طقم دش كامل يضم محبس خلط مخفي، ودشاً مطرياً 200 مم على ذراع جداري، ودشاً يدوياً مع خرطوم وقضيب انزلاقي، ومحوّلاً ثنائي الاتجاه. جسم المحبس يُبنى داخل الجدار، لذا يجب تركيبه قبل البلاط، وتركيبه لاحقاً يعني كسر الجدار المنتهي.",
    price: 24.0,
    qty: 58,
    delivery: 0.4,
    attributes: { finish: "Chrome", headMm: 200, includes: "Concealed valve, rain head, handset, rail, diverter", warranty: "2 years" }
  },
  {
    sku: "SAN-WC-STP",
    cat: "taps-basins",
    unit: "set",
    nameEn: "Two-Piece WC Set — Close Coupled with Soft-Close Seat",
    nameAr: "طقم كرسي حمام قطعتين — مع غطاء ناعم الإغلاق",
    descriptionEn:
      "Vitreous china close-coupled WC with dual-flush cistern (3 / 6 litre), soft-close seat and cover, and the full fixing and connection kit. Dual flush is worth specifying everywhere in Oman: on a villa with four bathrooms it is a visible difference on the water bill.",
    descriptionAr:
      "كرسي حمام من الخزف الصيني بخزان ملاصق وسيفون مزدوج (3 / 6 لتر)، مع غطاء ومقعد ناعم الإغلاق وطقم التثبيت والتوصيل كاملاً. السيفون المزدوج يستحق التحديد في كل مشروع بعُمان، ففي فيلا بأربعة حمامات يظهر فرقه بوضوح في فاتورة المياه.",
    price: 38.0,
    qty: 64,
    delivery: 1.2,
    attributes: { material: "Vitreous china", flush: "Dual 3/6 L", trap: "S-trap", includes: "Cistern, seat, fixings", colour: "White" }
  },
  {
    sku: "SAN-BAS-PED",
    cat: "taps-basins",
    unit: "set",
    nameEn: "Wash Basin with Full Pedestal — White",
    nameAr: "مغسلة بقاعدة كاملة — أبيض",
    descriptionEn:
      "Ceramic wash basin with a matching full pedestal that hides the trap and supply pipes. The pedestal carries only part of the weight — the basin still needs its wall brackets fitted into solid block, not into plaster.",
    descriptionAr:
      "مغسلة خزفية مع قاعدة كاملة مطابقة تُخفي السيفون ومواسير التغذية. القاعدة تحمل جزءاً من الوزن فقط، وتظل المغسلة بحاجة إلى مثبتاتها الجدارية في بلوك مصمت لا في طبقة البياض.",
    price: 22.0,
    qty: 72,
    delivery: 1.0,
    attributes: { material: "Vitreous china", widthMm: 560, tapHoles: 1, includes: "Basin, pedestal, brackets", colour: "White" }
  },
  {
    sku: "SAN-SNK-SS",
    cat: "taps-basins",
    unit: "piece",
    nameEn: "Stainless Steel Kitchen Sink — Double Bowl with Drainer",
    nameAr: "حوض مطبخ ستانلس ستيل — حوضان مع مصفاة",
    descriptionEn:
      "Drop-in 304 stainless sink, two bowls and a drainer board, supplied with waste, overflow and fixing clips. Grade 304 is the one that survives an Omani coastal kitchen; the cheaper 201 stainless pits within a year or two near the sea.",
    descriptionAr:
      "حوض ستانلس 304 يُركّب بالتنزيل، بحوضين ولوح تصفية، يُورّد مع الصفاية وفتحة الفيض ومشابك التثبيت. الدرجة 304 هي التي تصمد في مطبخ عُماني ساحلي، أما الستانلس 201 الأرخص فيتنقّر خلال سنة أو سنتين قرب البحر.",
    price: 26.5,
    qty: 48,
    delivery: 0.6,
    attributes: { material: "SS 304", bowls: 2, size: "1160 × 500 mm", thicknessMm: 0.8, includes: "Waste + overflow" }
  },

  // ── Water tanks & pumps ───────────────────────────────────────────────────
  {
    sku: "TNK-PLY-1000",
    cat: "water-tanks",
    unit: "piece",
    nameEn: "Water Tank 1,000 L — Triple Layer, Food Grade",
    nameAr: "خزان مياه 1000 لتر — ثلاث طبقات غذائي",
    descriptionEn:
      "Roto-moulded polyethylene tank with a three-layer wall: food-grade white inside, black middle layer to block light, and a UV-stabilised outer skin. The black layer is the important one — it stops sunlight reaching the water, and sunlight is what grows algae in a rooftop tank.",
    descriptionAr:
      "خزان بولي إيثيلين مصبوب دوّارياً بجدار ثلاثي الطبقات: طبقة داخلية بيضاء غذائية، وطبقة وسطى سوداء تحجب الضوء، وطبقة خارجية مقاومة للأشعة فوق البنفسجية. الطبقة السوداء هي الأهم، فهي تمنع وصول الشمس إلى الماء، والشمس هي ما يُنبت الطحالب في خزان السطح.",
    price: 42.0,
    qty: 36,
    delivery: 3.0,
    attributes: { capacityL: 1000, layers: 3, material: "Food-grade LLDPE", uvStabilised: true, warranty: "5 years" }
  },
  {
    sku: "TNK-PLY-500",
    cat: "water-tanks",
    unit: "piece",
    nameEn: "Water Tank 500 L — Triple Layer, Food Grade",
    nameAr: "خزان مياه 500 لتر — ثلاث طبقات غذائي",
    descriptionEn:
      "Half-size version of the 1,000 L tank for flats, small houses, site offices and farm use. Light enough for two people to carry empty up a staircase, which the 1,000 L tank is not.",
    descriptionAr:
      "النسخة النصفية من خزان 1000 لتر للشقق والمنازل الصغيرة ومكاتب المواقع والاستخدام الزراعي. خفيف بما يكفي ليحمله شخصان فارغاً على السلم، بخلاف خزان 1000 لتر.",
    price: 26.0,
    qty: 52,
    delivery: 2.0,
    attributes: { capacityL: 500, layers: 3, material: "Food-grade LLDPE", uvStabilised: true, warranty: "5 years" }
  },
  {
    sku: "TNK-PMP-05",
    cat: "water-tanks",
    unit: "piece",
    nameEn: "Water Pressure Pump 0.5 HP — Automatic",
    nameAr: "مضخة ضغط مياه 0.5 حصان — أوتوماتيكية",
    descriptionEn:
      "Self-priming booster pump with an automatic pressure switch: it starts when a tap opens and stops when it closes. Sized for a normal two-bathroom house fed from a roof tank. Mount it on a rubber pad — bolting a pump straight to a concrete roof slab sends the noise through the whole building.",
    descriptionAr:
      "مضخة تقوية ذاتية التهيئة مع مفتاح ضغط أوتوماتيكي، تعمل عند فتح الصنبور وتتوقف عند إغلاقه. مناسبة لمنزل عادي بحمامين يُغذّى من خزان علوي. تُركّب على قاعدة مطاطية، فتثبيت المضخة مباشرة على بلاطة السطح ينقل الضجيج إلى المبنى كله.",
    price: 34.5,
    qty: 40,
    delivery: 0.8,
    attributes: { powerHp: 0.5, powerW: 370, maxHeadM: 35, voltage: "220-240 V", type: "Automatic self-priming", warranty: "1 year" }
  }
];
