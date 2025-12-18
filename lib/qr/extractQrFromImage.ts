import jsQR from "jsqr";

export async function extractQrFromImage(
  file: File
): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return resolve(null);

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const qrCode = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );

        if (qrCode?.data) {
          resolve(qrCode.data);
        } else {
          resolve(null);
        }
      };
    };

    reader.readAsDataURL(file);
  });
}
