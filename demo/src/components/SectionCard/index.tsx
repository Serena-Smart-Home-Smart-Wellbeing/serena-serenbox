import { Center } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export interface SectionCardProps {}

const SectionCard = ({ children }: PropsWithChildren<SectionCardProps>) => {
    return (
        <Center bg="serena.white" rounded="1rem" padding="5">
            {children}
        </Center>
    );
};

export default SectionCard;
