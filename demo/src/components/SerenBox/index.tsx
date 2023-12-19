import { VStack, Heading, Image, HStack } from "@chakra-ui/react";
import SectionCard from "../SectionCard";
import OilCard from "./OilCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiffusionOptionContext } from "../../contexts/diffusion-option";
import Countdown from "react-countdown";

export interface SerenBoxProps {}

const SerenBox = () => {
    const {
        slotA,
        slotB,
        detectionMode,
        diffusionOption,
        duration,
        isSessionRunning,
        setSessionRunning,
    } = useContext(DiffusionOptionContext);
    const ref = useRef<Countdown | null>(null);

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

    return (
        <SectionCard>
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

                {isSessionRunning && (
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
                    />
                )}

                <HStack>
                    <OilCard
                        slot="A"
                        name="Citronella Oil"
                        capacity={50}
                        max_capacity={100}
                        isActive={slotA}
                    />
                    <OilCard
                        slot="B"
                        name="Cajuput Oil"
                        capacity={50}
                        max_capacity={100}
                        isActive={slotB}
                    />
                </HStack>
            </VStack>
        </SectionCard>
    );
};

export default SerenBox;
