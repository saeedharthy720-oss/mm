// Fit-out departments: doors & windows, tools & equipment, timber & boards.
// Same record shape as the other product files.

export const FITOUT_PRODUCTS = [
  // ── Wooden doors ──────────────────────────────────────────────────────────
  {
    sku: "DOR-WD-FLH",
    cat: "wooden-doors",
    unit: "piece",
    nameEn: "Flush Wooden Door 210 × 90 cm — Door Leaf Only",
    nameAr: "باب خشب أملس 210 × 90 سم — درفة فقط",
    descriptionEn:
      "Hollow-core flush door leaf with a veneered face, for internal rooms. Supplied unfinished so it can be painted or lacquered to match the joinery, and without a frame — order the frame separately or use the existing one. Trim no more than 10 mm from any edge; beyond that you cut into the lipping and the leaf delaminates.",
    descriptionAr:
      "درفة باب أملس بقلب مجوّف ووجه مقشور، للغرف الداخلية. تُورّد دون تشطيب ليُدهن أو يُلكّر بما يطابق أعمال النجارة، ودون إطار، فيُطلب الإطار منفصلاً أو يُستخدم القائم. لا يُقصّ أكثر من 10 مم من أي حافة، فما زاد يقطع الشريط الحافّي وتنفصل طبقات الدرفة.",
    price: 28.5,
    qty: 68,
    delivery: 1.0,
    attributes: { size: "2100 × 900 mm", thicknessMm: 40, core: "Hollow", facing: "Veneer, unfinished", frameIncluded: false }
  },
  {
    sku: "DOR-WD-HDF",
    cat: "wooden-doors",
    unit: "set",
    nameEn: "HDF Moulded Door with Frame & Architrave — 210 × 90 cm",
    nameAr: "باب HDF مقولب مع إطار وحلية — 210 × 90 سم",
    descriptionEn:
      "Complete internal door set: pre-finished moulded HDF leaf, frame, architraves both sides and hinges fitted. Because the leaf is hung in the frame at the factory, the door closes properly on site instead of depending on how square the opening happens to be.",
    descriptionAr:
      "طقم باب داخلي كامل: درفة HDF مقولبة منتهية التشطيب، مع إطار وحليات على الجهتين ومفصلات مركّبة. ولأن الدرفة تُعلّق في الإطار داخل المصنع، يُغلق الباب بشكل صحيح في الموقع بدل الاعتماد على مدى استقامة الفتحة.",
    price: 46.0,
    qty: 42,
    delivery: 1.5,
    attributes: { size: "2100 × 900 mm", material: "Moulded HDF", finish: "Pre-finished white", includes: "Leaf, frame, architrave, hinges" }
  },

  // ── Steel doors ───────────────────────────────────────────────────────────
  {
    sku: "DOR-ST-SEC",
    cat: "steel-doors",
    unit: "set",
    nameEn: "Steel Security Door 210 × 100 cm — with Frame & Lock",
    nameAr: "باب حديد أمان 210 × 100 سم — مع إطار وقفل",
    descriptionEn:
      "Galvanised steel entrance door with a reinforced leaf, multi-point lock, three heavy hinges and a powder-coated finish. Supplied as a complete set with frame, so the anchors go into the structure rather than into plaster. Suitable for main entrances, stores and roof access.",
    descriptionAr:
      "باب مدخل من الحديد المجلفن بدرفة مقوّاة وقفل متعدد النقاط وثلاث مفصلات ثقيلة وتشطيب بالطلاء الإلكتروستاتيكي. يُورّد طقماً كاملاً مع الإطار فتُثبّت المسامير في الهيكل الإنشائي لا في البياض. يصلح للمداخل الرئيسية والمخازن ومداخل الأسطح.",
    price: 92.0,
    qty: 24,
    delivery: 3.0,
    attributes: { size: "2100 × 1000 mm", material: "Galvanised steel", finish: "Powder coated", lock: "Multi-point", includes: "Leaf, frame, lock, hinges" }
  },
  {
    sku: "DOR-ST-FIR",
    cat: "steel-doors",
    unit: "set",
    nameEn: "Fire Rated Steel Door 60 min — 210 × 100 cm",
    nameAr: "باب حديد مقاوم للحريق 60 دقيقة — 210 × 100 سم",
    descriptionEn:
      "Certified 60-minute fire door with a mineral-wool core, intumescent seal, fire-rated hinges and a door closer. Required on stair cores, plant rooms and service risers. The certificate belongs to the complete assembly — changing the closer or the lock for a non-rated one voids the rating entirely.",
    descriptionAr:
      "باب مقاوم للحريق معتمد لمدة 60 دقيقة بقلب من الصوف الصخري وشريط منتفخ حرارياً ومفصلات مقاومة للحريق ومغلق باب. مطلوب في مناور السلالم وغرف المعدات ومناور الخدمات. الشهادة تخص التجميعة كاملة، واستبدال المغلق أو القفل بآخر غير معتمد يُبطل التصنيف كلياً.",
    price: 145.0,
    qty: 12,
    delivery: 3.5,
    attributes: { size: "2100 × 1000 mm", fireRating: "60 minutes", core: "Mineral wool", includes: "Leaf, frame, closer, intumescent seal", certified: true }
  },

  // ── Aluminium windows ─────────────────────────────────────────────────────
  {
    sku: "WIN-AL-SLD",
    cat: "aluminium-windows",
    unit: "set",
    nameEn: "Aluminium Sliding Window 120 × 120 cm — Double Glazed",
    nameAr: "نافذة ألمنيوم منزلقة 120 × 120 سم — زجاج مزدوج",
    descriptionEn:
      "Two-track sliding window in a powder-coated aluminium frame with double glazing, insect mesh and a lock. Double glazing is worth its cost in Oman for the air-conditioning load alone, before considering the reduction in road noise. Made to order in your opening size at no extra charge.",
    descriptionAr:
      "نافذة منزلقة بمسارين في إطار ألمنيوم مطلي إلكتروستاتيكياً مع زجاج مزدوج وشبك حشرات وقفل. الزجاج المزدوج يستحق كلفته في عُمان من أجل حمل التكييف وحده قبل النظر إلى تقليل ضجيج الشارع. يُصنّع حسب مقاس فتحتك دون رسوم إضافية.",
    price: 58.0,
    qty: 30,
    delivery: 2.0,
    attributes: { size: "1200 × 1200 mm", glazing: "Double 5+9+5 mm", tracks: 2, finish: "Powder coated", includes: "Mesh + lock", madeToMeasure: true }
  },
  {
    sku: "WIN-AL-FIX",
    cat: "aluminium-windows",
    unit: "set",
    nameEn: "Aluminium Fixed Window 100 × 100 cm — Double Glazed",
    nameAr: "نافذة ألمنيوم ثابتة 100 × 100 سم — زجاج مزدوج",
    descriptionEn:
      "Non-opening glazed panel for light without ventilation — stair cores, corridors and high-level openings. Cheaper and better sealed than an opening sash, since there is no moving joint to leak dust or air.",
    descriptionAr:
      "لوح زجاجي غير قابل للفتح يوفر الإضاءة دون تهوية، للمناور والممرات والفتحات العلوية. أرخص وأفضل إحكاماً من الدرفة القابلة للفتح، إذ لا توجد وصلة متحركة يتسرب منها الغبار أو الهواء.",
    price: 38.0,
    qty: 34,
    delivery: 1.8,
    attributes: { size: "1000 × 1000 mm", glazing: "Double 5+9+5 mm", opening: "Fixed", finish: "Powder coated", madeToMeasure: true }
  },
  {
    sku: "WIN-MSH-RL",
    cat: "aluminium-windows",
    unit: "roll",
    nameEn: "Fibreglass Insect Mesh — 1.2 × 30 m Roll",
    nameAr: "شبك حشرات فايبرجلاس — لفة 1.2 × 30 م",
    descriptionEn:
      "Coated fibreglass mesh for re-screening window and door frames. Fibreglass does not corrode and will not crease permanently the way aluminium mesh does when a child leans on it.",
    descriptionAr:
      "شبك فايبرجلاس مغلّف لإعادة تشبيك إطارات النوافذ والأبواب. الفايبرجلاس لا يتآكل ولا ينثني بشكل دائم كما يحدث لشبك الألمنيوم عندما يتكئ عليه طفل.",
    price: 12.5,
    qty: 55,
    delivery: 0.2,
    attributes: { widthM: 1.2, lengthM: 30, material: "PVC-coated fibreglass", mesh: "18 × 16", colour: "Grey" }
  },

  // ── Door hardware ─────────────────────────────────────────────────────────
  {
    sku: "HRD-LCK-CYL",
    cat: "door-hardware",
    unit: "set",
    nameEn: "Cylinder Mortice Lock Set — 3 Keys, Satin Nickel",
    nameAr: "طقم قفل غاطس بأسطوانة — 3 مفاتيح نيكل مطفي",
    descriptionEn:
      "Mortice lock body with a euro cylinder, lever handles on both faces, strike plate and three keys. The euro cylinder is a standard size, so it can be swapped later to re-key a door without replacing the whole lock — useful for a rented property or after losing a key.",
    descriptionAr:
      "جسم قفل غاطس مع أسطوانة أوروبية ومقابض على الوجهين ولوحة صد وثلاثة مفاتيح. الأسطوانة الأوروبية بمقاس قياسي، فيمكن استبدالها لاحقاً لتغيير مفتاح الباب دون تغيير القفل كله، وهذا مفيد للعقار المؤجر أو بعد فقدان مفتاح.",
    price: 6.5,
    qty: 150,
    delivery: 0.05,
    attributes: { cylinder: "Euro profile 70 mm", finish: "Satin nickel", keys: 3, backsetMm: 60, includes: "Lock body, handles, strike, keys" }
  },
  {
    sku: "HRD-HNG-4",
    cat: "door-hardware",
    unit: "set",
    nameEn: 'Stainless Steel Butt Hinges 4" — Pair',
    nameAr: "مفصلات أبواب ستانلس 4 بوصة — زوج",
    descriptionEn:
      "Ball-bearing stainless hinges for internal and external doors. Stainless rather than plated steel matters near the coast, where plated hinges rust at the knuckle and then squeal every time the door moves. Three hinges per door leaf for anything heavier than a hollow-core internal door.",
    descriptionAr:
      "مفصلات ستانلس بكريات لأبواب داخلية وخارجية. الستانلس بدل الحديد المطلي مهم قرب الساحل، حيث تصدأ المفصلات المطلية عند المفصل ثم تصرّ مع كل حركة للباب. تُستخدم ثلاث مفصلات لكل درفة أثقل من باب داخلي مجوّف.",
    price: 1.25,
    qty: 380,
    delivery: 0.0,
    attributes: { sizeInch: 4, material: "SS 201 ball bearing", quantity: "2 per set", screwsIncluded: true }
  },
  {
    sku: "HRD-HND-LEV",
    cat: "door-hardware",
    unit: "set",
    nameEn: "Lever Door Handle on Rose — Pair, Satin Nickel",
    nameAr: "مقبض باب ذراعي على قاعدة دائرية — زوج نيكل مطفي",
    descriptionEn:
      "Pair of lever handles on round roses with spindle and fixing screws, for use with a mortice or tubular latch. Lever handles are far easier than knobs for anyone carrying something, or for elderly hands — worth specifying throughout rather than only where required.",
    descriptionAr:
      "زوج مقابض ذراعية على قواعد دائرية مع محور وبراغي تثبيت، تُستخدم مع قفل غاطس أو لسان أنبوبي. المقابض الذراعية أسهل بكثير من المدوّرة لمن يحمل شيئاً أو لكبار السن، وتستحق التحديد في كامل المبنى لا في المواضع المطلوبة فقط.",
    price: 4.2,
    qty: 190,
    delivery: 0.0,
    attributes: { type: "Lever on rose", finish: "Satin nickel", includes: "Pair + spindle + screws", spindleMm: 8 }
  },
  {
    sku: "HRD-CLS-80",
    cat: "door-hardware",
    unit: "piece",
    nameEn: "Hydraulic Door Closer — Up to 80 kg Door",
    nameAr: "مغلق باب هيدروليكي — لباب حتى 80 كجم",
    descriptionEn:
      "Adjustable overhead closer with separate speed and latching-speed screws. Set the latch speed slow enough that the door does not slam: a closer wound fully open is the reason so many fitted doors still bang all day.",
    descriptionAr:
      "مغلق علوي قابل للضبط ببرغيين منفصلين لسرعة الإغلاق وسرعة الإقفال النهائي. تُضبط سرعة الإقفال بطيئة بما يمنع ارتطام الباب، فالمغلق المفتوح بالكامل هو سبب استمرار كثير من الأبواب المركّبة في الارتطام طوال اليوم.",
    price: 8.9,
    qty: 95,
    delivery: 0.1,
    attributes: { maxDoorKg: 80, adjustable: "Closing + latching speed", finish: "Silver", standard: "EN 1154" }
  },

  // ── Hand tools ────────────────────────────────────────────────────────────
  {
    sku: "TOL-HAM-CLW",
    cat: "hand-tools",
    unit: "piece",
    nameEn: "Claw Hammer 16 oz — Fibreglass Handle",
    nameAr: "مطرقة بمخلب 16 أونصة — مقبض فايبرجلاس",
    descriptionEn:
      "Drop-forged head on a shock-absorbing fibreglass shaft with a rubber grip. The fibreglass handle will not shrink and work loose in dry heat the way a wooden shaft does, which is the usual way a hammer head ends up flying off.",
    descriptionAr:
      "رأس مطروق على عمود فايبرجلاس ماص للصدمات بقبضة مطاطية. مقبض الفايبرجلاس لا ينكمش ويرتخي في الحرارة الجافة كما يفعل العمود الخشبي، وهي الطريقة المعتادة لانفلات رأس المطرقة.",
    price: 2.85,
    qty: 210,
    delivery: 0.0,
    attributes: { weightOz: 16, handle: "Fibreglass", head: "Drop-forged steel", lengthMm: 330 }
  },
  {
    sku: "TOL-TRW-PLS",
    cat: "hand-tools",
    unit: "piece",
    nameEn: "Plastering Trowel 280 × 120 mm — Stainless",
    nameAr: "مالج بياض 280 × 120 مم — ستانلس",
    descriptionEn:
      "Stainless steel finishing trowel with a rounded blade and a comfortable grip. A new trowel is stiff and leaves lines; the edges soften with use, which is why a plasterer will never lend you a broken-in one.",
    descriptionAr:
      "مالج تشطيب من الستانلس بنصل مدوّر الحواف وقبضة مريحة. المالج الجديد قاسٍ ويترك خطوطاً، وحوافه تلين بالاستخدام، ولهذا لا يُعير البنّاء مالجه المُدرَّب لأحد.",
    price: 3.2,
    qty: 160,
    delivery: 0.0,
    attributes: { blade: "280 × 120 mm", material: "Stainless steel", handle: "Soft grip" }
  },
  {
    sku: "TOL-TAP-5",
    cat: "hand-tools",
    unit: "piece",
    nameEn: "Measuring Tape 5 m × 19 mm — Auto Lock",
    nameAr: "متر قياس 5 م × 19 مم — قفل أوتوماتيكي",
    descriptionEn:
      "Five-metre tape with a nylon-coated blade, auto lock and belt clip, marked in both metric and imperial. The loose hook on the end is meant to move by exactly the thickness of the hook — it is not a fault, and it is what makes inside and outside measurements both read correctly.",
    descriptionAr:
      "متر بطول خمسة أمتار بشريط مغلّف بالنايلون وقفل أوتوماتيكي ومشبك حزام، مدرّج بالمتري والإنجليزي معاً. الخطّاف السائب في طرفه مصمم ليتحرك بمقدار سماكته بالضبط، وهذا ليس عيباً بل هو ما يجعل القياس الداخلي والخارجي صحيحين معاً.",
    price: 1.45,
    qty: 340,
    delivery: 0.0,
    attributes: { lengthM: 5, bladeWidthMm: 19, lock: "Auto", markings: "Metric + imperial" }
  },
  {
    sku: "TOL-LVL-60",
    cat: "hand-tools",
    unit: "piece",
    nameEn: "Spirit Level 60 cm — Aluminium, 3 Vials",
    nameAr: "ميزان ماء 60 سم — ألمنيوم بثلاث عيون",
    descriptionEn:
      "Box-section aluminium level with horizontal, vertical and 45° vials and milled measuring faces. Check a new level by reading it, turning it end for end and reading again — if the bubble moves, the level is wrong and every wall you build with it will be too.",
    descriptionAr:
      "ميزان ألمنيوم بمقطع صندوقي وثلاث عيون أفقية ورأسية و45 درجة وأوجه قياس مفرزة. يُفحص الميزان الجديد بقراءته ثم قلبه رأساً على عقب وقراءته مجدداً، فإن تحركت الفقاعة فالميزان خاطئ وكل جدار تبنيه به سيكون خاطئاً كذلك.",
    price: 4.5,
    qty: 130,
    delivery: 0.0,
    attributes: { lengthMm: 600, vials: 3, body: "Aluminium box section", accuracy: "±0.5 mm/m" }
  },
  {
    sku: "TOL-WBR-STD",
    cat: "hand-tools",
    unit: "piece",
    nameEn: "Wheelbarrow 80 L — Heavy Duty, Pneumatic Wheel",
    nameAr: "عربة يد 80 لتر — تحمل عالٍ بعجلة هوائية",
    descriptionEn:
      "Steel tray wheelbarrow on a tubular frame with a pneumatic wheel. The air-filled tyre is what lets it cross rubble and soft sand; a solid wheel is maintenance-free but will stop dead on a site that has not been cleared.",
    descriptionAr:
      "عربة يد بحوض حديدي على هيكل أنبوبي بعجلة هوائية. الإطار المملوء بالهواء هو ما يمكّنها من عبور الركام والرمل الطري، أما العجلة المصمتة فلا تحتاج صيانة لكنها تتوقف تماماً في موقع لم يُنظّف.",
    price: 16.5,
    qty: 58,
    delivery: 1.0,
    attributes: { capacityL: 80, tray: "Powder-coated steel", wheel: "Pneumatic", loadKg: 150 }
  },
  {
    sku: "TOL-SHV-RND",
    cat: "hand-tools",
    unit: "piece",
    nameEn: "Round Point Shovel — Wooden Handle",
    nameAr: "مجرفة مدببة — مقبض خشبي",
    descriptionEn:
      "Round-point digging shovel with a hardened steel blade and a long wooden handle. Round point for digging and breaking ground; a square-mouth shovel is for lifting loose material off a hard surface, and using either for the other job is slow work.",
    descriptionAr:
      "مجرفة حفر مدببة الرأس بنصل فولاذي مقسّى ومقبض خشبي طويل. الرأس المدبب للحفر وكسر الأرض، أما المجرفة مربعة الفم فلرفع المواد السائبة عن سطح صلب، واستخدام إحداهما مكان الأخرى عمل بطيء.",
    price: 2.6,
    qty: 175,
    delivery: 0.1,
    attributes: { blade: "Hardened steel, round point", handle: "Wood, 120 cm", use: "Digging" }
  },

  // ── Power tools ───────────────────────────────────────────────────────────
  {
    sku: "TOL-DRL-HMR",
    cat: "power-tools",
    unit: "piece",
    nameEn: "Rotary Hammer Drill 800 W — SDS-Plus, 3 Mode",
    nameAr: "شنيور دقاق دوّار 800 واط — SDS-Plus بثلاث وضعيات",
    descriptionEn:
      "SDS-Plus rotary hammer with drill, hammer-drill and chisel modes, supplied in a case with a depth stop and side handle. A rotary hammer drills concrete by impact, not by pressure — leaning on it does nothing except wear the bit and the operator.",
    descriptionAr:
      "شنيور دقاق SDS-Plus بثلاث وضعيات: ثقب، وثقب بالطرق، ونحت، يُورّد في حقيبة مع محدد عمق ومقبض جانبي. الشنيور الدقاق يثقب الخرسانة بالطرق لا بالضغط، والاتكاء عليه لا يفعل شيئاً سوى إتلاف الريشة وإجهاد المشغّل.",
    price: 42.0,
    qty: 36,
    delivery: 0.5,
    attributes: { powerW: 800, chuck: "SDS-Plus", modes: 3, impactJ: 2.6, includes: "Case, side handle, depth stop", warranty: "1 year" }
  },
  {
    sku: "TOL-GRD-115",
    cat: "power-tools",
    unit: "piece",
    nameEn: "Angle Grinder 115 mm — 750 W",
    nameAr: "جلاخة زاوية 115 مم — 750 واط",
    descriptionEn:
      "Compact angle grinder for cutting rebar and tile, grinding welds and cleaning steel. Comes with a guard — keep it fitted and positioned between the disc and the operator. Most grinder injuries are people who removed the guard because it was in the way.",
    descriptionAr:
      "جلاخة زاوية مدمجة لقطع حديد التسليح والبلاط وتجليخ اللحامات وتنظيف الحديد. تأتي بغطاء واقٍ، ويجب إبقاؤه مركّباً وموجّهاً بين القرص والمشغّل. معظم إصابات الجلاخة تقع لمن نزعوا الغطاء لأنه كان يعيقهم.",
    price: 18.5,
    qty: 62,
    delivery: 0.3,
    attributes: { discMm: 115, powerW: 750, rpm: 11000, includes: "Guard, side handle, spanner", warranty: "1 year" }
  },
  {
    sku: "TOL-MIX-CNT",
    cat: "power-tools",
    unit: "piece",
    nameEn: "Concrete Mixer 140 L — Electric, Tilting Drum",
    nameAr: "خلاطة خرسانة 140 لتر — كهربائية بحوض مائل",
    descriptionEn:
      "Portable tilting-drum mixer for small pours, mortar and screed. Put the water and half the aggregate in first, then cement, then the rest — loading cement into a dry empty drum bakes it onto the blades and you lose an hour chipping it off.",
    descriptionAr:
      "خلاطة نقّالة بحوض مائل للصبّات الصغيرة والمونة والصبّة الرقيقة. يُوضع الماء ونصف الحصى أولاً ثم الإسمنت ثم الباقي، فتحميل الإسمنت في حوض جاف فارغ يجعله يلتصق بالريش وتضيع ساعة في كشطه.",
    price: 185.0,
    qty: 14,
    delivery: 5.0,
    attributes: { capacityL: 140, powerW: 550, voltage: "220-240 V", drum: "Tilting steel", warranty: "1 year" }
  },
  {
    sku: "TOL-SAW-CIR",
    cat: "power-tools",
    unit: "piece",
    nameEn: "Circular Saw 185 mm — 1400 W",
    nameAr: "منشار دائري 185 مم — 1400 واط",
    descriptionEn:
      "Circular saw with an adjustable depth and bevel base, for cutting formwork ply, battens and boards. Set the blade depth to about 5 mm below the material — a fully extended blade is more dangerous and gives a rougher cut, not a faster one.",
    descriptionAr:
      "منشار دائري بقاعدة قابلة لضبط العمق والميل، لقص أبلكاش الشدة والعروق والألواح. يُضبط عمق النصل على نحو 5 مم تحت سماكة المادة، فالنصل الممتد بالكامل أخطر ويعطي قطعاً أخشن لا أسرع.",
    price: 34.0,
    qty: 28,
    delivery: 0.5,
    attributes: { bladeMm: 185, powerW: 1400, maxCutMm: 65, bevel: "0–45°", warranty: "1 year" }
  },
  {
    sku: "TOL-VIB-POK",
    cat: "power-tools",
    unit: "set",
    nameEn: "Concrete Poker Vibrator — 1.5 kW with 4 m Hose",
    nameAr: "هزّاز خرسانة — 1.5 كيلوواط مع خرطوم 4 م",
    descriptionEn:
      "Electric poker vibrator with a flexible shaft and 38 mm head, for compacting columns, beams and slabs. Insert vertically, hold for five to ten seconds, and withdraw slowly. Dragging the poker sideways to move concrete around segregates the mix and is one of the fastest ways to weaken a pour.",
    descriptionAr:
      "هزّاز كهربائي بعمود مرن ورأس 38 مم لدمك الأعمدة والجسور والأسقف. يُغرز رأسياً ويُترك من خمس إلى عشر ثوانٍ ثم يُسحب ببطء. جرّ الهزّاز جانبياً لتحريك الخرسانة يفصل مكوّنات الخلطة وهو من أسرع الطرق لإضعاف الصبّة.",
    price: 78.0,
    qty: 18,
    delivery: 1.5,
    attributes: { powerKw: 1.5, headMm: 38, hoseM: 4, voltage: "220-240 V", warranty: "1 year" }
  },

  // ── Ladders & scaffolding ─────────────────────────────────────────────────
  {
    sku: "EQP-LAD-6",
    cat: "ladders-scaffolding",
    unit: "piece",
    nameEn: "Aluminium Step Ladder 6 ft — 5 Tread",
    nameAr: "سلم ألمنيوم درج 6 أقدام — 5 درجات",
    descriptionEn:
      "Self-supporting A-frame step ladder with a top platform and locking stays. Do not stand on the top two treads — that is not a warning label being cautious, it is where the ladder's base becomes narrower than the person on it.",
    descriptionAr:
      "سلم درج ذاتي الاتزان على شكل A بمنصة علوية ودعامات قفل. لا يُوقف على أعلى درجتين، وهذه ليست ملصق تحذير مبالغاً فيه بل هي النقطة التي تصبح فيها قاعدة السلم أضيق من الواقف عليه.",
    price: 22.5,
    qty: 44,
    delivery: 1.0,
    attributes: { heightFt: 6, treads: 5, material: "Aluminium", maxLoadKg: 120, standard: "EN 131" }
  },
  {
    sku: "EQP-SCF-FRM",
    cat: "ladders-scaffolding",
    unit: "piece",
    nameEn: "Scaffolding Frame 1.7 × 1.2 m — Galvanised",
    nameAr: "إطار سقالة 1.7 × 1.2 م — مجلفن",
    descriptionEn:
      "Galvanised H-frame scaffold section for facade work, plastering and painting. Braces, base plates and planks are ordered separately. Always erect on a firm level base with base plates — timber packing under one leg is how a tower goes over.",
    descriptionAr:
      "إطار سقالة مجلفن على شكل H لأعمال الواجهات والبياض والدهان. تُطلب الدعامات والقواعد والألواح منفصلة. تُقام دائماً على قاعدة صلبة مستوية مع صفائح قاعدة، فحشو خشب تحت قائم واحد هو سبب انقلاب البرج.",
    price: 14.0,
    qty: 120,
    delivery: 0.8,
    attributes: { size: "1700 × 1200 mm", finish: "Hot-dip galvanised", type: "H-frame", weightKg: 14 }
  },
  {
    sku: "EQP-PRP-3",
    cat: "ladders-scaffolding",
    unit: "piece",
    nameEn: "Adjustable Steel Prop 2.0–3.5 m",
    nameAr: "دعامة حديد قابلة للضبط 2.0–3.5 م",
    descriptionEn:
      "Telescopic steel prop for supporting slab formwork and temporary works. Props carry load only when plumb: a leaning prop takes a fraction of its rated capacity, which is why a leaning one is not a prop at all.",
    descriptionAr:
      "دعامة حديد تلسكوبية لإسناد شدة الأسقف والأعمال المؤقتة. الدعامات تحمل الأحمال وهي رأسية تماماً، فالدعامة المائلة تتحمل جزءاً يسيراً من سعتها المقنّنة، ولهذا فالمائلة ليست دعامة أصلاً.",
    price: 7.5,
    qty: 260,
    delivery: 0.4,
    attributes: { rangeM: "2.0–3.5", loadKn: 20, finish: "Painted", weightKg: 13 }
  },

  // ── Safety equipment ──────────────────────────────────────────────────────
  {
    sku: "SAF-HLM-STD",
    cat: "safety-equipment",
    unit: "piece",
    nameEn: "Safety Helmet — Ratchet Harness, White",
    nameAr: "خوذة أمان — بنظام ربط دوّار أبيض",
    descriptionEn:
      "HDPE hard hat with a six-point ratchet harness and a sweatband. The gap between shell and harness is the part that actually absorbs an impact — never carry things inside the helmet or crush the harness flat to store it.",
    descriptionAr:
      "خوذة من البولي إيثيلين عالي الكثافة بنظام ربط دوّار سداسي النقاط وشريط عرق. الفراغ بين القشرة ونظام الربط هو ما يمتص الصدمة فعلياً، فلا تُوضع أشياء داخل الخوذة ولا يُضغط نظام الربط لتخزينها.",
    price: 1.95,
    qty: 320,
    delivery: 0.0,
    attributes: { material: "HDPE", harness: "6-point ratchet", standard: "EN 397", colours: "White / Yellow / Blue" }
  },
  {
    sku: "SAF-GLV-LTH",
    cat: "safety-equipment",
    unit: "set",
    nameEn: "Leather Work Gloves — Pair",
    nameAr: "قفازات عمل جلدية — زوج",
    descriptionEn:
      "Split-leather palm gloves with a reinforced thumb crotch, for handling block, rebar, timber and steel sections. Not suitable for chemical handling or for use near rotating machinery, where a glove can be caught and pull the hand in.",
    descriptionAr:
      "قفازات براحة من الجلد المشقوق بتقوية عند أصل الإبهام، لمناولة البلوك وحديد التسليح والأخشاب والقطاعات الحديدية. غير مناسبة للتعامل مع المواد الكيميائية ولا للعمل قرب الآلات الدوّارة حيث قد يعلق القفاز ويسحب اليد.",
    price: 0.85,
    qty: 540,
    delivery: 0.0,
    attributes: { material: "Split leather", quantity: "1 pair", standard: "EN 388" }
  },
  {
    sku: "SAF-BOT-STL",
    cat: "safety-equipment",
    unit: "set",
    nameEn: "Safety Boots — Steel Toe & Midsole, S3",
    nameAr: "حذاء أمان — مقدمة ونعل فولاذي S3",
    descriptionEn:
      "S3 rated safety boots with a steel toe cap, steel penetration-resistant midsole, oil-resistant sole and water-resistant upper. The midsole is what stops a nail in a discarded piece of formwork going through the foot — a toe cap alone does not.",
    descriptionAr:
      "حذاء أمان بتصنيف S3 بمقدمة فولاذية ونعل أوسط فولاذي مقاوم للاختراق ونعل مقاوم للزيوت ووجه مقاوم للماء. النعل الأوسط هو ما يمنع مسماراً في قطعة شدة مهملة من اختراق القدم، ولا تفعل المقدمة الفولاذية ذلك وحدها.",
    price: 9.5,
    qty: 180,
    delivery: 0.1,
    attributes: { rating: "S3", toe: "Steel cap 200 J", midsole: "Steel", sizes: "39–46", standard: "EN ISO 20345" }
  },
  {
    sku: "SAF-VST-HIV",
    cat: "safety-equipment",
    unit: "piece",
    nameEn: "Hi-Vis Safety Vest — Class 2, Orange",
    nameAr: "سترة أمان عاكسة — فئة 2 برتقالية",
    descriptionEn:
      "Fluorescent polyester vest with reflective bands, for site, roadside and yard work. Fluorescent fabric works in daylight and reflective tape works under headlights — a vest needs both, which is what the class rating certifies.",
    descriptionAr:
      "سترة بوليستر فلورية بأشرطة عاكسة، للمواقع وجوانب الطرق وساحات العمل. القماش الفلوري يعمل في ضوء النهار والشريط العاكس يعمل تحت أضواء المركبات، والسترة تحتاجهما معاً، وهذا ما يشهد به تصنيف الفئة.",
    price: 1.65,
    qty: 420,
    delivery: 0.0,
    attributes: { class: "Class 2", material: "Polyester", standard: "EN ISO 20471", colours: "Orange / Yellow" }
  },
  {
    sku: "SAF-GOG-CLR",
    cat: "safety-equipment",
    unit: "piece",
    nameEn: "Safety Goggles — Clear, Anti-Fog",
    nameAr: "نظارة حماية — شفافة مقاومة للضباب",
    descriptionEn:
      "Sealed polycarbonate goggles with indirect venting and an anti-fog coating, for grinding, chiselling and drilling overhead. Goggles seal around the eye; open safety glasses do not, and dust in Oman arrives from every direction.",
    descriptionAr:
      "نظارة بولي كربونات محكمة بتهوية غير مباشرة وطبقة مقاومة للضباب، للتجليخ والنحت والثقب فوق الرأس. النظارة المحكمة تُغلق حول العين، أما نظارات الأمان المفتوحة فلا، والغبار في عُمان يأتي من كل اتجاه.",
    price: 1.2,
    qty: 300,
    delivery: 0.0,
    attributes: { lens: "Polycarbonate clear", coating: "Anti-fog", venting: "Indirect", standard: "EN 166" }
  },

  // ── Formwork timber ───────────────────────────────────────────────────────
  {
    sku: "TMB-FRM-PLY",
    cat: "formwork-timber",
    unit: "piece",
    nameEn: "Film-Faced Formwork Plywood 18 mm — 2.44 × 1.22 m",
    nameAr: "أبلكاش شدة مغلّف 18 مم — 2.44 × 1.22 م",
    descriptionEn:
      "Phenolic film-faced plywood for concrete formwork, giving a smooth off-form finish and roughly 8–12 reuses if edges are sealed after cutting. Sealing the cut edge is what decides whether a sheet lasts two pours or ten.",
    descriptionAr:
      "أبلكاش مغلّف بطبقة فينولية لشدّات الخرسانة، يعطي تشطيباً أملس مباشراً ويُعاد استخدامه نحو 8 إلى 12 مرة إذا أُغلقت حوافه بعد القص. إغلاق حافة القص هو ما يحدد إن كان اللوح سيعمر صبّتين أم عشراً.",
    price: 12.5,
    qty: 220,
    delivery: 0.8,
    attributes: { thicknessMm: 18, sheet: "2440 × 1220 mm", facing: "Phenolic film", reuses: "8–12", weightKg: 32 }
  },
  {
    sku: "TMB-BTN-2X4",
    cat: "formwork-timber",
    unit: "piece",
    nameEn: 'Timber Batten 2" × 4" × 12 ft',
    nameAr: "عرق خشب 2 × 4 بوصة × 12 قدم",
    descriptionEn:
      "Sawn softwood batten for formwork bearers, soldiers, bracing and general site carpentry. Supplied rough sawn and unseasoned; sort and stack it flat on arrival, because battens left in a heap in the sun twist and become useless for straight work.",
    descriptionAr:
      "عرق خشب لين منشور لعوارض الشدة والقوائم والتدعيم وأعمال النجارة العامة في الموقع. يُورّد منشوراً خشناً وغير مجفف، ويُفرز ويُرصّ مستوياً فور وصوله، فالعروق المتروكة كومة تحت الشمس تلتوي وتصبح غير صالحة للأعمال المستقيمة.",
    price: 3.8,
    qty: 480,
    delivery: 0.3,
    attributes: { section: '2" × 4"', lengthFt: 12, grade: "Rough sawn softwood", use: "Formwork & carpentry" }
  },

  // ── Panel boards ──────────────────────────────────────────────────────────
  {
    sku: "TMB-PLY-12",
    cat: "panel-boards",
    unit: "piece",
    nameEn: "Commercial Plywood 12 mm — 2.44 × 1.22 m",
    nameAr: "أبلكاش تجاري 12 مم — 2.44 × 1.22 م",
    descriptionEn:
      "General-purpose interior plywood for partitions, backing boards, shelving and shop fitting. Interior grade only — the glue line is not water resistant, so a sheet used outdoors or in a wet area delaminates within a season.",
    descriptionAr:
      "أبلكاش داخلي متعدد الاستخدامات للقواطع والألواح الخلفية والأرفف وتجهيز المحلات. درجة داخلية فقط، فخط الغراء غير مقاوم للماء، واللوح المستخدم خارجياً أو في منطقة رطبة تنفصل طبقاته خلال موسم.",
    price: 9.8,
    qty: 190,
    delivery: 0.7,
    attributes: { thicknessMm: 12, sheet: "2440 × 1220 mm", grade: "Interior / commercial", plies: 7 }
  },
  {
    sku: "TMB-MDF-18",
    cat: "panel-boards",
    unit: "piece",
    nameEn: "MDF Board 18 mm — 2.44 × 1.22 m",
    nameAr: "لوح MDF بسماكة 18 مم — 2.44 × 1.22 م",
    descriptionEn:
      "Medium-density fibreboard for cabinets, wardrobes, skirting and painted joinery. Cuts and routs to a clean edge that takes paint beautifully, but it has no water resistance at all — a swollen MDF cabinet base never recovers.",
    descriptionAr:
      "لوح ألياف متوسط الكثافة للخزائن والدواليب والوزرات وأعمال النجارة المدهونة. يُقصّ ويُفرز بحافة نظيفة تستقبل الدهان بشكل ممتاز، لكنه لا يقاوم الماء إطلاقاً، وقاعدة خزانة MDF منتفخة لا تعود لحالها أبداً.",
    price: 11.5,
    qty: 150,
    delivery: 0.7,
    attributes: { thicknessMm: 18, sheet: "2440 × 1220 mm", density: "720 kg/m³", waterResistant: false }
  },
  {
    sku: "TMB-GYP-12",
    cat: "panel-boards",
    unit: "piece",
    nameEn: "Gypsum Board 12.5 mm — 2.44 × 1.22 m",
    nameAr: "لوح جبس 12.5 مم — 2.44 × 1.22 م",
    descriptionEn:
      "Standard plasterboard for suspended ceilings and stud partitions. Fix with the tapered edges together so the joint tape sits below the board face — butting two cut edges leaves a ridge that shows through the paint for the life of the ceiling.",
    descriptionAr:
      "لوح جبس قياسي للأسقف المستعارة والقواطع الجافة. يُثبّت بحيث تلتقي الحواف المشطوفة معاً ليجلس شريط الوصلة أسفل مستوى وجه اللوح، فالتقاء حافتي قص يترك نتوءاً يظهر عبر الدهان طوال عمر السقف.",
    price: 3.45,
    qty: 420,
    delivery: 0.4,
    attributes: { thicknessMm: 12.5, sheet: "2440 × 1220 mm", edge: "Tapered", type: "Standard (non fire-rated)" }
  },

  // ── Nails & fasteners ─────────────────────────────────────────────────────
  {
    sku: "FST-NAL-3",
    cat: "fasteners",
    unit: "kilogram",
    nameEn: 'Common Wire Nails 3" — per kg',
    nameAr: "مسامير عادية 3 بوصات — للكيلوغرام",
    descriptionEn:
      "Bright steel wire nails for formwork, battens and general carpentry, sold loose by weight. Bright finish is for temporary and internal work only — outdoors they rust and bleed a brown stain down the timber within weeks.",
    descriptionAr:
      "مسامير حديد لامعة لأعمال الشدة والعروق والنجارة العامة، تُباع سائبة بالوزن. التشطيب اللامع للأعمال المؤقتة والداخلية فقط، أما في الخارج فتصدأ وتترك أثراً بنياً ينزل على الخشب خلال أسابيع.",
    price: 0.75,
    qty: 600,
    delivery: 0.0,
    attributes: { lengthInch: 3, finish: "Bright steel", soldBy: "Weight", use: "Formwork & carpentry" }
  },
  {
    sku: "FST-SCR-DRY",
    cat: "fasteners",
    unit: "box",
    nameEn: 'Drywall Screws 1" — Box of 1,000',
    nameAr: "براغي جبس 1 بوصة — علبة 1000 حبة",
    descriptionEn:
      "Phosphate-coated bugle-head screws for fixing gypsum board to metal studs. The bugle head sinks just below the paper without tearing it — driven too deep it tears through and the fixing holds nothing at all.",
    descriptionAr:
      "براغي برأس بوقي بطلاء فوسفاتي لتثبيت ألواح الجبس على القوائم المعدنية. الرأس البوقي يغوص أسفل الورق مباشرة دون تمزيقه، وإذا دُقّ أعمق من اللازم مزّق الورق ولم يعد التثبيت يمسك شيئاً.",
    price: 2.4,
    qty: 280,
    delivery: 0.05,
    attributes: { lengthInch: 1, head: "Bugle", drive: "Phillips #2", quantity: 1000, coating: "Phosphate" }
  },
  {
    sku: "FST-ANC-M10",
    cat: "fasteners",
    unit: "piece",
    nameEn: "Wedge Anchor M10 × 100 mm — Galvanised",
    nameAr: "مسمار تثبيت إسفيني M10 × 100 مم — مجلفن",
    descriptionEn:
      "Through-fixing expansion anchor for concrete: machine bases, steel brackets, handrails and gate posts. Drill the hole to the exact diameter and blow the dust out — an anchor set in a dusty hole holds a fraction of its rated load.",
    descriptionAr:
      "مسمار تمدد يُثبّت بالاختراق في الخرسانة، لقواعد الماكينات والكوابيل الحديدية والدرابزينات وقوائم البوابات. يُثقب بالقطر المطابق تماماً ويُنفخ الغبار خارج الثقب، فالمسمار المثبت في ثقب مغبّر يتحمل جزءاً يسيراً من حمله المقنّن.",
    price: 0.38,
    qty: 1500,
    delivery: 0.0,
    attributes: { size: "M10 × 100 mm", material: "Zinc plated steel", baseMaterial: "Concrete", drillMm: 10 }
  },
  {
    sku: "FST-TIE-WIR",
    cat: "fasteners",
    unit: "kilogram",
    nameEn: "Rebar Binding Wire 1.2 mm — per kg",
    nameAr: "سلك ربط حديد التسليح 1.2 مم — للكيلوغرام",
    descriptionEn:
      "Annealed soft steel wire for tying reinforcement cages and mesh. Soft enough to twist tight by hand or with a tying tool and stay tied while the concrete is placed — hard wire springs back and the cage moves under the pour.",
    descriptionAr:
      "سلك حديد طري مُلدّن لربط أقفاص التسليح والشبك. طري بما يكفي ليُبرم بإحكام باليد أو بأداة ربط ويبقى مربوطاً أثناء الصب، أما السلك القاسي فيرتد ويتحرك القفص تحت الصبّة.",
    price: 0.95,
    qty: 450,
    delivery: 0.0,
    attributes: { diameterMm: 1.2, material: "Annealed soft steel", soldBy: "Weight", use: "Rebar tying" }
  }
];
