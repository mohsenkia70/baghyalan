import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone, MessageCircle, Users, Wallet, Calendar, ImageIcon } from "lucide-react";
import { LEADS, CONSULTANTS } from "@/lib/mock-data/crm";
import { GALLERY_IMAGES, PACKAGES } from "@/lib/mock-data/venue";
import { StatusChip } from "@/components/ui/Badge";
import { toPersianDigits, formatCompactToman } from "@/lib/utils/date";

export function generateStaticParams() {
  return LEADS.map((l) => ({ leadId: l.id }));
}

export default async function LeadDetailPage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const lead = LEADS.find((l) => l.id === leadId);
  if (!lead) notFound();
  const consultant = CONSULTANTS.find((c) => c.id === lead.consultantId);
  const suggestedPackage = PACKAGES[1];
  const savedIdeas = GALLERY_IMAGES.slice(0, 3);

  return (
    <div className="flex flex-col gap-6 mt-14">
      <Link href="/admin/leads" className="flex w-fit items-center gap-1.5 text-[13px] text-ink-soft hover:text-ink">
        <ArrowRight size={15} /> بازگشت به لیست لیدها
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-[var(--radius-xl)] bg-paper border border-stone/50 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-tint font-display text-[22px] text-forest">
            {lead.fullName[0]}
          </span>
          <div>
            <h1 className="font-display text-[21px] text-ink">{lead.fullName}</h1>
            <p className="text-[12.5px] text-ink-soft">{lead.eventType} · {lead.possibleDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusChip status={lead.stage} />
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/50 text-ink">
            <Phone size={15} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/50 text-ink">
            <MessageCircle size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">اطلاعات اصلی</p>
            <div className="grid grid-cols-2 gap-3 text-[12.5px] sm:grid-cols-4">
              <InfoItem icon={Phone} label="تماس" value={lead.phone} />
              <InfoItem icon={Users} label="مهمانان" value={`${toPersianDigits(lead.guestCount)} نفر`} />
              <InfoItem icon={Wallet} label="بودجه" value={formatCompactToman(lead.budget)} />
              <InfoItem icon={Calendar} label="تاریخ احتمالی" value={lead.possibleDate} />
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">یادداشت‌های مشاور</p>
            <div className="flex flex-col gap-3">
              {lead.notes.map((n) => (
                <div key={n.id} className="rounded-[var(--radius-md)] bg-ivory-deep/40 p-3">
                  <div className="flex items-center justify-between text-[11px] text-ink-soft">
                    <span className="font-medium text-ink">{n.author}</span>
                    <span>{n.date}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-6 text-ink">{n.text}</p>
                </div>
              ))}
            </div>
            <textarea
              placeholder="افزودن یادداشت جدید..."
              className="mt-3 h-20 w-full resize-none rounded-[var(--radius-md)] border border-stone/50 bg-ivory p-3 text-[12.5px] outline-none focus:border-gold"
            />
          </div>

          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">ایده‌های ذخیره‌شده مشتری</p>
            <div className="grid grid-cols-3 gap-2">
              {savedIdeas.map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-forest-tint">
                  <ImageIcon size={16} className="absolute inset-0 m-auto text-forest/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">مشاور مسئول</p>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-paper font-display text-[15px]">
                {consultant?.avatarInitial}
              </span>
              <div>
                <p className="text-[13px] font-medium text-ink">{consultant?.name}</p>
                <p className="text-[11px] text-ink-soft">{consultant?.role}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">پکیج پیشنهادی</p>
            <p className="font-display text-[17px] text-forest">{suggestedPackage.name}</p>
            <p className="mt-1 text-[12px] text-ink-soft">{formatCompactToman(suggestedPackage.priceFrom)}</p>
          </div>

          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">وضعیت پرداخت</p>
            <StatusChip status="در انتظار" />
          </div>

          <div className="rounded-[var(--radius-lg)] bg-paper border border-stone/50 p-5">
            <p className="mb-3 text-[13.5px] font-medium text-ink">فعالیت‌های اخیر</p>
            <ul className="flex flex-col gap-2 text-[11.5px] text-ink-soft">
              <li>ثبت لید · {lead.createdAt}</li>
              <li>تماس اولیه انجام شد</li>
              <li>پیام جدید در گفتگو</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-ivory-deep/40 p-2.5">
      <span className="flex items-center gap-1.5 text-[10.5px] text-ink-soft">
        <Icon size={11} /> {label}
      </span>
      <p className="mt-1 font-medium text-ink">{value}</p>
    </div>
  );
}
