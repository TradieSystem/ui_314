import {jsPDF} from "jspdf";
import {User} from "../Types/User";
import {UserType} from "../Types/Account";
import {ServiceRequestTableRow} from "../Pages/RequestHistory/RequestHistoryTables/RequestHistoryTable";
import autoTable from "jspdf-autotable";
import {format} from "date-fns";

/**
 * Function to export PDF of {@link ServiceRequest}'s for a {@link User}
 * Asynchronous method - setAlert
 */
export const exportPDF = async (
    serviceRequests: ServiceRequestTableRow[],
    user: User,
    setAlert?: (element: JSX.Element) => void
) => {
    //Need to set X and Y access for every element printed on the PDF
    let x = 60;
    let y = 20;
    const smallIncrement = 10;
    const mediumIncrement = 20;
    const largeIncrement = 30;
    const xLargeIncrement = 60;

    //Create PDF object
    const pdf = new jsPDF();
    pdf.setProperties({title: 'Exported Service Requests'});

    /*
        TITLE
     */
    // @ts-ignore
    pdf.setFont(undefined, 'bold');
    pdf.setFontSize(20);
    pdf.text(`Exported Service Requests`, x, y);

    x = 10;
    y += mediumIncrement;

    /*
        USER DETAILS
     */
    pdf.setFontSize(12);
    pdf.text('User Details', x, y);
    y += smallIncrement;

    // @ts-ignore
    pdf.setFont(undefined, 'normal');

    //User ID
    pdf.text('User ID:', x, y);
    x += largeIncrement;
    pdf.text(`${user.user_id}`, x, y);

    y += smallIncrement;
    x -= largeIncrement;

    //User's first name + last name
    pdf.text('Name:', x, y);
    x += largeIncrement;
    pdf.text(`${user.firstName} ${user.lastName}`, x, y);

    y += smallIncrement;
    x -= largeIncrement;

    //User's currently logged-in user type
    pdf.text('Exported as: ', x, y);
    x += largeIncrement;
    pdf.text(`${user.userType}`, x, y);

    y += smallIncrement;
    x -= largeIncrement;

    //User's mobile number
    pdf.text('Mobile number: ', x, y);
    x += largeIncrement;
    pdf.text(`${user.mobile}`, x, y);

    y += smallIncrement;
    x -= largeIncrement;

    //User's email
    pdf.text('Email: ', x, y);
    x += largeIncrement;
    pdf.text(`${user.email}`, x, y);

    y += mediumIncrement;
    x -= largeIncrement;

    /*
        SERVICE REQUEST STATISTICS
     */
    // @ts-ignore
    pdf.setFont(undefined, 'bold');

    pdf.text('Service Request Statistics', x, y);

    y += smallIncrement;

    // @ts-ignore
    pdf.setFont(undefined, 'normal');

    //Number of requests (description depends on user type)
    pdf.text(user.userType === UserType.PROFESSIONAL ? `Number of Jobs Allocated:` : `Number of Requests Created:`, x, y);
    x += xLargeIncrement;
    pdf.text(serviceRequests.length.toString(), x, y);

    x -= xLargeIncrement;
    y += smallIncrement;

    const generateClientTable = () => {
        let rows: any = [];

        serviceRequests.forEach((serviceRequest) => {
            rows.push([
                serviceRequest.requestID.toString(),
                format(serviceRequest.requestDate, 'dd/MM/yyyy'),
                serviceRequest.serviceType,
                serviceRequest.requestStatus,
                serviceRequest.postcode,
                serviceRequest.professionalID ? serviceRequest.professionalID.toString() : '-',
                serviceRequest.rating ? serviceRequest.rating.toString() : '-'
            ]);
        });

        return rows;
    }

    const generateProfessionalTable = () => {
        let rows: any = [];

        serviceRequests.forEach((serviceRequest) => {
            rows.push([
                serviceRequest.requestID.toString(),
                format(serviceRequest.requestDate, 'dd/MM/yyyy'),
                serviceRequest.serviceType,
                serviceRequest.requestStatus,
                serviceRequest.postcode,
                serviceRequest.clientName,
                serviceRequest.rating ? serviceRequest.rating.toString() : '-'
            ]);
        });

        return rows;
    }

    const generateClientHeader = () : any => {
        return ['Request ID', 'Request Date', 'Service Type', 'Request Status', 'Postcode', 'Professional ID', 'Rating'];
    }

    const generateProfessionalHeader = () : any => {
        return ['Request ID', 'Request Date', 'Service Type', 'Request Status', 'Postcode', 'Client Name', 'Rating'];
    }

    //Adding the summary tables
    autoTable(pdf, {

        head: user.userType === UserType.CLIENT ? [generateClientHeader()] : [generateProfessionalHeader()],
        body: user.userType === UserType.CLIENT ? generateClientTable() : generateProfessionalTable(),
        startY: y,
        headStyles: {
        fillColor: [211, 115, 60]
    }
    });



    //Finally, save the PDF
    pdf.save(`Service Requests ${user.firstName} ${user.lastName} - ${(new Date()).toLocaleDateString()}.pdf`)
}