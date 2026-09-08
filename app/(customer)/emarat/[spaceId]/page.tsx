import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VENUE_SPACES, GALLERY_IMAGES } from "@/lib/mock-data/venue";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/customer/PageHeader";

export function generateStaticParams() {
  return VENUE_SPACES.map((s) => ({ spaceId: s.id }));
}

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;
  const space = VENUE_SPACES.find((s) => s.id === spaceId);
  if (!space) notFound();

  const related = GALLERY_IMAGES.slice(0, 4);

  return (
    <div className="flex flex-col pb-6">
      <div className="relative h-[320px] w-full">
        <Image src={space.image} alt={space.name} fill priority sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-night/10 to-night/40" />
        <div className="absolute inset-x-0 top-0">
          <PageHeader title="" transparent />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h1 className="font-display text-[28px] text-on-night text-balance">{space.name}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5">
        <div className="flex flex-wrap gap-1.5">
          {space.tags.map((tag) => (
            <Badge key={tag} tone="gold">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-[14.5px] leading-7 text-ink-soft">{space.description}</p>

        <div className="grid grid-cols-2 gap-2">
          {related.map((img) => (
            <div key={img.id} className="relative h-28 overflow-hidden rounded-[var(--radius-md)]">
              <Image src={img.src} alt={img.alt} fill sizes="180px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
          <Link href="/bazdid" className="flex-1">
            <Button className="w-full">رزرو بازدید حضوری</Button>
          </Link>
          <Link href="/barname-rizi" className="flex-1">
            <Button variant="outline" className="w-full">
              افزودن به مراسم من
            </Button>
          </Link>
        </div>

        <Link href="/emarat" className="text-center text-[13px] font-medium text-gold-deep">
          مشاهده سایر فضاهای عمارت
        </Link>
      </div>
    </div>
  );
}
