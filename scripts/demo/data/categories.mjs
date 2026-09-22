// Demo category tree. Top-level departments, each with the subcategories a real
// building-materials yard in Oman would actually separate its stock into.
// `slug` doubles as the key products reference, so it must stay stable.

export const CATEGORIES = [
  {
    slug: "cement-concrete",
    nameEn: "Cement & Concrete",
    nameAr: "الإسمنت والخرسانة",
    children: [
      { slug: "cement", nameEn: "Cement", nameAr: "إسمنت" },
      { slug: "sand-aggregate", nameEn: "Sand & Aggregate", nameAr: "رمل وحصى" },
      { slug: "concrete-admixtures", nameEn: "Concrete Admixtures", nameAr: "إضافات خرسانية" },
      { slug: "blocks-masonry", nameEn: "Blocks & Masonry", nameAr: "البلوك ومواد البناء" }
    ]
  },
  {
    slug: "steel-metals",
    nameEn: "Steel & Metals",
    nameAr: "الحديد والمعادن",
    children: [
      { slug: "rebar", nameEn: "Reinforcement Steel", nameAr: "حديد التسليح" },
      { slug: "steel-sections", nameEn: "Steel Sections", nameAr: "المقاطع الحديدية" },
      { slug: "sheets-roofing", nameEn: "Sheets & Roofing", nameAr: "الألواح والتسقيف" },
      { slug: "welding-supplies", nameEn: "Welding Supplies", nameAr: "مستلزمات اللحام" }
    ]
  },
  {
    slug: "plumbing-sanitary",
    nameEn: "Plumbing & Sanitary",
    nameAr: "السباكة والأدوات الصحية",
    children: [
      { slug: "pvc-pipes", nameEn: "PVC Drainage Pipes", nameAr: "أنابيب الصرف PVC" },
      { slug: "ppr-pipes", nameEn: "PPR Water Pipes", nameAr: "أنابيب المياه PPR" },
      { slug: "pipe-fittings", nameEn: "Fittings & Valves", nameAr: "الوصلات والمحابس" },
      { slug: "taps-basins", nameEn: "Taps & Sanitaryware", nameAr: "الخلاطات والأطقم الصحية" },
      { slug: "water-tanks", nameEn: "Water Tanks & Pumps", nameAr: "خزانات ومضخات المياه" }
    ]
  },
  {
    slug: "electrical-lighting",
    nameEn: "Electrical & Lighting",
    nameAr: "الكهرباء والإضاءة",
    children: [
      { slug: "cables-conduit", nameEn: "Cables & Conduit", nameAr: "الكابلات والمواسير" },
      { slug: "switches-sockets", nameEn: "Switches & Sockets", nameAr: "المفاتيح والأفياش" },
      { slug: "panels-breakers", nameEn: "Panels & Breakers", nameAr: "اللوحات والقواطع" },
      { slug: "led-lighting", nameEn: "LED Lighting", nameAr: "إضاءة LED" }
    ]
  },
  {
    slug: "paints-waterproofing",
    nameEn: "Paints & Waterproofing",
    nameAr: "الدهانات والعوازل",
    children: [
      { slug: "interior-paints", nameEn: "Interior Paints", nameAr: "الدهانات الداخلية" },
      { slug: "exterior-paints", nameEn: "Exterior Paints", nameAr: "الدهانات الخارجية" },
      { slug: "waterproofing", nameEn: "Waterproofing", nameAr: "العزل المائي" },
      { slug: "thermal-insulation", nameEn: "Thermal Insulation", nameAr: "العزل الحراري" },
      { slug: "painting-tools", nameEn: "Painting Tools", nameAr: "أدوات الدهان" }
    ]
  },
  {
    slug: "tiles-stone",
    nameEn: "Tiles & Stone",
    nameAr: "البلاط والحجر",
    children: [
      { slug: "floor-tiles", nameEn: "Floor Tiles", nameAr: "بلاط الأرضيات" },
      { slug: "wall-tiles", nameEn: "Wall Tiles", nameAr: "بلاط الجدران" },
      { slug: "marble-granite", nameEn: "Marble & Granite", nameAr: "الرخام والجرانيت" },
      { slug: "tile-adhesive", nameEn: "Adhesive & Grout", nameAr: "اللاصق والحشو" }
    ]
  },
  {
    slug: "doors-windows",
    nameEn: "Doors & Windows",
    nameAr: "الأبواب والنوافذ",
    children: [
      { slug: "wooden-doors", nameEn: "Wooden Doors", nameAr: "الأبواب الخشبية" },
      { slug: "steel-doors", nameEn: "Steel Doors", nameAr: "الأبواب الحديدية" },
      { slug: "aluminium-windows", nameEn: "Aluminium Windows", nameAr: "نوافذ الألمنيوم" },
      { slug: "door-hardware", nameEn: "Door Hardware", nameAr: "إكسسوارات الأبواب" }
    ]
  },
  {
    slug: "tools-equipment",
    nameEn: "Tools & Equipment",
    nameAr: "العدد والمعدات",
    children: [
      { slug: "hand-tools", nameEn: "Hand Tools", nameAr: "العدد اليدوية" },
      { slug: "power-tools", nameEn: "Power Tools", nameAr: "العدد الكهربائية" },
      { slug: "ladders-scaffolding", nameEn: "Ladders & Scaffolding", nameAr: "السلالم والسقالات" },
      { slug: "safety-equipment", nameEn: "Safety Equipment", nameAr: "معدات السلامة" }
    ]
  },
  {
    slug: "timber-boards",
    nameEn: "Timber & Boards",
    nameAr: "الأخشاب والألواح",
    children: [
      { slug: "formwork-timber", nameEn: "Formwork Timber", nameAr: "أخشاب الشدة" },
      { slug: "panel-boards", nameEn: "Panel Boards", nameAr: "الألواح والأبلكاش" },
      { slug: "fasteners", nameEn: "Nails & Fasteners", nameAr: "المسامير والبراغي" }
    ]
  }
];
