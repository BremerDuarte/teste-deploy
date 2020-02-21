import React, { useState } from 'react';
import SelectCellTable from './components/SelectCellTable';
import PesquisaTable from './components/PesquisaTable';
import { Atividades, SubAtividades, EscalaProps, EmptyData, UnidadeDia, UnidadeEscala } from './fakeData';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import './SolicitarPesquisa.css';
// import CssBaseline from '@material-ui/core/CssBaseline'

import Select, { Option } from '@material/react-select';
import '@material/react-select/dist/select.css';
import '@material/react-list/dist/list.css';
import '@material/react-menu-surface/dist/menu-surface.css';
import '@material/react-menu/dist/menu.css';

import SelectTest from './components/SelectTest';


function SolicitarPesquisa({ history }) {
    window.onbeforeunload = function (e) {
        return "";
    };

    window.onunload = function () {
        localStorage.removeItem('pesquisaData');
    }

    const [data, setData] = useState(React.useMemo(() => JSON.parse(localStorage.getItem('pesquisaData')) || [EmptyData(), EmptyData()], []));

    const unidadeDia = UnidadeDia();
    const unidadeEscala = UnidadeEscala();

    function updateData(propertyName, value, index) {
        const newData = [...data];
        newData[index][propertyName] = value;
        setData(newData);
    }

    const atividades = Atividades();
    const onClickRemove = (event, rowIndex) => {
        const newData = data.filter((element, index) => rowIndex !== index)
        setData(newData);
    }

    function resolverUnidadeDia(unidade, valor) {
        if (unidade === 1)
            return valor;
        else if (unidade === 2)
            return valor * 30;
        else if (unidade === 3)
            return valor * 360;
    }

    const columns = [
        {
            Header: 'Atividade',
            accessor: 'atividade',
            Footer: foot => {
                return <span style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>Totais</span>
            },
            Cell: ({ row }) => {
                return (<>Levantamentos Topográficos</>)
            }
        },
        {
            Header: 'Subatividade',
            accessor: 'subatividades',
            Cell: ({ row }) => {
                return <>Escala Regional</>
            }
        },
        {
            Header: 'Unidade',
            accessor: 'escala',
            Cell: ({ row }) => {
                return <>1:50000 (M)</>
            }
        },
        {
            Header: 'Orçamento (R$)',
            accessor: 'orcamento',
            Footer: foot => {
                const somatorioOrcamento = foot.rows.reduce((a, d) => (a + (d.values.orcamento !== '' ? parseInt(d.values.orcamento) : 0)), 0);
                return <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>R$ 77000</span>
            },
            Cell: ({ row }) => {
                return (<>
                    <span style={{ marginRight: '5px', fontWeight: 'bold' }}>R$</span>
                    38500
                </>);
            }
        },
        {
            Header: 'Cronograma/Prazo',
            accessor: 'cronograma',
            Footer: foot => {
                const somatorioCronograma = foot.rows.reduce(
                    (a, d) => (a +
                        (d.values.cronograma.value !== ''
                            ? resolverUnidadeDia(parseInt(d.values.cronograma.unidade), parseInt(d.values.cronograma.value))
                            : 0)
                    ), 0);
                return <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>150 dia(s)</span>
            },
            Cell: ({ row }) => {
                return (<>75 dia(s)</>)
            }
        },
        {
            Header:
                () => {
                    return (
                        <AddBoxIcon
                            style={{ color: '#42e8e1de', cursor: 'pointer' }}
                            onClick={adicionarRow} />
                    )
                },
            id: 'acao',
            Cell: ({ row }) => {
                return (
                    <DeleteIcon
                        style={{ color: '#ec0808de', cursor: 'pointer' }}
                        onClick={e => onClickRemove(e, row.index)}
                    />
                );
            }
        }
    ];

    const adicionarRow = e => {
        const emptyData = EmptyData();
        setData([...data, emptyData]);
    }

    const logarData = (path) => {
        localStorage.setItem('pesquisaData', JSON.stringify(data));
        history.push(path);
    }

    const [selectAtividade, setSelectAtividade] = useState('');

    const onChangeSelectAtividade = e => {
        setSelectAtividade(e.target.value);
    }

    const options = [
        {
            id: 1,
            text: 'Opção 1'
        },
        {
            id: 2,
            text: 'Opção 2'
        },
        {
            id: 3,
            text: 'Opção 3'
        },
        {
            id: 4,
            text: 'Opção 4'
        },
    ];

    return (
        <div id="default">
            <SelectTest optionsData={options} label="Selecione a Opção" />
            <div>
                <PesquisaTable columns={columns} data={data}
                    getRowProps={row => ({
                        style: {
                            background: row.index % 2 === 0 ? 'white' : 'rgba(0,0,0,.01)',
                        },
                    })}
                    getFooterProps={() => ({
                        style: {
                            background: 'rgba(43, 8, 148, 0.88)',
                        }
                    })}
                />
            </div>
            <br />
            <div className="container-button" style={{ marginLeft: '979px' }}>
                <button
                    className="mdc-button mdc-button--unelevated spacing-normal mr-1"
                    onClick={e => logarData('/')}
                >
                    <span className="mdc-button__ripple"></span>
                    Voltar
                </button>
                <button
                    className="mdc-button mdc-button--unelevated spacing-normal"
                    onClick={e => logarData('/Page2')}
                >
                    <span className="mdc-button__ripple"></span>
                    Avançar
                </button>
            </div>
        </div>
    );
}

export default SolicitarPesquisa