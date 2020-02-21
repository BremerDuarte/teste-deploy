import React from 'react';

import useScript from './hooks/useScript';
import './assets/css/global.min.css';
import './Main.css';

import Routes from './Routes'

function Main() {
    useScript('js/script_config.js');

    return (
        <div>
            <Routes />
        </div>
    );
}

export default Main;