import crypto from "node:crypto";

import type { UserRole } from "@/lib/types";

export const SESSION_COOKIE = "emarat_yalan_session";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "emarat-yalan-development-secret";

interface SessionPayload {
  uid: string;
  role: UserRole;
  exp: number;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(payload: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
}

export function createSessionToken(
  uid: string,
  role: UserRole
): string {
  const payload: SessionPayload = {
    uid,
    role,
    exp:
      Math.floor(Date.now() / 1000) +
      SESSION_MAX_AGE,
  };

  const encodedPayload = encode(
    JSON.stringify(payload)
  );

  const signature = createSignature(
    encodedPayload
  );

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(
  token: string
): SessionPayload | null {
  try {
    const [encodedPayload, signature] =
      token.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const expectedSignature =
      createSignature(encodedPayload);

    const signatureBuffer =
      Buffer.from(signature);

    const expectedSignatureBuffer =
      Buffer.from(expectedSignature);

    if (
      signatureBuffer.length !==
      expectedSignatureBuffer.length
    ) {
      return null;
    }

    const isValid = crypto.timingSafeEqual(
      signatureBuffer,
      expectedSignatureBuffer
    );

    if (!isValid) {
      return null;
    }

    const payload = JSON.parse(
      decode(encodedPayload)
    ) as SessionPayload;

    if (!payload.uid || !payload.role) {
      return null;
    }

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}