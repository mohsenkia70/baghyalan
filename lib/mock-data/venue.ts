import type { Amenity, GalleryImage, MenuItem, PackageTier, Testimonial, VenueSpace } from "@/lib/types";

export const VENUE_CONTACT = {
  phoneDisplay: "۰۹۱۲ ۱۲۳ ۴۵۶۷",
  phoneHref: "tel:+989121234567",
  whatsappHref: "https://wa.me/989121234567",
  instagram: "@emarat_yalan",
  workingHours: "همه‌روزه ۹ صبح تا ۹ شب",
} as const;

export const VENUE_IMAGES = {
  rotundaNight: "/images/venue/rotunda-night.webp",
  sofrehAghdDay: "/images/venue/sofreh-aghd-day.webp",
  entranceDome: "/images/venue/entrance-dome.webp",
  coupleFountain: "/images/venue/couple-fountain.webp",
  ballroom: "/images/venue/ballroom.webp",
} as const;

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: "garden",
    name: "باغ عمارت",
    shortDescription: "درختان کهن، فضای سبز بی‌انتها و هوای معطر بهاری",
    description:
      "باغ عمارت یلان با درختان تنومند و چمن‌های مانیکور شده، بستری طبیعی برای مراسمی می‌سازد که هیچ‌گاه از یاد نمی‌رود. مسیرهای سنگ‌فرش، نورپردازی مخفی در میان بوته‌ها و فضای باز برای پذیرایی مهمانان، این باغ را به قلب تپنده هر جشن بزرگ تبدیل کرده است.",
    image: VENUE_IMAGES.rotundaNight,
    tags: ["فضای باز", "مناسب عکاسی", "ظرفیت بالا"],
  },
  {
    id: "rotunda",
    name: "گلدسته ستون‌دار",
    shortDescription: "رتوندای سنگی با ستون‌های کورینتی و نورپردازی شبانه",
    description:
      "این گلدسته‌ی دایره‌ای با ستون‌های سنگی کورینتی، مرکز ثقل مراسم شب است. گل‌آرایی سفید روی سرستون‌ها و نورپردازی طلایی ملایم، فضایی رویایی برای عقد یا شام رسمی مهمانان می‌سازد.",
    image: VENUE_IMAGES.rotundaNight,
    tags: ["مراسم شب", "معماری کلاسیک", "گل‌آرایی سفید"],
  },
  {
    id: "aghd",
    name: "فضای عقد و سفره‌عقد",
    shortDescription: "زیر گلدسته، در نور طبیعی روز، برای لحظه‌ی بله گفتن",
    description:
      "سفره‌عقد در دل همان رتوندای سنگی، اما در نور ملایم روز چیده می‌شود. آینه و شمعدان، گل‌های سفید و کرم، و چیدمانی متقارن که هر قاب عکس را به یک تابلوی هنری بدل می‌کند.",
    image: VENUE_IMAGES.sofrehAghdDay,
    tags: ["عقد", "نور روز", "چیدمان کلاسیک"],
  },
  {
    id: "entrance",
    name: "ورودی و گنبد اصلی",
    shortDescription: "نخستین تصویری که مهمانان از عمارت یلان به یاد می‌آورند",
    description:
      "ورودی عمارت با گنبد نقاشی‌شده، لوستر بزرگ کریستال و پله‌های مرمرین آراسته به گل‌های رز، نخستین قدم مهمانان به دنیای عمارت یلان است — قدمی که با شکوه آغاز می‌شود.",
    image: VENUE_IMAGES.entranceDome,
    tags: ["ورودی", "عکاسی", "لحظه استقبال"],
  },
  {
    id: "ballroom",
    name: "سالن پذیرایی",
    shortDescription: "سقف‌کاری گچ‌بری‌شده، لوسترهای کریستال و ظرفیت مجلل",
    description:
      "سالن اصلی با سقف گچ‌بری‌شده، ردیف لوسترهای کریستال و میزهای مجلل، محل برگزاری شام و پذیرایی رسمی است. طراحی داخلی سالن با گل‌آرایی سفید و چیدمان ظریف میزها، حس یک بالرومِ اروپایی را به مهمانان القا می‌کند.",
    image: VENUE_IMAGES.ballroom,
    tags: ["سالن سرپوشیده", "ظرفیت ۴۰۰ نفر", "شام رسمی"],
  },
  {
    id: "photo-spot",
    name: "لوکیشن عکاسی کنار آب‌نما",
    shortDescription: "پیاده‌روی سنگی روی آب، برای ماندگارترین قاب‌های عروسی",
    description:
      "مسیر سنگی روی آب‌نمای اصلی عمارت، صحنه‌ی محبوب‌ترین عکس‌های عروس و داماد است؛ با پس‌زمینه‌ی نمای اصلی عمارت و بازتاب نور در آب.",
    image: VENUE_IMAGES.coupleFountain,
    tags: ["عکاسی", "آب‌نما", "غروب"],
  },
];

