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
import analyzeEmotions, {
    DataURIToBlob,
    Emotions,
} from "../../utils/emotion-detector";

export interface FaceDetectorProps {}

const FaceDetector = (): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(null);
    const [isSessionRunning, setSessionRunning] = useBoolean();
    const [emotions, setEmotions] = useState<Emotions | null>(null);

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

    if (!isSessionRunning) {
        infoText = "Allow camera permission, then click Start";
    }

    const capture = useCallback(() => {
        if (webcamRef && isSessionRunning) {
            //@ts-expect-error: the type definition for getScreenshot is wrong
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);

            // TODO call emotion detector
        }
    }, [webcamRef, isSessionRunning]);

    useEffect(() => {
        if (isSessionRunning && detected) {
            capture();
            const interval = setInterval(async () => {
                try {
                    capture();

                    const image = new File(
                        [DataURIToBlob(imgSrc || "")],
                        "user.jpg",
                        {
                            type: "image/jpeg",
                        }
                    );
                    const emotions = await analyzeEmotions(image);

                    setEmotions(emotions);
                } catch (err) {
                    console.error(err);
                }
            }, 500);

            return () => {
                clearInterval(interval);
            };
        }
    }, [capture, detected, imgSrc, isSessionRunning]);

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
                colorScheme={isSessionRunning ? "red" : "green"}
            >
                {isSessionRunning ? "Stop" : "Start"}
            </Button>

            <Box
                w={width}
                h={height}
                pos="relative"
                rounded="1rem"
            >
                {!isLoading &&
                    isSessionRunning &&
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

            <Heading
                as="h3"
                size="md"
            >
                Emotions
            </Heading>
            <Text align="center">
                {emotions &&
                    Object.entries(emotions).map(([emotion, value]) => (
                        <Text key={emotion}>
                            {emotion}: {value}
                        </Text>
                    ))}
            </Text>
        </VStack>
    );
};

export default FaceDetector;
