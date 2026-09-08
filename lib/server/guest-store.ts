import type { Guest } from "@/lib/types";

import { EVENTS } from "@/lib/mock-data/events";

const guestStore = new Map<string, Guest[]>();

function cloneGuests(guests: Guest[]): Guest[] {
  return guests.map((guest) => ({ ...guest }));
}

function initializeStore() {
  if (guestStore.size > 0) return;

  for (const event of EVENTS) {
    guestStore.set(event.id, cloneGuests(event.guests ?? []));
  }
}

initializeStore();

export function hasEvent(eventId: string): boolean {
  return EVENTS.some((event) => event.id === eventId);
}

export function getGuests(eventId: string): Guest[] | null {
  if (!hasEvent(eventId)) {
    return null;
  }

  return cloneGuests(guestStore.get(eventId) ?? []);
}

export function getGuest(
  eventId: string,
  guestId: string
): Guest | null {
  if (!hasEvent(eventId)) {
    return null;
  }

  const guests = guestStore.get(eventId) ?? [];

  const guest = guests.find((item) => item.id === guestId);

  return guest ? { ...guest } : null;
}

export function createGuest(
  eventId: string,
  guest: Guest
): Guest | null {
  if (!hasEvent(eventId)) {
    return null;
  }

  const guests = guestStore.get(eventId) ?? [];

  guests.push({ ...guest });

  guestStore.set(eventId, guests);

  return { ...guest };
}

export function updateGuest(
  eventId: string,
  guestId: string,
  updates: Partial<Guest>
): Guest | null {
  if (!hasEvent(eventId)) {
    return null;
  }

  const guests = guestStore.get(eventId) ?? [];

  const index = guests.findIndex((guest) => guest.id === guestId);

  if (index === -1) {
    return null;
  }

  const updatedGuest: Guest = {
    ...guests[index],
    ...updates,
    id: guests[index].id,
  };

  guests[index] = updatedGuest;

  guestStore.set(eventId, guests);

  return { ...updatedGuest };
}

export function deleteGuest(
  eventId: string,
  guestId: string
): boolean {
  if (!hasEvent(eventId)) {
    return false;
  }

  const guests = guestStore.get(eventId) ?? [];

  const index = guests.findIndex((guest) => guest.id === guestId);

  if (index === -1) {
    return false;
  }

  guests.splice(index, 1);

  guestStore.set(eventId, guests);

  return true;
}

export function checkInGuest(
  eventId: string,
  guestId: string,
  checkedInBy: string,
  checkedInAt: string
): Guest | null {
  if (!hasEvent(eventId)) {
    return null;
  }

  const guests = guestStore.get(eventId) ?? [];

  const index = guests.findIndex((guest) => guest.id === guestId);

  if (index === -1) {
    return null;
  }

  const guest = guests[index];

  const updatedGuest: Guest = {
    ...guest,
    checkInStatus: "وارد شده",
    checkedInAt,
    checkedInBy,
  };

  guests[index] = updatedGuest;

  guestStore.set(eventId, guests);

  return { ...updatedGuest };
}