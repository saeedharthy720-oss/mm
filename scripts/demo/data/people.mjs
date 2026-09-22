// Demo staff, customers and orders.
//
// Phone numbers deliberately follow an obvious 9999-00xx pattern so nobody's
// real number ends up in a demo order that a salesperson might then click
// "send on WhatsApp" against.

/**
 * Shared password for every demo account, taken from the environment.
 *
 * Deliberately not written into this file: the repository is public, and these
 * accounts are real logins on the live dashboard. A password committed here
 * would hand anyone who reads the repo the catalogue, the prices, the staff
 * list and every order.
 */
export const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "";

/**
 * Staff accounts. The `employee` role already grants orders:view and
 * orders:manage; `extraPermissions` are the per-person grants on top, which is
 * the feature that lets one storeman also manage products without inventing a
 * role for one person.
 */
export const STAFF = [
  {
    name: "محمد بن راشد المعمري",
    jobTitleAr: "مدير المبيعات",
    jobTitleEn: "Sales Manager",
    email: "mohammed.almamari@riyadh-althabti.com",
    roleKey: "admin",
    whatsappNumber: "+96899990011",
    receivesOrderNotifications: true,
    extraPermissions: []
  },
  {
    name: "سالم بن خالد البلوشي",
    jobTitleAr: "مسؤول المنتجات والأسعار",
    jobTitleEn: "Products & Pricing Officer",
    email: "salim.albalushi@riyadh-althabti.com",
    roleKey: "employee",
    whatsappNumber: "+96899990012",
    receivesOrderNotifications: true,
    extraPermissions: ["products:manage"]
  },
  {
    name: "عائشة بنت سعيد الهنائية",
    jobTitleAr: "أمينة المستودع",
    jobTitleEn: "Warehouse Supervisor",
    email: "aisha.alhinai@riyadh-althabti.com",
    roleKey: "employee",
    whatsappNumber: "+96899990013",
    receivesOrderNotifications: true,
    extraPermissions: ["products:manage", "categories:manage"]
  },
  {
    name: "يوسف بن ناصر الريامي",
    jobTitleAr: "سائق التوصيل",
    jobTitleEn: "Delivery Driver",
    email: "yousuf.alriyami@riyadh-althabti.com",
    roleKey: "employee",
    whatsappNumber: "+96899990014",
    receivesOrderNotifications: true,
    extraPermissions: []
  },
  {
    name: "فاطمة بنت علي الكندية",
    jobTitleAr: "خدمة العملاء",
    jobTitleEn: "Customer Service",
    email: "fatma.alkindi@riyadh-althabti.com",
    roleKey: "employee",
    whatsappNumber: "+96899990015",
    receivesOrderNotifications: false,
    extraPermissions: []
  },
  {
    // Kept disabled on purpose: shows what a former employee's account looks
    // like once access is withdrawn, without deleting their order history.
    name: "ناصر بن سالم الغافري",
    jobTitleAr: "موظف سابق (حساب معطّل)",
    jobTitleEn: "Former employee (disabled account)",
    email: "nasser.alghafri@riyadh-althabti.com",
    roleKey: "employee",
    whatsappNumber: "",
    receivesOrderNotifications: false,
    extraPermissions: [],
    disabled: true
  }
];

/** Registered customers. Guest orders are placed separately, with no account. */
export const CUSTOMERS = [
  {
    name: "أحمد بن سعيد الوهيبي",
    email: "ahmed.alwahaibi@example.com",
    phone: "+96899990101",
    noteAr: "عميل أفراد — يبني منزلاً في بركاء"
  },
  {
    name: "خالد بن ناصر البادي",
    email: "khalid.albadi@example.com",
    phone: "+96899990102",
    noteAr: "عميل أفراد — أعمال ترميم"
  },
  {
    name: "مريم بنت حمد الشكيلية",
    email: "mariam.alshukailiya@example.com",
    phone: "+96899990103",
    noteAr: "عميلة أفراد — تشطيبات داخلية"
  },
  {
    name: "شركة النهضة للمقاولات",
    email: "alnahda.contracting@example.com",
    phone: "+96899990104",
    noteAr: "عميل شركات — مقاولات عامة"
  }
];

