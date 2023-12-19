import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Emotions, ServerEmotions } from "../../utils/emotion-detector";

export interface EmotionsListProps {
    emotions: Emotions;
}

const EmotionCard = ({
    emotion,
    percentage,
    isMain = false,
}: {
    emotion: keyof Emotions;
    percentage: number;
    isMain?: boolean;
}) => {
    return (
        <VStack
            bg={isMain ? "serena.green.300" : "serena.green.500"}
            p="3"
            spacing="2"
            color="serena.beige"
            flex="1"
        >
            <Image
                src={`/serena-serenbox/emotions/${emotion}.svg`}
                boxSize="4em"
            />
            <Text>{emotion[0].toUpperCase() + emotion.slice(1)}</Text>
            <Text>{percentage}%</Text>
        </VStack>
    );
};

const EmotionsList = ({ emotions }: EmotionsListProps) => {
    const mainEmotion = Object.entries(emotions).reduce(
        (prev, curr) => {
            if (curr[1] > prev[1]) {
                return curr;
            }
            return prev;
        },
        ["neutral", 0]
    )[0] as keyof ServerEmotions;

    return (
        <VStack
            spacing="0"
            rounded="0.75rem"
            overflow="hidden"
        >
            <HStack spacing="0">
                <EmotionCard
                    emotion="neutral"
                    percentage={emotions.neutral}
                    isMain={mainEmotion === "neutral"}
                />
                <EmotionCard
                    emotion="joy"
                    percentage={emotions.joy}
                    isMain={mainEmotion === "happy"}
                />
                <EmotionCard
                    emotion="sadness"
                    percentage={emotions.sadness}
                    isMain={mainEmotion === "sad"}
                />
                <EmotionCard
                    emotion="disgust"
                    percentage={emotions.disgust}
                    isMain={mainEmotion === "disgust"}
                />
            </HStack>

            <HStack
                spacing="0"
                w="full"
            >
                <EmotionCard
                    emotion="surprise"
                    percentage={emotions.surprise}
                    isMain={mainEmotion === "surprise"}
                />
                <EmotionCard
                    emotion="anger"
                    percentage={emotions.anger}
                    isMain={mainEmotion === "angry"}
                />
                <EmotionCard
                    emotion="fear"
                    percentage={emotions.fear}
                    isMain={mainEmotion === "fear"}
                />
            </HStack>
        </VStack>
    );
};

export default EmotionsList;
