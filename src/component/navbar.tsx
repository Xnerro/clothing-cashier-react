import { FC } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {
    Box,
    Heading,
    Text,
    useColorModeValue,
    Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
    page: string;
}

const user: string = 'admin';

export const NavBar: FC<Props> = (props) => {
    const bg = useColorModeValue('teal.300', 'teal.500');

    return (
        <>
            <Box
                minW="100vw"
                maxW="100%"
                h="8vh"
                bg={bg}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box flexGrow="1">
                    <Heading ms="2vw" fontSize={{ lg: '3xl', md: '2xl' }}>
                        Clothing Cashier
                    </Heading>
                </Box>
                <Box
                    flexGrow="1"
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                    fontSize={{ lg: 'lg', md: 'sm' }}
                >
                    <ColorModeSwitcher />
                    {props.page === 'cashier' && user === 'admin' ? (
                        <Link to="../admin">
                            <Button
                                ms="1vw"
                                variant="solid"
                                color="inherit"
                                colorScheme="whiteAlpha"
                                fontSize={{ lg: 'lg', md: 'sm' }}
                            >
                                Admin Pane
                            </Button>
                        </Link>
                    ) : null}

                    <Text ms="1vw" mr="1vw">
                        Admin
                    </Text>
                    <Button
                        variant="solid"
                        mr="2vw"
                        color="inherit"
                        fontSize={{ lg: 'lg', md: 'sm' }}
                        colorScheme="whiteAlpha"
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.reload();
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </>
    );
};
