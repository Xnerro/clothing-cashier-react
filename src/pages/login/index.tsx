import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Heading,
    Input,
    FormControl,
    FormErrorMessage,
    Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
    username?: string;
    password: string;
}

export const Login: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const navigate = useNavigate();

    const submitLogin = (data: any) => {
        console.log(data);
        localStorage.setItem('token', data.username);
        navigate('../');
    };

    return (
        <>
            <Box minH="100vh" minW="100vw" maxW="100%">
                <Helmet>
                    <title>Login Page</title>
                    <meta
                        name="description"
                        content="page that handle login to the application"
                    />
                    <meta
                        name="keywords"
                        content="shop, cashier, react, chakra-ui, typescript"
                    />
                </Helmet>

                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    w={{ lg: '35vw', md: '50vw' }}
                    h={{ lg: '60vh', md: '55vh' }}
                    bg="white"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <Heading mt="5vh">Login</Heading>
                    <form
                        onSubmit={handleSubmit(submitLogin)}
                        style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            rowGap: '3vh',
                        }}
                    >
                        <FormControl
                            isInvalid={errors.username?.ref?.value === ''}
                            w="80%"
                        >
                            <Input
                                type="text"
                                placeholder="username"
                                {...register('username', {
                                    required: 'Username Required',
                                })}
                            />
                            <FormErrorMessage>
                                {errors.username && errors.username.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.password?.ref?.value === ''}
                            w="80%"
                        >
                            <Input
                                type="password"
                                placeholder="password"
                                {...register('password', {
                                    required: 'password Required',
                                })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            mt="2vh"
                            isLoading={isSubmitting}
                            colorScheme="messenger"
                            type="submit"
                            w="60%"
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};
