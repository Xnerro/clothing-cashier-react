import {
  Box,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Skeleton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { BodyTable } from './bodyTable';
import { useForm } from 'react-hook-form';
import { CreateUser } from '../form/createUser';
import { AddProduct } from '../form/addProduct';
import { AddVariant } from '../form/addVariant';
import { AddColor } from '../form/addColor';

interface Props {
  url: string;
  menu: string;
}

export const TableData: FC<Props> = props => {
  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<object[]>([]);
  const [head, setHead] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { reset } = useForm<User>();

  const getData = async (url: string) => {
    await fetch(url)
      .then(response => response.json())
      .then(res => {
        setData(res);
        setHead(Object.keys(res[0]));
      });
  };

  useEffect(() => {
    getData(props.url);
    setTimeout(() => {
      setLoad(true);
    }, 800);
  }, [props.url]);

  return (
    <>
      <Box w={{ lg: '80%', md: '75%' }} h='100%' p={{ lg: '6', md: '4' }}>
        <Skeleton isLoaded={load}>
          <Box
            w='100%'
            h='82.5vh'
            bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
            borderRadius='md'
            boxShadow='lg'
            overflow='auto'
            p='2'
            display='flex'
            flexDir='column'
            justifyContent='space-between'
            columnGap={{ lg: '5', md: '3' }}
            rowGap='3'
            border='1px solid'
            borderColor={useColorModeValue('gray.300', 'whiteAlpha.100')}>
            <Box overflow='auto' height='75vh'>
              <TableContainer w='100%'>
                <Table
                  variant='simple'
                  size={{ lg: 'md', md: 'sm' }}
                  colorScheme='teal'>
                  <Thead bg={useColorModeValue('teal.200', 'teal.400')}>
                    <Tr>
                      {head.map((x: any, i: number) => (
                        <Th
                          key={i}
                          fontSize={{
                            lg: 'md',
                            md: '1vw',
                          }}
                          _dark={{
                            color: 'white',
                          }}>
                          {x}
                        </Th>
                      ))}
                      <Th w='32'></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((x: any, i: number) => (
                      <React.Fragment key={i}>
                        {<BodyTable data={x} head={head} menu={props.menu} />}
                      </React.Fragment>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Button w='50%' alignSelf='center' h='5vh' onClick={onOpen}>
              Tambah Data
            </Button>
          </Box>
        </Skeleton>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset({ name: '', username: '', role: '', age: 0 });
        }}
        size={{ lg: '3xl', md: 'xl' }}
        isCentered>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('gray.50', 'gray.800')}>
          <ModalHeader>Add New {props.menu.split(' ')[0]}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              reset({
                name: '',
                username: '',
                role: '',
                age: 0,
              });
            }}
          />
          <ModalBody>
            {props.menu === 'Users Menu' && <CreateUser close={onClose} />}
            {props.menu === 'Products Menu' && <AddProduct close={onClose} />}
            {props.menu === 'Variants Menu' && <AddVariant close={onClose} />}
            {props.menu === 'Color Menu' && <AddColor close={onClose} />}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
