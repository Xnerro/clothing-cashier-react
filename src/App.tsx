import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './utils/extendThemes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Cashier } from './pages/cahier';
import { HelmetProvider } from 'react-helmet-async';
import { AdminPane } from './pages/admin';

export const App: React.FC = () => (
    <HelmetProvider>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Cashier />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminPane />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </HelmetProvider>
);
