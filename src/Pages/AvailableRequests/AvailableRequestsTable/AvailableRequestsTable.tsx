import React, {useEffect, useState} from 'react';
import {
    ServiceRequest,
    ServiceRequestApplication,
    ServiceRequestApplicationStatus
} from "../../../Types/ServiceRequest";
import {SortDirection} from "../../../Utilities/TableUtils";
import styles from './AvailableRequestsTable.module.css';
import {
    Alert,
    Backdrop,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography
} from "@mui/material";
import {format} from "date-fns";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {RequestSummary} from "../../RequestHistory/RequestHistoryTables/RequestSummary/RequestSummary";
import {ApplicationConfirmationDialog} from "./ApplicationConfirmationDialog/ApplicationConfirmationDialog";
import {User} from "../../../Types/User";
import axios from "axios";
import {CORS_HEADER, DEV_PATH} from "../../../Routes";
import {ServiceRequestTableRow} from "../../RequestHistory/RequestHistoryTables/RequestHistoryTable";
import {TableSkeleton} from "../../../Components/TableSkeleton/TableSkeleton";
import {UserType} from "../../../Types/Account";
import {InfoOutlined} from "@mui/icons-material";


enum AvailableRequestsTableColumn {
    ApplicationNumber = 'ApplicationNumber',
    ApplicationDate = 'ApplicationDate',
    Postcode = 'Postcode',
    ServiceType = 'ServiceType',
    Client = 'Client',
    Details = 'Details',
    Apply = 'Apply'
}

const mapColumnName = (columnEnum: AvailableRequestsTableColumn): string => {
    switch (columnEnum) {
        case AvailableRequestsTableColumn.ApplicationNumber:
            return 'Application Number';
        case AvailableRequestsTableColumn.ApplicationDate:
            return 'Application Date';
        case AvailableRequestsTableColumn.ServiceType:
            return 'Service Type';
        default:
            return columnEnum.valueOf();
    }
}

const getHeaderBorderRadius = (columnEnum: AvailableRequestsTableColumn): string => {
    switch (columnEnum) {
        case AvailableRequestsTableColumn.ApplicationNumber:
            return '12px 0 0 0';
        case AvailableRequestsTableColumn.Apply:
            return '0 12px 0 0';
        default:
            return '';
    }
}

