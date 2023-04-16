type Filter = "inverted" | "grayscale";

interface CreateCanvas {
  width: string;
  height: string;
}

const container1 = document.querySelector(".canvas-container1");
const container2 = document.querySelector(".canvas-container2");

function createCanvas({ width, height }: CreateCanvas) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  return canvas;
}

function getProcessedImageDataBytes(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  filter: Filter
) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.drawImage(img, 0, 0);

    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height, {
      colorSpace: "srgb",
    });

    const newImagePixels = applyFilter(imageData, canvas, filter);

    if (newImagePixels) {
      const newImageData = ctx.createImageData(canvas.width, canvas.height);
      newImageData.data.set(newImagePixels);

      return newImageData;
    }
  }
}

function applyFilter(
  imageData: ImageData,
  canvas: HTMLCanvasElement,
  filter: Filter
) {
  switch (filter) {
    case "inverted":
      return invertRGB(imageData, canvas);

    case "grayscale":
      return grayscaleRGB(imageData, canvas);

    default:
      return null;
  }
}

export function invertRGB(imageData: ImageData, canvas: HTMLCanvasElement) {
  const buffer = imageData?.data.buffer;
  const unit8 = new Uint8Array(buffer);
  const nweBuffer = new ArrayBuffer(buffer.byteLength);
  const newImagesPixels = new Uint8Array(nweBuffer);
  const iterationStep = unit8.length / canvas.width / canvas.height;

  for (let pixel = 0; pixel < unit8.length; pixel += iterationStep) {
    const r = unit8[pixel + 0];
    const g = unit8[pixel + 1];
    const b = unit8[pixel + 2];

    newImagesPixels[pixel + 0] = r ^ 255;
    newImagesPixels[pixel + 1] = g ^ 255;
    newImagesPixels[pixel + 2] = b ^ 255;
    newImagesPixels[pixel + 3] = 255;
  }

  return newImagesPixels;
}

export function grayscaleRGB(imageData: ImageData, canvas: HTMLCanvasElement) {
  const buffer = imageData?.data.buffer;
  const unit8 = new Uint8Array(buffer);
  const nweBuffer = new ArrayBuffer(buffer.byteLength);
  const newImagesPixels = new Uint8Array(nweBuffer);
  const iterationStep = unit8.length / canvas.width / canvas.height;

  for (let pixel = 0; pixel < unit8.length; pixel += iterationStep) {
    const r = unit8[pixel + 0];
    const g = unit8[pixel + 1];
    const b = unit8[pixel + 2];

    const avg = (r + g + b) / 3;

    newImagesPixels[pixel + 0] = avg;
    newImagesPixels[pixel + 1] = avg;
    newImagesPixels[pixel + 2] = avg;
    newImagesPixels[pixel + 3] = 255;
  }

  return newImagesPixels;
}

function drawImageWithFilter(
  path: string,
  container: Element | null,
  filter: Filter
) {
  const img = new Image();
  img.src = path;
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    const canvas = createCanvas({
      height: `${img.height}`,
      width: `${img.width}`,
    });

    container?.append(canvas);

    const ctx = canvas.getContext("2d");
    const invertedImageData = getProcessedImageDataBytes(canvas, img, filter);

    if (invertedImageData && ctx) {
      ctx.putImageData(invertedImageData, canvas.width / 2, 0);
    }
  };
}

drawImageWithFilter(
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
  container1,
  "inverted"
);
drawImageWithFilter(
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
  container2,
  "grayscale"
);
