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
import styles from './ClientRequestHistory.module.css';
import {dummyServiceRequests} from "./ClientRequestHistoryDummyData";
import {format} from 'date-fns'
import {StatusIcon} from "../../../../Components/StatusIcon/StatusIcon";
import {ServiceRequest, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {RequestSummary} from "./RequestSummary/RequestSummary";

enum ClientRequestHistoryColumn {
    ApplicationNumber = 'ApplicationNumber',
    ApplicationDate = 'ApplicationDate',
    ServiceType = 'ServiceType',
    Status = 'Status',
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

enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

/**
 * Table representing the client request history of their {@link ServiceRequest}s.
 */
export const ClientRequestHistory = (): JSX.Element => {
    //TODO remove dummyServiceRequests when endpoint returns backend data
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(dummyServiceRequests);

    //Table sorting
    const [sortColumn, setSortColumn] = useState<ClientRequestHistoryColumn>(ClientRequestHistoryColumn.ApplicationNumber);
    const [sortDirection, setSortDirection] = useState<SortDirection>();

    //Table pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //Overlay displaying the client request information
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

    const handleSort = (sortField: ClientRequestHistoryColumn) => {
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

    const sortServiceRequests = (sortField: ClientRequestHistoryColumn, sortDirection: SortDirection) => {
        //Sort the data by the property
        let orderedServiceRequests = serviceRequests;
        switch (ClientRequestHistoryColumn[sortField]) {
            case ClientRequestHistoryColumn.ApplicationNumber:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationNumber > b.applicationNumber ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationNumber < b.applicationNumber ? 1 : -1);
                }
                break;
            case ClientRequestHistoryColumn.ApplicationDate:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationDate > b.applicationDate ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationDate < b.applicationDate ? 1 : -1);
                }
                break;
            case ClientRequestHistoryColumn.ServiceType:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.serviceType > b.serviceType ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.serviceType < b.serviceType ? 1 : -1);
                }
                break;
            case ClientRequestHistoryColumn.Status:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.status > b.status ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.status < b.status ? 1 : -1);
                }
                break;
            case ClientRequestHistoryColumn.Cost:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => ((a.cost && b.cost !== undefined) && (a.cost > b.cost) ? 1 : -1));
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => ((a.cost && b.cost !== undefined) && (a.cost < b.cost)) ? 1 : -1);
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
        handleSort(ClientRequestHistoryColumn.ApplicationNumber);
    }, []);

    return (
        <div className={styles['table-container']}>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor: "#B9B9B9"}}>
                        {Object.entries(ClientRequestHistoryColumn).map(([key, value]) => {
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
                                                handleSort(key as ClientRequestHistoryColumn)
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
                                        borderBottomLeftRadius: 10,
                                    },
                                    '&:last-child td:last-child': {
                                        borderBottomRightRadius: 10,
                                    },
                                }}
                            >
                                <TableCell>
                                    {request.applicationNumber}
                                </TableCell>
                                <TableCell>
                                    {format(request.applicationDate, "dd/MM/yyyy")}
                                </TableCell>
                                <TableCell>
                                    {request.serviceType}
                                </TableCell>
                                <TableCell>
                                    <div className={styles['status-cell']}>
                                        <StatusIcon status={request.status}/>
                                        <b>{request.status}</b>
                                    </div>
                                </TableCell>
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
                                            {request.status === ServiceRequestStatus.NEW ? `View / Edit` : `View`}
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