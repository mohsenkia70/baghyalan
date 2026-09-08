"use client";

import Image from "next/image";
import { MapPin, Car, Navigation, ParkingCircle, Clock, Map } from "lucide-react";
import { PageHeader } from "@/components/customer/PageHeader";
import { Button } from "@/components/ui/Button";
import { VENUE_IMAGES } from "@/lib/mock-data/venue";

// موقعیت دقیق عمارت یلان
const VENUE_LATITUDE = 35.75110648836398;
const VENUE_LONGITUDE = 51.04439997010595;

export default function MapPage() {
  
  // تابع هدایت کاربر به مسیریاب گوگل مپ
  const handleNavigation = () => {
    const destination = `${VENUE_LATITUDE},${VENUE_LONGITUDE}`;
    const googleMapsUrl = new URL("https://www.google.com/maps/dir/");

    googleMapsUrl.searchParams.set("api", "1");
    googleMapsUrl.searchParams.set("destination", destination);
    googleMapsUrl.searchParams.set("travelmode", "driving");

    window.open(googleMapsUrl.toString(), "_blank", "noopener,noreferrer");
  };

  // لینک مستقیم گوگل مپ
  const googleMapsLink = `https://www.google.com/maps?q=${VENUE_LATITUDE},${VENUE_LONGITUDE}&hl=fa&z=16`;

  return (
    <div className="flex flex-col pb-8">
      <PageHeader title="نقشه و مسیر دسترسی" subtitle="عمارت یلان، گرمدره، البرز" />

      {/* نقشه با iframe ساده بدون API Key */}
      <div
        onClick={handleNavigation}
        className="group relative mx-5 mt-2 h-[280px] overflow-hidden rounded-[var(--radius-xl)] border border-stone/50 bg-stone-light shadow-sm cursor-pointer"
        title="کلیک برای مسیریابی"
      >
        <iframe
          src={`https://www.google.com/maps?q=${VENUE_LATITUDE},${VENUE_LONGITUDE}&hl=fa&z=16&output=embed`}
          className="h-full w-full border-0"
          allowFullScreen={false}
          loading="lazy"
          title="موقعیت عمارت یلان روی نقشه"
        />

        {/* لایه گرادینت تیره روی نقشه برای خوانایی اطلاعات */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity group-hover:from-black/80 pointer-events-none" />

        {/* نشانگر مارکر روی نقشه (آیکون سفارشی) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            {/* افکت نبض‌زننده */}
            <div className="absolute -inset-4 animate-ping rounded-full bg-gold/40" />
            <div className="absolute -inset-2 animate-pulse rounded-full bg-gold/20" style={{ animationDuration: '2s' }} />
            {/* آیکون مارکر */}
            <div className="relative flex h-10 w-10 items-center justify-center">
              <svg
                className="h-10 w-10 drop-shadow-2xl"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C16 18 20 14.5 20 10.2C20 6.22355 16.4183 3 12 3C7.58172 3 4 6.22355 4 10.2C4 14.5 8 18 12 22Z"
                  fill="#C9A84C"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <circle cx="12" cy="10" r="3.5" fill="white" />
                <circle cx="12" cy="10" r="1.5" fill="#C9A84C" />
              </svg>
            </div>
          </div>
        </div>

        {/* جزئیات روی نقشه */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white shadow-lg ring-2 ring-white/30">
              <Map size={14} />
            </span>
            <div>
              <span className="text-[13px] font-bold shadow-sm drop-shadow-lg">
                عمارت یلان
              </span>
              <span className="block text-[10px] text-white/80">
                گرمدره، بلوار اصلی
              </span>
            </div>
          </div>
          <span className="rounded-md bg-white/20 px-3 py-1.5 text-[10px] font-medium backdrop-blur-sm">
            مسیریابی
          </span>
        </div>
      </div>

      {/* لینک باز کردن نقشه در گوگل مپ */}
      <div className="mx-5 mt-3">
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-stone/50 bg-paper px-4 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-stone/5"
        >
          <Map size={16} className="text-gold" />
          مشاهده نقشه در Google Maps
          <span className="text-[10px] text-ink-soft">(کلیک کنید)</span>
        </a>
      </div>

      <div className="mx-5 mt-5 flex flex-col gap-3">
        <InfoRow icon={MapPin} title="آدرس" desc="استان البرز، گرمدره، بلوار اصلی، عمارت یلان" />
        <InfoRow icon={Clock} title="فاصله از تهران" desc="حدود ۴۵ دقیقه از غرب تهران" />
        <InfoRow icon={ParkingCircle} title="پارکینگ" desc="پارکینگ اختصاصی با ظرفیت بیش از ۱۵۰ خودرو و پارکبان شب مراسم" />
        <InfoRow icon={Car} title="مسیر پیشنهادی" desc="آزادراه تهران–کرج، خروجی گرمدره، مسیر بلوار اصلی" />
      </div>

      <div className="relative mx-5 mt-6 h-40 overflow-hidden rounded-[var(--radius-lg)]">
        <Image 
          src={VENUE_IMAGES.entranceDome} 
          alt="ورودی عمارت یلان" 
          fill 
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover" 
        />
      </div>

      <div className="mx-5 mt-6">
        <Button className="w-full" variant="gold" onClick={handleNavigation}>
          <Navigation size={16} /> مسیریابی با Google Maps
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-[13.5px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[12px] leading-5 text-ink-soft">{desc}</p>
      </div>
    </div>
  );
}