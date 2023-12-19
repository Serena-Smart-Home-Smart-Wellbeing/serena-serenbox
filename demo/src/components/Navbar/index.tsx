import { HStack, Heading, Image } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <HStack
            w="full"
            bg="serena.green.400"
            borderBottomRightRadius="1rem"
            borderBottomLeftRadius="1rem"
            justifyContent="space-between"
            pr="3"
        >
            <HStack>
                <Image
                    src="/Serena-Logo.svg"
                    maxW="5em"
                />
                <Heading
                    color="serena.white"
                    as="h1"
                    size="md"
                >
                    Serena SerenBox Demo
                </Heading>
            </HStack>

            <a
                href="https://github.com/Serena-Smart-Home-SmartWellbeing"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    src="/github-mark.svg"
                    maxW="3.5em"
                />
            </a>
        </HStack>
    );
};

export default Navbar;