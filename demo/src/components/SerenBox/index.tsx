import {
    Box,
    HStack,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { DiffusionOptionContext } from "../../contexts/diffusion-option";
import { DetectionMode, DiffusionOption } from "../../types/diffusion-options";
import SectionCard from "../SectionCard";
import OilCard from "./OilCard";

export interface SerenBoxProps {}

const SerenBox = () => {
    const {
        detectionMode,
        diffusionOption,
        duration,
        isSessionRunning,
        setSessionRunning,
        energetic,
        relax,
    } = useContext(DiffusionOptionContext);
    const ref = useRef<Countdown | null>(null);
    const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
    const [onceModeTaken, setOnceModeTaken] = useState(false);

    const [date, setDate] = useState(Date.now() + duration * 60 * 1000);

    const stopSession = useCallback(() => {
        setSessionRunning(false);
        setDate(Date.now() + duration * 60 * 1000);
        ref.current?.getApi().stop();
    }, [duration, setSessionRunning]);

    useEffect(() => {
        if (!isSessionRunning) {
            stopSession();
        } else {
            ref.current?.getApi().start();
        }
    }, [isSessionRunning, stopSession]);

    const toggleSlots = useCallback(() => {
        if (detectionMode === DetectionMode.INTERVAL) {
            if (diffusionOption === DiffusionOption.MATCH_MOOD) {
                if (energetic.total > relax.total) {
                    setActiveSlot("A");
                } else {
                    setActiveSlot("B");
                }
            } else {
                if (energetic.total > relax.total) {
                    setActiveSlot("B");
                } else {
                    setActiveSlot("A");
                }
            }
        } else if (detectionMode === DetectionMode.ONCE && !onceModeTaken) {
            if (diffusionOption === DiffusionOption.MATCH_MOOD) {
                if (energetic.total > relax.total) {
                    setActiveSlot("A");
                } else {
                    setActiveSlot("B");
                }
            } else {
                if (energetic.total > relax.total) {
                    setActiveSlot("B");
                } else {
                    setActiveSlot("A");
                }
            }

            if (energetic.total > 0 || relax.total > 0) {
                setOnceModeTaken(true);
            }
        }
    }, [
        detectionMode,
        diffusionOption,
        energetic.total,
        onceModeTaken,
        relax.total,
    ]);

    const emotion = (
        <Text>
            You are feeling{" "}
            <Box
                as="span"
                color="orange.300"
                fontWeight="bold"
            >
                {energetic.total.toFixed(2)}% energetic
            </Box>{" "}
            and{" "}
            <Box
                as="span"
                color="blue.300"
                fontWeight="bold"
            >
                {relax.total.toFixed(2)}%{" "}
            </Box>{" "}
            relaxed.
        </Text>
    );
    const choice = (
        <Text>
            You chose{" "}
            <Box
                as="span"
                color="purple.300"
                fontWeight="bold"
            >
                {diffusionOption}
            </Box>
            , so SerenBox activated{" "}
            <Box
                as="span"
                color="purple.300"
                fontWeight="bold"
            >
                slot {activeSlot}
            </Box>
            .
        </Text>
    );
    const reason = (
        <Text>
            You chose{" "}
            <Box
                as="span"
                color="pink.500"
                fontWeight="bold"
            >
                {detectionMode}
            </Box>
            , so SerenBox will update the slot{" "}
            <Box
                as="span"
                color="pink.500"
                fontWeight="bold"
            >
                {detectionMode === DetectionMode.INTERVAL
                    ? "regularly"
                    : "only once"}{" "}
                .
            </Box>
        </Text>
    );
    const explaination = (
        <VStack>
            {emotion}
            {choice}
            {reason}
        </VStack>
    );

    return (
        <SectionCard boxSize="full">
            <Stack
                direction={{
                    base: "column",
                    lg: "row",
                }}
                align="center"
                justify="space-between"
            >
                <VStack>
                    <Heading
                        as="h3"
                        size="md"
                    >
                        SerenBox
                    </Heading>
                    <Image
                        src="/serenbox.png"
                        boxSize="50%"
                        minW="10em"
                    />
                    <VStack spacing="0">
                        <Text align="center">Time left</Text>
                        <Countdown
                            ref={ref}
                            date={date}
                            onComplete={stopSession}
                            renderer={({ minutes, seconds }) => {
                                return (
                                    <Heading
                                        as="h3"
                                        size="xl"
                                        color={
                                            isSessionRunning
                                                ? "serena.green.300"
                                                : "serena.black"
                                        }
                                    >
                                        {minutes}:{seconds}
                                    </Heading>
                                );
                            }}
                            onStop={stopSession}
                            onPause={stopSession}
                            intervalDelay={500}
                            onTick={toggleSlots}
                            autoStart={false}
                        />
                    </VStack>
                </VStack>

                <VStack>
                    {isSessionRunning && (
                        <Text
                            align="center"
                            fontSize="medium"
                        >
                            {explaination}
                        </Text>
                    )}
                    <HStack>
                        <OilCard
                            slot="A"
                            name="Citronella Oil"
                            capacity={50}
                            max_capacity={100}
                            isActive={activeSlot === "A"}
                        />
                        <OilCard
                            slot="B"
                            name="Cajuput Oil"
                            capacity={50}
                            max_capacity={100}
                            isActive={activeSlot === "B"}
                        />
                    </HStack>
                </VStack>
            </Stack>
        </SectionCard>
    );
};

export default SerenBox;
