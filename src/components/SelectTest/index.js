import React, { useState } from 'react';
import Select, { Option } from '@material/react-select';
import '@material/react-select/dist/select.css';
import '@material/react-list/dist/list.css';
import '@material/react-menu-surface/dist/menu-surface.css';
import '@material/react-menu/dist/menu.css';

function SelectTest({ optionsData, label, defaultValue, handleData }) {
    const [value, setValue] = useState(defaultValue || '');

    const onChange = e => {
        const targetValue = e.target.value;
        setValue(targetValue);

        if (handleData) {
            const optionIndex = e.target.options.selectedIndex;
            const tipo = e.target.options[optionIndex].getAttribute('tipo');

            handleData(targetValue, tipo);
        }
    }
    return (
        <Select
            label={label}
            style={{ minWidth: `${label ? label.length * 10 : 150}px` }}
            value={value}
            onChange={onChange}
        >
            <Option value=''></Option>
            {optionsData.map(option =>
                <Option
                    key={option.id}
                    value={option.id}
                    tipo={option.tipo}
                >
                    {option.text}
                </Option>)
            }
        </Select>
    );
}

export default SelectTest;