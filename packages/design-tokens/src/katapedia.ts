/**
 * Katapedia DES Design Tokens
 * 
 * Nilai token, warna, tipografi, dan hierarki visual ini diekstraksi dan diverifikasi dari:
 * 1. Katapedia's Way #9 - DES: Cara Meningkatkan Elektabilitas Digital Menuju 2029 (Deddy Rahman) [DES-KW]
 * 2. FRD DED — Digital Electability Dashboard PoC/MVP [FRD]
 */

export interface TokenColor {
  hex: string;
  sourceDoc: 'Katapedia\'s Way #9 - DES' | 'FRD DED PoC/MVP';
  sourcePage: number;
  contrastText: string;
  description: string;
}

export const katapediaColors = {
  // Brand Primary & Accents
  navyDark: {
    hex: '#0A1128',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 1,
    contrastText: '#F8FAFC',
    description: 'Latar belakang tema gelap eksekutif, header presentasi, dan navbar utama'
  } as TokenColor,

  navySurface: {
    hex: '#162036',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 9,
    contrastText: '#F1F5F9',
    description: 'Warna surface kartu dan panel pada mode gelap'
  } as TokenColor,

  navySurfaceBorder: {
    hex: '#233354',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 7,
    contrastText: '#F1F5F9',
    description: 'Border halus antar panel dalam kartu gelap'
  } as TokenColor,

  gold: {
    hex: '#F59E0B',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 1,
    contrastText: '#0F172A',
    description: 'Aksen resmi Katapedia\'s Way, highlight Dimensi 10 (Intelligence), kuadran Prioritas Utama'
  } as TokenColor,

  goldMuted: {
    hex: '#D97706',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 29,
    contrastText: '#FFFFFF',
    description: 'Warna penegas tombol aksen emas dan badge'
  } as TokenColor,

  creamLight: {
    hex: '#FDFBF7',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 6,
    contrastText: '#0F172A',
    description: 'Latar kartu slide putih-krem refleksi dan perbandingan'
  } as TokenColor,

  cyanDigital: {
    hex: '#0284C7',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 5,
    contrastText: '#FFFFFF',
    description: 'Aksen tautan DES.katapedia.id, panah flow langkah perjalanan digital'
  } as TokenColor,

  bluePrimary: {
    hex: '#1D4ED8',
    sourceDoc: 'Katapedia\'s Way #9 - DES',
    sourcePage: 29,
    contrastText: '#FFFFFF',
    description: 'Tombol aksi utama, kuadran Pertahankan, filter terpilih'
  } as TokenColor,

  // Semantic Status Tokens
  success: {
    hex: '#10B981',
    sourceDoc: 'FRD DED PoC/MVP',
    sourcePage: 9,
    contrastText: '#FFFFFF',
    description: 'Status Verified, Complete Data, Above Baseline, kuadran Pertahankan'
  } as TokenColor,

  warning: {
    hex: '#F59E0B',
    sourceDoc: 'FRD DED PoC/MVP',
    sourcePage: 9,
    contrastText: '#0F172A',
    description: 'Status Partial Data, Near Baseline, Pending Review, kuadran Pantau'
  } as TokenColor,

  critical: {
    hex: '#EF4444',
    sourceDoc: 'FRD DED PoC/MVP',
    sourcePage: 9,
    contrastText: '#FFFFFF',
    description: 'Status Insufficient Data, Below Baseline, Anomali, kuadran Prioritas Utama'
  } as TokenColor,

  neutral: {
    hex: '#64748B',
    sourceDoc: 'FRD DED PoC/MVP',
    sourcePage: 6,
    contrastText: '#FFFFFF',
    description: 'Not Available / Data Kosong (—), kuadran Tunda'
  } as TokenColor
};