export const AMENITIES: Amenity[] = [
  { id: "garden-amenity", title: "باغ بزرگ و مجلل", description: "بیش از ۱۰ هزار متر فضای سبز طراحی‌شده", detail: "مسیرهای سنگ‌فرش، چمن مانیکور، درختان کهن و نورپردازی مناظر شبانه.", image: VENUE_IMAGES.rotundaNight, icon: "trees" },
  { id: "hall-amenity", title: "سالن پذیرایی", description: "ظرفیت تا ۴۰۰ نفر با چیدمان مجلل", detail: "سقف گچ‌بری‌شده، لوستر کریستال و صدابرداری حرفه‌ای برای مراسم شب.", image: VENUE_IMAGES.ballroom, icon: "building" },
  { id: "aghd-amenity", title: "فضای عقد اختصاصی", description: "رتوندای سنگی زیر گلدسته", detail: "چیدمان سفره‌عقد سفارشی با هماهنگی کامل رنگ و گل‌آرایی.", image: VENUE_IMAGES.sofrehAghdDay, icon: "heart" },
  { id: "fountain-amenity", title: "آب‌نما و مسیر عکاسی", description: "پس‌زمینه‌ای رویایی برای عکاسی", detail: "مسیر سنگی روی آب با نورپردازی غروب، محبوب‌ترین لوکیشن عکاسی مهمانان.", image: VENUE_IMAGES.coupleFountain, icon: "waves" },
  { id: "photo-amenity", title: "لوکیشن عکاسی حرفه‌ای", description: "چند نقطه‌ی ثابت برای عکاسی هنری", detail: "از ورودی گنبددار تا کنار آب‌نما، تیم عکاسی مسیر مشخصی برای بهترین نور دارد.", image: VENUE_IMAGES.entranceDome, icon: "camera" },
  { id: "parking-amenity", title: "پارکینگ اختصاصی", description: "ظرفیت بیش از ۱۵۰ خودرو", detail: "پارکبان اختصاصی شب مراسم و مسیر روشن تا ورودی اصلی.", image: VENUE_IMAGES.entranceDome, icon: "car" },
  { id: "bride-room-amenity", title: "اتاق اختصاصی عروس", description: "فضای آماده‌سازی خصوصی و آرام", detail: "آینه قدی، نورپردازی حرفه‌ای آرایش و نشیمن برای نزدیکان.", image: VENUE_IMAGES.ballroom, icon: "sparkles" },
  { id: "florist-amenity", title: "گل‌آرایی سفارشی", description: "هماهنگ با پالت رنگی مراسم شما", detail: "تیم گل‌آرایی داخلی با گلخانه‌ی اختصاصی، چیدمان روز و شب را جدا طراحی می‌کند.", image: VENUE_IMAGES.rotundaNight, icon: "flower" },
  { id: "lighting-amenity", title: "نورپردازی صحنه", description: "طراحی نور اختصاصی برای هر بخش مراسم", detail: "از نور گرم ورود عروس تا افکت‌های رقص نور برای پیست.", image: VENUE_IMAGES.ballroom, icon: "lightbulb" },
  { id: "music-amenity", title: "موسیقی زنده و DJ", description: "هماهنگی کامل صدا و سیستم پخش", detail: "گروه موسیقی سنتی برای مراسم عقد، DJ حرفه‌ای برای بخش جشن، و به‌صورت ویژه امکان اجرای زنده توسط ارکستر VIP آوان بند به مدیریت فرشاد رشیدی (نوازنده ویولن)، همراه با تیم کامل در محوطه عمارت.", image: VENUE_IMAGES.ballroom, icon: "music" },
  { id: "catering-amenity", title: "پذیرایی و کترینگ", description: "منوی متنوع ایرانی و بین‌المللی", detail: "سرآشپز اختصاصی و امکان سفارشی‌سازی کامل منو بر اساس سلیقه مهمانان.", image: VENUE_IMAGES.ballroom, icon: "utensils" },
  { id: "ceremony-amenity", title: "تشریفات کامل مراسم", description: "هماهنگ‌کننده اختصاصی روز مراسم", detail: "از هماهنگی ورود مهمانان تا زمان‌بندی دقیق برنامه، همه زیر نظر یک مسئول تشریفات.", image: VENUE_IMAGES.entranceDome, icon: "clipboard-check" },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "g1", src: VENUE_IMAGES.rotundaNight, alt: "گلدسته ستون‌دار در شب با گل‌آرایی سفید", category: "مراسم شب", caption: "رتوندای سنگی زیر نور طلایی شب", width: 1360, height: 1020 },
  { id: "g2", src: VENUE_IMAGES.sofrehAghdDay, alt: "سفره عقد در نور روز زیر گلدسته", category: "سفره عقد", caption: "چیدمان سفره‌عقد در نور ملایم بامداد", width: 1360, height: 1020 },
  { id: "g3", src: VENUE_IMAGES.entranceDome, alt: "ورودی گنبددار عمارت با پله‌های گل‌آرایی‌شده", category: "باغ", caption: "ورودی اصلی، نخستین قدم به عمارت یلان", width: 1052, height: 718 },
  { id: "g4", src: VENUE_IMAGES.coupleFountain, alt: "عروس و داماد در مسیر آب‌نما", category: "جایگاه عروس و داماد", caption: "قدم زدن عروس و داماد کنار آب‌نمای اصلی", width: 579, height: 1020 },
  { id: "g5", src: VENUE_IMAGES.ballroom, alt: "سالن پذیرایی با لوسترهای کریستال", category: "سالن", caption: "سالن اصلی، آماده برای شام رسمی مهمانان", width: 1360, height: 765 },
  { id: "g6", src: VENUE_IMAGES.rotundaNight, alt: "گل‌آرایی سفید ستون‌ها در شب", category: "گل‌آرایی", caption: "گل‌آرایی سفید و سبز روی سرستون‌ها", width: 1360, height: 1020 },
  { id: "g7", src: VENUE_IMAGES.sofrehAghdDay, alt: "میزهای آینه‌کاری‌شده مراسم عقد", category: "عقد", caption: "جزئیات چیدمان روی میزهای آینه‌ای", width: 1360, height: 1020 },
  { id: "g8", src: VENUE_IMAGES.ballroom, alt: "میزهای شام با گل‌آرایی سفید", category: "مراسم روز", caption: "چیدمان میزهای مهمانان پیش از ورود", width: 1360, height: 765 },
];

