import { Grid, GridItem, VStack } from "@chakra-ui/react";
import FaceDetector from "../FaceDetector";
import Navbar from "../Navbar";
import SerenBox from "../SerenBox";
import SerenBoxConfig from "../SerenBoxConfigs";

const App = () => {
    return (
        <VStack
            bg="serena.green.500"
            align="center"
            minH="100vh"
        >
            <Navbar />

            <Grid
                w="full"
                p="2"
                gap="2"
                templateAreas={{
                    base: `
                    "config"
                    "detector"
                    "box"`,
                    md: `
                    "config box"
                    "detector box"
                `,
                    lg: `
                    "config detector"
                    "box box"
                `,
                }}
                maxW="1024px"
            >
                <GridItem gridArea="config">
                    <SerenBoxConfig />
                </GridItem>
                <GridItem gridArea="detector">
                    <FaceDetector />
                </GridItem>
                <GridItem gridArea="box">
                    <SerenBox />
                </GridItem>
            </Grid>
        </VStack>
    );
};

export default App;
