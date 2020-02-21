import React from 'react';
import { useTable } from 'react-table';
// import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'

import './PesquisaTable.css';

function PesquisaTable({ columns, data, getRowProps, getFooterProps }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    }
    )

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps({ style: { background: 'rgba(0,0,0,.01)' } })}>
                        {headerGroup.headers.map(column => (
                            <td {...column.getHeaderProps()}>{column.render('Header')}</td>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps(getRowProps(row))}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }
                )}
            </tbody>
            <tfoot>
                {footerGroups.map(group => (
                    <tr {...group.getFooterGroupProps(getFooterProps())}>
                        {group.headers.map(column => (
                            <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}

export default PesquisaTable;