export const PACKAGES: PackageTier[] = [
  {
    id: "classic",
    name: "کلاسیک",
    tagline: "مراسمی برازنده با امکانات کامل و اجرای بی‌نقص",
    priceFrom: 950_000_000,
    suitableFor: "زوج‌هایی که مراسمی شیک و مقرون‌به‌صرفه می‌خواهند",
    services: ["استفاده از باغ و سالن", "گل‌آرایی استاندارد", "نورپردازی پایه", "پذیرایی از ۱۵۰ مهمان", "عکاسی و فیلم‌برداری پایه"],
  },
  {
    id: "royal",
    name: "رویال",
    tagline: "تجربه‌ای کامل با جزئیات سفارشی و خدمات ویژه",
    priceFrom: 1_650_000_000,
    suitableFor: "زوج‌هایی که به دنبال تجربه‌ای متمایز و شخصی‌سازی‌شده هستند",
    services: ["استفاده کامل از باغ، رتوندا و سالن", "گل‌آرایی سفارشی رنگی", "نورپردازی صحنه‌ای", "پذیرایی از ۳۰۰ مهمان", "عکاسی، فیلم‌برداری هوایی و آلبوم لوکس", "هماهنگ‌کننده اختصاصی روز مراسم"],
    highlighted: true,
  },
  {
    id: "luxury",
    name: "لاکچری",
    tagline: "بی‌نظیرترین نسخه‌ی عمارت یلان، بدون هیچ محدودیتی",
    priceFrom: 2_800_000_000,
    suitableFor: "مراسم‌های بزرگ با استانداردهای بین‌المللی",
    services: ["اختصاص کامل عمارت برای یک روز", "طراحی اختصاصی دکور و گل‌آرایی", "اجرای زنده ارکستر VIP آوان بند", "پذیرایی نامحدود مهمانان", "تیم کامل عکاسی و فیلم‌برداری سینمایی", "خدمات VIP برای خانواده‌ها", "هماهنگ‌کننده اختصاصی + تیم پشتیبانی ۲۴ ساعته"],
  },
];

