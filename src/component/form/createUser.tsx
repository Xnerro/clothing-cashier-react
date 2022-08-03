import { FC } from 'react';
import {
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Button,
    Input,
    HStack,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

interface Prop {
    close: Close;
}

export const CreateUser: FC<Prop> = (prop) => {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm<User>();

    const getForm = (data: any) => {
        if (errors) {
            prop.close();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(getForm)}>
                <FormControl isInvalid={errors.name as unknown as boolean}>
                    <FormLabel fontSize={{ lg: 'md', md: 'sm' }} htmlFor="name">
                        Name
                    </FormLabel>
                    <Input
                        fontSize={{ lg: 'md', md: 'sm' }}
                        type="text"
                        id="name"
                        placeholder="Name"
                        {...register('name', { required: true })}
                        borderColor="gray.300"
                        _dark={{
                            borderColor: 'whiteAlpha.100',
                        }}
                    />
                    <FormErrorMessage>
                        {errors.name && 'Name is Required'}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.username as unknown as boolean}>
                    <FormLabel
                        fontSize={{ lg: 'md', md: 'sm' }}
                        htmlFor="username"
                    >
                        Username
                    </FormLabel>
                    <Input
                        fontSize={{ lg: 'md', md: 'sm' }}
                        type="text"
                        id="username"
                        placeholder="Username"
                        {...register('username', {
                            required: true,
                        })}
                        borderColor="gray.300"
                        _dark={{
                            borderColor: 'whiteAlpha.100',
                        }}
                    />
                    <FormErrorMessage>
                        {errors.username && 'Username is required'}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.role as unknown as boolean}>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { ref, ...field } }) => (
                            <RadioGroup ref={ref} {...field}>
                                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                                    Role
                                </FormLabel>
                                <HStack>
                                    {['Admin', 'Cashier', 'Guest'].map(
                                        (x: any, i: number) => (
                                            <Radio
                                                size={{
                                                    lg: 'md',
                                                    md: 'sm',
                                                }}
                                                key={i}
                                                value={x}
                                                borderColor="gray.300"
                                                _dark={{
                                                    borderColor:
                                                        'whiteAlpha.100',
                                                }}
                                            >
                                                {x}
                                            </Radio>
                                        )
                                    )}
                                </HStack>
                                <FormErrorMessage>
                                    {errors.role && 'role is required'}
                                </FormErrorMessage>
                            </RadioGroup>
                        )}
                    />
                </FormControl>
                <Button
                    fontSize={{ lg: 'md', md: 'sm' }}
                    mt="3"
                    type="submit"
                    isLoading={isSubmitting}
                >
                    Check
                </Button>
            </form>
        </>
    );
};
