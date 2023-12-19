import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

const theme = extendTheme({
    colors: {
        serena: {
            green: {
                300: '#739072',
                400: '#4F6F52',
                500: '#3A4D39',
            },
            white: '#FFFFFF',
            black: '#282828',
        },
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
    },
});

export default theme;
