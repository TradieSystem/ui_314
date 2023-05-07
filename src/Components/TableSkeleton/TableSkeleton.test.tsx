import {render, screen} from "@testing-library/react";
import React from "react";
import {TableSkeleton, TableSkeletonProps} from "./TableSkeleton";
import {Table, TableBody} from "@mui/material";

const TestComponent = (props: TableSkeletonProps) => {
    return (
        <Table>
            <TableBody>
                <TableSkeleton columns={props.columns} />
            </TableBody>
        </Table>
    );
}

describe("<TableSkeleton>", () => {
    test("should render the <TableSkeleton> with the correct number of columns (5)", () => {
       render(TestComponent({columns: 5}));

       const rows = screen.getAllByRole('row');
       const skeletonCells = screen.getAllByRole('cell');

       //There are 10 rows by default
       expect(rows).toHaveLength(10);
       //Should render 10 * number of columns passed in
       expect(skeletonCells).toHaveLength(50);
    });

    test("should render the <TableSkeleton> with the correct number of columns (3)", () => {
        render(TestComponent({columns: 3}));

        const rows = screen.getAllByRole('row');
        const skeletonCells = screen.getAllByRole('cell');

        //There are 10 rows by default
        expect(rows).toHaveLength(10);
        //Should render 10 * number of columns passed in
        expect(skeletonCells).toHaveLength(30);
    });
})