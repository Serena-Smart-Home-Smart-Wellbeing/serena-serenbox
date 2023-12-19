import { Box, Stack } from '@chakra-ui/react';
import SectionCard from '../SectionCard';
import Navbar from '../Navbar';

const App = () => {
    return (
        <Stack bg="serena.green.500" w="100vw" h="100vh">
            <Navbar />
            <SectionCard>
                <Box boxSize="100px" bg="red" />
            </SectionCard>
        </Stack>
    );
};

export default App;
