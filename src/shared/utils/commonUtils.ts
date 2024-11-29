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
