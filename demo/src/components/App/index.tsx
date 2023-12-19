import { Box, Stack } from "@chakra-ui/react";
import SectionCard from "../SectionCard";
import Navbar from "../Navbar";
import FaceDetector from "../Detector/FaceDetector";

const App = () => {
    return (
        <Stack
            bg="serena.green.500"
            w="100vw"
            h="100vh"
        >
            <Navbar />
            <SectionCard>
                <FaceDetector />
            </SectionCard>
        </Stack>
    );
};

export default App;
