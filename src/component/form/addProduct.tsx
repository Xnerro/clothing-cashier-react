import { FC, useState } from 'react';
import {
    Box,
    AspectRatio,
    Image,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';

interface Prop {
    close: Close;
}

export const AddProduct: FC<Prop> = ({ close }) => {
    const [image, setImage] = useState<any>();
    const [name, setName] = useState<string>();

    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileRead = async (event: any) => {
        const f = event.target.files[0];
        const base64 = await convertBase64(f);
        setImage(base64);
    };

    const addProduct = () => {
        if (image !== undefined) {
            close();
        }
    };

    return (
        <>
            <Box display="flex" w="100%" justifyContent="space-between">
                <Box
                    h="50vh"
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {image !== undefined ? (
                        <AspectRatio
                            ratio={1}
                            w={{ md: '225px', lg: '300px' }}
                            h={{ md: '225px', lg: '300px' }}
                            boxShadow="lg"
                            border="1px solid"
                            borderColor="gray.300"
                            _dark={{
                                borderColor: 'whiteAlpha.100',
                            }}
                        >
                            <Image src={image} alt="photo review" />
                        </AspectRatio>
                    ) : (
                        <Box
                            h={{ md: '225px', lg: '300px' }}
                            w={{ md: '225px', lg: '300px' }}
                            boxShadow="lg"
                            border="1px solid"
                            borderColor="gray.300"
                            _dark={{
                                borderColor: 'whiteAlpha.100',
                            }}
                        ></Box>
                    )}
                </Box>
                <Box
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                >
                    <Box
                        as="form"
                        display="flex"
                        justifyContent="space-around"
                        flexDir="column"
                        h="60%"
                    >
                        <FormControl>
                            <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                                Name
                            </FormLabel>
                            <Input
                                onChange={(e: any) => setName(e.target.value)}
                                borderColor="gray.300"
                                _dark={{
                                    borderColor: 'whiteAlpha.100',
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontSize={{ lg: 'md', md: 'sm' }}>
                                Image
                            </FormLabel>
                            <Button
                                fontSize={{ lg: 'md', md: 'sm' }}
                                as="label"
                                w="100%"
                                variant="outline"
                                color="inherit"
                                htmlFor="file"
                            >
                                Select a file
                            </Button>
                            <Input
                                type="file"
                                id="file"
                                onChange={(e: any) => handleFileRead(e)}
                                display="none"
                            />
                        </FormControl>
                    </Box>
                    <Button onClick={addProduct}>Add Product</Button>
                </Box>
            </Box>
        </>
    );
};
