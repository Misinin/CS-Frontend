type Filter = "inverted" | "grayscale";

interface Pixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

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

    const matrixPixels = new PixelMatrix(
      canvas.width,
      canvas.height,
      4,
      imageData.data
    );

    for (let y = 0; y <= canvas.height; y++) {
      let x = 0;

      do {
        const pixel = matrixPixels.getPixel(x, y);
        const [r, g, b, a] = pixel;

        const newPixel = applyFilter({ r, g, b, a }, filter);

        matrixPixels.setPixel(x, y, newPixel);
        x++;
      } while (x <= canvas.width);
    }

    const newImageData = ctx.createImageData(canvas.width, canvas.height);
    newImageData.data.set(matrixPixels.getData());

    return newImageData;
  }
}

class PixelMatrix {
  #width: number;
  #height: number;
  #bytePerPixel: number;
  #matrix: Uint8ClampedArray;

  constructor(
    width: number,
    height: number,
    bytePerPixel: number,
    data: Uint8ClampedArray
  ) {
    this.#width = width;
    this.#height = height;
    this.#bytePerPixel = bytePerPixel;
    this.#matrix = data;
  }

  #getIndex(x: number, y: number) {
    return (y * this.#width + x) * this.#bytePerPixel;
  }

  getPixel(x: number, y: number) {
    const index = this.#getIndex(x, y);

    return [
      this.#matrix[index + 0],
      this.#matrix[index + 1],
      this.#matrix[index + 2],
      this.#matrix[index + 3],
    ];
  }

  setPixel(x: number, y: number, pixel: Pixel) {
    const index = this.#getIndex(x, y);

    this.#matrix[index + 0] = pixel.r;
    this.#matrix[index + 1] = pixel.g;
    this.#matrix[index + 2] = pixel.b;
    this.#matrix[index + 3] = pixel.a;
  }

  getData() {
    return this.#matrix;
  }
}

function applyFilter(pixel: Pixel, filter: Filter) {
  if (filter === "inverted") {
    return invert(pixel);
  }

  if (filter === "grayscale") {
    return grayscale(pixel);
  }
  return pixel;
}

function invert(pixel: Pixel) {
  const { r, g, b, a } = pixel;

  const newPixel: Pixel = {
    r: r ^ 255,
    g: g ^ 255,
    b: b ^ 255,
    a,
  };

  return newPixel;
}

function grayscale(pixel: Pixel) {
  const { r, g, b, a } = pixel;

  const avg = (r + g + b) / 3;

  const newPixel: Pixel = {
    r: avg,
    g: avg,
    b: avg,
    a,
  };

  return newPixel;
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