export const MENU_ITEMS: MenuItem[] = [
  { id: "m1", name: "زرشک‌پلو با مرغ", description: "برنج ایرانی دم‌کرده با زعفران اصل", category: "غذای اصلی" },
  { id: "m2", name: "چلوکباب بختیاری", description: "فیله و کوبیده گوشت گوسفندی گریل‌شده", category: "غذای اصلی" },
  { id: "m3", name: "مرغ استانبولی", description: "با ادویه‌های مخصوص سرآشپز", category: "غذای اصلی" },
  { id: "m4", name: "سالاد سزار", description: "کاهو، سینه مرغ گریل و سس مخصوص", category: "سالاد" },
  { id: "m5", name: "سالاد شیرازی", description: "خیار، گوجه و پیاز تازه با لیموترش", category: "سالاد" },
  { id: "m6", name: "سوپ جو", description: "سوپ گرم پیش‌غذای مراسم", category: "پیش‌غذا" },
  { id: "m7", name: "کوکتل میگو", description: "با سس مخصوص و سبزیجات تازه", category: "پیش‌غذا" },
  { id: "m8", name: "شیرینی تر مخصوص یلان", description: "دستپخت آشپزخانه اختصاصی عمارت", category: "دسر" },
  { id: "m9", name: "بستنی سنتی با زعفران", description: "سرو در ایستگاه دسر", category: "دسر" },
  { id: "m10", name: "شربت آلبالو و به‌لیمو", description: "نوشیدنی سنتی خوش‌رنگ", category: "نوشیدنی" },
  { id: "m11", name: "موکتیل میوه‌ای", description: "ترکیب میوه‌های فصل", category: "نوشیدنی" },
  { id: "m12", name: "میز فینگرفود مینیاتوری", description: "تنوعی از پیش‌غذاهای مینیاتوری", category: "فینگرفود" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", coupleName: "آیدا و آرمین", eventDate: "شهریور ۱۴۰۴", style: "رویال", image: VENUE_IMAGES.coupleFountain, quote: "از لحظه ورود تا آخرین دقیقه مراسم، همه‌چیز دقیقاً همانی بود که رؤیایش را داشتیم." },
  { id: "t2", coupleName: "نگار و پویا", eventDate: "اردیبهشت ۱۴۰۴", style: "کلاسیک", image: VENUE_IMAGES.sofrehAghdDay, quote: "سفره‌عقدمان زیر گلدسته، دقیقاً همان صحنه‌ای بود که در ذهنمان تصور کرده بودیم." },
  { id: "t3", coupleName: "ترانه و کیان", eventDate: "مهر ۱۴۰۳", style: "رویال", image: VENUE_IMAGES.rotundaNight, quote: "نورپردازی شب عمارت یک تجربه سینمایی برای مهمانان ما ساخت." },
];
