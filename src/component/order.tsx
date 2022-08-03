import {
    Box,
    useColorModeValue,
    VStack,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
    order?: object[];
}

export const Order: FC<Props> = ({ order }) => {
    return (
        <>
            <Box
                h="40vh"
                border="1px solid"
                borderColor={useColorModeValue('gray.300', 'whiteAlpha.100')}
                overflow="auto"
            >
                <VStack>
                    <TableContainer w="100%">
                        <Table variant="unstyled" size={{ md: 'sm', lg: 'md' }}>
                            <Tbody>
                                {order?.map((x: any, i: number) => (
                                    <Tr key={i}>
                                        <Td fontSize={{ lg: 'md', md: 'sm' }}>
                                            {x.name}
                                        </Td>
                                        <Td fontSize={{ lg: 'md', md: 'sm' }}>
                                            {x.price}
                                        </Td>
                                        <Td fontSize={{ lg: 'md', md: 'sm' }}>
                                            {x.quantity}
                                        </Td>
                                        <Td fontSize={{ lg: 'md', md: 'sm' }}>
                                            {x.size}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>
            </Box>
        </>
    );
};
