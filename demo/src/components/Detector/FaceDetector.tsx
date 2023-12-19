import { Box, Heading, Text, VStack, useTheme } from "@chakra-ui/react";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import { useCallback, useEffect, useState } from "react";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import Webcam from "react-webcam";

const FaceDetector = (): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(null);

    const theme = useTheme();
    const size = 300;
    const width = size;
    const height = size;

    const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
        useFaceDetection({
            faceDetectionOptions: {
                model: "short",
            },
            faceDetection: new FaceDetection.FaceDetection({
                locateFile: (file) =>
                    `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
            }),
            camera: ({ mediaSrc, onFrame }: CameraOptions) =>
                new Camera(mediaSrc, {
                    onFrame,
                    width,
                    height,
                }),
        });

    let infoText = "Loading...";
    if (!isLoading) {
        if (detected) {
            if (facesDetected) {
                infoText = facesDetected + " Face detected!";
            } else {
                infoText = "No faces detected";
            }
        } else {
            infoText = "No face detected";
        }
    }

    const capture = useCallback(() => {
        if (webcamRef) {
            //@ts-expect-error: the type definition for getScreenshot is wrong
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        }
    }, [webcamRef, setImgSrc]);

    useEffect(() => {
        if (detected) {
            const interval = setInterval(() => {
                capture();
            }, 5000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [capture, detected]);

    return (
        <VStack>
            <Heading>Emotion Detector</Heading>

            <Text>{infoText}</Text>

            <Box
                w={width}
                h={height}
                pos="relative"
                rounded="1rem"
            >
                {boundingBox.map((box, index) => (
                    <Box
                        // rounded="inherit"
                        key={`${index + 1}`}
                        style={{
                            border: "4px solid " + theme.colors.yellow[300],
                            position: "absolute",
                            top: `${box.yCenter * 100}%`,
                            left: `${box.xCenter * 100}%`,
                            width: `${box.width * 100}%`,
                            height: `${box.height * 100}%`,
                            zIndex: 1,
                        }}
                    />
                ))}

                <Webcam
                    ref={webcamRef}
                    forceScreenshotSourceSize
                    style={{
                        height,
                        width,
                        position: "absolute",
                        borderRadius: "inherit",
                    }}
                />
            </Box>
        </VStack>
    );
};

export default FaceDetector;
