import {
    Image,
    Td,
    Tr,
    AspectRatio,
    Icon,
    Box,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalFooter,
    useDisclosure,
    ModalHeader,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { uniq } from 'lodash';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { DeleteValidation } from '../deleteValidation';
import { EditForm } from '../form/editForm';

interface Props {
    data: any;
    head?: string[];
    menu?: string;
}

export const BodyTable: FC<Props> = (prop) => {
    const head: any[] = prop.head as unknown as ChildData[];
    const variant: object[] | any[] = prop.data.Variant;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [method, setMethod] = useState<string>();
    const [id, setId] = useState<number>(0);

    const openDelete = () => {
        setMethod('Delete');
        onOpen();
    };

    const openEdit = (id: number) => {
        setMethod('Edit');
        setId(id);
        onOpen();
    };

    return (
        <>
            <Tr>
                {head.map((x: keyof ChildData, i: number) => {
                    return (
                        <>
                            <Td fontSize={{ lg: 'md', md: '1vw' }} key={i}>
                                {x === 'Image' ? (
                                    <AspectRatio
                                        ratio={1}
                                        w={{ lg: '16', md: '10' }}
                                    >
                                        <Image src={prop.data[x]} />
                                    </AspectRatio>
                                ) : Object.keys(prop.data)[i] !== x ? (
                                    uniq(variant.map((z: any) => z[x])) + ' '
                                ) : (
                                    prop.data[x]
                                )}
                            </Td>
                            {(prop.menu !== 'Items Menu' && x === 'Image') ||
                            (x === 'Color' && prop.menu !== 'Variants Menu' && prop.menu !== 'Items Menu') ||
                            x === 'Stock' ||
                            x === 'Role' ? (
                                <Td>
                                    {prop.menu === 'Items Menu' ? null : (
                                        <Box
                                            display="flex"
                                            justifyContent="space-around"
                                        >
                                            <Icon
                                                as={BsFillTrashFill}
                                                cursor="pointer"
                                                boxSize={{ md: '2.5', lg: '4' }}
                                                onClick={() => openDelete()}
                                            />
                                            <Icon
                                                as={BsPencilSquare}
                                                cursor="pointer"
                                                boxSize={{ md: '2.5', lg: '4' }}
                                                onClick={() =>
                                                    openEdit(prop.data.Id)
                                                }
                                            />
                                        </Box>
                                    )}
                                </Td>
                            ) : null}
                        </>
                    );
                })}
            </Tr>

            <Modal isOpen={isOpen} size="xl" onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {method}{' '}
                        {method === 'Delete'
                            ? 'Validation'
                            : prop.menu?.split(' ')[1]}
                    </ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody textAlign="center">
                        {method === 'Delete' ? (
                            <DeleteValidation />
                        ) : (
                            <EditForm menu={prop.menu} id={id} />
                        )}
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