export const AvailableRequestsTable = () : JSX.Element => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const auth_token: string = JSON.parse(localStorage.getItem("auth_token") || "{}");

    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<JSX.Element>(<></>);

    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>();
    const [rows] = useState<ServiceRequestTableRow[]>([]);

    //Table sorting
    const [sortColumn, setSortColumn] = useState<AvailableRequestsTableColumn>(AvailableRequestsTableColumn.ApplicationNumber);
    const [sortDirection, setSortDirection] = useState<SortDirection>();

    //Table pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //Overlay displaying the service request information
    const [showRequestSummary, setShowRequestSummary] = useState(false);
    const [requestToView, setRequestToView] = useState<ServiceRequest>();

    //Dialog confirming if the professional would like to apply for the service request
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const sortServiceRequests = (sortField: AvailableRequestsTableColumn, sortDirection: SortDirection) => {
        //Sort the data by the property
        let orderedServiceRequests = rows;
        switch (AvailableRequestsTableColumn[sortField]) {
            case AvailableRequestsTableColumn.ApplicationNumber:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestID > b.requestID ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestID < b.requestID ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.ApplicationDate:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestDate > b.requestDate ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestDate < b.requestDate ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.ServiceType:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.serviceType > b.serviceType ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.serviceType < b.serviceType ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.Client:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.clientName > b.clientName ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.clientName < b.clientName ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.Postcode:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.postcode > b.postcode ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.postcode < b.postcode ? 1 : -1);
                }
                break;
            default:
                break;
        }

        setServiceRequests(orderedServiceRequests);
    }

    const handleSort = (sortField: AvailableRequestsTableColumn) => {
        //Change the sort label direction (arrow in the table header)
        let newSortDirection = SortDirection.ASC;       //State has a delay to update - temporarily store this here to sort data properly
        if (sortColumn === sortField) {
            newSortDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
            setSortDirection(newSortDirection);
        } else {
            setSortColumn(sortField);
            setSortDirection(newSortDirection);
        }

        sortServiceRequests(sortField, newSortDirection);
    };

    const professionalHasApplied = (request: ServiceRequest) => {
        const hasApplied: ServiceRequestApplication[] | undefined = request.applications?.filter((application) => application.professionalID === user.user_id);

        return !!(hasApplied && hasApplied[0]);
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (loading) {
            setAlert(
                <Alert
                    severity={"info"}
                    variant={"outlined"}
                    icon={<InfoOutlined sx={{color: "#3f3f3f"}}></InfoOutlined>}
                    sx={{
                        color: "#3f3f3f",
                        backgroundColor: "#f6e3d7",
                        border: "1.5px solid #3f3f3f",
                        marginBottom: 2
                    }}
                >
                    <Typography color={"black"}>
                        Loading request details...
                    </Typography>
                </Alert>
            );
            axios.get(`${DEV_PATH}/serviceRequest/available?postcode=${user.address.postcode}`, {
                headers: {
                    ...CORS_HEADER,
                    'Authorization': auth_token
                },
            })
                .then((r) => {
                    if (r.data !== null && r.data[0]) {     //If there was an array of data returned (i.e. some service requests)
                        let incomingRequests: ServiceRequest[] = [];
                        r.data.forEach((request: ServiceRequest) => {
                            const serviceRequest: ServiceRequest = {
                                requestID: request.requestID,
                                requestDate: request.requestDate ? new Date(request.requestDate) : new Date(),
                                serviceType: request.serviceType,
                                requestStatus: request.requestStatus,
                                professionalID: request.professionalID,
                                postcode: request.postcode,
                                applications: request.applications,
                                jobDescription: request.jobDescription,
                                clientID: request.clientID
                            }
                            const approvedApplication: ServiceRequestApplication | undefined = request.applications?.filter((application) => application.applicationStatus === ServiceRequestApplicationStatus.APPROVED).at(0);

                            if (!approvedApplication) {
                                incomingRequests.push(serviceRequest);
                            }
                        })

                        setServiceRequests(incomingRequests);

                        if(incomingRequests?.length === 0 || !incomingRequests) {
                            setLoading(false);
                            setAlert(<></>);
                        }
                    } else {
                        setAlert(<></>);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setAlert(
                        <Alert severity={"error"} onClose={() => setAlert(<></>)} sx={{marginBottom: 2}}>
                            There was an issue retrieving the content
                        </Alert>
                    );
                });
        }

        //Sort by Application Number, ascending
        handleSort(AvailableRequestsTableColumn.ApplicationNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loading) {
            //When we have received the service requests, we need to hit another endpoint to get the client name
            serviceRequests?.forEach((request) => {
                axios.get(`${DEV_PATH}/user/userGet?user_id=${request.clientID}`, {
                    headers: {
                        ...CORS_HEADER,
                        'Authorization': auth_token
                    },
                })
                    .then((r) => {
                        if (r.data && r.data.firstName && r.data.lastName) {
                            const name = `${r.data.firstName} ${r.data.lastName}`;
                            const newRow: ServiceRequestTableRow = {
                                clientName: name,
                                requestID: request.requestID,
                                requestDate: request.requestDate ? new Date(request.requestDate) : new Date(),
                                serviceType: request.serviceType,
                                requestStatus: request.requestStatus,
                                postcode: request.postcode,
                                clientID: request.clientID,
                                professionalID: request.professionalID,
                                applications: request.applications,
                                jobDescription: request.jobDescription
                            }
                            rows.push(newRow);
                        }

                        if (serviceRequests?.length === rows.length) {       //we reached the end of the initial data that we were iterating through to build up the client name
                            setLoading(false);
                            setAlert(<></>);
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        setAlert(
                            <Alert severity={"error"} onClose={() => setAlert(<></>)} sx={{marginBottom: 2}}>
                                There was an issue retrieving the content
                            </Alert>
                        );
                    });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceRequests]);

    return (
        <div className={styles['table-container']}>
            {alert}
            <Table>
                <TableHead>
                    <TableRow>
                        {Object.entries(AvailableRequestsTableColumn).map(([key, value]) => {
                            return (
                                <TableCell
                                    key={key}
                                    sx={{
                                        borderRadius: getHeaderBorderRadius(key as AvailableRequestsTableColumn),
                                        backgroundColor: "#d3733c",
                                        color: "black",
                                        fontSize:"25px",
                                        fontFamily:'Fahrenheit',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {/*Apply and Details columns aren't sortable*/}
                                    {(key === AvailableRequestsTableColumn.Apply || key === AvailableRequestsTableColumn.Details) ?
                                        <Typography variant={'h6'} fontWeight={"bold"}>
                                            {mapColumnName(value)}
                                        </Typography> :
                                        <TableSortLabel
                                            active={sortColumn === key}
                                            direction={sortColumn === key ? sortDirection : SortDirection.ASC}
                                            onClick={() => {
                                                handleSort(key as AvailableRequestsTableColumn)
                                            }}
                                        >
                                            <Typography variant={'h6'} fontWeight={"bold"}>
                                                {mapColumnName(value)}
                                            </Typography>
                                        </TableSortLabel>
                                    }
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (<TableSkeleton columns={7}/>) : <></>}
                    {(!loading && rows.length === 0) ?
                        <TableRow>
                            <TableCell/>
                            <TableCell/>
                            {user.userType === UserType.PROFESSIONAL && <TableCell/>}
                            <TableCell>
                                <Typography>
                                    There are no service requests for this user.
                                </Typography>
                            </TableCell>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                        </TableRow> :
                        <></>
                    }
                    {!loading ?
                        <>
                            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request, index) => {
                                return (
                                    <TableRow
                                        key={request.requestID}
                                        sx={{
                                            backgroundColor: "white",
                                            '&:last-child td:first-of-type': {
                                                borderBottomLeftRadius: 12,
                                            },
                                            '&:last-child td:last-child': {
                                                borderBottomRightRadius: 12,
                                            },
                                        }}
                                    >
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            {request.requestID}
                                        </TableCell>
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            {format(request.requestDate, "dd/MM/yyyy")}
                                        </TableCell>
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            <><b>{request.postcode}</b></>
                                        </TableCell>
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            {request.serviceType}
                                        </TableCell>
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            {request.clientName}
                                        </TableCell>
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            <ThemedButton
                                                variantOverride={'text'}
                                                onClick={() => {
                                                    setShowRequestSummary(true);
                                                    setRequestToView(request);
                                                }}
                                            >
                                                View
                                            </ThemedButton>
                                        </TableCell>
                                        <TableCell style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit'}}>
                                            <Tooltip
                                                title={user?.user_id && professionalHasApplied(request) ? 'Application to request already submitted' : ''}>
                                        <span>
                                             <ThemedButton
                                                 variantOverride={'text'}
                                                 disabled={user?.user_id ? professionalHasApplied(request) : false}
                                                 onClick={() => {
                                                     setRequestToView(request)
                                                     setShowConfirmDialog(true);
                                                 }}
                                             >
                                                 Apply
                                            </ThemedButton>
                                        </span>
                                            </Tooltip>
                                        </TableCell>
                                        {showConfirmDialog && requestToView &&
                                            <ApplicationConfirmationDialog
                                                request={requestToView}
                                                setShowConfirmationDialog={setShowConfirmDialog}
                                                showConfirmationDialog={showConfirmDialog}
                                            />
                                        }
                                    </TableRow>
                                )
                            })}
                        </> : <></>
                    }

                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={rows?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {(requestToView !== undefined) &&
                <Backdrop open={showRequestSummary}>
                    <RequestSummary setShowRequestSummary={setShowRequestSummary} request={requestToView}/>
                </Backdrop>
            }
        </div>
    )
}

export default AvailableRequestsTable;