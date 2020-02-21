import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import classNames from 'classnames';
import Main from './Main';
// import './assets/css/global.min.css.map'

ReactDOM.render(<Main />, document.getElementById('root'));

// const { render } = ReactDOM;

// function Table({ children }) {
//     return (
//         <div className="table hover striped">
//             {children}
//         </div>
//     );
// }

// const Row = ({ header = false, children }) => {
//     function onclick(e) {
//         console.log(e.target);
//     }


//     return (
//         <div className={"table__row table__row--header"} onClick={e => onclick(e)}>
//             <div className='wrapper'>
//                 {children}
//             </div>
//         </div>
//     );
// };

// const Column = ({ width, children }) => {
//     function onclick(e) {
//         console.log(e.target);
//     }

//     return (
//         <div className='column' style={{ width }} onClick={e => onclick(e)}>
//             {children}
//         </div>
//     );
// };

// function DataGrid(props) {
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         onHandleResize();
//         window.addEventListener('resize', onHandleResize);
//     }, () => {
//         window.removeEventListener('resize', onHandleResize);
//     });

//     function onHandleResize() {
//         const isMobile = window.matchMedia("(max-width: 600px)").matches ? true : false;
//         setIsMobile(isMobile);
//     }

//     const { columns, data, height } = props;

//     return (
//         <div style={{ height, overflowY: 'scroll' }}>
//             <Table>
//                 {!isMobile && (
//                     <Row header>
//                         {columns.map(column => (
//                             <Column width={column.width}>{column.label}</Column>
//                         ))}
//                     </Row>
//                 )}
//                 {data.map(row => {
//                     return (
//                         <Row>
//                             {Object.keys(row).map((key, index) => {
//                                 const value = (isMobile) ? (
//                                     <span>
//                                         <span className='header'>{columns[index].label}:</span>
//                                         <span>{row[key]}</span>
//                                     </span>
//                                 ) : row[key];
//                                 return (
//                                     <Column width={columns[index].width}>{value}</Column>
//                                 );
//                             })}
//                         </Row>
//                     );
//                 })}
//             </Table>
//         </div>
//     );

// }

// function App() {
//     const [data, setData] = useState([]);
//     function generateRow() {
//         return {
//             propertyId: 1,//faker.random.number(),
//             streetAddress: 1,//faker.address.streetAddress(),
//             city: 1,//faker.address.city(),
//             state: 1,//faker.address.stateAbbr(),
//             zip: 1,//faker.address.zipCode(),
//             status: 'Vacant Unrented Ready'
//         };
//     }

//     useEffect(() => {
//         const newData = [];
//         for (let i = 0; i < 20; i++) {
//             newData.push(generateRow());
//         }

//         setData(newData);
//     }, []);

//     return (
//         <DataGrid
//             height={520}
//             columns={[
//                 { label: 'Property ID', width: 100 },
//                 { label: 'Street Address', width: 205 },
//                 { label: 'City', width: 120 },
//                 { label: 'State', width: 55 },
//                 { label: 'Zip', width: 125 },
//                 { label: 'Status', width: 200 }
//             ]}
//             data={data}
//         />
//     );
// }

// render(<App />, document.getElementById('root'));