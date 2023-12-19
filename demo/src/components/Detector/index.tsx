import { VStack } from "@chakra-ui/react";
import SectionCard from "../SectionCard";
import FaceDetector from "./FaceDetector";

const Detector = () => {
    return (
        <SectionCard>
            <VStack>
                <FaceDetector />
            </VStack>
        </SectionCard>
    );
};

export default Detector;
