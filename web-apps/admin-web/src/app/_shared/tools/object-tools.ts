export const cleanObject = (object: any): any => {
  const result = { ...object };
  for (const property in result) {
    if (result[property] === null || result[property] === undefined) {
      delete result[property];
    }
  }

  return result;
};
