import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceAPI from "face-api.js";
import { loadModels } from "../../Hooks/loadModels";
import { getFullFaceDescription } from "../../Hooks/getFullFaceDescription";

const UploadByWebCam = () => {
  console.log(loadModels() ? true : false);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const webcamDivRef = useRef();
  const webcamRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const height = webcamDivRef.current?.offsetHeight;
    const width = webcamDivRef.current?.clientWidth;
    setHeight(height);
    setWidth(width);
  }, [height, width]);

  const detectFaces = async () => {
    setInterval(async () => {
      setPreviewImage(webcamRef.current.getScreenshot());

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      getFullFaceDescription(webcamRef.current.getScreenshot(), 160)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      const displaySize = { width: video.width, height: video.height };
      faceAPI.matchDimensions(canvas, displaySize);
      const detections = await faceAPI
        .detectAllFaces(video, new faceAPI.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceAPI.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas?.height);
      faceAPI.draw.drawDetections(canvas, resizedDetections);
    }, 100);
  };

  useEffect(() => {
    detectFaces();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fled pt-5">
      <div className="w-6/12">
        <div className="mockup-window border bg-base-300">
          <div
            ref={webcamDivRef}
            className="flex justify-center items-center relative bg-base-200"
          >
            <Webcam
              ref={webcamRef}
              height={height}
              width={width}
              mirrored
              muted={true}
              audio={false}
              screenshotFormat="image/jpeg"
            />
            <canvas
              ref={canvasRef}
              height={height}
              width={width}
              className="absolute w-[-webkit-fill-available] h-[-webkit-fill-available] text-center z-10"
            />
          </div>
        </div>
      </div>
      <div className="w-6/12"></div>
    </div>
  );
};

export default UploadByWebCam;