export const desDimensionsMeta = [
  {
    code: 'D01',
    name: 'Digital Visibility',
    step: '01',
    journeyTitle: 'Be Seen',
    journeySub: 'Terlihat',
    question: 'Apakah orang bisa menemukan saya? / Apakah pemilih dapat menemukan Anda?',
    sourcePage: 11,
    color: '#0284C7'
  },
  {
    code: 'D02',
    name: 'Political Positioning',
    step: '02',
    journeyTitle: 'Be Known',
    journeySub: 'Dikenal',
    question: 'Apakah orang tahu siapa saya dan apa yang membedakan saya?',
    sourcePage: 12,
    color: '#3B82F6'
  },
  {
    code: 'D03',
    name: 'Issue Ownership',
    step: '03',
    journeyTitle: 'Be Associated',
    journeySub: 'Memiliki Isu',
    question: 'Isu apa yang menjadi milik Anda? Apakah orang mengingat saya karena isu tertentu?',
    sourcePage: 13,
    color: '#6366F1'
  },
  {
    code: 'D04',
    name: 'Winning Narrative',
    step: '04',
    journeyTitle: 'Be Remembered',
    journeySub: 'Memiliki Cerita',
    question: 'Apakah Anda memiliki cerita yang membuat orang ingin mengikuti Anda?',
    sourcePage: 14,
    color: '#8B5CF6'
  },
  {
    code: 'D05',
    name: 'Content Power & Winning Formula',
    step: '05',
    journeyTitle: 'Be Attention-Worthy',
    journeySub: 'Menghasilkan Perhatian',
    question: 'Apakah Anda bisa membuat konten yang berkinerja tinggi?',
    sourcePage: 15,
    color: '#EC4899'
  },
  {
    code: 'D06',
    name: 'Audience Connection',
    step: '06',
    journeyTitle: 'Be Connected',
    journeySub: 'Terhubung dg Audiens',
    question: 'Apakah audiens hanya melihat Anda, atau mulai terhubung dan berbicara?',
    sourcePage: 17,
    color: '#10B981'
  },
  {
    code: 'D07',
    name: 'Digital Trust & Reputation',
    step: '07',
    journeyTitle: 'Be Trusted',
    journeySub: 'Dipercaya',
    question: 'Apakah semakin sering orang melihat Anda, semakin mereka percaya?',
    sourcePage: 18,
    color: '#06B6D4'
  },
  {
    code: 'D08',
    name: 'Algorithmic Reach',
    step: '08',
    journeyTitle: 'Be Discovered by More',
    journeySub: 'Menjangkau Lebih Luas',
    question: 'Apakah Anda mampu keluar dari lingkaran orang yang sudah mengenal Anda?',
    sourcePage: 19,
    color: '#F59E0B'
  },
  {
    code: 'D09',
    name: 'Electoral Conversion',
    step: '09',
    journeyTitle: 'Be Chosen',
    journeySub: 'Menghasilkan Dukungan',
    question: 'Apakah perhatian digital mulai berubah menjadi dukungan dan tindakan nyata?',
    sourcePage: 20,
    color: '#F97316'
  },
  {
    code: 'D10',
    name: 'Digital Intelligence & Winning Content Engine',
    step: '10',
    journeyTitle: 'Be Repeatable',
    journeySub: 'Menjadi Sistem',
    question: 'Apakah Anda punya sistem untuk tahu apa yang berhasil, dan mengulanginya?',
    sourcePage: 21,
    color: '#EAB308'
  }
];

export const katapediaTokens = {
  brand: {
    primary: katapediaColors.navyDark.hex,
    primaryForeground: katapediaColors.navyDark.contrastText,
    secondary: katapediaColors.navySurface.hex,
    accent: katapediaColors.gold.hex,
    accentMuted: katapediaColors.goldMuted.hex,
    blue: katapediaColors.bluePrimary.hex,
    digital: katapediaColors.cyanDigital.hex
  },
  surface: {
    pageDark: katapediaColors.navyDark.hex,
    cardDark: katapediaColors.navySurface.hex,
    cardDarkBorder: katapediaColors.navySurfaceBorder.hex,
    pageLight: '#F8FAFC',
    cardLight: '#FFFFFF',
    cardLightAlt: katapediaColors.creamLight.hex
  },
  text: {
    primaryDark: '#F8FAFC',
    secondaryDark: '#94A3B8',
    mutedDark: '#64748B',
    primaryLight: '#0F172A',
    secondaryLight: '#475569',
    mutedLight: '#94A3B8'
  },
  status: {
    success: katapediaColors.success.hex,
    warning: katapediaColors.warning.hex,
    critical: katapediaColors.critical.hex,
    neutral: katapediaColors.neutral.hex
  },
  layout: {
    sidebarWidth: 260,
    headerHeight: 64,
    maxContentWidth: 1440
  }
};
