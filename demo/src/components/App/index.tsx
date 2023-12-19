import { Stack } from "@chakra-ui/react";
import FaceDetector from "../FaceDetector";
import Navbar from "../Navbar";
import SerenBox from "../SerenBox";
import SerenBoxConfig from "../SerenBoxConfigs";

const App = () => {
    return (
        <Stack bg="serena.green.500">
            <Navbar />
            <SerenBoxConfig />
            <FaceDetector />
            <SerenBox />
        </Stack>
    );
};

export default App;
