/* eslint-disable array-callback-return */
import { Box } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { NavBar } from '../../component/navbar';
import { SideBar } from '../../component/sideBar';
import { Helmet } from 'react-helmet-async';
import { Container } from '../../component/container';
import { Redirect } from '../redirect/redirect';
import axios from 'axios';
import { uniq } from 'lodash';

const menu: string[] = ['Shirt', 'Pant', 'Suit'];

export const Cashier: FC = () => {
    const [data, setData] = useState<Data>();
    const [show, setShow] = useState<any>(data?.Shirt);
    const handleShow = (x: string) => {
        if (x === 'Shirt') {
            setShow(data?.Shirt);
        } else if (x === 'Pant') {
            setShow(data?.Pant);
        } else if (x === 'Suit') {
            setShow(data?.Suit);
        }
    };

    const filterData = (x: object[]) => {
        var a: any = [];
        var i: any = [];
        var u: any = [];
        // eslint-disable-next-line array-callback-return
        x.map((y: any) => {
            if (y.Variant.some((z: any) => z.Category === 'T-Shirt')) {
                // eslint-disable-next-line array-callback-return
                a.push({
                    id: y.Id,
                    name: y.Name,
                    image: y.Image,
                });
            } else if (y.Variant.some((z: any) => z.Category === 'Pants')) {
                // eslint-disable-next-line array-callback-return
                i.push({
                    id: y.Id,
                    name: y.Name,
                    image: y.Image,
                });
            } else {
                // eslint-disable-next-line array-callback-return
                u.push({
                    id: y.Id,
                    name: y.Name,
                    image: y.Image,
                });
            }
        });
        setData({ ...data, Shirt: uniq(a), Pant: uniq(i), Suit: uniq(u) });
        setShow(uniq(a));
    };

    const getData = async () => {
        await axios.get('/data/productVariant.json').then((res) => {
            console.log(res.data);
            filterData(res.data);
        });
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {localStorage.getItem('token') ? (
                <>
                    <Helmet>
                        <title>Cashier</title>
                        <meta
                            name="description"
                            content="page that handle order on the cashier"
                        />
                        <meta
                            name="keywords"
                            content="shop, cashier, react, chakra-ui, typescript"
                        />
                    </Helmet>
                    <Box
                        maxW="100%"
                        minH="100vh"
                        overflow="auto"
                        display="flex"
                        flexDir="column"
                    >
                        <NavBar page={'cashier'} />
                        <Box display="flex">
                            <SideBar
                                menu={menu}
                                page={'cashier'}
                                handleShow={handleShow}
                            />
                            <Container data={show} />
                        </Box>
                    </Box>
                </>
            ) : (
                <Redirect url="/login" />
            )}
        </>
    );
};
