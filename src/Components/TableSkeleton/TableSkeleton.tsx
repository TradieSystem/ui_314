import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import { Skeleton } from '@mui/material'

export interface TableSkeletonProps {
    /**
     * Number to represent the number of columns to render skeleton for
     */
    columns: number;
}

/**
 * A component to render a {@link TableSkeleton} with a set of 10 rows, with a customisable amount of columns
 */
export const TableSkeleton = ({columns}: TableSkeletonProps): JSX.Element => {
    function renderAllRows() : JSX.Element {
        let rows: JSX.Element[] = [];
        for (let i = 0; i < 10; i++) {
            rows.push(
                <TableRow key={`${i}-row`}>
                    {renderSingleRow()}
                </TableRow>
            );
        }
        return (
            <>
                {rows}
            </>
        );
    }

    function renderSingleRow(): JSX.Element {
        let row: JSX.Element[] = [];
        for (let i = 0; i < columns; i++) {
            row.push(
                <TableCell key={`${i}-cell`}>
                    <Skeleton width={100}/>
                </TableCell>
            )
        }
        return (
            <>
                {row}
            </>
        );
    }

    return (
        <>
            {renderAllRows()}
        </>
    );
}