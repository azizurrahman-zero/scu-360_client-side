import * as faceAPI from "face-api.js";

// Toastify
import { toast } from "react-toastify";

export const loadModels = async () => {
  try {
    await faceAPI.nets.tinyFaceDetector.loadFromUri("/models");
    await faceAPI.nets.faceLandmark68Net.loadFromUri("/models");
    await faceAPI.nets.faceRecognitionNet.loadFromUri("/models");
    toast.success("Models loaded successfully!");
  } catch (error) {
    toast.error("Failed to load models!");
    console.error("Loading models error:", error);
  }
};
