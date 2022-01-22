export function addUnit(value?: number | string): string | void {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return `${value}px`;
  }

  return void 0;
}
