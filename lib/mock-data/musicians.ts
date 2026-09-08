// lib/mock-data/musicians.ts

export interface Musician {
  id: string;
  name: string;
  instrument: string;
  instrumentFa: string;
  image: string;
  avatar: string;
  bio: string;
  specialty: string;
  experience: number;
  style: string[];
  videoThumbnail: string;
  videoUrl: string;
  performances: {
    title: string;
    duration: string;
  }[];
}

export const MUSICIANS: Musician[] = [
  {
    id: "1",
    name: "آرین میرزایی",
    instrument: "Violin",
    instrumentFa: "ویولن",
    image: "/images/musicians/arian-violin.jpg",
    avatar: "/images/musicians/arian-avatar.jpg",
    bio: "نوازنده حرفه‌ای ویولن با بیش از ۱۵ سال تجربه در اجراهای زنده و مراسم‌های لوکس. سبک کلاسیک با نوآوری‌های مدرن.",
    specialty: "تکنوازی و رهبری ارکستر",
    experience: 15,
    style: ["کلاسیک", "تلفیقی", "فیلم"],
    videoThumbnail: "/images/musicians/arian-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    performances: [
      { title: "سوئیت ویولن شب‌های تهران", duration: "۴:۳۲" },
      { title: "اجرای زنده در عمارت یلان", duration: "۶:۱۸" }
    ]
  },
  {
    id: "2",
    name: "نگار رضایی",
    instrument: "Piano",
    instrumentFa: "پیانو",
    image: "/images/musicians/negar-piano.jpg",
    avatar: "/images/musicians/negar-avatar.jpg",
    bio: "پیانیست بین‌المللی با مدرک از کنسرواتوار وین. اجراهای او ترکیبی از احساس و تکنیک بی‌نظیر است.",
    specialty: "اجرای سولو و همراه با ارکستر",
    experience: 12,
    style: ["کلاسیک", "رمانتیک", "امپرسیونیسم"],
    videoThumbnail: "/images/musicians/negar-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    performances: [
      { title: "شب‌های پیانوی وین", duration: "۵:۴۵" },
      { title: "بداهه‌نوازی در باغ", duration: "۳:۵۶" }
    ]
  },
  {
    id: "3",
    name: "کاوه احمدی",
    instrument: "Tar",
    instrumentFa: "تار",
    image: "/images/musicians/kaveh-tar.jpg",
    avatar: "/images/musicians/kaveh-avatar.jpg",
    bio: "نوازنده چیره‌دست تار با رویکردی مدرن به موسیقی سنتی ایرانی. خالق آثاری فراموش‌نشدنی در تلفیق با موسیقی غربی.",
    specialty: "تار و سه‌تار",
    experience: 18,
    style: ["سنتی", "تلفیقی", "معاصر"],
    videoThumbnail: "/images/musicians/kaveh-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    performances: [
      { title: "آواز شب‌های گرمدره", duration: "۷:۱۲" },
      { title: "تار و ارکستر مجلسی", duration: "۵:۲۰" }
    ]
  },
  {
    id: "4",
    name: "سارا کریمی",
    instrument: "Cello",
    instrumentFa: "ویولنسل",
    image: "/images/musicians/sara-cello.jpg",
    avatar: "/images/musicians/sara-avatar.jpg",
    bio: "نوازنده ویولنسل با صدایی گرم و دل‌نشین. فارغ‌التحصیل از آکادمی موسیقی برلین و عضو ارکسترهای معتبر.",
    specialty: "اجرای سلو و گروهی",
    experience: 10,
    style: ["کلاسیک", "باروک", "معاصر"],
    videoThumbnail: "/images/musicians/sara-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    performances: [
      { title: "سوئیت ویلنسل در باغ", duration: "۴:۵۰" },
      { title: "دوئت با ویولن", duration: "۳:۳۵" }
    ]
  },
  {
    id: "5",
    name: "پویا مختاری",
    instrument: "Setar",
    instrumentFa: "سه‌تار",
    image: "/images/musicians/pouya-setar.jpg",
    avatar: "/images/musicians/pouya-avatar.jpg",
    bio: "نوازنده و آهنگساز جوان با نگاهی تازه به موسیقی ایرانی. سه‌تار او روایتی از عشق و طبیعت است.",
    specialty: "سه‌تار و بداهه‌نوازی",
    experience: 8,
    style: ["سنتی", "مدرن", "مینیمال"],
    videoThumbnail: "/images/musicians/pouya-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    performances: [
      { title: "سه‌تار در غروب", duration: "۵:۱۲" },
      { title: "بداهه‌نوازی در عمارت", duration: "۴:۴۰" }
    ]
  }
];

export const MUSIC_VIDEOS = [
  {
    id: "v1",
    title: "اجرای ارکستر آوان - عمارت یلان",
    thumbnail: "/images/music/ensemble-performance.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "۱۲:۳۴",
    musicians: ["آرین میرزایی", "نگار رضایی", "کاوه احمدی"],
    description: "اجرای زنده ارکستر آوان در فضای باغ عمارت یلان"
  },
  {
    id: "v2",
    title: "دوئت ویولن و پیانو - شب عروسی",
    thumbnail: "/images/music/violin-piano-duet.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "۸:۴۵",
    musicians: ["آرین میرزایی", "نگار رضایی"],
    description: "اجرای دوئت در شب عروسی زوج‌های عمارت یلان"
  }
];