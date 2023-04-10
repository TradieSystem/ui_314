import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../../../Contexts/AuthContext";
import {ServiceRequest} from "../../../Types/ServiceRequest";
import {generateNewDummyServiceRequests} from "../../../Utilities/GenerateDummyData";
import {SortDirection} from "../../../Utilities/TableUtils";
import styles from './AvailableRequestsTable.module.css';
import {
    Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
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


enum AvailableRequestsTableColumn {
    ApplicationNumber = 'ApplicationNumber',
    ApplicationDate = 'ApplicationDate',
    Location = 'Location',
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

export const AvailableRequestsTable = () => {
    const {user} = useAuthContext();

    //TODO set to actual data
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(generateNewDummyServiceRequests());

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
        let orderedServiceRequests = serviceRequests;
        switch (AvailableRequestsTableColumn[sortField]) {
            case AvailableRequestsTableColumn.ApplicationNumber:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationNumber > b.applicationNumber ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationNumber < b.applicationNumber ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.ApplicationDate:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationDate > b.applicationDate ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.applicationDate < b.applicationDate ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.ServiceType:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.serviceType > b.serviceType ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.serviceType < b.serviceType ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.Client:
                if (sortDirection === SortDirection.ASC) {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.client.lastName > b.client.lastName ? 1 : -1);
                } else {
                    orderedServiceRequests = orderedServiceRequests.sort((a, b) => a.client.lastName < b.client.lastName ? 1 : -1);
                }
                break;
            case AvailableRequestsTableColumn.Location:
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

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        //TODO make axios call to get all available new requests

        //TODO call setServiceRequests when data returned

        //Sort by Application Number, ascending
        handleSort(AvailableRequestsTableColumn.ApplicationNumber);
    }, []);

    return (
        <div className={styles['table-container']}>
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
                                        color: "white"
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
                                <TableCell sx={{display: "grid"}}>
                                    <>{request.suburb}</>
                                    <><b>{request.postcode}</b></>
                                </TableCell>
                                <TableCell>
                                    {request.serviceType}
                                </TableCell>
                                <TableCell>
                                    {`${request.client.firstName} ${request.client.lastName}`}
                                </TableCell>
                                <TableCell>
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
                                <TableCell>
                                    <Tooltip title={user?.user_id && request.applicantIds?.includes(user?.user_id) ? 'Application to request already submitted' : ''}>
                                        <span>
                                             <ThemedButton
                                                 variantOverride={'text'}
                                                 disabled={user?.user_id ? request.applicantIds?.includes(user?.user_id) : false}
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
    )
}

export default AvailableRequestsTable;