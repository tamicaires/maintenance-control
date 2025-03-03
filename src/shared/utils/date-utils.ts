export function getStartOfDay(date: Date): Date {
  return new Date(date.setHours(0, 0, 0, 0));
}

export function getEndOfDay(date: Date): Date {
  return new Date(date.setHours(23, 59, 59, 999));
}

export function getDateNHoursAgo(date: Date, hours: number): Date {
  return new Date(date.getTime() - hours * 60 * 60 * 1000);
}

export function formatHour(date: Date): string {
  return date.getHours().toString().padStart(2, "0") + ":00";
}