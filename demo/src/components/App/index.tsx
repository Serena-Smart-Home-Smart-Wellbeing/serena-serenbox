import { Stack } from "@chakra-ui/react";
import Detector from "../Detector";
import Navbar from "../Navbar";

const App = () => {
    return (
        <Stack
            bg="serena.green.500"
            w="100vw"
            h="100vh"
        >
            <Navbar />
            <Detector />
        </Stack>
    );
};

export default App;
