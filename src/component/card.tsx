/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import {
    AspectRatio,
    Box,
    Heading,
    Image,
    Text,
    useColorModeValue,
    Skeleton,
    useDisclosure,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Button,
    RadioGroup,
    HStack,
    Radio,
    FormLabel,
    Badge,
    Select,
} from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
    url?: string;
    name?: string;
    id?: string | number;
}

export const Card: FC<Props> = ({ url, name, id }) => {
    const [val, setVal] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [load, setLoad] = useState(false);

    const getVariant = async () => {
        await axios.get('data/variants.json').then((res: any) => {
            console.log(res.data);
            res.data.map((x: any) => {
                if (x.Product_id === id) {
                    setPrice(x.Price);
                }
            });
        });
    };

    useEffect(() => {
        getVariant();
        setTimeout(() => {
            setLoad(true);
        }, 800);
    }, []);

    const closeModal = () => {
        setVal('');
        setColor('');
        setCounter(0);
        onClose();
    };
    return (
        <>
            <Skeleton isLoaded={load} fadeDuration={2} h="fit-content">
                <Box
                    width={{ lg: '205px', md: '120px' }}
                    height={{ lg: '300px', md: '180px' }}
                    border="1px solid"
                    borderColor={useColorModeValue(
                        'gray.300',
                        'whiteAlpha.300'
                    )}
                    boxShadow={useColorModeValue(
                        'md',
                        '0px 0px 8px rgba(255,255,255,0.1)'
                    )}
                    borderRadius="sm"
                    borderBottomRadius="md"
                    onClick={onOpen}
                >
                    <AspectRatio ratio={1}>
                        <Image src={url} alt="baju" objectFit="contain" />
                    </AspectRatio>
                    <Box
                        display="flex"
                        flexDir="column"
                        w="100%"
                        mt={{ lg: '2', md: '1' }}
                        p="2"
                        rowGap={{ lg: '2', md: '1' }}
                    >
                        <Heading fontSize={{ lg: 'lg', md: 'sm' }}>
                            {name}
                        </Heading>
                        <Text fontSize={{ lg: 'md', md: 'x-small' }}>
                            ${price}
                        </Text>
                    </Box>
                </Box>

                <Modal
                    onClose={() => closeModal()}
                    isOpen={isOpen}
                    size={{ lg: 'sm', md: 'xs' }}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Baju Baru</ModalHeader>
                        <ModalCloseButton
                            onClick={() => {
                                closeModal();
                            }}
                        />
                        <ModalBody>
                            <AspectRatio ratio={1}>
                                <Image
                                    src={url}
                                    alt="baju"
                                    objectFit="contain"
                                />
                            </AspectRatio>
                            <Box display="flex">
                                <Box>
                                    <FormLabel
                                        fontSize={{ lg: 'md', md: 'sm' }}
                                        htmlFor="size"
                                    >
                                        Size
                                    </FormLabel>
                                    <RadioGroup onChange={setVal} value={val}>
                                        <HStack direction="column">
                                            {['S', 'M', 'L'].map(
                                                (x: any, i: number) => (
                                                    <Radio
                                                        id="size"
                                                        key={i}
                                                        value={x}
                                                        size={{
                                                            lg: 'md',
                                                            md: 'sm',
                                                        }}
                                                    >
                                                        {x}
                                                    </Radio>
                                                )
                                            )}
                                        </HStack>
                                    </RadioGroup>
                                    <FormLabel
                                        fontSize={{ lg: 'md', md: 'sm' }}
                                        htmlFor="color"
                                    >
                                        Color
                                    </FormLabel>
                                    <Select
                                        w={{ md: '36', lg: '44' }}
                                        fontSize={{ lg: 'md', md: 'sm' }}
                                        placeholder="Select Color"
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    >
                                        {['Black', 'White', 'Blue'].map(
                                            (x: any, i: number) => (
                                                <option
                                                    id="color"
                                                    key={i}
                                                    value={x}
                                                >
                                                    {x}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </Box>
                                <Box
                                    w="100%"
                                    display="flex"
                                    alignItems="end"
                                    justifyContent="center"
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        w="80%"
                                    >
                                        <Button
                                            variant="unstyled"
                                            borderRadius="sm"
                                            bg="gray.300"
                                            _dark={{
                                                bg: 'gray.600',
                                            }}
                                            w="5"
                                            minW="0"
                                            h="6"
                                            onClick={() =>
                                                setCounter(counter + 1)
                                            }
                                        >
                                            +
                                        </Button>
                                        <Badge
                                            w={{ lg: '5', md: '6' }}
                                            alignSelf="center"
                                            fontSize="lg"
                                            borderRadius="sm"
                                            bg="none"
                                        >
                                            {counter}
                                        </Badge>
                                        <Button
                                            variant="unstyled"
                                            borderRadius="sm"
                                            bg="gray.300"
                                            _dark={{
                                                bg: 'gray.600',
                                            }}
                                            w="5"
                                            minW="0"
                                            h="6"
                                            onClick={() => {
                                                if (counter > 0) {
                                                    setCounter(counter - 1);
                                                }
                                            }}
                                        >
                                            -
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Skeleton>
        </>
    );
};
