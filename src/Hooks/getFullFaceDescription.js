import * as faceAPI from "face-api.js";

export async function getFullFaceDescription(blob, inputSize) {
  let scoreThreshold = 0.8;
  const OPTION = new faceAPI.SsdMobilenetv1Options({
    inputSize,
    scoreThreshold,
  });
  const useTinyModel = true;

  let img = await faceAPI.fetchImage(blob);

//   let fullDesc = await faceAPI
//     .detectAllFaces(img, OPTION)
//     .withFaceLandmarks(useTinyModel)
//     .withFaceDescriptors();
  return img;
}
