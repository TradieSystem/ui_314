import React, {useEffect, useState} from 'react';
import {
    Backdrop,
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
import {ServiceRequest, ServiceRequestStatus} from "../../../Types/ServiceRequest";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {UserType} from "../../../Types/Account";
import {generateDummyServiceRequests} from "../../../Utilities/GenerateDummyData";
import {RequestSummary} from "./RequestSummary/RequestSummary";
import {SortDirection} from "../../../Utilities/TableUtils";
import {User} from "../../../Types/User";

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
    Location = 'Location',
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

/**
 * Table representing the client request history of their {@link ServiceRequest}s.
 */
export const RequestHistoryTable = (): JSX.Element => {
    const user : User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const userType = user?.userType;
    const headersToUse = userType === UserType.CLIENT ? ClientRequestHistoryColumn : ProfessionalRequestHistoryColumn;

    //TODO remove dummyServiceRequests when endpoint returns backend data
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(generateDummyServiceRequests(userType !== UserType.PROFESSIONAL));

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
        let orderedServiceRequests = serviceRequests;
        switch (ProfessionalRequestHistoryColumn[sortField]) {
            case ProfessionalRequestHistoryColumn.ApplicationNumber:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationNumber > b.applicationNumber ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationNumber < b.applicationNumber ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.ApplicationDate:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationDate > b.applicationDate ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationDate < b.applicationDate ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.ServiceType:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.serviceType > b.serviceType ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.serviceType < b.serviceType ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Status:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.status > b.status ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.status < b.status ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Cost:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => ((a.cost && b.cost !== undefined) && (a.cost > b.cost) ? 1 : -1));
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => ((a.cost && b.cost !== undefined) && (a.cost < b.cost)) ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Client:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.client.lastName > b.client.lastName ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.client.lastName < b.client.lastName ? 1 : -1);
                }
                break;
            case ProfessionalRequestHistoryColumn.Location:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.suburb > b.suburb ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.suburb < b.suburb ? 1 : -1);
                }
                break;
            default:
                break;
        }

        setServiceRequests(orderedServiceRequests);
    }

    useEffect(() => {
        //TODO make axios call to get all requests associated with a client

        //TODO call setServiceRequests when data returned

        //Sort by Application Number, ascending
        handleSort(ProfessionalRequestHistoryColumn.ApplicationNumber);
    }, []);

    return (
        <div className={styles['table-container']}>
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
                    {serviceRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request, index) => {
                        return (
                            <TableRow
                                key={request.applicationNumber}
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
                                    {request.applicationNumber}
                                </TableCell>
                                <TableCell>
                                    {format(request.applicationDate, "dd/MM/yyyy")}
                                </TableCell>
                                {/*Location column only renders for professionals viewing their confirmed service requests*/}
                                {
                                    userType === UserType.PROFESSIONAL &&
                                    <TableCell sx={{display: "grid"}}>
                                        <>{request.suburb}</>
                                        <><b>{request.postcode}</b></>
                                    </TableCell>
                                }
                                <TableCell>
                                    {request.serviceType}
                                </TableCell>
                                <TableCell>
                                    <div className={styles['status-cell']}>
                                        <StatusIcon status={request.status}/>
                                        <b>{request.status}</b>
                                    </div>
                                </TableCell>
                                {/*Show client attached to the service request only if we are viewing as a professional*/}
                                {
                                    userType === UserType.PROFESSIONAL &&
                                    <TableCell>
                                        {`${request.client.firstName} ${request.client.lastName}`}
                                    </TableCell>
                                }
                                <TableCell>
                                    {request.cost ? `$${request.cost}` : '-'}
                                </TableCell>
                                <TableCell>
                                    {/*    Mostly Iteration 3 work - only ability to view existing request implemented in 2 */}
                                    {/* Iteration 3 will add seeing how many responses from professionals in this cell too, and more conditional rendering */}
                                        <ThemedButton
                                            variantOverride={'text'}
                                            onClick={() => {
                                                setShowRequestSummary(true);
                                                setRequestToView(request);
                                            }}
                                        >
                                            {
                                                (request.status === ServiceRequestStatus.NEW && userType === UserType.CLIENT) && (!request.applicantIds || request.applicantIds?.length === 0) ?
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
                    })}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={serviceRequests.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {requestToView &&
                <Backdrop open={showRequestSummary}>
                    <RequestSummary setShowRequestSummary={setShowRequestSummary} request={requestToView}/>
                </Backdrop>
            }
        </div>
    );
}