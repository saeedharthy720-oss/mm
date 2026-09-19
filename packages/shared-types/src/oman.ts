/**
 * Oman's administrative divisions: 11 governorates (محافظات) and the 61
 * wilayats (ولايات) within them.
 *
 * Used for the delivery address, which is picked rather than typed so that
 * orders arrive with a consistent, searchable location instead of free prose.
 * Villages are deliberately absent — there are thousands and no authoritative
 * list to draw on, so the checkout takes the village or area as free text
 * beneath the wilayat.
 */

export interface Wilayat {
  nameEn: string;
  nameAr: string;
}

export interface Governorate {
  nameEn: string;
  nameAr: string;
  wilayats: Wilayat[];
}

export const OMAN_GOVERNORATES: Governorate[] = [
  {
    nameEn: "Muscat",
    nameAr: "مسقط",
    wilayats: [
      { nameEn: "Muscat", nameAr: "مسقط" },
      { nameEn: "Muttrah", nameAr: "مطرح" },
      { nameEn: "Bawshar", nameAr: "بوشر" },
      { nameEn: "As Seeb", nameAr: "السيب" },
      { nameEn: "Al Amerat", nameAr: "العامرات" },
      { nameEn: "Quriyat", nameAr: "قريات" }
    ]
  },
  {
    nameEn: "Dhofar",
    nameAr: "ظفار",
    wilayats: [
      { nameEn: "Salalah", nameAr: "صلالة" },
      { nameEn: "Thumrait", nameAr: "ثمريت" },
      { nameEn: "Taqah", nameAr: "طاقة" },
      { nameEn: "Mirbat", nameAr: "مرباط" },
      { nameEn: "Sadah", nameAr: "سدح" },
      { nameEn: "Rakhyut", nameAr: "رخيوت" },
      { nameEn: "Dhalkut", nameAr: "ضلكوت" },
      { nameEn: "Al Mazyunah", nameAr: "المزيونة" },
      { nameEn: "Muqshin", nameAr: "مقشن" },
      { nameEn: "Shalim and the Hallaniyat Islands", nameAr: "شليم وجزر الحلانيات" }
    ]
  },
  {
    nameEn: "Musandam",
    nameAr: "مسندم",
    wilayats: [
      { nameEn: "Khasab", nameAr: "خصب" },
      { nameEn: "Bukha", nameAr: "بخا" },
      { nameEn: "Daba Al Bayah", nameAr: "دبا البية" },
      { nameEn: "Madha", nameAr: "مدحاء" }
    ]
  },
  {
    nameEn: "Al Buraimi",
    nameAr: "البريمي",
    wilayats: [
      { nameEn: "Al Buraimi", nameAr: "البريمي" },
      { nameEn: "Mahdah", nameAr: "محضة" },
      { nameEn: "As Sunaynah", nameAr: "السنينة" }
    ]
  },
  {
    nameEn: "Ad Dakhiliyah",
    nameAr: "الداخلية",
    wilayats: [
      { nameEn: "Nizwa", nameAr: "نزوى" },
      { nameEn: "Samail", nameAr: "سمائل" },
      { nameEn: "Bahla", nameAr: "بهلاء" },
      { nameEn: "Adam", nameAr: "أدم" },
      { nameEn: "Al Hamra", nameAr: "الحمراء" },
      { nameEn: "Manah", nameAr: "منح" },
      { nameEn: "Izki", nameAr: "إزكي" },
      { nameEn: "Bidbid", nameAr: "بدبد" }
    ]
  },
  {
    nameEn: "North Al Batinah",
    nameAr: "شمال الباطنة",
    wilayats: [
      { nameEn: "Sohar", nameAr: "صحار" },
      { nameEn: "Shinas", nameAr: "شناص" },
      { nameEn: "Liwa", nameAr: "لوى" },
      { nameEn: "Saham", nameAr: "صحم" },
      { nameEn: "Al Khaburah", nameAr: "الخابورة" },
      { nameEn: "As Suwayq", nameAr: "السويق" }
    ]
  },
  {
    nameEn: "South Al Batinah",
    nameAr: "جنوب الباطنة",
    wilayats: [
      { nameEn: "Ar Rustaq", nameAr: "الرستاق" },
      { nameEn: "Al Awabi", nameAr: "العوابي" },
      { nameEn: "Nakhal", nameAr: "نخل" },
      { nameEn: "Wadi Al Maawil", nameAr: "وادي المعاول" },
      { nameEn: "Barka", nameAr: "بركاء" },
      { nameEn: "Al Musanaah", nameAr: "المصنعة" }
    ]
  },
  {
    nameEn: "North Ash Sharqiyah",
    nameAr: "شمال الشرقية",
    wilayats: [
      { nameEn: "Ibra", nameAr: "إبراء" },
      { nameEn: "Al Mudaybi", nameAr: "المضيبي" },
      { nameEn: "Bidiyah", nameAr: "بدية" },
      { nameEn: "Al Qabil", nameAr: "القابل" },
      { nameEn: "Wadi Bani Khalid", nameAr: "وادي بني خالد" },
      { nameEn: "Dima Wa At Taiyin", nameAr: "دماء والطائيين" }
    ]
  },
  {
    nameEn: "South Ash Sharqiyah",
    nameAr: "جنوب الشرقية",
    wilayats: [
      { nameEn: "Sur", nameAr: "صور" },
      { nameEn: "Al Kamil Wal Wafi", nameAr: "الكامل والوافي" },
      { nameEn: "Jalan Bani Bu Hassan", nameAr: "جعلان بني بو حسن" },
      { nameEn: "Jalan Bani Bu Ali", nameAr: "جعلان بني بو علي" },
      { nameEn: "Masirah", nameAr: "مصيرة" }
    ]
  },
  {
    nameEn: "Ad Dhahirah",
    nameAr: "الظاهرة",
    wilayats: [
      { nameEn: "Ibri", nameAr: "عبري" },
      { nameEn: "Yanqul", nameAr: "ينقل" },
      { nameEn: "Dank", nameAr: "ضنك" }
    ]
  },
  {
    nameEn: "Al Wusta",
    nameAr: "الوسطى",
    wilayats: [
      { nameEn: "Haima", nameAr: "هيماء" },
      { nameEn: "Mahout", nameAr: "محوت" },
      { nameEn: "Ad Duqm", nameAr: "الدقم" },
      { nameEn: "Al Jazir", nameAr: "الجازر" }
    ]
  }
];

