import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

import SolicitarPesquisa from './SolicitarPesquisa';
import Page2 from './Page2';
import Inicio from './Inicio';

export default function Routes() {
    return (
        <HashRouter>
            <Route path="/" exact component={Inicio} />
            <Route path="/Solicitar" component={SolicitarPesquisa} />
            <Route path="/Page2" component={Page2} />
        </HashRouter>
    );
}