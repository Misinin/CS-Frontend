export function hashFunction(value: unknown, capacity: number): number {
  if (typeof value === "string") {
    let res = 0;

    for (let char of value) {
      res += char.charCodeAt(0) * 31;
    }

    return res % capacity;
  }

  if (typeof value === "number") {
    if (Math.abs(value) < capacity) return Math.abs(value);
    return value % 120;
  }

  if (typeof value === "boolean") {
    const stringValue = String(value);
    return hashFunction(stringValue, capacity);
  }

  if (typeof value === "undefined") {
    const stringValue = String(value);
    return hashFunction(stringValue, capacity);
  }

  if (typeof value === "object") {
    const stringValue = JSON.stringify(value);

    return hashFunction(stringValue, capacity);
  }

  return 0;
}
