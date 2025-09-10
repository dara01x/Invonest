export type Language = 'en' | 'ar' | 'ckb';

export const translations = {
  en: {
    // App General
    appTitle: "Invonest",
    language: "Language",
    newInvoice: "New Invoice",
    save: "Save",
    print: "Print",
    downloadPdf: "Download Invoice",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    preview: "Preview",
    settings: "Settings",
    
    // Invoice
    invoice: "Invoice",
    invoiceNo: "Invoice No.",
    issueDate: "Issue Date",
    dueDate: "Due Date",
    seller: "Seller",
    buyer: "Buyer",
    billTo: "Bill To",
    from: "From",
    to: "To",
    
    // Company/Customer
    companyName: "Company Name",
    name: "Name",
    address: "Address",
    phone: "Phone",
    mobile: "Mobile",
    fax: "Fax",
    email: "Email",
    taxId: "Tax ID",
    
    // Items
    items: "Items",
    item: "Item",
    description: "Description",
    qty: "Qty",
    unit: "Unit",
    unitPrice: "Unit Price",
    tax: "Tax",
    discount: "Discount",
    amount: "Amount",
    addItem: "Add Item",
    itemDescription: "Item Description",
    quantity: "Quantity",
    
    // Discounts
    discountType: "Discount Type",
    discountPercentage: "Discount Percentage (%)",
    discountAmount: "Discount Amount",
    noDiscount: "No Discount",
    percentage: "Percentage (%)",
    fixedAmount: "Fixed Amount",
    
    // Totals
    subtotal: "Subtotal",
    total: "Total",
    grandTotal: "Grand Total",
    
    // Status
    status: "Status",
    paid: "Paid",
    unpaid: "Unpaid",
    partiallyPaid: "Partially Paid",
    overdue: "Overdue",
    draft: "Draft",
    
    // Other
    notes: "Notes",
    terms: "Terms & Conditions",
    paymentTerms: "Payment Terms",
    currency: "Currency",
    
    // Navigation
    invoices: "Invoices",
    home: "Home",
    
    // Placeholders
    invoicePlaceholder: "Click to edit title (e.g., Invoice, Bill, Receipt)",
    invoiceTitleExample1: "PROFESSIONAL INVOICE",
    invoiceTitleExample2: "BUSINESS INVOICE",
    invoiceTitleExample3: "SERVICE INVOICE",
    invoiceTitleExample4: "TAX INVOICE",
    invoiceTitleHelp: "Click to customize your invoice title",
    notesPlaceholder: "Notes – any relevant information not covered, additional terms, and conditions",
    companyNamePlaceholder: "Your Company Name",
    companyEmailPlaceholder: "company@example.com",
    companyAddressPlaceholder: "123 Business Street\nCity, State, ZIP\nCountry",
    companyPhonePlaceholder: "+1 (555) 123-4567",
    customerNamePlaceholder: "Customer Name",
    customerEmailPlaceholder: "customer@example.com",
    customerAddressPlaceholder: "456 Customer Avenue\nCity, State, ZIP\nCountry",
    customerPhonePlaceholder: "+1 (555) 987-6543",
    invoiceNumberPlaceholder: "INV-2025-000001",
    percentagePlaceholder: "Enter percentage (e.g., 10)",
    discountAmountPlaceholder: "Enter discount amount in dollars",
    quantityPlaceholder: "1",
    pricePlaceholder: "0.00",
    
    // Colors/Themes
    oceanBlue: "Ocean Blue",
    forestGreen: "Forest Green",
    royalPurple: "Royal Purple",
    sunsetOrange: "Sunset Orange",
    cherryRed: "Cherry Red",
    deepTeal: "Deep Teal",
    warmPink: "Warm Pink",
    electricIndigo: "Electric Indigo",
    midnight: "Midnight",
    
    // File operations
    uploadLogo: "Upload company logo",
    removeLogo: "Remove logo",
    
    // Dashboard and UI
    generateProfessionalInvoices: "Generate professional invoices for your business",
    colorTheme: "Color theme",
    uploadCompanyLogo: "Upload your company logo",
    invoiceNumber: "Invoice number",
    date: "Date",
    previewInvoice: "Preview Invoice",
    downloadInvoice: "Download invoice",
    itemName: "Item name",
    additionalDetails: "Additional details",
    discountQuestion: "How much percentage of discount do you want to apply to the final payment?",
    
    // Landing Page
    landingTitle: "Create Professional Invoices for Free",
    landingTitlePart1: "Create Professional",
    landingTitlePart2: "Invoices for Free",
    landingSubtitle: "Generate beautiful, multilingual invoices instantly. Support for English, Arabic, and Kurdish with perfect RTL formatting. No signup required, completely free.",
    freeForever: "100% Free Forever",
    makeInvoice: "Make an Invoice",
    startCreating: "Start Creating Invoices",
    getStarted: "Get Started Now",
    noCreditCard: "No credit card required",
    readyInMinutes: "Ready in 2 minutes",
    
    // Navigation
    features: "Features",
    howItWorks: "How it Works",
    contact: "Contact",
    
    // Features
    featuresTitle: "Everything You Need to Create Professional Invoices",
    featuresSubtitle: "All the features you need, completely free with no limitations",
    multiLanguage: "Multi-Language Support",
    multiLanguageDesc: "Create invoices in English, Arabic, and Kurdish with perfect RTL/LTR formatting",
    superFast: "Super Fast",
    superFastDesc: "Generate professional invoices in under 2 minutes with our intuitive interface",
    freeForeverFeature: "100% Free Forever",
    freeForeverDesc: "No hidden costs, no watermarks, no limitations. Completely free with no signup required",
    instantPdf: "Instant PDF Export",
    instantPdfDesc: "High-quality PDF export with professional formatting and print-ready output",
    beautifulThemes: "Beautiful Themes",
    beautifulThemesDesc: "Choose from 9 stunning color themes and add your company logo for branding",
    professionalDesign: "Professional Design",
    professionalDesignDesc: "Clean, business-ready invoices that make your company look professional",
    
    // How it Works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Create professional invoices in just three simple steps",
    step1Title: "Fill Invoice Details",
    step1Desc: "Enter your company information, client details, and invoice items in any of the three supported languages",
    step2Title: "Customize & Preview",
    step2Desc: "Choose your preferred theme, add your logo, and preview your invoice in real-time",
    step3Title: "Download PDF",
    step3Desc: "Generate and download your professional invoice as a high-quality PDF ready for printing or sharing",
    
    // Language Showcase
    languageShowcaseTitle: "Supports Three Languages",
    languageShowcaseSubtitle: "Perfect RTL/LTR formatting for global businesses",
    englishLang: "English",
    arabicLang: "Arabic",
    kurdishLang: "Kurdish",
    leftToRight: "Left-to-Right (LTR)",
    rightToLeft: "Right-to-Left (RTL)",
    automaticDirection: "Automatic text direction",
    culturalFormatting: "Cultural formatting",
    nativeFonts: "Native fonts support",
    
    // Footer
    footerDescription: "Professional invoice generator that's 100% free forever. Create beautiful invoices in English, Arabic, and Kurdish.",
    product: "Product",
    languages: "Languages",
    allRightsReserved: "All rights reserved.",
    madeBy: "Made by:",
  },
  ar: {
    // App General
    appTitle: "إنفونست",
    language: "اللغة",
    newInvoice: "فاتورة جديدة",
    save: "حفظ",
    print: "طباعة",
    downloadPdf: "تنزيل الفاتورة",
    edit: "تعديل",
    delete: "حذف",
    cancel: "إلغاء",
    confirm: "تأكيد",
    preview: "معاينة",
    settings: "الإعدادات",
    
    // Invoice
    invoice: "فاتورة",
    invoiceNo: "رقم الفاتورة",
    issueDate: "تاريخ الإصدار",
    dueDate: "تاريخ الاستحقاق",
    seller: "البائع",
    buyer: "المشتري",
    billTo: "إرسال الفاتورة إلى",
    from: "من",
    to: "إلى",
    
    // Company/Customer
    companyName: "اسم الشركة",
    name: "الاسم",
    address: "العنوان",
    phone: "الهاتف",
    mobile: "الجوال",
    fax: "الفاكس",
    email: "البريد الإلكتروني",
    taxId: "الرقم الضريبي",
    
    // Items
    items: "العناصر",
    item: "عنصر",
    description: "الوصف",
    qty: "الكمية",
    unit: "الوحدة",
    unitPrice: "سعر الوحدة",
    tax: "الضريبة",
    discount: "الخصم",
    amount: "المبلغ",
    addItem: "إضافة عنصر",
    itemDescription: "وصف العنصر",
    quantity: "الكمية",
    
    // Discounts
    discountType: "نوع الخصم",
    discountPercentage: "نسبة الخصم (%)",
    discountAmount: "مبلغ الخصم",
    noDiscount: "بدون خصم",
    percentage: "نسبة مئوية (%)",
    fixedAmount: "مبلغ ثابت",
    
    // Totals
    subtotal: "المجموع الفرعي",
    total: "الإجمالي",
    grandTotal: "المجموع الكلي",
    
    // Status
    status: "الحالة",
    paid: "مدفوعة",
    unpaid: "غير مدفوعة",
    partiallyPaid: "مدفوعة جزئياً",
    overdue: "متأخرة",
    draft: "مسودة",
    
    // Other
    notes: "ملاحظات",
    terms: "الشروط والأحكام",
    paymentTerms: "شروط الدفع",
    currency: "العملة",
    
    // Navigation
    invoices: "الفواتير",
    home: "الرئيسية",
    
    // Placeholders
    invoicePlaceholder: "انقر لتعديل العنوان (مثال: فاتورة، كشف حساب، إيصال)",
    invoiceTitleExample1: "فاتورة احترافية",
    invoiceTitleExample2: "فاتورة تجارية",
    invoiceTitleExample3: "فاتورة خدمات",
    invoiceTitleExample4: "فاتورة ضريبية",
    invoiceTitleHelp: "انقر لتخصيص عنوان فاتورتك",
    notesPlaceholder: "ملاحظات – أي معلومات ذات صلة غير مغطاة، شروط وأحكام إضافية",
    companyNamePlaceholder: "اسم شركتك",
    companyEmailPlaceholder: "company@example.com",
    companyAddressPlaceholder: "123 شارع الأعمال\nالمدينة، الولاية، الرمز البريدي\nالبلد",
    companyPhonePlaceholder: "+1 (555) 123-4567",
    customerNamePlaceholder: "اسم العميل",
    customerEmailPlaceholder: "customer@example.com",
    customerAddressPlaceholder: "456 شارع العميل\nالمدينة، الولاية، الرمز البريدي\nالبلد",
    customerPhonePlaceholder: "+1 (555) 987-6543",
    invoiceNumberPlaceholder: "INV-2025-000001",
    percentagePlaceholder: "أدخل النسبة المئوية (مثال: 10)",
    discountAmountPlaceholder: "أدخل مبلغ الخصم بالدولار",
    quantityPlaceholder: "1",
    pricePlaceholder: "0.00",
    
    // Colors/Themes
    oceanBlue: "الأزرق المحيطي",
    forestGreen: "الأخضر الغابي",
    royalPurple: "البنفسجي الملكي",
    sunsetOrange: "البرتقالي الغروبي",
    cherryRed: "الأحمر الكرزي",
    deepTeal: "الأزرق المخضر العميق",
    warmPink: "الوردي الدافئ",
    electricIndigo: "النيلي الكهربائي",
    midnight: "منتصف الليل",
    
    // File operations
    uploadLogo: "تحميل شعار الشركة",
    removeLogo: "إزالة الشعار",
    
    // Dashboard and UI
    generateProfessionalInvoices: "إنشاء فواتير احترافية لأعمالك",
    colorTheme: "لون القالب",
    uploadCompanyLogo: "تحميل شعار شركتك",
    invoiceNumber: "رقم الفاتورة",
    date: "التاريخ",
    previewInvoice: "معاينة الفاتورة",
    downloadInvoice: "تنزيل الفاتورة",
    itemName: "اسم العنصر",
    additionalDetails: "تفاصيل إضافية",
    discountQuestion: "كم نسبة الخصم التي تريد تطبيقها على الدفعة النهائية؟",
    
    // Landing Page
    landingTitle: "إنشاء فواتير احترافية مجاناً",
    landingTitlePart1: "إنشاء فواتير",
    landingTitlePart2: "احترافية مجاناً",
    landingSubtitle: "إنشاء فواتير جميلة متعددة اللغات فوراً. دعم للإنجليزية والعربية والكردية مع تنسيق RTL مثالي. لا حاجة للتسجيل، مجاني تماماً.",
    freeForever: "مجاني 100% إلى الأبد",
    makeInvoice: "إنشاء فاتورة",
    startCreating: "ابدأ إنشاء الفواتير",
    getStarted: "ابدأ الآن",
    noCreditCard: "لا حاجة لبطاقة ائتمان",
    readyInMinutes: "جاهز في دقيقتين",
    
    // Navigation
    features: "المميزات",
    howItWorks: "كيف يعمل",
    contact: "اتصل بنا",
    
    // Features
    featuresTitle: "كل ما تحتاجه لإنشاء فواتير احترافية",
    featuresSubtitle: "جميع المميزات التي تحتاجها، مجاناً تماماً بدون قيود",
    multiLanguage: "دعم متعدد اللغات",
    multiLanguageDesc: "إنشاء فواتير بالإنجليزية والعربية والكردية مع تنسيق RTL/LTR مثالي",
    superFast: "سريع جداً",
    superFastDesc: "إنشاء فواتير احترافية في أقل من دقيقتين بواجهة سهلة الاستخدام",
    freeForeverFeature: "مجاني 100% إلى الأبد",
    freeForeverDesc: "بدون تكاليف خفية، بدون علامات مائية، بدون قيود. مجاني تماماً بدون تسجيل",
    instantPdf: "تصدير PDF فوري",
    instantPdfDesc: "تصدير PDF عالي الجودة مع تنسيق احترافي وجاهز للطباعة",
    beautifulThemes: "قوالب جميلة",
    beautifulThemesDesc: "اختر من 9 قوالب ألوان مذهلة وأضف شعار شركتك للعلامة التجارية",
    professionalDesign: "تصميم احترافي",
    professionalDesignDesc: "فواتير نظيفة وجاهزة للأعمال تجعل شركتك تبدو احترافية",
    
    // How it Works
    howItWorksTitle: "كيف يعمل",
    howItWorksSubtitle: "إنشاء فواتير احترافية في ثلاث خطوات بسيطة فقط",
    step1Title: "املأ تفاصيل الفاتورة",
    step1Desc: "أدخل معلومات شركتك وتفاصيل العميل وعناصر الفاتورة بأي من اللغات الثلاث المدعومة",
    step2Title: "تخصيص ومعاينة",
    step2Desc: "اختر القالب المفضل لديك، أضف شعارك، وعاين فاتورتك في الوقت الفعلي",
    step3Title: "تنزيل PDF",
    step3Desc: "إنشاء وتنزيل فاتورتك الاحترافية بصيغة PDF عالية الجودة جاهزة للطباعة أو المشاركة",
    
    // Language Showcase
    languageShowcaseTitle: "يدعم ثلاث لغات",
    languageShowcaseSubtitle: "تنسيق RTL/LTR مثالي للشركات العالمية",
    englishLang: "الإنجليزية",
    arabicLang: "العربية",
    kurdishLang: "الكردية",
    leftToRight: "من اليسار إلى اليمين (LTR)",
    rightToLeft: "من اليمين إلى اليسار (RTL)",
    automaticDirection: "اتجاه النص التلقائي",
    culturalFormatting: "التنسيق الثقافي",
    nativeFonts: "دعم الخطوط الأصلية",
    
    // Footer
    footerDescription: "مولد فواتير احترافي مجاني 100% إلى الأبد. إنشاء فواتير جميلة بالإنجليزية والعربية والكردية.",
    product: "المنتج",
    languages: "اللغات",
    allRightsReserved: "جميع الحقوق محفوظة.",
    madeBy: "صنع بواسطة:",
  },
  ckb: {
    // App General
    appTitle: "ئینڤونێست",
    language: "زمان",
    newInvoice: "پسوڵە",
    save: "خەزن بکە",
    print: "چاپکردن",
    downloadPdf: "داونلودکرنا پسوڵێ",
    edit: "گهورین",
    delete: "ژێبرن",
    cancel: "هەلوەشاندن",
    confirm: "پشتڕاست بکە",
    preview: "دیتنا پسوڵێ",
    settings: "ڕێکخستن",
    
    // Invoice
    invoice: "پسوڵە",
    invoiceNo: "ژمارا پسوڵێ",
    issueDate: "رێکەفتا دەرچوونێ",
    dueDate: "کاتی پارەدانێ",
    seller: "فرۆشیار",
    buyer: "کڕیار",
    billTo: "هناردن بۆ",
    from: "ژلایێ",
    to: "بۆ",
    
    // Company/Customer
    companyName: "ناڤێ کۆمپانیێ",
    name: "ناڤ",
    address: "ناڤونیشان",
    phone: "تەلەفۆن",
    mobile: "مۆبایل",
    fax: "فاکس",
    email: "ئیمەیڵ",
    taxId: "ناسنامەی باج",
    
    // Items
    items: "کارێن تە",
    item: "کار",
    description: "شروڤە",
    qty: "ژمارە",
    unit: "یەکە",
    unitPrice: "نرخێ یەکێ",
    tax: "باج",
    discount: "داشکاندن",
    amount: "بڕ",
    addItem: "زێدەکرنا کارەکی",
    itemDescription: "شروڤەکرنا کاری",
    quantity: "ژمارە",
    
    // Discounts
    discountType: "جۆرێ داشکاندنێ",
    discountPercentage: "ڕێژا داشکاندنێ (%)",
    discountAmount: "بڕێ داشکاندن",
    noDiscount: "بێ داشکاندن",
    percentage: "ڕێژە (%)",
    fixedAmount: "بڕا جێگیر",
    
    // Totals
    subtotal: "کۆێ ژێر",
    total: "کۆێ گشتی",
    grandTotal: "کۆی هەمووی",
    
    // Status
    status: "حاڵەت",
    paid: "پارەهاتیە دان",
    unpaid: "پارە نەهاتیە دان",
    partiallyPaid: "بەشێک پارەدرا",
    overdue: "دواکەوتوو",
    draft: "پێشخزان",
    
    // Other
    notes: "تێبینی",
    terms: "مەرج و مەواد",
    paymentTerms: "مەرجەکانی پارەدان",
    currency: "دراڤ",
    
    // Navigation
    invoices: "پسوڵەکان",
    home: "سەرەکی",
    
    // Placeholders
    invoicePlaceholder: "کلیک بکە بۆ گۆڕینی ناونیشان (نموونە: وەسڵە، حیساب، رەسید)",
    invoiceTitleExample1: "پسوڵا پروفێشنال",
    invoiceTitleExample2: "پسوڵا بازرگانی",
    invoiceTitleExample3: "پسوڵا خزمەتگوزاری",
    invoiceTitleExample4: "پسوڵا باج",
    invoiceTitleHelp: "کلیک بکە دا کو ناڤێ پسوڵێ بدانی",
    notesPlaceholder: "تێبینی – هەر زانیاریەکا پەیوەندیدار کو نەهاتیە ڤەگرتن، مەرجێن زێدە و رێنمایان",
    companyNamePlaceholder: "ناڤێ کومپانیێ",
    companyEmailPlaceholder: "company@example.com",
    companyAddressPlaceholder: "ئەدرێسێ تە",
    companyPhonePlaceholder: "+1 (555) 123-4567",
    customerNamePlaceholder: "ناڤێ کریاری",
    customerEmailPlaceholder: "customer@example.com",
    customerAddressPlaceholder: "ئەدرێسێ کریاری",
    customerPhonePlaceholder: "+1 (555) 987-6543",
    invoiceNumberPlaceholder: "ژمارا پسوڵێ",
    percentagePlaceholder: "رێژەی بنڤێسە (نموونە: 10)",
    discountAmountPlaceholder: "برێ داشکاندنێ بنڤیسە",
    quantityPlaceholder: "1",
    pricePlaceholder: "0.00",
    
    // Colors/Themes
    oceanBlue: "شینی زەریایی",
    forestGreen: "سەوزی دارستانی",
    royalPurple: "مۆری شاهانە",
    sunsetOrange: "نارەنجی ئاوابوون",
    cherryRed: "سوری گێلاسی",
    deepTeal: "شینی قووڵ",
    warmPink: "پەمەیی گەرم",
    electricIndigo: "شینی کارەبایی",
    midnight: "نیوەشەو",
    
    // File operations
    uploadLogo: "لوگویێ تە",
    removeLogo: "ژێبرنا لوگوی",
    
    // Dashboard and UI
    generateProfessionalInvoices: "درستکرنا پسوڵێ بشێوەیەکێ مودرێن و ئاسان ",
    colorTheme: "ڕەنگی پسوڵێ",
    uploadCompanyLogo: "لوگویێ خو ئەپلود بکە",
    invoiceNumber: "ژمارا پسوڵێ",
    date: "رێکەفت",
    previewInvoice: "دیتنا پسوڵێ",
    downloadInvoice: "داونلودکرنا پسوڵێ",
    itemName: "ناڤێ کاری",
    additionalDetails: "پێزانینێن زێدەتر لسەر کاری",
    discountQuestion: "رێژا داشکاندنێ ژێبگرە",
    
    // Landing Page
    landingTitle: "درووستکرنا پسوڵێن پرۆفیشناڵ بێ بەرامبەر.",
    landingTitlePart1: "درووستکرنا پسوڵێن",
    landingTitlePart2: "پرۆفێشناڵ بێ بەرامبەر",
    landingSubtitle: "پسوڵێن جوان و پروفێشنال دروست بکە. پشتەڤانی بۆ ئینگلیزی، عەرەبی و کوردی ب فۆرماتکرنا تەمام یا ژ راستێ بۆ چەپێ. پێدڤی ب تۆمارکرنێ نینە، ب تەمامی بێ بەرامبەرە.",
    freeForever: "١٠٠٪ بێ بەرامبەر بۆ هەتاهەتایە",
    makeInvoice: "پسوڵا خو دروستبکە",
    startCreating: "دەست ب دروستکرنێ بکە",
    getStarted: "دەستپێبکە",
    noCreditCard: "پێدڤی ب کارتا کرێدیت نینە",
    readyInMinutes: "د دوو خولەکان دا ئامادە دبیت",
    
    // Navigation
    features: "تایبەتمەندی",
    howItWorks: "چەوا کاردکەت",
    contact: "بو پەیوەندی کرنێ",
    
    // Features
    featuresTitle: "هەمی تشتێن پێدڤی ژبو دروستکرنا پسوڵەکا پروفێشنال",
    featuresSubtitle: "هەمی تایبەتمەندیێن کو تو پێدڤی، ب تەمامی بێ بەرامبەر و بێ سنۆر.",
    multiLanguage: "پشتەڤانیا چەند زمانان",
    multiLanguageDesc: "پسوڵان دروست بکە ب زمانێن ئینگلیزی، عەرەبی و کوردی ب فۆرماتەکا تەمام یا راست-بۆ-چەپ و چەپ-بۆ-راست.",
    superFast: "زۆر بلەز",
    superFastDesc: "پسوڵێن پیشەیی دروست بکە د کێمتر ژ دوو خولەکاندا ب رووکارێ مە یێ سادە و بکارئینانێ ئاسان.",
    freeForeverFeature: "١٠٠٪ بێ بەرامبەر بۆ هەتاهەتایە",
    freeForeverDesc: "بێ خەرجیێن ڤەشارتی، بێ واتەرمارک، بێ سنور. ب تەمامی خۆڕاییە و پێدڤی ب تۆمارکرنێ نینە.",
    instantPdf: "داونلودکرنا پسوڵێ ب شێوازێ PDF",
    instantPdfDesc: "دشێی پسوڵێ خو بشێوازی pdf داونلود بکەی",
    beautifulThemes: "تێمبپلەیتێن جوان",
    beautifulThemesDesc: "ژ ٩ تێمێن رەنگێن سەرنجڕاکێش هەلبژێرە و لۆگۆیا کۆمپانیا خو بۆ براندینگێ زێدە بکە.",
    professionalDesign: "دیزاینەکا پیشەیی",
    professionalDesignDesc: "پسوڵێن تازە و ئامادە بۆ کار کو کۆمپانیا تە پیشەیی ددەنە دیارکرن.",
    
    // How it Works
    howItWorksTitle: "چەوا کاردکەت",
    howItWorksSubtitle: "پسوڵێن پیشەیی دروستبکە بتنێ د سێ پێنگاڤێن ئاسان دا",
    step1Title: "پرکردنا پێزانینێن پسوڵێ",
    step1Desc: "داخلكە زانیاریێن کۆمپانیا خو، زانیاریێن موشتەری، و بابه‌تێن فاکتورێ ب ئێک ژ سێ زمانێن پشتەڤانیکری.",
    step2Title: "ڕێکخستن و پێشڤە دیتن",
    step2Desc: "تیمێ خو یێ حەژێکری هەلبژێرە، لوگۆیا خو زێدە بکە، و پێشبینیا فاکتۆرا خو د دەمێ راستەقینە دا ببینە.",
    step3Title: "داونلودکرنا PDF",
    step3Desc: "فاکتورا تە یا پرۆفیشناڵ دروست بکە و داگرە وەک پی دی ئێفەکا ب کوالێتییا بلند ئامادە بۆ چاپکرنێ یان پارڤەکرنێ.",
    
    // Language Showcase
    languageShowcaseTitle: "ب سێ زمانان بەردەستە",
    languageShowcaseSubtitle: "بجوانترین شێوە پسوڵە دهێتە چێکرن ب هەرسێ زمانان",
    englishLang: "ئینگلیزی",
    arabicLang: "عەرەبی",
    kurdishLang: "کوردی",
    leftToRight: "چەپ بۆ ڕاست (LTR)",
    rightToLeft: "ڕاست بۆ چەپ (RTL)",
    automaticDirection: "ئاراستێ نڤیسینا زمانی",
    culturalFormatting: "ڕازاندنەوەی کولتووری",
    nativeFonts: "پشتگیریا فۆنتێن رەسەن",
    
    // Footer
    footerDescription: "دروستکەرێ پسوڵێن پرۆفیشناڵ کو ١٠٠% بێ بەرامبەرە بۆ هەتاهەتایێ. فاکتوورێن جوان دروست بکە ب ئینگلیزی، عەرەبی و کوردی.",
    product: "بەرهەم",
    languages: "زمان",
    allRightsReserved: "هەمی ماف د پاراستینە",
    madeBy: "هاتیە دروستکردن ژلایێ:",
  }
} as const;

export const getDirection = (lang: Language): 'ltr' | 'rtl' => {
  return lang === 'en' ? 'ltr' : 'rtl';
};

export const useTranslation = (lang: Language) => {
  return {
    t: (key: keyof typeof translations.en) => translations[lang][key] || translations.en[key],
    dir: getDirection(lang),
  };
};
