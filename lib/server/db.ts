import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { hashPassword } from "@/lib/server/password";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Reuse a single connection across hot-reloads in dev.
const globalForDb = globalThis as unknown as { __yalanDb?: DatabaseSync };

export const db = globalForDb.__yalanDb ?? new DatabaseSync(DB_PATH);
if (!globalForDb.__yalanDb) globalForDb.__yalanDb = db;

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    mobile TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin','customer')),
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    avatar_initial TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const userCount = db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number };
if (userCount.c === 0) {
  const insert = db.prepare(
    `INSERT INTO users (id, mobile, password_hash, role, full_name, title, avatar_initial)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  insert.run("admin-1", "09120000000", hashPassword("admin123"), "admin", "سارا محمودی", "مدیر ارشد فروش و پذیرش", "س");
  insert.run("customer-1", "09121234567", hashPassword("123456"), "customer", "آیدا و آرمین", "مراسم عروسی · ۱۴ شهریور ۱۴۰۵", "آ");
}

export interface DbUser {
  id: string;
  mobile: string;
  password_hash: string;
  role: "admin" | "customer";
  full_name: string;
  title: string;
  avatar_initial: string;
}

export function findUserByMobile(mobile: string): DbUser | undefined {
  return db.prepare("SELECT * FROM users WHERE mobile = ?").get(mobile) as DbUser | undefined;
}

export function findUserById(id: string): DbUser | undefined {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as DbUser | undefined;
}

export function toSafeUser(u: DbUser) {
  return {
    id: u.id,
    phone: u.mobile,
    role: u.role,
    name: u.full_name,
    title: u.title,
    avatarInitial: u.avatar_initial,
  };
}
