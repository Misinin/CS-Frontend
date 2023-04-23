// import { grayscale, invert } from "../index";

// describe("work with RGB bytes", () => {
//   let canvas: HTMLCanvasElement, ctx, imageData: ImageData;
//   beforeEach(function () {
//     canvas = document.createElement("canvas");
//     ctx = canvas.getContext("2d");

//     imageData = ctx!.createImageData(1, 1);
//   });

//   test("invertRGB", () => {
//     const newImageData = invertRGB(imageData, canvas);

//     newImageData.forEach((item) => expect(item).toEqual(255));
//   });

//   test("grayscaleRGB", () => {
//     imageData.data[0] = 3;
//     imageData.data[1] = 5;
//     imageData.data[2] = 10;

//     const newImageData = grayscaleRGB(imageData, canvas);

//     expect(newImageData[0]).toEqual(6);
//     expect(newImageData[1]).toEqual(6);
//     expect(newImageData[2]).toEqual(6);
//   });
// });
