export const updateNestedObject = <T extends { [key: string]: any }>(
  obj: T,
  path: string | string[],
  value: any
): T => {
  const updatedObject = { ...obj };

  if (typeof path === "string") {
    path = path.split(".");
  }

  const currentPath = path.shift();

  // si aucun path alors obj has been updated
  if (currentPath !== undefined) {
    // si un seul alors on update
    if (path.length === 0) {
      (updatedObject[currentPath] as T) = value;
    } //sinon récursivité {
    else
      (updatedObject[currentPath] as T) = updateNestedObject(
        updatedObject[currentPath],
        path,
        value
      );
  }

  return updatedObject;
};