/**
 * Demo orders. `phone` decides which customer record the order attaches to:
 * a registered customer's number links it to their account, anything else
 * creates a guest customer, exactly as a real walk-up order would.
 *
 * `finalStatus` is applied afterwards through the staff status endpoint, so the
 * status history reads like real work rather than appearing out of nowhere.
 */
export const ORDERS = [
  {
    customerName: "أحمد بن سعيد الوهيبي",
    phone: "+96899990101",
    address: "سلطنة عُمان، محافظة جنوب الباطنة، ولاية بركاء، منطقة الهرم",
    deliveryNotes: "الرجاء الاتصال قبل الوصول بنصف ساعة",
    orderNotes: "التسليم بعد صلاة العصر",
    items: [
      { sku: "CEM-OPC-50", quantity: 120 },
      { sku: "AGG-SND-WSH", quantity: 6 },
      { sku: "AGG-GRV-20", quantity: 8 },
      { sku: "STL-RBR-12", quantity: 60 }
    ],
    finalStatus: "delivered",
    statusPath: ["processing", "ready_for_delivery", "out_for_delivery", "delivered"]
  },
  {
    customerName: "شركة النهضة للمقاولات",
    phone: "+96899990104",
    address: "سلطنة عُمان، محافظة مسقط، ولاية السيب، منطقة الخوض السادسة",
    deliveryNotes: "التسليم في موقع المشروع — يوجد حارس على البوابة",
    orderNotes: "مطلوب فاتورة باسم الشركة",
    items: [
      { sku: "BLK-HOL-20", quantity: 1500 },
      { sku: "CEM-MAS-40", quantity: 80 },
      { sku: "STL-MSH-A252", quantity: 25 },
      { sku: "TMB-FRM-PLY", quantity: 40 },
      { sku: "EQP-PRP-3", quantity: 60 }
    ],
    finalStatus: "out_for_delivery",
    statusPath: ["processing", "ready_for_delivery", "out_for_delivery"]
  },
  {
    customerName: "مريم بنت حمد الشكيلية",
    phone: "+96899990103",
    address: "سلطنة عُمان، محافظة مسقط، ولاية بوشر، منطقة الغبرة الشمالية",
    orderNotes: "أرجو التأكد من أن البلاط من نفس الدفعة",
    items: [
      { sku: "TIL-FLR-60M", quantity: 86 },
      { sku: "TIL-ADH-25", quantity: 20 },
      { sku: "TIL-GRT-5", quantity: 8 },
      { sku: "TIL-SPC-2", quantity: 4 }
    ],
    finalStatus: "ready_for_delivery",
    statusPath: ["processing", "ready_for_delivery"]
  },
  {
    customerName: "خالد بن ناصر البادي",
    phone: "+96899990102",
    address: "سلطنة عُمان، محافظة الداخلية، ولاية نزوى، منطقة الفرضة",
    deliveryNotes: "الطريق الأخير غير معبّد — يُفضّل مركبة دفع رباعي",
    items: [
      { sku: "PNT-INT-EMU18", quantity: 6 },
      { sku: "PNT-INT-PRM18", quantity: 4 },
      { sku: "PNT-PUT-20", quantity: 12 },
      { sku: "PNT-RLR-9", quantity: 4 },
      { sku: "PNT-BRS-3", quantity: 6 },
      { sku: "PNT-TPE-MSK", quantity: 10 }
    ],
    finalStatus: "processing",
    statusPath: ["processing"]
  },
  {
    // Guest order — no account, exactly as a walk-up customer would place it.
    customerName: "سعيد بن محمد الحارثي",
    phone: "+96899990201",
    address: "سلطنة عُمان، محافظة شمال الباطنة، ولاية صحار، منطقة فلج القبائل",
    orderNotes: "طلب عاجل إن أمكن",
    items: [
      { sku: "PLB-PVC-110", quantity: 12 },
      { sku: "PLB-FIT-E110", quantity: 20 },
      { sku: "PLB-FIT-T110", quantity: 8 },
      { sku: "PLB-SOL-500", quantity: 3 }
    ],
    finalStatus: "new",
    statusPath: []
  },
  {
    customerName: "أحمد بن سعيد الوهيبي",
    phone: "+96899990101",
    address: "سلطنة عُمان، محافظة جنوب الباطنة، ولاية بركاء، منطقة الهرم",
    orderNotes: "مكمّل للطلب السابق",
    items: [
      { sku: "ELC-CBL-25", quantity: 4 },
      { sku: "ELC-CND-20", quantity: 60 },
      { sku: "ELC-SKT-13", quantity: 24 },
      { sku: "ELC-SW-1G", quantity: 18 },
      { sku: "ELC-DB-12", quantity: 1 },
      { sku: "ELC-MCB-32", quantity: 10 },
      { sku: "ELC-RCD-63", quantity: 2 }
    ],
    finalStatus: "delivered",
    statusPath: ["processing", "ready_for_delivery", "out_for_delivery", "delivered"]
  },
  {
    // Cancelled order — every demo needs one, or the status filter looks empty.
    customerName: "بدر بن حمود الشبلي",
    phone: "+96899990202",
    address: "سلطنة عُمان، محافظة الظاهرة، ولاية عبري، منطقة الوقبة",
    orderNotes: "تم الإلغاء بناءً على طلب العميل — تغيّر موعد الصب",
    items: [
      { sku: "CEM-SRC-50", quantity: 40 },
      { sku: "ADM-PLS-20", quantity: 2 }
    ],
    finalStatus: "cancelled",
    statusPath: ["processing", "cancelled"]
  },
  {
    customerName: "شركة النهضة للمقاولات",
    phone: "+96899990104",
    address: "سلطنة عُمان، محافظة مسقط، ولاية السيب، منطقة المعبيلة الصناعية",
    deliveryNotes: "يوجد رافعة شوكية في الموقع",
    items: [
      { sku: "DOR-ST-SEC", quantity: 4 },
      { sku: "WIN-AL-SLD", quantity: 12 },
      { sku: "HRD-CLS-80", quantity: 6 },
      { sku: "SAF-HLM-STD", quantity: 25 },
      { sku: "SAF-VST-HIV", quantity: 25 },
      { sku: "SAF-BOT-STL", quantity: 15 }
    ],
    finalStatus: "processing",
    statusPath: ["processing"]
  },
  {
    customerName: "مريم بنت حمد الشكيلية",
    phone: "+96899990103",
    address: "سلطنة عُمان، محافظة مسقط، ولاية بوشر، منطقة الغبرة الشمالية",
    items: [
      { sku: "SAN-MIX-BAS", quantity: 3 },
      { sku: "SAN-WC-STP", quantity: 3 },
      { sku: "SAN-BAS-PED", quantity: 3 },
      { sku: "SAN-MIX-SHW", quantity: 2 }
    ],
    finalStatus: "new",
    statusPath: []
  },
  {
    customerName: "عبدالله بن زاهر العبري",
    phone: "+96899990203",
    address: "سلطنة عُمان، محافظة الداخلية، ولاية بهلاء، منطقة الحارة القديمة",
    orderNotes: "أدوات ورشة",
    items: [
      { sku: "TOL-DRL-HMR", quantity: 1 },
      { sku: "TOL-GRD-115", quantity: 1 },
      { sku: "WLD-CUT-115", quantity: 25 },
      { sku: "WLD-GRD-115", quantity: 10 },
      { sku: "TOL-TAP-5", quantity: 2 },
      { sku: "TOL-LVL-60", quantity: 1 }
    ],
    finalStatus: "delivered",
    statusPath: ["processing", "ready_for_delivery", "out_for_delivery", "delivered"]
  }
];
