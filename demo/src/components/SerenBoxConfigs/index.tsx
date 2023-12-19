import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { DiffusionOptionContext } from "../../contexts/diffusion-option";
import { DetectionMode, DiffusionOption } from "../../types/diffusion-options";
import SectionCard from "../SectionCard";

export interface SerenBoxConfigProps {}

const SerenBoxConfig = () => {
    const {
        duration,
        detectionMode,
        diffusionOption,
        setDetectionMode,
        setDiffusionOption,
        setDuration,
        setSessionRunning,
        isSessionRunning,
    } = useContext(DiffusionOptionContext);

    const onClick = () => {
        setSessionRunning((prev) => !prev);
    };

    const infoText = "Allow camera permission, then click Start";

    return (
        <SectionCard>
            <VStack w="full">
                <Heading
                    as="h3"
                    size="md"
                >
                    Configure SerenBox
                </Heading>
                <FormControl>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <NumberInput
                        defaultValue={duration}
                        onChange={(val) => setDuration(+val)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>Detection Mode</FormLabel>
                    <Select
                        defaultValue={detectionMode}
                        onChange={(e) =>
                            setDetectionMode(e.target.value as DetectionMode)
                        }
                    >
                        <option value={DetectionMode.INTERVAL}>
                            {DetectionMode.INTERVAL}
                        </option>
                        <option value={DetectionMode.ONCE}>
                            {DetectionMode.ONCE}
                        </option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Diffusion Option</FormLabel>
                    <Select
                        defaultValue={diffusionOption}
                        onChange={(e) =>
                            setDiffusionOption(
                                e.target.value as DiffusionOption
                            )
                        }
                    >
                        <option value={DiffusionOption.MATCH_MOOD}>
                            {DiffusionOption.MATCH_MOOD}
                        </option>
                        <option value={DiffusionOption.OPPOSITE_MOOD}>
                            {DiffusionOption.OPPOSITE_MOOD}
                        </option>
                        {/* <option value={DiffusionOption.AUTO}>
                            {DiffusionOption.AUTO}
                        </option> */}
                    </Select>
                </FormControl>

                <Text align="center">{infoText}</Text>

                <Button
                    w="full"
                    onClick={onClick}
                    colorScheme={isSessionRunning ? "red" : "green"}
                >
                    {isSessionRunning ? "Stop" : "Start"}
                </Button>
            </VStack>
        </SectionCard>
    );
};

export default SerenBoxConfig;
