function recursive(
  obj: Record<string, unknown>,
  path: string = "",
  res: Record<string, unknown> = {}
) {
  const currentPath = path || "";

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      const targetObj = obj[key] as Record<string, unknown>;
      const newRes = res;

      if (typeof targetObj !== "object") {
        newRes[newPath] = targetObj;
      }
      recursive(targetObj, newPath, newRes);
    }
  }
  return res;
}

const obj = {
  a: {
    b: [1, 2],
    "": { c: 2 },
  },
};

console.log(recursive(obj));
