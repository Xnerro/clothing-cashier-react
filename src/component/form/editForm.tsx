import {
    Box,
    Button,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Select,
    HStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
    menu?: string;
    id?: number;
}

const Pengguna: FC<{ id?: number }> = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = useForm<User>();
    const submited = (data: any) => {
        console.log(data);
    };
    return (
        <>
            <Box
                as="form"
                onSubmit={handleSubmit(submited)}
                display="flex"
                flexDir="column"
                alignItems="start"
            >
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Name</FormLabel>
                <Input {...register('name')} />
                <FormLabel>Username</FormLabel>
                <Input {...register('username')} />
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Age</FormLabel>
                <Input {...register('age')} />
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Role</FormLabel>
                <Controller
                    name="role"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                        <RadioGroup ref={ref} {...field}>
                            {['Admin', 'User'].map((x: string, i: number) => (
                                <Radio key={i} value={x}>
                                    {x}
                                </Radio>
                            ))}
                        </RadioGroup>
                    )}
                />
                <Button type="submit" isLoading={isSubmitting} mt="5">
                    Edit
                </Button>
            </Box>
        </>
    );
};

const Variant: FC<{ id?: number }> = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = useForm<Variant>();

    const submited = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <Box
                as="form"
                onSubmit={handleSubmit(submited)}
                display="flex"
                flexDir="column"
                alignItems="start"
            >
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                    Product Id
                </FormLabel>
                <Input
                    value={id}
                    readOnly
                    borderColor="gray.300"
                    _dark={{
                        borderColor: 'whiteAlpha.100',
                    }}
                />
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Color</FormLabel>
                <Controller
                    name="color"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                        <Select
                            fontSize={{ lg: 'md', md: 'sm' }}
                            ref={ref}
                            {...field}
                            placeholder="Select A Color"
                            w="100%"
                            borderColor="gray.300"
                            _dark={{
                                borderColor: 'whiteAlpha.100',
                            }}
                        >
                            {['Black', 'Orange', 'Blue', 'White'].map(
                                (x: string, i: number) => (
                                    <option key={i} value={x}>
                                        {x}
                                    </option>
                                )
                            )}
                        </Select>
                    )}
                />
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Size</FormLabel>
                <Controller
                    name="size"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                        <RadioGroup ref={ref} {...field}>
                            <HStack>
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(
                                    (x: string, i: number) => (
                                        <Radio key={i} value={x}>
                                            {x}
                                        </Radio>
                                    )
                                )}
                            </HStack>
                        </RadioGroup>
                    )}
                />
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                    Category
                </FormLabel>
                <Controller
                    name="category"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                        <RadioGroup ref={ref} {...field}>
                            <HStack>
                                {['Shirt', 'Pant', 'Suit'].map(
                                    (x: string, i: number) => (
                                        <Radio key={i} value={x}>
                                            {x}
                                        </Radio>
                                    )
                                )}
                            </HStack>
                        </RadioGroup>
                    )}
                />
                <Box display="flex" justifyContent="space-between" w="100%">
                    <Box>
                        <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                            Stock
                        </FormLabel>
                        <Input {...register('stock')} placeholder="0" />
                    </Box>
                    <Box>
                        <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                            Price
                        </FormLabel>
                        <Input {...register('price')} placeholder="0" />
                    </Box>
                </Box>
                <Button type="submit" mt="5" isLoading={isSubmitting}>
                    Edit
                </Button>
            </Box>
        </>
    );
};

const Color: FC<{ id?: number }> = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Color>();

    const submited = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <Box
                as="form"
                onSubmit={handleSubmit(submited)}
                display="flex"
                flexDir="column"
                alignItems="start"
            >
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Id</FormLabel>
                <Input value={id} readOnly />
                <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>Color</FormLabel>
                <Input {...register('color')} placeholder="Color" />
                <Button type="submit" mt="5" isLoading={isSubmitting}>
                    Edit
                </Button>
            </Box>
        </>
    );
};

export const EditForm: FC<Props> = ({ menu, id }: Props) => {
    return (
        <>
            {menu === 'Menu Pengguna' && <Pengguna id={id} />}
            {menu === 'Menu Variant' && <Variant id={id} />}
            {menu === 'Color Menu' && <Color id={id} />}
        </>
    );
};
