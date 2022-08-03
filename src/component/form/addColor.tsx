import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

export const AddColor: FC<{ close: Close }> = ({ close }) => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<Color>();

    const onSubmit = (data: Color) => {
        console.log(data);
        close();
    };

    return (
        <>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.color as unknown as boolean}>
                    <FormLabel>Color</FormLabel>
                    <Input
                        type="text"
                        {...register('color', { required: true })}
                    />
                    <FormErrorMessage>
                        {errors.color && 'Please fill the field'}
                    </FormErrorMessage>
                </FormControl>
                <Button type="submit" mt="5" isLoading={isSubmitting}>
                    Add
                </Button>
            </Box>
        </>
    );
};
