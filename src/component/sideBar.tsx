import {
    Box,
    Button,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Text,
    Flex,
    Input,
    Tooltip,
    Spinner,
    Icon,
    Fade,
    useToast,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { Order } from './order';

interface Prop {
    menu: string[];
    page: string;
    handleShow: handleShow;
}

const order: object[] = [
    {
        id: 1,
        name: 'New Tshirt',
        price: '$10',
        quantity: 1,
        size: 'M',
    },
    {
        id: 2,
        name: 'New Tshirt Year',
        price: '$10',
        quantity: 2,
        size: 'L',
    },
    {
        id: 3,
        name: 'New Pant',
        price: '$10',
        quantity: 1,
        size: 'M',
    },
];

const total: number = 300;

export const SideBar: FC<Prop> = (prop) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cash, setCash] = useState<number>(0);
    const [pay, setPay] = useState<boolean>(false);
    const [Cheackout, setCheackout] = useState<boolean>(false);
    const toast = useToast();

    const handleCash = async (e: any) => {
        const x: any = await new Promise(() => {
            setCash(e.target.value);
        });
        x();
    };

    const handleClose = () => {
        onClose();
        setCash(0);
        setPay(false);
        setCheackout(false);
    };

    const handlePay = () => {
        let change = cash - total;
        setPay(true);
        setTimeout(() => {
            setCheackout(true);
            setTimeout(() => {
                handleClose();
                toast({
                    title: 'Checkout Success',
                    description: `Your change is ${change}`,
                    status: 'success',
                    duration: 3000,
                });
            }, 700);
        }, 1500);
    };
    return (
        <>
            <Box
                minH="92vh"
                w={{ lg: '20vw', md: '25vw' }}
                maxW="100%"
                bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
                display="flex"
                flexDir="column"
                alignItems="center"
                rowGap={{ lg: '2', md: '1' }}
                boxShadow={useColorModeValue(
                    'lg',
                    '0px 0px 10px rgba(255,255,255,0.2)'
                )}
            >
                {prop.menu.map((x: any, i: number) => (
                    <Button
                        key={i}
                        w="100%"
                        variant="solid"
                        colorScheme="gray"
                        padding={{ lg: '8', md: '6' }}
                        fontSize={{ lg: 'lg', md: 'sm' }}
                        borderRadius="0"
                        onClick={() => prop.handleShow(x)}
                        _dark={{
                            _focus: {
                                background: 'blackAlpha.300',
                            },
                        }}
                        _focus={{
                            background: 'gray.400',
                        }}
                    >
                        {x}
                    </Button>
                ))}
                {prop.page === 'admin' && (
                    <Link
                        to="../"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Button
                            w="100%"
                            variant="solid"
                            colorScheme="gray"
                            padding={{ lg: '8', md: '6' }}
                            fontSize={{ lg: 'lg', md: 'sm' }}
                            borderRadius="0"
                            _dark={{
                                _focus: {
                                    background: 'blackAlpha.300',
                                },
                            }}
                            _focus={{
                                background: 'gray.400',
                            }}
                        >
                            Cashier Pane
                        </Button>
                    </Link>
                )}
                {prop.page === 'cashier' && (
                    <>
                        <Box
                            border="1px solid"
                            borderColor="blackAlpha.400"
                            _dark={{
                                borderColor: 'whiteAlpha.300',
                            }}
                            w="90%"
                            borderRadius="sm"
                            height={{ lg: '42.5vh', md: '50vh' }}
                            fontSize={{ lg: 'sm', md: 'x-small' }}
                            p={{ lg: '1', md: '0' }}
                            overflow="auto"
                        >
                            <VStack p="0">
                                <TableContainer p="0">
                                    <Table size="sm" variant="unstyled">
                                        <Tbody>
                                            {order?.map((x: any, i: number) => (
                                                <Tr key={i}>
                                                    <Td
                                                        p={{ lg: '4', md: '1' }}
                                                        pt={{
                                                            lg: '2',
                                                            md: '1',
                                                        }}
                                                        fontSize={{
                                                            lg: 'x-small',
                                                            md: 'xx-small',
                                                        }}
                                                    >
                                                        {x.name}
                                                    </Td>
                                                    <Td
                                                        p={{ lg: '4', md: '1' }}
                                                        pt={{
                                                            lg: '2',
                                                            md: '1',
                                                        }}
                                                        fontSize={{
                                                            lg: 'x-small',
                                                            md: 'xx-small',
                                                        }}
                                                    >
                                                        {x.price}
                                                    </Td>
                                                    <Td
                                                        fontSize={{
                                                            lg: 'x-small',
                                                            md: 'xx-small',
                                                        }}
                                                    >
                                                        {x.quantity}
                                                    </Td>
                                                    <Td
                                                        p={{ lg: '4', md: '1' }}
                                                        pt={{
                                                            lg: '2',
                                                            md: '1',
                                                        }}
                                                        fontSize={{
                                                            lg: 'x-small',
                                                            md: 'xx-small',
                                                        }}
                                                    >
                                                        {x.size}
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </VStack>
                        </Box>

                        <Button
                            w={{ lg: '15%', md: '18%' }}
                            padding={{ lg: '6', md: '3' }}
                            fontSize={{ lg: 'lg', md: 'sm' }}
                            position="absolute"
                            bottom="2.5%"
                            borderRadius="md"
                            _dark={{
                                background: 'teal.500',
                                _active: {
                                    background: 'teal.600',
                                },
                            }}
                            onClick={onOpen}
                        >
                            Order
                        </Button>
                    </>
                )}
            </Box>

            <Modal
                isOpen={isOpen}
                onClose={() => handleClose()}
                size={{ md: 'sm', lg: 'lg' }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order</ModalHeader>
                    <ModalBody>
                        <Order order={order} />
                        <Flex mt="3" justify="space-between">
                            <Text>Total</Text>
                            <Text>$100</Text>
                        </Flex>
                        <Flex mt="2" justify="space-between">
                            <Text>Quantity</Text>
                            <Text>3</Text>
                        </Flex>
                        <Input
                            mt="2"
                            placeholder="Cash"
                            onChange={(e) => handleCash(e)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Tooltip
                            isDisabled={cash > total}
                            hasArrow
                            label={
                                cash < total
                                    ? cash === 0
                                        ? 'Please enter cash'
                                        : 'insuficient cash'
                                    : null
                            }
                            shouldWrapChildren
                            mt="3"
                        >
                            <Button
                                mr={3}
                                isDisabled={cash < total}
                                onClick={handlePay}
                                w="32"
                            >
                                {pay ? (
                                    Cheackout ? (
                                        <Fade in={Cheackout}>
                                            <Icon as={FaCheck} />
                                        </Fade>
                                    ) : (
                                        <Fade in={pay}>
                                            <Spinner />
                                        </Fade>
                                    )
                                ) : (
                                    'Cheackout'
                                )}
                            </Button>
                        </Tooltip>
                        <Button colorScheme="red" onClick={() => handleClose()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
