import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

export function assertNotNullValue<T>(
  value: T | null | undefined,
  error: ExceptionHandler
): T {
  if (value === null || value === undefined) {
    throw error;
  }
  return value;
}

export const calculateProgress = <T>(
  items: T[],
  completedStatus: keyof T | ((item: T) => boolean)
): number => {
  const totalItems = items.length;

  if (totalItems === 0) return 0;

  const isCompleted = typeof completedStatus === 'function'
    ? completedStatus
    : (item: T) => item[completedStatus] === "COMPLETED";

  const completedItems = items.filter(isCompleted).length;

  return (completedItems / totalItems) * 100;
};