import { Box, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
import { Card } from './card';

interface Props {
    data?: object[];
}

export const Container: FC<Props> = ({ data }) => {
    return (
        <>
            <Box w="80%" h="100%" p={{ lg: '6', md: '4' }}>
                <Box
                    w="100%"
                    maxH="82.5vh"
                    bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
                    borderRadius="md"
                    boxShadow="lg"
                    overflow="auto"
                    p="2"
                    display="flex"
                    flexWrap="wrap"
                    columnGap={{ lg: '4', md: '3' }}
                    rowGap={{ lg: '4', md: '3' }}
                    border="1px solid"
                    borderColor={useColorModeValue(
                        'gray.300',
                        'whiteAlpha.100'
                    )}
                    alignItems="baseline"
                >
                    {data?.map((x: any, i: number) => (
                        <Card key={i} id={x.id} url={x.image} name={x.name} />
                    ))}
                </Box>
            </Box>
        </>
    );
};
