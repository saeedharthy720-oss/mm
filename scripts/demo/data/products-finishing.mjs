// Finishing departments: electrical & lighting, paints & waterproofing,
// tiles & stone. Same record shape as products-structural.mjs.

export const FINISHING_PRODUCTS = [
  // ── Cables & conduit ──────────────────────────────────────────────────────
  {
    sku: "ELC-CBL-15",
    cat: "cables-conduit",
    unit: "roll",
    nameEn: "Single-Core Copper Cable 1.5 mm² — 100 m Roll",
    nameAr: "كابل نحاس أحادي 1.5 مم² — لفة 100 متر",
    descriptionEn:
      "PVC-insulated single-core copper cable for lighting circuits and control wiring. Full-section copper, not copper-clad aluminium — check the weight of the roll if in doubt, because an undersized conductor runs hot inside a conduit where nobody can see it. Available in red, black, blue, yellow-green and brown.",
    descriptionAr:
      "كابل نحاس أحادي الموصّل بعزل PVC لدوائر الإنارة وأسلاك التحكم. نحاس كامل المقطع وليس ألمنيوم مطلي بالنحاس، وعند الشك يُوزن اللفّ، فالموصّل الأصغر من المطلوب يسخن داخل الماسورة حيث لا يراه أحد. متوفر بالأحمر والأسود والأزرق والأصفر-الأخضر والبني.",
    price: 9.5,
    qty: 180,
    delivery: 0.2,
    attributes: { sizeMm2: 1.5, lengthM: 100, conductor: "Annealed copper", insulation: "PVC 450/750 V", standard: "BS 6004", colours: "Red / Black / Blue / Green-Yellow / Brown" }
  },
  {
    sku: "ELC-CBL-25",
    cat: "cables-conduit",
    unit: "roll",
    nameEn: "Single-Core Copper Cable 2.5 mm² — 100 m Roll",
    nameAr: "كابل نحاس أحادي 2.5 مم² — لفة 100 متر",
    descriptionEn:
      "The standard socket-circuit size for homes and offices, also used for small fixed appliances. One roll typically wires the power circuits of two to three rooms including the earth conductor.",
    descriptionAr:
      "المقاس القياسي لدوائر الأفياش في المنازل والمكاتب، ويُستخدم أيضاً للأجهزة الثابتة الصغيرة. اللفة الواحدة تكفي عادة لتمديد دوائر القدرة لغرفتين إلى ثلاث بما فيها موصّل التأريض.",
    price: 14.5,
    qty: 210,
    delivery: 0.25,
    attributes: { sizeMm2: 2.5, lengthM: 100, conductor: "Annealed copper", insulation: "PVC 450/750 V", standard: "BS 6004" }
  },
  {
    sku: "ELC-CBL-40",
    cat: "cables-conduit",
    unit: "roll",
    nameEn: "Single-Core Copper Cable 4 mm² — 100 m Roll",
    nameAr: "كابل نحاس أحادي 4 مم² — لفة 100 متر",
    descriptionEn:
      "Heavier conductor for water heaters, oven circuits, sub-main runs to an outbuilding and long cable routes where voltage drop matters. On a run over about 30 m, stepping up one size is cheaper than living with dim lights and a struggling motor.",
    descriptionAr:
      "موصّل أثقل لسخانات المياه ودوائر الأفران والتغذيات الفرعية للملاحق والمسارات الطويلة التي يهم فيها هبوط الجهد. في مسار يتجاوز 30 متراً تقريباً، الترقية مقاساً واحداً أرخص من تحمّل إنارة خافتة ومحرك يجهد.",
    price: 22.0,
    qty: 140,
    delivery: 0.3,
    attributes: { sizeMm2: 4, lengthM: 100, conductor: "Annealed copper", insulation: "PVC 450/750 V", standard: "BS 6004" }
  },
  {
    sku: "ELC-CND-20",
    cat: "cables-conduit",
    unit: "piece",
    nameEn: "PVC Electrical Conduit 20 mm × 3 m — Heavy Gauge",
    nameAr: "ماسورة كهرباء PVC 20 مم × 3 م — سماكة ثقيلة",
    descriptionEn:
      "Rigid heavy-gauge conduit for chasing into block walls and casting into slabs. Heavy gauge resists being crushed by a careless trowel or a passing wheelbarrow before the concrete goes off — the moment when light conduit collapses and the wire can never be drawn through.",
    descriptionAr:
      "ماسورة صلبة بسماكة ثقيلة للتخديد في جدران البلوك والصب داخل الأسقف. السماكة الثقيلة تقاوم الانسحاق تحت مالج غير منتبه أو عربة يد عابرة قبل شك الخرسانة، وهي اللحظة التي تنهار فيها الماسورة الخفيفة فيستحيل سحب السلك لاحقاً.",
    price: 0.45,
    qty: 1600,
    delivery: 0.0,
    attributes: { diameterMm: 20, lengthM: 3, gauge: "Heavy", material: "uPVC", standard: "BS EN 61386" }
  },

  // ── Switches & sockets ────────────────────────────────────────────────────
  {
    sku: "ELC-SW-1G",
    cat: "switches-sockets",
    unit: "piece",
    nameEn: "Light Switch 1 Gang 2 Way — 10 A, White",
    nameAr: "مفتاح إضاءة مفرد ثنائي الاتجاه — 10 أمبير أبيض",
    descriptionEn:
      "Flush-mounted 10 A switch on a standard British-size plate. Two-way as standard, so the same part serves a single switch position or a pair at the two ends of a corridor or staircase without ordering a different item.",
    descriptionAr:
      "مفتاح 10 أمبير يُركّب غاطساً على لوحة بالمقاس البريطاني القياسي. ثنائي الاتجاه قياسياً، فالقطعة نفسها تخدم موضع مفتاح واحد أو زوجاً عند طرفي ممر أو درج دون الحاجة لطلب صنف مختلف.",
    price: 0.95,
    qty: 620,
    delivery: 0.0,
    attributes: { gangs: 1, way: 2, currentA: 10, plateSize: "86 × 86 mm", colour: "White", standard: "BS EN 60669" }
  },
  {
    sku: "ELC-SKT-13",
    cat: "switches-sockets",
    unit: "piece",
    nameEn: "Switched Socket 13 A — Double, White",
    nameAr: "فيش كهرباء مزدوج بمفتاح — 13 أمبير أبيض",
    descriptionEn:
      "Double 13 A switched socket with shuttered outlets that stay closed until a plug's earth pin opens them. Supplied without the back box — order the 35 mm flush box separately if it is not already cast into the wall.",
    descriptionAr:
      "فيش مزدوج 13 أمبير بمفتاح ومنافذ ذات مصاريع تبقى مغلقة حتى يفتحها سنّ التأريض في القابس. يُورّد دون العلبة الخلفية، فتُطلب علبة الغطس 35 مم منفصلة إن لم تكن مصبوبة في الجدار مسبقاً.",
    price: 1.65,
    qty: 540,
    delivery: 0.0,
    attributes: { gangs: 2, currentA: 13, shuttered: true, plateSize: "146 × 86 mm", colour: "White", standard: "BS 1363" }
  },
  {
    sku: "ELC-JB-4X4",
    cat: "switches-sockets",
    unit: "piece",
    nameEn: "PVC Junction Box 4 × 4 — Concealed",
    nameAr: "علبة كهرباء PVC مقاس 4 × 4 — غاطسة",
    descriptionEn:
      "Concealed junction box for joints and pull points in a concealed conduit system. Fitting one at every direction change makes the difference between drawing cable through in ten minutes and breaking the wall open to find where it jammed.",
    descriptionAr:
      "علبة تفريع غاطسة للوصلات ونقاط السحب في شبكة المواسير المخفية. تركيب علبة عند كل تغيير اتجاه هو الفرق بين سحب الكابل في عشر دقائق وبين كسر الجدار لمعرفة أين علق.",
    price: 0.28,
    qty: 1250,
    delivery: 0.0,
    attributes: { size: "4 × 4 inch", material: "PVC", type: "Concealed", knockouts: 8 }
  },

  // ── Panels & breakers ─────────────────────────────────────────────────────
  {
    sku: "ELC-DB-12",
    cat: "panels-breakers",
    unit: "piece",
    nameEn: "Distribution Board 12 Way — Flush, with Busbar",
    nameAr: "لوحة توزيع كهرباء 12 خط — غاطسة مع قضيب توصيل",
    descriptionEn:
      "Twelve-way consumer unit with main switch position, copper busbar, neutral and earth bars and a hinged door. Breakers are not included — specify them per circuit. Leave at least two spare ways: every villa eventually adds a circuit nobody planned for.",
    descriptionAr:
      "لوحة توزيع بـ12 خطاً مع موضع للقاطع الرئيسي وقضيب نحاسي وبارات للحيادي والأرضي وباب مفصلي. القواطع غير مشمولة وتُحدّد حسب كل دائرة. يُترك خطان احتياطيان على الأقل، فكل فيلا تضيف في النهاية دائرة لم يخطط لها أحد.",
    price: 18.5,
    qty: 45,
    delivery: 0.4,
    attributes: { ways: 12, mounting: "Flush", busbar: "Copper", ipRating: "IP30", standard: "IEC 61439-3" }
  },
  {
    sku: "ELC-MCB-32",
    cat: "panels-breakers",
    unit: "piece",
    nameEn: "MCB 32 A Single Pole — Type C, 6 kA",
    nameAr: "قاطع كهربائي 32 أمبير أحادي القطب — نوع C سعة 6 كيلو أمبير",
    descriptionEn:
      "Miniature circuit breaker for socket and appliance circuits. Type C tolerates the brief inrush of motors and transformers without nuisance tripping, which is why it suits air-conditioning and pump circuits better than Type B.",
    descriptionAr:
      "قاطع مصغّر لدوائر الأفياش والأجهزة. النوع C يتحمل تيار الاندفاع اللحظي للمحركات والمحوّلات دون فصل مزعج، ولهذا يناسب دوائر التكييف والمضخات أكثر من النوع B.",
    price: 2.1,
    qty: 320,
    delivery: 0.0,
    attributes: { currentA: 32, poles: 1, curve: "C", breakingCapacity: "6 kA", standard: "IEC 60898" }
  },
  {
    sku: "ELC-RCD-63",
    cat: "panels-breakers",
    unit: "piece",
    nameEn: "RCCB 63 A 30 mA — Double Pole",
    nameAr: "قاطع تسريب أرضي 63 أمبير 30 مللي أمبير — ثنائي القطب",
    descriptionEn:
      "Residual current device that disconnects the supply within milliseconds of current leaking to earth — through wet tiling, damaged insulation or a person. At 30 mA it is the sensitivity intended for personal protection, and it belongs on every bathroom, kitchen and outdoor circuit.",
    descriptionAr:
      "قاطع تيار متبقٍّ يفصل التغذية خلال أجزاء من الثانية عند تسرب التيار إلى الأرض عبر بلاط مبلل أو عزل تالف أو جسم إنسان. حساسية 30 مللي أمبير هي المخصصة لحماية الأشخاص، ومكانها كل دائرة حمام ومطبخ وخارجية.",
    price: 12.8,
    qty: 85,
    delivery: 0.0,
    attributes: { currentA: 63, sensitivityMa: 30, poles: 2, type: "AC", standard: "IEC 61008" }
  },

  // ── LED lighting ──────────────────────────────────────────────────────────
  {
    sku: "LGT-DWN-12",
    cat: "led-lighting",
    unit: "piece",
    nameEn: "LED Downlight 12 W — Recessed, 3 CCT Selectable",
    nameAr: "سبوت لايت LED 12 واط — غاطس بثلاث درجات إضاءة",
    descriptionEn:
      "Recessed ceiling downlight with a switch on the body for warm, neutral or daylight colour temperature, so the same stock item suits a bedroom or a kitchen. Cut-out 90 mm. Driver included and mounted on the fitting.",
    descriptionAr:
      "سبوت سقفي غاطس بمفتاح على الجسم لاختيار الإضاءة الدافئة أو المحايدة أو النهارية، فالصنف نفسه يناسب غرفة نوم أو مطبخاً. فتحة التركيب 90 مم. المحوّل مرفق ومثبت على الوحدة.",
    price: 1.85,
    qty: 480,
    delivery: 0.0,
    attributes: { powerW: 12, cutoutMm: 90, cct: "3000K / 4000K / 6500K", lumens: 1080, warranty: "2 years" }
  },
  {
    sku: "LGT-FLD-50",
    cat: "led-lighting",
    unit: "piece",
    nameEn: "LED Flood Light 50 W — IP66 Outdoor",
    nameAr: "كشاف LED 50 واط — مقاوم للماء IP66",
    descriptionEn:
      "Sealed die-cast aluminium floodlight for yards, car parks, facades and site lighting. IP66 means it survives driven rain and hose-down cleaning; the body doubles as the heatsink, so it must not be boxed in behind a closed fascia.",
    descriptionAr:
      "كشاف مغلق من الألمنيوم المصبوب لساحات المنازل والمواقف والواجهات وإضاءة المواقع. تصنيف IP66 يعني تحمّله المطر المدفوع بالرياح والغسل بالخرطوم، وجسمه يعمل كمشتت حراري فلا يجوز حجزه خلف واجهة مغلقة.",
    price: 6.9,
    qty: 160,
    delivery: 0.1,
    attributes: { powerW: 50, ipRating: "IP66", lumens: 4500, cct: "6500K", body: "Die-cast aluminium", warranty: "2 years" }
  },
  {
    sku: "LGT-BAT-40",
    cat: "led-lighting",
    unit: "piece",
    nameEn: "LED Batten 40 W — 4 ft Surface Mounted",
    nameAr: "وحدة إنارة LED 40 واط — 4 أقدام سطحية",
    descriptionEn:
      "Surface-mounted linear batten for corridors, stores, workshops and parking. Replaces the old twin fluorescent tube fitting with no ballast, no starter and nothing to flicker at the end of its life.",
    descriptionAr:
      "وحدة إنارة خطية تُركّب على السطح للممرات والمخازن والورش والمواقف. تحل محل وحدة الفلورسنت المزدوجة القديمة دون بالاست ولا مشعل ودون أي وميض في نهاية عمرها.",
    price: 4.3,
    qty: 220,
    delivery: 0.05,
    attributes: { powerW: 40, lengthMm: 1200, lumens: 3600, cct: "6500K", warranty: "2 years" }
  },
  {
    sku: "LGT-BLB-9",
    cat: "led-lighting",
    unit: "piece",
    nameEn: "LED Bulb 9 W — E27 Screw Cap",
    nameAr: "لمبة LED 9 واط — قاعدة لولبية E27",
    descriptionEn:
      "Standard screw-cap LED lamp, roughly the light of an old 75 W incandescent for about an eighth of the electricity. Not dimmable — on a dimmer circuit it will buzz and flicker rather than dim.",
    descriptionAr:
      "لمبة LED بقاعدة لولبية قياسية تعطي إضاءة تعادل لمبة متوهجة 75 واط تقريباً بثُمن استهلاك الكهرباء. غير قابلة للتعتيم، وعلى دائرة ديمر ستصدر طنيناً ووميضاً بدل أن تخفت.",
    price: 0.65,
    qty: 900,
    delivery: 0.0,
    attributes: { powerW: 9, cap: "E27", lumens: 810, cct: "6500K", dimmable: false }
  },

  // ── Interior paints ───────────────────────────────────────────────────────
  {
    sku: "PNT-INT-EMU18",
    cat: "interior-paints",
    unit: "piece",
    nameEn: "Interior Emulsion Paint — 18 L Pail, Matt White",
    nameAr: "دهان داخلي إيمولشن — دلو 18 لتر أبيض مطفي",
    descriptionEn:
      "Water-based acrylic emulsion for interior walls and ceilings with a flat matt finish that hides minor surface imperfections rather than highlighting them. Coverage is roughly 10–12 m² per litre per coat on primed plaster; two coats over a primer is the standard specification.",
    descriptionAr:
      "دهان أكريليك مائي للجدران والأسقف الداخلية بتشطيب مطفي يخفي عيوب السطح البسيطة بدل إبرازها. التغطية نحو 10–12 م² للتر في الطبقة الواحدة على بياض مؤسس، والمواصفة المعتادة طبقتان فوق طبقة أساس.",
    price: 16.5,
    qty: 95,
    delivery: 0.5,
    attributes: { volumeL: 18, finish: "Matt", base: "Acrylic emulsion", coverage: "10–12 m²/L/coat", tintable: true, voc: "Low" }
  },
  {
    sku: "PNT-INT-PRM18",
    cat: "interior-paints",
    unit: "piece",
    nameEn: "Interior Primer / Sealer — 18 L Pail",
    nameAr: "دهان أساس داخلي (برايمر) — دلو 18 لتر",
    descriptionEn:
      "Alkali-resistant primer that seals fresh plaster and putty before the topcoat. Skipping it is the most common reason a new villa's paint goes patchy within a year: the wall drinks the topcoat unevenly and no number of extra coats fixes the cause.",
    descriptionAr:
      "دهان أساس مقاوم للقلويات يغلق مسام البياض والمعجون الجديد قبل الطبقة النهائية. تخطّيه هو السبب الأشيع في تبقّع دهان فيلا جديدة خلال سنة، إذ يمتص الجدار الطبقة النهائية بتفاوت ولا تعالج الطبقات الإضافية السبب.",
    price: 12.5,
    qty: 88,
    delivery: 0.5,
    attributes: { volumeL: 18, type: "Alkali-resistant primer", base: "Water-based", coverage: "9–11 m²/L" }
  },
  {
    sku: "PNT-PUT-20",
    cat: "interior-paints",
    unit: "bag",
    nameEn: "Wall Putty — 20 kg Bag",
    nameAr: "معجون جدران — كيس 20 كجم",
    descriptionEn:
      "White cement-based skim putty that levels plaster and gives the smooth closed surface paint needs. Applied in two thin passes and sanded; a single thick pass traps moisture and debonds in sheets months later.",
    descriptionAr:
      "معجون تسوية أبيض أساسه الإسمنت يعالج تعرّجات البياض ويمنح السطح الأملس المغلق الذي يحتاجه الدهان. يُطبّق على طبقتين رفيعتين ثم يُصنفر، أما الطبقة السميكة الواحدة فتحبس الرطوبة وتنفصل على هيئة ألواح بعد أشهر.",
    price: 4.8,
    qty: 240,
    delivery: 0.1,
    attributes: { weightKg: 20, base: "White cement", coverage: "12–14 m² per bag (2 coats)", colour: "White" }
  },

  // ── Exterior paints ───────────────────────────────────────────────────────
  {
    sku: "PNT-EXT-WTH18",
    cat: "exterior-paints",
    unit: "piece",
    nameEn: "Exterior Weather Coat — 18 L Pail, White",
    nameAr: "دهان خارجي مقاوم للعوامل الجوية — دلو 18 لتر أبيض",
    descriptionEn:
      "100% acrylic exterior paint formulated for Gulf conditions: UV resistant, dirt resistant, and flexible enough to bridge hairline cracks without splitting. The pigment matters here — cheap exterior paint on a south elevation in Oman fades visibly inside two summers.",
    descriptionAr:
      "دهان خارجي أكريليك 100% مركّب لظروف الخليج: مقاوم للأشعة فوق البنفسجية وللاتساخ، ومرن بما يكفي لتجسير الشعيرات دون أن ينشق. الصبغة هي الفيصل هنا، فالدهان الخارجي الرخيص على واجهة جنوبية في عُمان يبهت بوضوح خلال صيفين.",
    price: 24.5,
    qty: 76,
    delivery: 0.5,
    attributes: { volumeL: 18, base: "100% acrylic", finish: "Smooth matt", coverage: "8–10 m²/L/coat", uvResistant: true, tintable: true }
  },
  {
    sku: "PNT-EXT-TEX20",
    cat: "exterior-paints",
    unit: "bag",
    nameEn: "Textured Exterior Coating — 20 kg",
    nameAr: "طلاء خارجي مزخرف (تكستشر) — 20 كجم",
    descriptionEn:
      "Thick decorative coating applied by trowel or spray to give a sand or roller texture on facades and boundary walls. The film build is heavy enough to mask uneven render, which is why it is so often specified on external walls that did not come out flat.",
    descriptionAr:
      "طلاء زخرفي سميك يُطبّق بالمالج أو الرش لإعطاء ملمس رملي أو أسطواني على الواجهات وجدران الأسوار. سماكة الطبقة كافية لإخفاء تفاوت القصارة، ولهذا يُحدَّد كثيراً على الجدران الخارجية التي لم تخرج مستوية.",
    price: 18.0,
    qty: 64,
    delivery: 0.3,
    attributes: { weightKg: 20, finish: "Textured", coverage: "3–4 m²/kg", application: "Trowel or spray", tintable: true }
  },

  // ── Waterproofing ─────────────────────────────────────────────────────────
  {
    sku: "WTP-BIT-20",
    cat: "waterproofing",
    unit: "piece",
    nameEn: "Bituminous Waterproof Coating — 20 L",
    nameAr: "عازل مائي بيتوميني — 20 لتر",
    descriptionEn:
      "Brush or spray-applied bitumen emulsion for below-ground walls, foundation faces, planters and wet-area tanking. Two coats at right angles to each other; a single coat always has thin spots along the brush direction, and water finds every one of them.",
    descriptionAr:
      "مستحلب بيتوميني يُطبّق بالفرشاة أو الرش لجدران ما تحت الأرض وأوجه الأساسات وأحواض الزراعة وعزل المناطق الرطبة. يُدهن طبقتان متعامدتان، فالطبقة الواحدة تترك دائماً مواضع رفيعة باتجاه الفرشاة، والماء يجد كل واحدة منها.",
    price: 21.0,
    qty: 58,
    delivery: 0.5,
    attributes: { volumeL: 20, base: "Bitumen emulsion", coverage: "1.5–2 m²/L per coat", application: "Below ground / wet areas" }
  },
  {
    sku: "WTP-MEM-10",
    cat: "waterproofing",
    unit: "roll",
    nameEn: "SBS Bitumen Membrane 4 mm — 10 m² Roll",
    nameAr: "رول عازل بيتوميني SBS 4 مم — 10 م²",
    descriptionEn:
      "Torch-applied modified bitumen membrane with a polyester carrier, for flat roofs, terraces and podium decks. Overlap side and end joints properly and run it up every upstand — roofs leak at junctions and parapets, almost never in the middle of a sheet.",
    descriptionAr:
      "غشاء بيتوميني معدّل يُلصق بالحرارة ويحمل حشوة بوليستر، للأسطح المستوية والتراسات وأسطح البودیوم. يُراعى تراكب الوصلات الجانبية والطرفية بشكل صحيح ورفعه على كل حاجز رأسي، فالأسطح تسرّب عند الوصلات والدرابزين لا في وسط اللوح تقريباً.",
    price: 14.5,
    qty: 120,
    delivery: 0.6,
    attributes: { thicknessMm: 4, areaM2: 10, carrier: "Polyester", application: "Torch-on", finish: "Sand / mineral" }
  },
  {
    sku: "WTP-CEM-25",
    cat: "waterproofing",
    unit: "bag",
    nameEn: "Cementitious Waterproofing — 25 kg (2-Component)",
    nameAr: "عازل مائي إسمنتي — 25 كجم (مكوّنان)",
    descriptionEn:
      "Flexible two-part cement-and-polymer coating for bathrooms, kitchens, water tanks and swimming pools. Safe with potable water once cured, and unlike bitumen it can be tiled over directly, which makes it the correct choice inside a wet room.",
    descriptionAr:
      "طلاء مرن من مكوّنين، إسمنت وبوليمر، للحمامات والمطابخ وخزانات المياه وأحواض السباحة. آمن مع مياه الشرب بعد المعالجة، وعلى خلاف البيتومين يمكن تبليطه مباشرة، ما يجعله الخيار الصحيح داخل الغرف الرطبة.",
    price: 12.0,
    qty: 130,
    delivery: 0.2,
    attributes: { weightKg: 25, components: 2, potableSafe: true, tileable: true, coverage: "1.5 kg/m² per coat" }
  },

  // ── Thermal insulation ────────────────────────────────────────────────────
  {
    sku: "INS-EPS-50",
    cat: "thermal-insulation",
    unit: "piece",
    nameEn: "EPS Insulation Board 50 mm — 1.2 × 0.6 m",
    nameAr: "لوح عزل حراري فلين 50 مم — 1.2 × 0.6 م",
    descriptionEn:
      "Expanded polystyrene board for roof insulation under screed, cavity walls and cold-room linings. Light, easy to cut with a hand saw, and dimensionally stable. Cover it promptly — EPS left in direct Omani sun goes yellow and friable on the exposed face.",
    descriptionAr:
      "لوح بوليسترين مُمدد لعزل الأسطح تحت الصبّة وللجدران المزدوجة وتبطين الغرف المبردة. خفيف وسهل القص بمنشار يدوي وثابت الأبعاد. يُغطّى سريعاً، فالفلين المتروك تحت شمس عُمان المباشرة يصفرّ ويتفتت من وجهه المكشوف.",
    price: 2.4,
    qty: 340,
    delivery: 0.1,
    attributes: { thicknessMm: 50, size: "1200 × 600 mm", density: "16 kg/m³", lambda: "0.038 W/mK", material: "EPS" }
  },
  {
    sku: "INS-FOI-RFL",
    cat: "thermal-insulation",
    unit: "roll",
    nameEn: "Reflective Foil Insulation — 1.2 × 25 m Roll",
    nameAr: "رول عزل حراري عاكس — 1.2 × 25 م",
    descriptionEn:
      "Double-sided aluminium foil with a bubble core, for roof soffits, duct wrapping and under metal sheeting. It works by reflecting radiant heat, so it needs an air gap on at least one side — pressed tight against the deck it does very little.",
    descriptionAr:
      "رقائق ألمنيوم مزدوجة الوجه بقلب فقاعي، لبطون الأسقف وتغليف مجاري التكييف وتحت الألواح المعدنية. يعمل بعكس الحرارة الإشعاعية، لذا يحتاج فراغاً هوائياً من جهة واحدة على الأقل، وإذا ضُغط ملاصقاً للسطح فلن يفعل شيئاً يُذكر.",
    price: 18.5,
    qty: 70,
    delivery: 0.3,
    attributes: { widthM: 1.2, lengthM: 25, core: "Air bubble", facing: "Double-sided aluminium", thicknessMm: 4 }
  },

  // ── Painting tools ────────────────────────────────────────────────────────
  {
    sku: "PNT-RLR-9",
    cat: "painting-tools",
    unit: "set",
    nameEn: 'Paint Roller Set 9" — Frame, Sleeve & Tray',
    nameAr: "طقم رولة دهان 9 بوصة — إطار وفرو وصينية",
    descriptionEn:
      "Nine-inch roller frame with a medium-pile sleeve and a plastic tray. Medium pile suits ordinary plastered walls; a short pile is for smooth surfaces and a long pile for textured render, and using the wrong one is why a wall comes out streaky.",
    descriptionAr:
      "إطار رولة 9 بوصة مع فرو متوسط الوبر وصينية بلاستيكية. الوبر المتوسط يناسب الجدران المبيّضة العادية، والقصير للأسطح الملساء والطويل للقصارة المزخرفة، واستخدام النوع الخطأ هو سبب خروج الجدار مخططاً.",
    price: 1.45,
    qty: 280,
    delivery: 0.0,
    attributes: { widthInch: 9, pile: "Medium", includes: "Frame, sleeve, tray" }
  },
  {
    sku: "PNT-BRS-3",
    cat: "painting-tools",
    unit: "piece",
    nameEn: 'Paint Brush 3" — Synthetic Bristle',
    nameAr: "فرشاة دهان 3 بوصة — شعيرات صناعية",
    descriptionEn:
      "Three-inch brush for cutting in around frames, skirtings and corners where a roller cannot reach. Synthetic filament holds its shape in water-based paint, where natural bristle swells and goes limp.",
    descriptionAr:
      "فرشاة 3 بوصات لتحديد الحواف حول الإطارات والوزرات والزوايا التي لا تصلها الرولة. الشعيرات الصناعية تحافظ على شكلها مع الدهانات المائية، بينما تنتفخ الشعيرات الطبيعية وترتخي.",
    price: 0.55,
    qty: 460,
    delivery: 0.0,
    attributes: { widthInch: 3, bristle: "Synthetic", use: "Water & solvent based" }
  },
  {
    sku: "PNT-TPE-MSK",
    cat: "painting-tools",
    unit: "piece",
    nameEn: 'Masking Tape 2" × 40 m',
    nameAr: "شريط لاصق للدهان 2 بوصة × 40 م",
    descriptionEn:
      "Crepe paper masking tape for protecting frames, glass and finished edges. Remove it while the paint is still slightly soft; left on a fully cured wall in Omani heat it tears the new paint off with it.",
    descriptionAr:
      "شريط لاصق من الورق المجعّد لحماية الإطارات والزجاج والحواف المنتهية. يُنزع والدهان ما زال طرياً قليلاً، فتركه على جدار جفّ تماماً في حرارة عُمان ينزع الدهان الجديد معه.",
    price: 0.4,
    qty: 700,
    delivery: 0.0,
    attributes: { widthInch: 2, lengthM: 40, material: "Crepe paper", removal: "Up to 3 days" }
  },

  // ── Floor tiles ───────────────────────────────────────────────────────────
  {
    sku: "TIL-FLR-60P",
    cat: "floor-tiles",
    unit: "custom",
    customUnit: "m²",
    nameEn: "Polished Porcelain Floor Tile 60 × 60 cm — per m²",
    nameAr: "بلاط بورسلان مصقول للأرضيات 60 × 60 سم — للمتر المربع",
    descriptionEn:
      "Full-body polished porcelain for majlis, halls and living areas. Very low water absorption and high resistance to wear, but polished porcelain is slippery when wet — it is the wrong choice for bathrooms, kitchens and any outdoor area. Order 10% extra for cuts and future repairs from the same batch.",
    descriptionAr:
      "بورسلان مصقول كامل الجسم للمجالس والصالات والمعيشة. امتصاصه للماء منخفض جداً ومقاومته للتآكل عالية، لكن البورسلان المصقول زلق عند البلل فهو خيار خاطئ للحمامات والمطابخ وأي منطقة خارجية. يُطلب 10% إضافية للقصّات وللإصلاحات المستقبلية من الدفعة نفسها.",
    price: 4.25,
    qty: 1800,
    delivery: 0.35,
    attributes: { size: "600 × 600 mm", finish: "Polished", waterAbsorption: "< 0.5%", peiRating: "PEI IV", perBox: "1.44 m² (4 pcs)" }
  },
  {
    sku: "TIL-FLR-60M",
    cat: "floor-tiles",
    unit: "custom",
    customUnit: "m²",
    nameEn: "Matt Porcelain Floor Tile 60 × 60 cm — per m²",
    nameAr: "بلاط بورسلان مطفي للأرضيات 60 × 60 سم — للمتر المربع",
    descriptionEn:
      "The same porcelain body with an unpolished matt surface: more grip underfoot, and it does not show every footprint and water mark the way a polished floor does. The sensible default for kitchens, corridors and family areas.",
    descriptionAr:
      "الجسم البورسلاني نفسه بسطح مطفي غير مصقول: تماسك أفضل تحت القدم، ولا يُظهر كل أثر قدم وبقعة ماء كما يفعل البلاط المصقول. الخيار الافتراضي المعقول للمطابخ والممرات ومناطق العائلة.",
    price: 3.9,
    qty: 2100,
    delivery: 0.35,
    attributes: { size: "600 × 600 mm", finish: "Matt", waterAbsorption: "< 0.5%", peiRating: "PEI IV", perBox: "1.44 m² (4 pcs)" }
  },
  {
    sku: "TIL-FLR-ANT",
    cat: "floor-tiles",
    unit: "custom",
    customUnit: "m²",
    nameEn: "Anti-Slip Outdoor Tile 40 × 40 cm — per m²",
    nameAr: "بلاط خارجي مانع للانزلاق 40 × 40 سم — للمتر المربع",
    descriptionEn:
      "Textured R11 rated tile for yards, pool surrounds, terraces and entrance steps. Frost is not the issue in Oman — thermal movement is, so lay outdoor tiles on a full mortar bed with no voids underneath and allow proper movement joints.",
    descriptionAr:
      "بلاط مزخرف بتصنيف R11 للساحات ومحيط المسابح والتراسات ودرجات المداخل. المشكلة في عُمان ليست الصقيع بل الحركة الحرارية، لذا يُفرش البلاط الخارجي على فراش مونة كامل دون فراغات أسفله مع ترك فواصل حركة مناسبة.",
    price: 3.5,
    qty: 950,
    delivery: 0.3,
    attributes: { size: "400 × 400 mm", slipRating: "R11", finish: "Structured", use: "External", perBox: "1.28 m² (8 pcs)" }
  },

  // ── Wall tiles ────────────────────────────────────────────────────────────
  {
    sku: "TIL-WAL-3060",
    cat: "wall-tiles",
    unit: "custom",
    customUnit: "m²",
    nameEn: "Ceramic Wall Tile 30 × 60 cm — per m²",
    nameAr: "بلاط سيراميك للجدران 30 × 60 سم — للمتر المربع",
    descriptionEn:
      "Glazed ceramic wall tile for bathrooms and kitchens, light enough to fix to a plastered block wall without slumping. Wall tiles are not rated for floors — the glaze wears through under foot traffic within months.",
    descriptionAr:
      "بلاط سيراميك مزجّج للجدران في الحمامات والمطابخ، خفيف بما يكفي للتثبيت على جدار بلوك مبيّض دون انزلاق. بلاط الجدران غير مصنّف للأرضيات، فالطبقة الزجاجية تتآكل تحت حركة الأقدام خلال أشهر.",
    price: 2.95,
    qty: 1400,
    delivery: 0.25,
    attributes: { size: "300 × 600 mm", finish: "Glossy glazed", use: "Wall only", perBox: "1.44 m² (8 pcs)" }
  },
  {
    sku: "TIL-WAL-DEC",
    cat: "wall-tiles",
    unit: "custom",
    customUnit: "m²",
    nameEn: "Decorative Feature Tile 25 × 40 cm — per m²",
    nameAr: "بلاط زخرفي مميّز 25 × 40 سم — للمتر المربع",
    descriptionEn:
      "Patterned tile for a feature band or a single accent wall behind a vanity or a cooker. Batch shade varies more on decorated tiles than on plain ones, so buy the whole quantity in one go and check the batch number on every box.",
    descriptionAr:
      "بلاط منقوش لحزام زخرفي أو جدار مميّز واحد خلف المغسلة أو الموقد. يتفاوت لون الدفعة في البلاط المزخرف أكثر من السادة، لذا تُشترى الكمية كاملة دفعة واحدة ويُتحقق من رقم الدفعة على كل صندوق.",
    price: 3.75,
    qty: 420,
    delivery: 0.25,
    attributes: { size: "250 × 400 mm", finish: "Decor print", use: "Wall feature", perBox: "1.0 m² (10 pcs)" }
  },

  // ── Marble & granite ──────────────────────────────────────────────────────
  {
    sku: "STN-MRB-STP",
    cat: "marble-granite",
    unit: "piece",
    nameEn: "Marble Stair Step 120 × 30 × 2 cm — Polished",
    nameAr: "درجة سلم رخام 120 × 30 × 2 سم — مصقولة",
    descriptionEn:
      "Polished marble tread with a bullnosed front edge, cut to a standard 120 cm run. Marble is a natural stone, so veining and tone vary from piece to piece — that variation is the material, not a defect, but lay the pieces out and choose the order before fixing.",
    descriptionAr:
      "درجة رخام مصقولة بحافة أمامية مدوّرة، مقطوعة بطول قياسي 120 سم. الرخام حجر طبيعي، فالعروق والدرجة اللونية تختلف من قطعة لأخرى، وهذا التفاوت هو طبيعة المادة لا عيب فيها، لكن تُفرد القطع ويُختار ترتيبها قبل التثبيت.",
    price: 14.5,
    qty: 140,
    delivery: 0.5,
    attributes: { size: "1200 × 300 × 20 mm", finish: "Polished, bullnose edge", material: "Natural marble", origin: "Oman / India" }
  },
  {
    sku: "STN-GRN-CTR",
    cat: "marble-granite",
    unit: "custom",
    customUnit: "m²",
    nameEn: "Granite Kitchen Countertop 2 cm — per m², Fabricated",
    nameAr: "سطح مطبخ جرانيت 2 سم — للمتر المربع مع التصنيع",
    descriptionEn:
      "Granite worktop supplied cut to your template with a polished front edge, sink cut-out and hob cut-out included. Granite is far harder than marble and resists kitchen acids, which is why it is the standard worktop stone. Template measurement is taken on site after the units are fitted, never from the drawing.",
    descriptionAr:
      "سطح مطبخ جرانيت يُورّد مقطوعاً حسب القالب مع حافة أمامية مصقولة وفتحة الحوض وفتحة الموقد ضمن السعر. الجرانيت أصلب من الرخام بكثير ويقاوم أحماض المطبخ، ولهذا هو الحجر القياسي لأسطح المطابخ. يُؤخذ قياس القالب في الموقع بعد تركيب الخزائن لا من اللوحة.",
    price: 32.0,
    qty: 180,
    delivery: 1.5,
    attributes: { thicknessMm: 20, finish: "Polished", includes: "Edge polish + sink & hob cut-outs", material: "Natural granite" }
  },
  {
    sku: "STN-MRB-WIN",
    cat: "marble-granite",
    unit: "meter",
    nameEn: "Marble Window Sill 25 cm Wide — per metre",
    nameAr: "عتبة نافذة رخام بعرض 25 سم — للمتر",
    descriptionEn:
      "Polished marble sill for window openings, cut to length with a drip groove on the underside of the external overhang. The drip groove is what stops rain tracking back under the sill and staining the wall below it.",
    descriptionAr:
      "عتبة نافذة رخام مصقولة تُقصّ بالطول المطلوب مع مجرى تنقيط أسفل البروز الخارجي. مجرى التنقيط هو ما يمنع تسلل ماء المطر أسفل العتبة وتبقيعه للجدار تحتها.",
    price: 9.5,
    qty: 260,
    delivery: 0.3,
    attributes: { widthMm: 250, thicknessMm: 20, finish: "Polished", feature: "Drip groove", material: "Natural marble" }
  },

  // ── Adhesive & grout ──────────────────────────────────────────────────────
  {
    sku: "TIL-ADH-25",
    cat: "tile-adhesive",
    unit: "bag",
    nameEn: "Tile Adhesive C1T — 25 kg Bag",
    nameAr: "لاصق بلاط C1T — كيس 25 كجم",
    descriptionEn:
      "Cement-based thin-bed adhesive for ceramic and porcelain on plastered walls and screeded floors. Comb it with the right notch size and back-butter large tiles: a tile bedded on five dabs of adhesive sounds hollow, cracks under load and traps water beneath it.",
    descriptionAr:
      "لاصق إسمنتي للفرش الرقيق للسيراميك والبورسلان على الجدران المبيّضة والأرضيات المصبوبة. يُمشّط بمقاس السن الصحيح وتُدهن ظهور البلاطات الكبيرة، فالبلاطة الموضوعة على خمس نقاط لاصق تصدر صوتاً أجوف وتتشقق تحت الحمل وتحبس الماء تحتها.",
    price: 2.25,
    qty: 520,
    delivery: 0.1,
    attributes: { weightKg: 25, classification: "C1T (EN 12004)", potLife: "3–4 hours", coverage: "4–5 m² per bag" }
  },
  {
    sku: "TIL-GRT-5",
    cat: "tile-adhesive",
    unit: "bag",
    nameEn: "Tile Grout — 5 kg, Water Repellent",
    nameAr: "حشو فواصل البلاط — 5 كجم طارد للماء",
    descriptionEn:
      "Fine cement grout with a water-repellent additive for joints up to 6 mm. Grout, not adhesive, is where a bathroom floor actually leaks; take the joints full depth and clean the haze off before it hardens. Supplied in white, grey and beige.",
    descriptionAr:
      "حشو إسمنتي ناعم بإضافة طاردة للماء للفواصل حتى 6 مم. الحشو لا اللاصق هو الموضع الذي تسرّب منه أرضية الحمام فعلياً، لذا تُملأ الفواصل بكامل عمقها ويُنظّف الغبش قبل تصلّبه. يتوفر بالأبيض والرمادي والبيج.",
    price: 2.85,
    qty: 310,
    delivery: 0.05,
    attributes: { weightKg: 5, jointWidth: "1–6 mm", waterRepellent: true, colours: "White / Grey / Beige" }
  },
  {
    sku: "TIL-SPC-2",
    cat: "tile-adhesive",
    unit: "bag",
    nameEn: "Tile Spacers 2 mm — Bag of 500",
    nameAr: "فواصل بلاط 2 مم — كيس 500 قطعة",
    descriptionEn:
      "Cross-shaped plastic spacers that keep joints even across a floor. Pull them out before the adhesive sets rather than grouting over them — a spacer left in the joint shows through the grout as a pale cross in the finished floor.",
    descriptionAr:
      "فواصل بلاستيكية صليبية تحافظ على انتظام الفواصل عبر الأرضية. تُنزع قبل شك اللاصق بدل الحشو فوقها، فالفاصل المتروك داخل الفجوة يظهر عبر الحشو على شكل صليب باهت في الأرضية النهائية.",
    price: 0.85,
    qty: 400,
    delivery: 0.0,
    attributes: { thicknessMm: 2, quantity: 500, shape: "Cross", material: "Polypropylene" }
  }
];
