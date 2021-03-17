export const readTextFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsText(file);
    } catch (err) {
      reject(err);
    }
  });
};
