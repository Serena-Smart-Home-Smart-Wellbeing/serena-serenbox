import { Image, Text, VStack } from "@chakra-ui/react";

export interface OilCardProps {
    slot: "A" | "B";
    name: string;
    capacity: number;
    max_capacity: number;
    isActive?: boolean;
}

const OilCard = ({
    slot,
    name,
    capacity,
    max_capacity,
    isActive,
}: OilCardProps) => {
    return (
        <VStack
            rounded="1rem"
            bg="serena.green.400"
            color="serena.beige"
            boxSize="max-content"
            p="4"
            opacity={isActive ? 1 : 0.5}
        >
            <Image
                src="/serena-serenbox/oil.png"
                boxSize="7.5em"
            />
            <Text>
                Slot {slot}: {slot === "A" ? "Energetic" : "Relax"}
            </Text>
            <Text
                fontSize="lg"
                fontWeight={700}
            >
                {name}
            </Text>
            <Text>
                {capacity}/{max_capacity}ml
            </Text>
        </VStack>
    );
};

export default OilCard;
