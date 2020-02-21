import React, { useState } from 'react';
import SelectCellTable from './components/SelectCellTable';
import PesquisaTable from './components/PesquisaTable';
import { Atividades, SubAtividades, EscalaProps, EmptyData, UnidadeDia, UnidadeEscala } from './fakeData';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import './SolicitarPesquisa.css';
// import CssBaseline from '@material-ui/core/CssBaseline'

import SelectTest from './components/SelectTest';


function SolicitarPesquisa({ history }) {
  window.onbeforeunload = function (e) {
    return "";
  };

  window.onunload = function () {
    localStorage.removeItem('pesquisaData');
  }

  const [data, setData] = useState(React.useMemo(() => JSON.parse(localStorage.getItem('pesquisaData')) || [EmptyData(), EmptyData()], []));
  // const [somatorioOrcamento, setSomatorioOrcamento] = useState(0);
  // const [somatorioCronograma, setSomatorioCronograma] = useState(0);

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
    // AtualizarSomatorios(newData);
  }

  function resolverUnidadeDia(unidade, valor) {
    if (unidade === 1)
      return valor;
    else if (unidade === 2)
      return valor * 30;
    else if (unidade === 3)
      return valor * 360;
  }

  // function AtualizarSomatorios(dados) {
  //   dados = dados || data;
  //   const somatorioOrcamento = dados.reduce((a, d) => (a + (d.orcamento !== '' ? parseInt(d.orcamento) : 0)), 0);
  //   const somatorioCronograma = dados.reduce(
  //     (a, d) => (a +
  //       (d.cronograma.value !== ''
  //         ? resolverUnidadeDia(parseInt(d.cronograma.unidade), parseInt(d.cronograma.value))
  //         : 0)
  //     ), 0);
  //   setSomatorioOrcamento(somatorioOrcamento);
  //   setSomatorioCronograma(somatorioCronograma);
  // }

  const columns = [
    {
      Header: 'Atividades',
      accessor: 'atividade',
      Footer: foot => {
        return <span style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>Totais</span>
      },
      Cell: ({ row }) => {
        // const [atividade, setAtividade] = useState(row.values.atividade.value);
        const [description, setDescription] = useState(row.values.atividade.description);

        // const onChange = (event, rowIndex) => {
        //   const optionIndex = event.target.options.selectedIndex;
        //   const tipoAtividade = event.target.options[optionIndex].getAttribute('tipo');
        //   const atividadeSelecionada = event.target.value;

        //   const atividade = {
        //     value: atividadeSelecionada,
        //     tipo: tipoAtividade,
        //     description: ''
        //   };

        //   setAtividade(atividadeSelecionada);

        //   updateData('atividade', atividade, rowIndex);

        //   const subatividades = SubAtividades(tipoAtividade);
        //   const subAtividade = {
        //     atividades: subatividades,
        //     selecionada: {
        //       value: '',
        //       tipo: null,
        //       escala: false
        //     }
        //   };

        //   updateData('subatividades', subAtividade, row.index);
        // };

        const onChangeTextArea = (element, rowIndex) => {
          setDescription(element.value);
          data[rowIndex].atividade.description = element.value;
        }

        const handleAtividade = (value, tipo) => {
          const atividade = {
            value: value,
            tipo: tipo,
            description: ''
          };

          updateData('atividade', atividade, row.index);

          const subatividades = SubAtividades(tipo);
          const subAtividade = {
            atividades: subatividades,
            selecionada: {
              value: '',
              tipo: null,
              escala: false
            }
          };

          updateData('subatividades', subAtividade, row.index);
        }

        if (atividades.length > 0 && row.values.atividade.tipo !== '10')
          return (
            // <SelectCellTable
            //   value={atividade}
            //   optionsData={atividades}
            //   onChange={onChange}
            //   row={row}
            // />

            <SelectTest
              label="Selecione a atividade"
              optionsData={atividades}
              handleData={handleAtividade}
              defaultValue={row.values.atividade.value}
            />
          );
        else if (row.values.atividade.tipo === '10') {
          return (
            <textarea
              cols="30"
              rows="4"
              maxLength="250"
              onChange={e => onChangeTextArea(e.target, row.index)}
              value={description}
            />
          );
        }
        else
          return (
            <></>
          );
      }
    },
    {
      Header: 'Sub-Atividades',
      accessor: 'subatividades',
      Cell: ({ row }) => {
        // const [subatividade, setSubatividade] = useState(row.values.subatividades.selecionada.value);
        // const onChange = (event, rowIndex) => {
        //   const optionIndex = event.target.options.selectedIndex;
        //   const tipoSubatividade = event.target.options[optionIndex].getAttribute('tipo');
        //   const subatividadeSelecionada = event.target.value;

        //   const newData = [...data];
        //   newData[rowIndex].subatividades.selecionada = {
        //     value: subatividadeSelecionada,
        //     tipo: tipoSubatividade,
        //     escala: EscalaProps(tipoSubatividade)
        //   };

        //   setSubatividade(subatividadeSelecionada);
        //   setData(newData);
        // };

        const handleSubatividade = (value, tipo) => {
          const newData = [...data];
          newData[row.index].subatividades.selecionada = {
            value: value,
            tipo: tipo,
            escala: EscalaProps(tipo)
          };

          setData(newData);
        }

        if (row.values.subatividades.atividades.length > 0)
          return (
            // <SelectCellTable
            //   value={subatividade}
            //   onChange={onChange}
            //   optionsData={row.values.subatividades.atividades}
            //   row={row}
            // />
            <SelectTest
              label="Selecione a subatividade"
              optionsData={row.values.subatividades.atividades}
              handleData={handleSubatividade}
              defaultValue={row.values.subatividades.selecionada.value}
            />
          );
        else
          return (
            <><span>-</span></>
          );
      }
    },
    {
      Header: 'Escala',
      accessor: 'escala',
      Cell: ({ row }) => {
        const escalaProps = row.values.subatividades.selecionada.escala;
        const [escalaTest, setEscalaTest] = useState('');
        const [unidade, setUnidade] = useState(row.values.subatividades.selecionada.escala.unidade);

        const onChange = (event, rowIndex) => {
          const targetValue = event.target.value;
          if (event.target.validity.valid) {
            setEscalaTest(targetValue);
            data[rowIndex].subatividades.selecionada.escala.value = targetValue;
          } else if (targetValue === '') {
            setEscalaTest(targetValue);
            data[rowIndex].subatividades.selecionada.escala.value = targetValue;
          }
        }

        // const onChangeUnidade = (event, rowIndex) => {
        //   setUnidade(event.target.value);
        //   data[rowIndex].subatividades.selecionada.unidade = event.target.value;
        // };

        const handleUnidade = value => {
          data[row.index].subatividades.selecionada.unidade = value;
        }

        const onBlur = (event, rowIndex) => {
          if (event.target.value !== '') {
            const valorEscala = parseInt(event.target.value);
            if (valorEscala > 500000 || valorEscala < 50000) {
              setEscalaTest('');
              data[rowIndex].subatividades.selecionada.escala.value = '';
              alert('O valor da escala deve ser menor que 500000 e maior que 50000.');
            }
          }
        }

        if (escalaProps.exibir && row.values.subatividades.selecionada.value) {
          return (
            <>
              {/* <SelectCellTable
                style={{ marginRight: '5px' }}
                value={unidade || row.values.subatividades.selecionada.unidade}
                onChange={onChangeUnidade}
                optionsData={unidadeEscala}
                row={row}
              /> */}

              <SelectTest
                label="Unidade"
                optionsData={unidadeEscala}
                handleData={handleUnidade}
                defaultValue={row.values.subatividades.selecionada.unidade}
              />

              <input
                type="text"
                pattern="[0-9]*"
                onChange={e => onChange(e, row.index)}
                onBlur={e => onBlur(e, row.index)}
                maxLength={6}
                value={escalaTest || escalaProps.value}
                style={{ width: '100px' }}
              />
            </>
          );
        }
        else
          return (
            <>-</>
          )
      }
    },
    {
      Header: 'Orçamento (R$)',
      accessor: 'orcamento',
      Footer: foot => {
        const somatorioOrcamento = foot.rows.reduce((a, d) => (a + (d.values.orcamento !== '' ? parseInt(d.values.orcamento) : 0)), 0);
        return <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>R$ {somatorioOrcamento}</span>
      },
      Cell: ({ row }) => {
        const [orcamentoTest, setOrcamentoTest] = useState(row.values.orcamento);

        const onChange = (event, rowIndex) => {
          const targetValue = event.target.value;
          if (event.target.validity.valid) {
            setOrcamentoTest(targetValue);
          } else if (targetValue === '') {
            setOrcamentoTest(targetValue);
          }
        }

        const onBlur = (event, rowIndex) => {
          // event.preventDefault();
          updateData('orcamento', event.target.value, rowIndex);
          // AtualizarSomatorios();
        }

        return (
          <>
            <span style={{ marginRight: '5px', fontWeight: 'bold' }}>R$</span>
            <input
              type="text"
              pattern="[0-9]*"
              onChange={e => onChange(e, row.index)}
              maxLength={6}
              onBlur={e => onBlur(e, row.index)}
              value={orcamentoTest}
              style={{ width: '100px' }}
            />
          </>
        );
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
        return <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{somatorioCronograma} dia(s)</span>
      },
      Cell: ({ row }) => {
        const [cronogramaTest, setCronogramaTest] = useState('');
        const [unidade, setUnidade] = useState('');

        const onChange = (event, rowIndex) => {
          const targetValue = event.target.value;
          if (event.target.validity.valid) {
            setCronogramaTest(targetValue);
            data[rowIndex].cronograma.value = targetValue;

          } else if (targetValue === '') {
            setCronogramaTest(targetValue);
            data[rowIndex].cronograma.value = targetValue;
          }
        }

        const onChangeUnidade = (event, rowIndex) => {
          setUnidade(event.target.value);
          data[rowIndex].cronograma.unidade = event.target.value;
          const newData = [...data];
          setData(newData);
          // if (event.target.value !== '0')
          // AtualizarSomatorios();
        };

        const handleUnidade = (value) => {
          data[row.index].cronograma.unidade = value;
          const newData = [...data];
          setData(newData);
        }

        const onBlur = (event, rowIndex) => {
          // if (data[rowIndex].cronograma.unidade !== '0')
          //   AtualizarSomatorios();
          const newData = [...data];
          setData(newData);
        }

        return (
          <>
            {/* <SelectCellTable
              style={{ marginRight: '5px' }}
              value={unidade || row.values.cronograma.unidade}
              onChange={onChangeUnidade}
              optionsData={unidadeDia}
              row={row}
            /> */}

            <SelectTest
              label="Unidade"
              optionsData={unidadeDia}
              handleData={handleUnidade}
              defaultValue={row.values.cronograma.unidade}
            />

            <input
              type="text"
              pattern="[0-9]*"
              onChange={e => onChange(e, row.index)}
              maxLength={6}
              onBlur={e => onBlur(e, row.index)}
              value={cronogramaTest || row.values.cronograma.value}
              style={{ width: '50px' }}
            />
          </>
        );
      }
    },
    {
      Header: () => {
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

  return (
    <div id="default">
      {/* <CssBaseline /> */}
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

      {console.log(process.env)}
    </div>
  );
}

export default SolicitarPesquisa