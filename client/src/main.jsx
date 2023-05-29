// main file
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {ChainId,ThirdwebProvider } from '@thirdweb-dev/react';
import App from './app';

const root= ReactDOM.createRoot(document.getElementById('root'));

root.render(
<ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <Router>
        <App />
    </Router>
    </ThirdwebProvider>
)