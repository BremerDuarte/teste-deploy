import React from 'react';

function SelectCellTable({ style, onChange, value, optionsData, row }) {
    return (
        <select
            style={style}
            value={value}
            onChange={e => onChange(e, row.index)}
        >
            {
                optionsData.map(o => (
                    <option
                        key={o.id}
                        value={o.value}
                        tipo={o.tipo}
                    >
                        {o.nome}
                    </option>
                )
                )
            }
        </select>
    );
}

export default React.memo(SelectCellTable);