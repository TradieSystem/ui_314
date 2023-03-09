import React, {useState} from 'react';
import PageContainer from "../Components/PageContainer/PageContainer";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

/**
 * The {@link HomePage} of the application
 */
export const HomePage = () => {
    ///////////DELETE THIS - ONLY FOR useState EXAMPLE
    const text = ["item 1", "item 2", "item 3", "item 4"];
    const numbers = [1, 2, 3, 4];
    const [showTable, setShowTable] = useState(false); //this is equivalent to useState<boolean>(false);
    ///////////

    return (
        <PageContainer title={'Home Page'} subtitle={'Home Page Subtitle'}>
            <>
                <Button
                    sx={{"marginTop": "1rem"}}
                    onClick={() => setShowTable(!showTable)}
                    variant={'outlined'}
                >
                    {showTable ? "Hide Table" : "Show table"}
                </Button>
                {showTable &&
                    <Table>
                        <TableHead>
                            <TableRow>
                                {numbers.map((number) => <TableCell key={`${number}-header-cell`}>{number}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {text.map((text) => <TableCell key={`${text}-text-cell`}>{text}</TableCell>)}
                            </TableRow>
                        </TableBody>
                    </Table>
                }
            </>
        </PageContainer>
    )
}

export default PageContainer;