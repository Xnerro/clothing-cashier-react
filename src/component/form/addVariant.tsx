import {
    Box,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Radio,
    RadioGroup,
    Select,
    HStack,
    Image,
    Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const style_light: any = {
    boxShadow: '0px 0px 5px 3px rgba(49,151, 149, 1) ',
};

interface Props {
    close: Close;
}

export const AddVariant: FC<Props> = ({ close }) => {
    const [data, setData] = useState<object[] | unknown[]>([]);
    const [product, setProduct] = useState<any>();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Variant>();

    const handleData = (data: any) => {
        if (errors && product !== undefined) {
            close();
        }
        console.log(data);
    };

    const getData = async () => {
        await axios.get('data/product.json').then((res) => setData(res.data));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Box>
                <Box>
                    <Box
                        overflow="auto"
                        display="flex"
                        w="100%"
                        columnGap={{ lg: '5', md: '3' }}
                        p="5"
                    >
                        {data.map((x: any, i: number) => (
                            <Image
                                src={x.Image}
                                key={i}
                                w={{ lg: '36', md: '24' }}
                                h={{ lg: '36', md: '24' }}
                                boxShadow="md"
                                css={x.Id === product ? style_light : null}
                                onClick={() => setProduct(x.Id)}
                            />
                        ))}
                    </Box>
                </Box>
                <Box as="form" onSubmit={handleSubmit(handleData)} w="100%">
                    <FormControl isInvalid={errors.color as unknown as boolean}>
                        <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                            Color
                        </FormLabel>
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
                                    w="95%"
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
                        <FormErrorMessage>
                            {errors.color && 'Please Fill Color Field'}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.size as unknown as boolean}>
                        <FormLabel>Size</FormLabel>
                        <Controller
                            name="size"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { ref, ...field } }) => (
                                <RadioGroup ref={ref} {...field}>
                                    <HStack>
                                        {[
                                            'XS',
                                            'S',
                                            'M',
                                            'L',
                                            'XL',
                                            'XXL',
                                            'XXXL',
                                        ].map((x: any, i: number) => (
                                            <Radio
                                                key={i}
                                                value={x}
                                                borderColor="gray.300"
                                                _dark={{
                                                    borderColor:
                                                        'whiteAlpha.100',
                                                }}
                                                size={{
                                                    lg: 'md',
                                                    md: 'sm',
                                                }}
                                            >
                                                {x}
                                            </Radio>
                                        ))}
                                    </HStack>
                                </RadioGroup>
                            )}
                        />
                        <FormErrorMessage>
                            {errors.size && 'Please fill size field'}
                        </FormErrorMessage>
                    </FormControl>
                    <Box display="flex" w="100%" justifyContent="space-between">
                        <FormControl
                            isInvalid={errors.price as unknown as boolean}
                        >
                            <FormLabel
                                fontSize={{ lg: 'md', md: 'sm' }}
                                htmlFor="price"
                            >
                                Price
                            </FormLabel>
                            <Input
                                {...register('price', { required: true })}
                                placeholder="0"
                                id="price"
                                w="90%"
                                borderColor="gray.300"
                                _dark={{
                                    borderColor: 'whiteAlpha.100',
                                }}
                                fontSize={{ lg: 'md', md: 'sm' }}
                            />
                            <FormErrorMessage>
                                {errors.price && 'Please fill price field'}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.stock as unknown as boolean}
                        >
                            <FormLabel
                                htmlFor="stock"
                                fontSize={{ lg: 'md', md: 'sm' }}
                            >
                                Stock
                            </FormLabel>
                            <Input
                                {...register('stock', { required: true })}
                                placeholder="0"
                                w="90%"
                                id="stock"
                                borderColor="gray.300"
                                fontSize={{ lg: 'md', md: 'sm' }}
                                _dark={{
                                    borderColor: 'whiteAlpha.100',
                                }}
                            />
                            <FormErrorMessage>
                                {errors.stock && 'Please fill stock field'}
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                    <FormControl
                        isInvalid={errors.category as unknown as boolean}
                    >
                        <FormLabel
                            fontSize={{ lg: 'md', md: 'sm' }}
                            htmlFor="category"
                        >
                            Category
                        </FormLabel>
                        <Controller
                            name="category"
                            rules={{ required: true }}
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <RadioGroup ref={ref} {...field} id="category">
                                    <HStack>
                                        {['T-Shirt', 'Pants', 'Suit'].map(
                                            (x: any, i: number) => (
                                                <Radio
                                                    key={i}
                                                    value={x}
                                                    borderColor="gray.300"
                                                    _dark={{
                                                        borderColor:
                                                            'whiteAlpha.100',
                                                    }}
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
                            )}
                        />
                        <FormErrorMessage>
                            {errors.category && 'Please fill category field'}
                        </FormErrorMessage>
                    </FormControl>
                    <Box display="flex" justifyContent="center">
                        <Button
                            me="0"
                            ms="0"
                            w="50%"
                            mt="5"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
