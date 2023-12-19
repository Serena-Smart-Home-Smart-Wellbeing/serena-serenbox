import { VStack, Heading, Image, HStack } from "@chakra-ui/react";
import SectionCard from "../SectionCard";
import OilCard from "./OilCard";
import { useContext } from "react";
import { DiffusionOptionContext } from "../../contexts/diffusion-option";

export interface SerenBoxProps {}

const SerenBox = () => {
    const { slotA, slotB } = useContext(DiffusionOptionContext);

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
