import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    useBoolean,
    useTheme,
} from "@chakra-ui/react";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import { useCallback, useEffect, useState } from "react";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import Webcam from "react-webcam";

export interface FaceDetectorProps {}

const FaceDetector = (): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(null);
    const [isRunning, setSessionRunning] = useBoolean();

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

    if (!isRunning) {
        infoText = "Allow camera permission, then click Start";
    }

    const capture = useCallback(() => {
        if (webcamRef && isRunning) {
            //@ts-expect-error: the type definition for getScreenshot is wrong
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);

            // TODO call emotion detector
        }
    }, [webcamRef, isRunning]);

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

    const onClick = () => {
        // if (!isWebcamPermissionGranted) {
        // handleWebcamPermission();
        // } else {
        setSessionRunning.toggle();
        // }
    };

    return (
        <VStack>
            <Heading>Emotion Detector</Heading>

            <Text align="center">{infoText}</Text>

            <Button
                onClick={onClick}
                colorScheme={isRunning ? "red" : "green"}
            >
                {isRunning ? "Stop" : "Start"}
            </Button>

            <Box
                w={width}
                h={height}
                pos="relative"
                rounded="1rem"
            >
                {!isLoading &&
                    isRunning &&
                    boundingBox.map((box, index) => (
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
                    screenshotFormat="image/jpeg"
                    screenshotQuality={1}
                />
            </Box>
        </VStack>
    );
};

export default FaceDetector;
