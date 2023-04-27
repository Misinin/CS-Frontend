interface StackObj {
  targetObj: Record<string, unknown>;
  path: string;
}

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

function stack(obj: Record<string, unknown>) {
  const stack: StackObj[] = [{ targetObj: obj, path: "" }];
  const res: Record<string, unknown> = {};

  while (stack.length !== 0) {
    const currentObj = stack.pop();
    const object = currentObj?.targetObj;
    const currentPath = currentObj?.path;

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        const newObj = object[key] as Record<string, unknown>;

        if (typeof newObj !== "object") {
          res[newPath] = newObj;
        }
        stack.push({ targetObj: newObj, path: newPath });
      }
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

// console.log(stack(obj));
// console.log(recursive(obj));
