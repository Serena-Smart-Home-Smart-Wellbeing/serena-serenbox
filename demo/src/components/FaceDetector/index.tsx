import { Box, Heading, Stack, Text, VStack, useTheme } from "@chakra-ui/react";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import { useCallback, useContext, useEffect, useState } from "react";
import {
    CameraOptions,
    useFaceDetection,
} from "../../utils/react-use-face-detection/build/";
import Webcam from "react-webcam";
import { DiffusionOptionContext } from "../../contexts/diffusion-option.tsx";
import analyzeEmotions, {
    DataURIToBlob,
} from "../../utils/emotion-detector.ts";
import SectionCard from "../SectionCard/index.tsx";
import EmotionsList from "./EmotionsList.tsx";

export interface FaceDetectorProps {}

const FaceDetector = (): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(null);

    const { isSessionRunning, emotions, setEmotions } = useContext(
        DiffusionOptionContext
    );
    const theme = useTheme();
    const size = 300;
    const [width, setWidth] = useState(size);
    const [height, setHeight] = useState(size);

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

    useEffect(() => {
        const getUsersCameraSize = async () => {
            const features = {
                video: {
                    width: { ideal: 1800 },
                    height: { ideal: 900 },
                },
            };

            const display = await navigator.mediaDevices.getUserMedia(features);

            // Returns a sequence of MediaStreamTrack objects
            // representing the video tracks in the stream

            const settings = display.getVideoTracks()[0].getSettings();

            setWidth(settings.width! / 2);
            setHeight(settings.height! / 2);
        };

        getUsersCameraSize();
    }, []);

    const capture = useCallback(() => {
        if (webcamRef && isSessionRunning) {
            //@ts-expect-error: the type definition for getScreenshot is wrong
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        }
    }, [webcamRef, isSessionRunning]);

    useEffect(() => {
        if (isSessionRunning && detected) {
            const interval = setInterval(async () => {
                try {
                    capture();
                } catch (err) {
                    console.log(err);
                }

                const image = new File(
                    [DataURIToBlob(imgSrc || "")],
                    "user.jpg",
                    {
                        type: "image/jpeg",
                    }
                );

                try {
                    const emotions = await analyzeEmotions(image);
                    setEmotions(emotions);
                } catch (err) {
                    const emotions = await analyzeEmotions(image);
                    setEmotions(emotions);
                }
            }, 2000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [capture, detected, imgSrc, isSessionRunning, setEmotions]);

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
            <Stack
                direction={{
                    base: "column",
                    lg: "row",
                }}
                justify="space-between"
                align={{
                    base: "center",
                    lg: "end",
                }}
            >
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
                                            "4px solid " +
                                            theme.colors.yellow[300],
                                        position: "absolute",
                                        top: `${box.yCenter * 100}%`,
                                        left: `${box.xCenter * 100}%`,
                                        width: `${box.width * 100}%`,
                                        height: `${box.height * 100}%`,
                                        zIndex: 1000,
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

                <VStack>
                    <Heading
                        as="h3"
                        size="md"
                    >
                        Emotions
                    </Heading>
                    <EmotionsList emotions={emotions} />
                </VStack>
            </Stack>
        </SectionCard>
    );
};

export default FaceDetector;
