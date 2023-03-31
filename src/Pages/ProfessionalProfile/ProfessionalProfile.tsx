import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {useAuthContext} from '../../Contexts/AuthContext';
import {
    Avatar,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#d3733c",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
    borderBottom: 0
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#e5e5e5",
    },
    backgroundColor: "white",
    '&:last-child td:first-of-type': {
        borderBottomLeftRadius: 12,
    },
    '&:last-child td:last-child': {
        borderBottomRightRadius: 12,
    },
}));


function createData(
    ServiceDate: string,
    ServiceType: string,
    Review: string,
) {
    return {
        ServiceDate,
        ServiceType,
        Review
    };
}

const rows = [
    createData('4/03/2023', "Plumbing", "Wow This Was Great"),
    createData('4/03/2023', "Plumbing", "Top Bloke"),
    createData('4/03/2023', "Plumbing", "Top Bloke Good Work"),

];

//Add Profile Picture Function in edit function.
//Add value from star review.
//Add validation picture field if wanted.
//<IconButton  onClick={() => navigate("/HomePage")} aria-label="edit" style={{
//background:"white",
//color:"black"
//}}>
//<Edit />
//</IconButton>

export const ProfessionalProfile = () => {
    const {user} = useAuthContext();
    const [value, setValue] = React.useState<number | null>(2);

    if (user) {
        return (
            <Box>
                <Box sx={{
                    display: "grid",
                    justifyContent: "center"
                }}>
                    <div style={{justifyContent: "center", display: "flex"}}>
                        <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                            sx={{
                                width: 90,
                                height: 90,
                            }}
                        />
                    </div>
                    <Box style={{justifyContent: "center", display: "grid"}}>
                        <h1>{user.firstname} {user.lastname}</h1>
                        <Rating name="read-only" value={value} readOnly sx={{marginLeft: 2}}/>
                    </Box>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{my: 2}}
                >
                </Stack>
                <Box>
                    <TableContainer>
                        <Table
                            sx={{
                                minWidth: 600,
                                minHeight: 500,
                                backgroundColor: "#D8CECD"
                            }}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell
                                        style={{fontSize: "18px"}}
                                        align="center"
                                        sx={{borderRadius: "12px 0 0 0", background: "inherit"}}
                                    >
                                        Service Date
                                    </StyledTableCell>
                                    <StyledTableCell
                                        style={{fontSize: "18px"}}
                                        align="center"
                                    >
                                        Service Type
                                    </StyledTableCell>
                                    <StyledTableCell
                                        style={{fontSize: "18px"}}
                                        align="center"
                                        sx={{borderRadius: "0 12px 0 0", background: "inherit"}}
                                    >
                                        Review
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, id) => (
                                    <StyledTableRow
                                        key={id}
                                    >
                                        <StyledTableCell scope="row" align="center">
                                            {row.ServiceDate}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.ServiceType}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Review}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        );
    }
}

export default ProfessionalProfile;