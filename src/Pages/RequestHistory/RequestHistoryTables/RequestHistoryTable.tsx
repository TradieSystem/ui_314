import React, {useEffect, useState} from 'react';
import {
    Alert,
    Backdrop,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";
import styles from './RequestHistoryTable.module.css';
import {format} from 'date-fns'
import {StatusIcon} from "../../../Components/StatusIcon/StatusIcon";
import {
    ServiceRequest,
    ServiceRequestApplication,
    ServiceRequestApplicationStatus,
    ServiceRequestStatus
} from "../../../Types/ServiceRequest";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {UserType} from "../../../Types/Account";
import {RequestSummary} from "./RequestSummary/RequestSummary";
import {SortDirection} from "../../../Utilities/TableUtils";
import {User} from "../../../Types/User";
import {TableSkeleton} from "../../../Components/TableSkeleton/TableSkeleton";
import axios from "axios";
import {CORS_HEADER, DEV_PATH} from "../../../Routes";
import {InfoOutlined} from "@mui/icons-material";
import {motion} from "framer-motion";
import {fadeInUp} from "../../../Effects/Animations";
import {exportPDF} from "../../../Utilities/PDFGeneration";

enum ClientRequestHistoryColumn {
    ApplicationNumber = 'ApplicationNumber',
    ApplicationDate = 'ApplicationDate',
    ServiceType = 'ServiceType',
    Status = 'Status',
    Cost = 'Cost',
    Manage = 'Manage',
    Review = 'Review'
}

enum ProfessionalRequestHistoryColumn {
    ApplicationNumber = 'ApplicationNumber',
    ApplicationDate = 'ApplicationDate',
    Postcode = 'Postcode',
    ServiceType = 'ServiceType',
    Status = 'Status',
    Client = 'Client',
    Cost = 'Cost',
    Manage = 'Manage',
    Review = 'Review'
}

const mapColumnName = (columnEnum: ClientRequestHistoryColumn): string => {
    switch (columnEnum) {
        case ClientRequestHistoryColumn.ApplicationNumber:
            return 'Application Number';
        case ClientRequestHistoryColumn.ApplicationDate:
            return 'Application Date';
        case ClientRequestHistoryColumn.ServiceType:
            return 'Service Type';
        default:
            return columnEnum.valueOf();
    }
}

const getHeaderBorderRadius = (columnEnum: ClientRequestHistoryColumn): string => {
    switch (columnEnum) {
        case ClientRequestHistoryColumn.ApplicationNumber:
            return '12px 0 0 0';
        case ClientRequestHistoryColumn.Review:
            return '0 12px 0 0';
        default:
            return '';
    }
}

export interface ServiceRequestTableRow extends ServiceRequest {
    clientName: string;
}

/**
 * Table representing the client request history of their {@link ServiceRequest}s.
 */
export const RequestHistoryTable = (): JSX.Element => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const auth_token: string = JSON.parse(localStorage.getItem("auth_token") || "{}");
    const headersToUse = user.userType === UserType.CLIENT ? ClientRequestHistoryColumn : ProfessionalRequestHistoryColumn;

    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<JSX.Element>(<></>);

    const [rows, setRows] = useState<ServiceRequestTableRow[]>([]);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>();

    //Table sorting
    const [sortColumn, setSortColumn] = useState<ProfessionalRequestHistoryColumn>(ProfessionalRequestHistoryColumn.ApplicationNumber);
    const [sortDirection, setSortDirection] = useState<SortDirection>();

    //Table pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //Overlay displaying the service request information
    const [showRequestSummary, setShowRequestSummary] = useState(false);
    const [requestToView, setRequestToView] = useState<ServiceRequest>();

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (sortField: ProfessionalRequestHistoryColumn) => {
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

    const sortServiceRequests = (sortField: ProfessionalRequestHistoryColumn, sortDirection: SortDirection) => {
        //Sort the data by the property
        let orderedServiceRequests = rows;
        switch (ProfessionalRequestHistoryColumn[sortField]) {
            case ProfessionalRequestHistoryColumn.ApplicationNumber:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestID > b.requestID ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestID < b.requestID ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.ApplicationDate:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestDate > b.requestDate ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestDate < b.requestDate ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.ServiceType:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.serviceType > b.serviceType ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.serviceType < b.serviceType ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Status:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestStatus > b.requestStatus ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.requestStatus < b.requestStatus ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Cost:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => {
                        const acceptedOfferA: ServiceRequestApplication | undefined = a.applications?.filter((application) => application.applicationStatus === ServiceRequestApplicationStatus.APPROVED).at(0);
                        const acceptedOfferB: ServiceRequestApplication | undefined = b.applications?.filter((application) => application.applicationStatus === ServiceRequestApplicationStatus.APPROVED).at(0);

                        if (acceptedOfferA && acceptedOfferA.cost && acceptedOfferB && acceptedOfferB.cost) {
                            if (acceptedOfferA.cost > acceptedOfferB.cost) {
                                return 1;
                            }
                        }
                        return -1;
                    });
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => {
                        const acceptedOfferA: ServiceRequestApplication | undefined = a.applications?.filter((application) => application.applicationStatus === ServiceRequestApplicationStatus.APPROVED).at(0);
                        const acceptedOfferB: ServiceRequestApplication | undefined = b.applications?.filter((application) => application.applicationStatus === ServiceRequestApplicationStatus.APPROVED).at(0);

                        if (acceptedOfferA && acceptedOfferA.cost && acceptedOfferB && acceptedOfferB.cost) {
                            if (acceptedOfferA.cost < acceptedOfferB.cost) {
                                return 1;
                            }
                        }
                        return -1;
                    });
                }
                break;
            case ProfessionalRequestHistoryColumn.Client:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.clientName > b.clientName ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.clientName < b.clientName ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Postcode:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.postcode > b.postcode ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests?.sort((a, b) => a.postcode < b.postcode ? 1 : -1);
                }
                break;
            default:
                break;
        }

        setRows(orderedServiceRequests);
    }

    useEffect(() => {
        if (loading) {
            setAlert(
                <Alert
                    severity={"info"}
                    variant={"outlined"}
                    icon={<InfoOutlined sx={{color: "#3f3f3f"}}></InfoOutlined>}
                    sx={{
                        color: "#3f3f3f",
                        backgroundColor: "#c7c7c7",
                        border: "1.5px solid #3f3f3f",
                        marginBottom: 2
                    }}
                >
                    <Typography color={"black"}>
                        Loading details...
                    </Typography>
                </Alert>
            );
            axios.get(`${DEV_PATH}/serviceRequest?userID=${user.user_id}&userType=${user.userType}`, {
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
                                postcode: request.postcode,
                                professionalID: request.professionalID,
                                applications: request.applications,
                                jobDescription: request.jobDescription,
                                clientID: request.clientID
                            }
                            incomingRequests.push(serviceRequest);
                            setServiceRequests(incomingRequests);
                        });
                    } else {
                        setLoading(false);
                        setAlert(<></>);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setAlert(
                        <Alert severity={"error"} onClose={() => setAlert(<></>)} sx={{marginBottom: 2}}>
                            There was an issue retrieving the content
                        </Alert>
                    );
                });
        }
        //Sort by Application Number, ascending
        handleSort(ProfessionalRequestHistoryColumn.ApplicationNumber);
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
                                professionalID: request.professionalID,
                                postcode: request.postcode,
                                clientID: request.clientID,
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
            <Box
                component={motion.div}
                {...fadeInUp}
            >
                {alert}
                <Table>
                    <TableHead>
                        <TableRow>
                            {Object.entries(headersToUse).map(([key, value]) => {
                                return (
                                    <TableCell
                                        key={key}
                                        sx={{
                                            borderRadius: getHeaderBorderRadius(key as ClientRequestHistoryColumn),
                                            backgroundColor: "#d3733c",
                                            color: "white"
                                        }}
                                    >
                                        {/*Manage and Review columns aren't sortable*/}
                                        {(key === ClientRequestHistoryColumn.Manage || key === ClientRequestHistoryColumn.Review) ?
                                            <Typography variant={'h6'} fontWeight={"bold"}>
                                                {mapColumnName(value)}
                                            </Typography> :
                                            <TableSortLabel
                                                active={sortColumn === key}
                                                direction={sortColumn === key ? sortDirection : SortDirection.ASC}
                                                onClick={() => {
                                                    handleSort(key as ProfessionalRequestHistoryColumn)
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
                        {loading ? (<TableSkeleton columns={user.userType === UserType.PROFESSIONAL ? 9 : 7}/>) : <></>}
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
                                <TableCell/>
                                {user.userType === UserType.PROFESSIONAL && <TableCell/>}
                            </TableRow> :
                            <></>
                        }
                        {!loading ?
                            <>
                                {
                                    rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request, index) =>
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
                                            <TableCell>
                                                {request.requestID}
                                            </TableCell>
                                            <TableCell>
                                                {format(request.requestDate, "dd/MM/yyyy")}
                                            </TableCell>
                                            {/*Location column only renders for professionals viewing their confirmed service requests*/}
                                            {
                                                user.userType === UserType.PROFESSIONAL &&
                                                <TableCell>
                                                    <b>{request.postcode}</b>
                                                </TableCell>
                                            }
                                            <TableCell>
                                                {request.serviceType}
                                            </TableCell>
                                            <TableCell>
                                                <div className={styles['status-cell']}>
                                                    <StatusIcon status={request.requestStatus}/>
                                                    <b>{request.requestStatus}</b>
                                                </div>
                                            </TableCell>
                                            {/*Show client attached to the service request only if we are viewing as a professional*/}
                                            {
                                                user.userType === UserType.PROFESSIONAL &&
                                                <TableCell>
                                                    {request.clientName}
                                                </TableCell>
                                            }
                                            <TableCell>
                                                {request.applications?.filter((app) => app.professionalID === request.professionalID).at(0) ?
                                                    `$${request.applications?.filter((app) => app.professionalID === request.professionalID).at(0)?.cost}` :
                                                    '-'
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <ThemedButton
                                                    variantOverride={'text'}
                                                    onClick={() => {
                                                        setShowRequestSummary(true);
                                                        setRequestToView(request);
                                                    }}
                                                >
                                                    {
                                                        (request.requestStatus === ServiceRequestStatus.NEW && user.userType === UserType.CLIENT) && (!request.applications || request.applications?.length === 0)
                                                            ?
                                                            `View / Edit` :
                                                            `View`
                                                    }
                                                </ThemedButton>
                                            </TableCell>
                                            <TableCell>
                                                {/*    Iteration 4 work     */}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </>
                            :
                            <>
                            </>
                        }
                    </TableBody>
                </Table>
            </Box>
            <div style={{justifyContent: "space-between", display: "flex", marginTop: "2rem"}}>
                {
                    serviceRequests ?
                    <ThemedButton onClick={() => exportPDF(rows, user)}>
                        Export
                    </ThemedButton> :
                        <div></div>
                }
                <TablePagination
                    component="div"
                    count={rows?.length || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            {(requestToView !== undefined) ?
                <Backdrop open={showRequestSummary}>
                    <RequestSummary setShowRequestSummary={setShowRequestSummary} request={requestToView}/>
                </Backdrop> :
                <>
                </>
            }
        </div>
    );
}