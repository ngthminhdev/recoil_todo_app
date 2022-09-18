
const convertToBase64 = function (base64) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(base64);
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onerror = function (err) {
      reject(err);
    };
  });
};
export default convertToBase64;
