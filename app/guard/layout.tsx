import { AuthGate } from "@/components/auth/AuthGate";

export default function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate role="guard">
      <div
        dir="rtl"
        className="min-h-dvh bg-ivory text-ink"
      >
        {children}
      </div>
    </AuthGate>
  );
}