import { Center, CenterProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface SectionCardProps extends CenterProps {}

const SectionCard = ({
    children,
    ...props
}: PropsWithChildren<SectionCardProps>) => {
    return (
        <Center
            {...props}
            bg="serena.white"
            rounded="1rem"
            padding="5"
        >
            {children}
        </Center>
    );
};

export default SectionCard;
