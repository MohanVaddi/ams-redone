import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import theme from './theme/index';
import { ColorModeScript } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/inter';
import 'focus-visible/dist/focus-visible';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
ReactDOM.render(
    <AppContextProvider>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <React.StrictMode>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <App />
                </React.StrictMode>
            </ChakraProvider>
        </BrowserRouter>
    </AppContextProvider>,
    document.getElementById('root')
);
