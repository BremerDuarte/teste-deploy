export function SubAtividades(tipoAtividade) {
    if (parseInt(tipoAtividade) === 5) {
        const subatividades = [
            {
                id: 1,
                text: 'Escala Regional',
                tipo: 2
            },
            {
                id: 2,
                text: 'Escala Local',
                tipo: 2
            },
            {
                id: 3,
                text: 'Escala Detalhe',
                tipo: 2
            }
        ];
        return subatividades;
    } else if (parseInt(tipoAtividade) === 2) {
        const subatividades = [
            {
                id: 1,
                text: 'Geoquímica de Sedimentos de Corrente',
                tipo: 99
            },
            {
                id: 2,
                text: 'Geoquímica de Rocha',
                tipo: 99
            },
            {
                id: 3,
                text: 'Geoquímica de Solo',
                tipo: 99
            },
            {
                id: 4,
                text: 'Química Mineral',
                tipo: 99
            }
        ];
        return subatividades;
    } else
        return [];
}

export function Atividades() {
    const atividades = [

        {
            id: 1,
            text: 'Ensaios e Testes Tecnológicos (Segundo ABNT’s)',
            tipo: 3
        },
        {
            id: 2,
            text: 'Levantamentos Topográficos',
            tipo: 5
        },
        {
            id: 3,
            text: 'Levantamentos Geoquímicos',
            tipo: 2
        },
        // {
        //     id: 4,
        //     nome: 'atividade 4',
        //     tipo: 3
        // },
        {
            id: 10,
            text: 'Outra',
            tipo: 10
        },

    ];

    return atividades;
}

export function EscalaProps(tipoSubatividade) {
    const escalaProps = {
        value: '',
        unidade: '',
        exibir: false,
    }
    if (parseInt(tipoSubatividade) === 2)
        escalaProps.exibir = true;

    return escalaProps;
}

export function EmptyData() {
    const emptyData = {
        atividade: {
            value: '',
            tipo: null,
            description: '',
        },
        subatividades: {
            atividades: [],
            selecionada: {
                value: '',
                tipo: null,
                escala: {
                    value: '',
                    unidade: '1'
                }
            }
        },
        orcamento: '',
        cronograma: {
            value: '',
            unidade: '1'
        }
    };
    return emptyData;
}

export function UnidadeEscala() {
    return [
        // {
        //     id: 0,
        //     value: 0,
        //     nome: 'Selecione'
        // },
        {
            id: 1,
            value: 1,
            text: 'cm'
        },
        {
            id: 2,
            value: 2,
            text: 'm'
        },
        {
            id: 3,
            value: 3,
            text: 'km'
        },
    ];
}

export function UnidadeDia() {
    return [
        // {
        //     id: 0,
        //     value: 0,
        //     nome: 'Selecione'
        // },
        {
            id: 1,
            value: 1,
            text: 'dia'
        },
        {
            id: 2,
            value: 2,
            text: 'mês'
        },
        {
            id: 3,
            value: 3,
            text: 'ano'
        },
    ];
}