export const COUNTRY_NAME_EN = "Sultanate of Oman";
export const COUNTRY_NAME_AR = "سلطنة عُمان";

export function findGovernorate(nameEn: string): Governorate | undefined {
  return OMAN_GOVERNORATES.find((governorate) => governorate.nameEn === nameEn);
}

/**
 * Builds the single address line stored on the order. The order keeps a plain
 * string so historical orders stay readable even if these lists are edited
 * later, and so the WhatsApp message and the printed delivery note can use it
 * without reassembling anything.
 */
export function formatDeliveryAddress(
  parts: { governorate: string; wilayat: string; area?: string; details?: string },
  language: "en" | "ar"
): string {
  const governorate = findGovernorate(parts.governorate);
  const wilayat = governorate?.wilayats.find((w) => w.nameEn === parts.wilayat);
  const isArabic = language === "ar";

  const segments = [
    isArabic ? COUNTRY_NAME_AR : COUNTRY_NAME_EN,
    governorate ? (isArabic ? governorate.nameAr : governorate.nameEn) : parts.governorate,
    wilayat ? (isArabic ? wilayat.nameAr : wilayat.nameEn) : parts.wilayat,
    parts.area?.trim(),
    parts.details?.trim()
  ];

  return segments.filter((segment) => segment && segment.length > 0).join("، ");
}
