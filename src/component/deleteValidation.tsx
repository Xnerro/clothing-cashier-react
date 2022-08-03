import { Box, Button, Heading } from '@chakra-ui/react';
import { FC } from 'react';

export const DeleteValidation: FC<{menu?: string}> = ({menu}) => {
    return (
        <>
            <Heading fontSize={{ lg: 'lg', md: 'md' }} fontWeight="medium">
                Are You Sure To Delete?
            </Heading>
            <Box mt="5">
                <Button colorScheme="red" me="4" w="24">
                    Yes
                </Button>
                <Button w="24">No</Button>
            </Box>
        </>
    );
};
