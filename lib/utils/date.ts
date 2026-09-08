import * as jalaali from "jalaali-js";

export const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const PERSIAN_WEEKDAYS_SHORT = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export function toPersianDigits(input: string | number): string {
  const map: Record<string, string> = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };
  return String(input).replace(/[0-9]/g, (d) => map[d]);
}

export function gregorianToJalali(date: Date) {
  return jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function formatJalaliDate(date: Date, withWeekday = false) {
  const j = gregorianToJalali(date);
  const weekday = PERSIAN_WEEKDAYS_SHORT[date.getDay()];
  const base = `${toPersianDigits(j.jd)} ${PERSIAN_MONTHS[j.jm - 1]} ${toPersianDigits(j.jy)}`;
  return withWeekday ? `${weekday}، ${base}` : base;
}

export function jalaliMonthMatrix(jy: number, jm: number) {
  // returns weeks of the given jalali month as Date[] (gregorian) with nulls for padding
  const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);
  const firstGregorian = jalaali.toGregorian(jy, jm, 1);
  const firstDate = new Date(firstGregorian.gy, firstGregorian.gm - 1, firstGregorian.gd);
  // JS getDay(): 0=Sun..6=Sat. Persian week starts Saturday.
  const jsDay = firstDate.getDay(); // 0..6 (Sun..Sat)
  const offset = (jsDay + 1) % 7; // convert so Saturday=0

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const g = jalaali.toGregorian(jy, jm, d);
    cells.push(new Date(g.gy, g.gm - 1, g.gd));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function formatToman(amount: number) {
  return toPersianDigits(amount.toLocaleString("en-US")) + " تومان";
}

export function formatCompactToman(amount: number) {
  if (amount >= 1_000_000_000) {
    return toPersianDigits((amount / 1_000_000_000).toFixed(1)) + " میلیارد تومان";
  }
  if (amount >= 1_000_000) {
    return toPersianDigits(Math.round(amount / 1_000_000)) + " میلیون تومان";
  }
  return formatToman(amount);
}
