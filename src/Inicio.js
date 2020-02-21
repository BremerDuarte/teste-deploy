import React from 'react';

// import useScript from './hooks/useScript';
// import './assets/css/global.min.css';
// import './Inicio.css';

// import '@material/react-list/dist/list.css';
// // import '@material/react-menu-surface/dist/menu.css';
// import '@material/react-menu/dist/menu.css';
// import '@material/react-select/dist/select.css';

// import Select, { Option } from '@material/react-select';

export default function Inicio({ history }) {
    function solicitarPesquisa() {
        history.push('/solicitar');
    }

    // useScript('js/script_config.js');

    function onChange(event) {
        console.log(event.target.value);
    }

    return (
        <>
            <button onClick={solicitarPesquisa}>Solicitar Pesquisa</button>
            <br /><br /><br /><br />
            {/* <div> */}
            <div className="mdc-select">
                <div className="mdc-select__anchor">
                    <i className="mdc-select__dropdown-icon"></i>
                    <div className="mdc-select__selected-text"></div>
                    <span className="mdc-floating-label">Selecione a Atividade</span>
                    <div className="mdc-line-ripple"></div>
                </div>

                <div className="mdc-select__menu mdc-menu mdc-menu-surface">
                    <ul className="mdc-list" onChange={e => onChange(e)}>
                        <li className="mdc-list-item mdc-list-item--selected" value=""></li>
                        <li className="mdc-list-item" value="0">Atividade 1</li>
                        <li className="mdc-list-item" value="1">Atividade 2</li>
                        <li className="mdc-list-item" value="2">Atividade 3</li>
                    </ul>
                </div>
            </div>
            {/* </div> */}

            {/* <Select
                label='Choose Dog'
                value=''
                onChange={onChange}
            >
                <Option value='pomsky'>Pomsky</Option>
                <Option value='goldenDoodle'>Golden Doodle</Option>
            </Select> */}
        </>
    )
}