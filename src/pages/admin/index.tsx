import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TableData } from '../../component/table/dataTable';
import { NavBar } from '../../component/navbar';
import { SideBar } from '../../component/sideBar';
import { StatisticView } from '../../component/statistictView';
import { ProductTable } from '../../component/table/productVariantTable';
import { Redirect } from '../redirect/redirect';

const menu: string[] = [
    'Items Menu',
    'Statistics',
    'Users Menu',
    'Products Menu',
    'Variants Menu',
    'Color Menu',
];

export const AdminPane: FC = () => {
    const [show, setShow] = useState<string>('Items Menu');

    const handleShow = (x: string) => {
        setShow(x);
    };

    return (
        <>
            {localStorage.getItem('token') ? (
                <>
                    <Helmet>
                        <title>Admin Pane</title>
                        <meta
                            name="description"
                            content="page of admin panel"
                        />
                        <meta
                            name="keywords"
                            content="shop, cashier, react, chakra-ui, typescript"
                        />
                    </Helmet>

                    <Box
                        maxW="100%"
                        minH="100vh"
                        overflowX="hidden"
                        display="flex"
                        flexDir="column"
                    >
                        <NavBar page={'admin'} />
                        <Box display="flex">
                            <SideBar
                                menu={menu}
                                page={'admin'}
                                handleShow={handleShow}
                            />
                            {show === 'Products Menu' && (
                                <TableData
                                    url="data/product.json"
                                    menu={show}
                                />
                            )}
                            {show === 'Users Menu' && (
                                <TableData url="data/user.json" menu={show} />
                            )}
                            {show === 'Statistics' && <StatisticView />}
                            {show === 'Variants Menu' && (
                                <TableData
                                    url="data/variants.json"
                                    menu={show}
                                />
                            )}
                            {show === 'Items Menu' && (
                                <ProductTable menu={show} />
                            )}
                            {show === 'Color Menu' && (
                                <TableData url="data/color.json" menu={show} />
                            )}
                        </Box>
                    </Box>
                </>
            ) : (
                <Redirect url="../login" />
            )}
        </>
    );
};
