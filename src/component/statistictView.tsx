import { FC, useEffect, useState } from 'react';
import {
    Box,
    Heading,
    useColorModeValue,
    Flex,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    Skeleton,
} from '@chakra-ui/react';
import { ChartLine } from './chart/chartjs';
import { BarChart } from './chart/barChart';

export const StatisticView: FC = () => {
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 800);
    }, []);
    return (
        <>
            <Box w={{ lg: '80%', md: '75%' }} h="100%" p={{ lg: '6', md: '4' }}>
                <Flex flexWrap="wrap" gap="5" justify="center">
                    <Skeleton isLoaded={load} w={{ lg: '60%', md: '100%' }}>
                        <Box
                            h="fit-content"
                            bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
                            borderRadius="md"
                            boxShadow="lg"
                            overflow="auto"
                            p="2"
                            display="flex"
                            flexWrap="wrap"
                            columnGap={{ lg: '5', md: '3' }}
                            rowGap="3"
                            border="1px solid"
                            borderColor={useColorModeValue(
                                'gray.300',
                                'whiteAlpha.100'
                            )}
                        >
                            <Heading
                                textAlign="center"
                                w="100%"
                                fontSize={{ lg: 'lg', md: 'md' }}
                            >
                                Sales
                            </Heading>
                            <ChartLine />
                        </Box>
                    </Skeleton>

                    <Flex
                        flexDir={{ lg: 'column', md: 'row' }}
                        w={{ lg: '35%', md: '100%' }}
                        gap="3"
                    >
                        <Skeleton isLoaded={load}>
                            <Box
                                h={{ lg: 'fit-content', md: '100%' }}
                                bg={useColorModeValue(
                                    'gray.50',
                                    'whiteAlpha.200'
                                )}
                                borderRadius="md"
                                boxShadow="lg"
                                overflow="auto"
                                p="2"
                                display="flex"
                                flexWrap="wrap"
                                columnGap={{ lg: '5', md: '3' }}
                                rowGap="3"
                                border="1px solid"
                                borderColor={useColorModeValue(
                                    'gray.300',
                                    'whiteAlpha.100'
                                )}
                            >
                                <Heading
                                    textAlign="center"
                                    w="100%"
                                    fontSize={{ lg: 'lg', md: 'md' }}
                                >
                                    Sales Recap
                                </Heading>
                                <TableContainer
                                    w={{ lg: '100%', md: '100%' }}
                                    fontSize={{ lg: 'md', md: 'sm' }}
                                    overflow="hidden"
                                >
                                    <Table variant="unstyled">
                                        <Tbody>
                                            <Tr>
                                                <Td>Daily</Td>
                                                <Td>Month</Td>
                                                <Td>Years</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>100</Td>
                                                <Td>20000</Td>
                                                <Td>304000</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Skeleton>
                        <Skeleton
                            isLoaded={load}
                            w="fit-content"
                            display="flex"
                            justifyContent="center"
                        >
                            <Box
                                w={{ lg: '100%', md: '97.5%' }}
                                h="fit-content"
                                bg={useColorModeValue(
                                    'gray.50',
                                    'whiteAlpha.200'
                                )}
                                borderRadius="md"
                                boxShadow="lg"
                                overflow="auto"
                                p="2"
                                display="flex"
                                flexWrap="wrap"
                                columnGap={{ lg: '5', md: '3' }}
                                rowGap="3"
                                border="1px solid"
                                borderColor={useColorModeValue(
                                    'gray.300',
                                    'whiteAlpha.100'
                                )}
                            >
                                <Heading
                                    textAlign="center"
                                    w="100%"
                                    fontSize={{ lg: 'lg', md: 'md' }}
                                >
                                    Best Product
                                </Heading>
                                <BarChart />
                            </Box>
                        </Skeleton>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};
