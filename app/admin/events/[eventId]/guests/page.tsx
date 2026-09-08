"use client";

import { useParams } from "next/navigation";

import { GuestManagementPanel } from "@/components/admin/events/GuestManagementPanel";

export default function AdminEventGuestsPage() {
  const params = useParams<{ eventId: string }>();

  return (
    <GuestManagementPanel eventId={params.eventId} />
  );
}