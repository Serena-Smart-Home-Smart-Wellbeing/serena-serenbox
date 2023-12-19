import { VStack } from "@chakra-ui/react";
import SerenBoxConfig from "../SerenBoxConfigs";
import FaceDetector from "./FaceDetector";

const Detector = () => {
    return (
        <VStack
            spacing="4"
            boxSize="max-content"
        >
            <SerenBoxConfig />
            <FaceDetector />
        </VStack>
    );
};

export default Detector;
