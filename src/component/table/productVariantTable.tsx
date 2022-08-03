import React, { FC, useState, useEffect } from 'react';
import {
    Box,
    useColorModeValue,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Skeleton,
} from '@chakra-ui/react';
import { BodyTable } from './bodyTable';
import axios from 'axios';

const getHead = (data: object[] | any) => {
    let headTemp: string[] = Object.keys(data[0]);
    let varTemp: string[] = Object.keys(data[0].Variant[0]);
    headTemp.pop();
    varTemp.splice(0, 2);
    return headTemp.concat(varTemp);
};

interface Prop {
    menu?: string;
}

export const ProductTable: FC<Prop> = ({menu}) => {
    const [load, setLoad] = useState<boolean>(false);
    const [head, setHead] = useState<string[]>([]);
    const [data, setData] = useState<object[]>([]);

    const getData = async () => {
        await axios.get('data/productVariant.json').then((res) => {
            console.log(res.data);
            const x = getHead(res.data);
            setHead(x);
            setData(res.data);
        });
    };

    useEffect(() => {
        getData();
        setTimeout(() => {
            setLoad(true);
        }, 800);
    }, []);
    return (
        <>
            <Box w={{ lg: '80%', md: '75%' }} h="100%" p={{ lg: '6', md: '4' }}>
                <Skeleton isLoaded={load}>
                    <Box
                        w="100%"
                        h="82.5vh"
                        bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
                        borderRadius="md"
                        boxShadow="lg"
                        overflow="auto"
                        p="2"
                        display="flex"
                        flexDir="column"
                        justifyContent="space-between"
                        columnGap={{ lg: '5', md: '3' }}
                        rowGap="3"
                        border="1px solid"
                        borderColor={useColorModeValue(
                            'gray.300',
                            'whiteAlpha.100'
                        )}
                    >
                        <Box overflow="auto" height="75vh">
                            <TableContainer w={{ lg: '100%' }}>
                                <Table
                                    variant="simple"
                                    size={{ lg: 'md', md: 'sm' }}
                                    colorScheme="teal"
                                >
                                    <Thead
                                        bg={useColorModeValue(
                                            'teal.200',
                                            'teal.400'
                                        )}
                                    >
                                        <Tr>
                                            {head.map((x: any, i: number) => (
                                                <Th
                                                    key={i}
                                                    fontSize={{
                                                        lg: 'md',
                                                        md: '1vw',
                                                    }}
                                                    _dark={{
                                                        color: 'white',
                                                    }}
                                                >
                                                    {x}
                                                </Th>
                                            ))}
                                            <Th w="32"></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data.map((x: any, i: number) => (
                                            <React.Fragment key={i}>
                                                {
                                                    <BodyTable
                                                        data={x}
                                                        head={head}
                                                        menu={menu}
                                                    />
                                                }
                                            </React.Fragment>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Skeleton>
            </Box>
        </>
    );
};
