import { extendTheme } from '@chakra-ui/react';
import { StyleFunctionProps, mode } from '@chakra-ui/theme-tools';

export const theme = extendTheme({
    fonts: {
        body: `'Laila', sans-serif`,
    },
    styles: {
        global: (prop: StyleFunctionProps) => ({
            body: {
                bg: mode('gray.100', 'gray.800')(prop),
                color: mode('gray.800', 'gray.200')(prop),
                maxW: '100%',
                overflowX: 'hidden',
            },
        }),
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'teal',
            },
        },
    },
});
