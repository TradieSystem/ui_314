import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../Contexts/AuthContext';
import { UserType } from '../../Types/Account';
import {
    Avatar,
    Badge,
    IconButton,
    Stack,
    styled,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    tableCellClasses,
} from "@mui/material";
import styles from 'ClientRequestHistory.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Paper from '@mui/material/Paper';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#d3733c",
        color: theme.palette.common.white,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td:first-of-type': {
        borderBottomLeftRadius: 10,
    },
    '&:last-child td:last-child': {
        borderBottomRightRadius: 10,
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
    createData('4/03/2023', "Plumbing", "YEhhhhhh"),

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

export const  ProfessionalProfile = () => {
    const {user} = useAuthContext();
    const [value, setValue] = React.useState<number | null>(2);
    const navigate = useNavigate();
    if (user) {
        return (

            <Box>
                <Box>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <Badge>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{
                            width: 90,
                            height: 90,
                        }}
                        />
                        &nbsp;&nbsp;
                        <Box>
                            &nbsp;&nbsp;&nbsp;
                            <h1>{user.firstname} {user.lastname}</h1>
                            <Rating name="read-only" value={value} readOnly/>
                        </Box>
                    </Badge>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{my: 8}}
                >
                </Stack>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{
                            minWidth: 600, minHeight: 500, orderRadius: "25px",
                            padding: "20px"
                        }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{fontSize: "18px"}} align="center">Service
                                        Date</StyledTableCell>
                                    <StyledTableCell style={{fontSize: "18px"}} align="center">Service
                                        Type</StyledTableCell>
                                    <StyledTableCell style={{fontSize: "18px"}} align="center">Review</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.ServiceDate}>
                                        <StyledTableCell component="th" scope="row" align="center">
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