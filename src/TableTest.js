import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const { render } = ReactDOM;

function Table() {
    return (
        <div className="table hover striped">
            {this.props.children}
        </div>
    );
}

const Row = ({ header = false, children }) => {

    return (
        <div className={classNames("table__row", { "table__row--header": header })}>
            <div className='wrapper'>
                {children}
            </div>
        </div>
    );
};

const Column = ({ width, children }) => (
    <div className='column' style={{ width }}>
        {children}
    </div>
);

function DataGrid(props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        onHandleResize();
        window.addEventListener('resize', onHandleResize);
    }, () => {
        window.removeEventListener('resize', onHandleResize);
    });

    function onHandleResize() {
        const isMobile = window.matchMedia("(max-width: 600px)").matches ? true : false;
        setIsMobile(isMobile);
    }

    const { columns, data, height } = props;

    return (
        <div style={{ height, overflowY: 'scroll' }}>
            <Table>
                {!isMobile && (
                    <Row header>
                        {columns.map(column => (
                            <Column width={column.width}>{column.label}</Column>
                        ))}
                    </Row>
                )}
                {data.map(row => {
                    return (
                        <Row>
                            {Object.keys(row).map((key, index) => {
                                const value = (isMobile) ? (
                                    <span>
                                        <span className='header'>{columns[index].label}:</span>
                                        <span>{row[key]}</span>
                                    </span>
                                ) : row[key];
                                return (
                                    <Column width={columns[index].width}>{value}</Column>
                                );
                            })}
                        </Row>
                    );
                })}
            </Table>
        </div>
    );

}

function App() {
    const [data, setData] = useState([]);
    function generateRow() {
        return {
            propertyId: faker.random.number(),
            streetAddress: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zip: faker.address.zipCode(),
            status: 'Vacant Unrented Ready'
        };
    }

    useEffect(() => {
        const newData = [];
        for (let i = 0; i < 1000; i++) {
            newData.push(generateRow());
        }

        setData(newData);
    });

    return (
        <DataGrid
            height={520}
            columns={[
                { label: 'Property ID', width: 100 },
                { label: 'Street Address', width: 205 },
                { label: 'City', width: 120 },
                { label: 'State', width: 55 },
                { label: 'Zip', width: 125 },
                { label: 'Status', width: 200 }
            ]}
            data={data}
        />
    );
}

render(<App />, document.getElementById('root'));