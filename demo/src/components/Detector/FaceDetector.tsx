import { Box, Heading, Text, VStack, useTheme } from "@chakra-ui/react";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import { useCallback, useContext, useEffect, useState } from "react";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import Webcam from "react-webcam";
import { DiffusionOptionContext } from "../../contexts/diffusion-option.tsx";
import analyzeEmotions, {
    DataURIToBlob,
    Emotions,
} from "../../utils/emotion-detector";
import SectionCard from "../SectionCard/index.tsx";
import EmotionsList from "./EmotionsList.tsx";

export interface FaceDetectorProps {}

const FaceDetector = (): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(null);
    const { isSessionRunning } = useContext(DiffusionOptionContext);
    const [emotions, setEmotions] = useState<Emotions>({
        neutral: 0,
        joy: 0,
        sadness: 0,
        disgust: 0,
        anger: 0,
        fear: 0,
        surprise: 0,
    });

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

    const capture = useCallback(() => {
        if (webcamRef && isSessionRunning) {
            //@ts-expect-error: the type definition for getScreenshot is wrong
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
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
            }, 3000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [capture, detected, imgSrc, isSessionRunning]);

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
        infoText = "Session not running";
    }

    return (
        <SectionCard>
            <VStack>
                <Heading
                    as="h3"
                    size="md"
                >
                    Emotion Detector
                </Heading>
                <Text align="center">{infoText}</Text>

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
                                    border:
                                        "4px solid " + theme.colors.yellow[300],
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
                <EmotionsList emotions={emotions} />
            </VStack>
        </SectionCard>
    );
};

export default FaceDetector;
