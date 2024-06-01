// Pages/Components
import IntranetNavbar from './IntranetNavbar'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { useEffect, useState } from 'react';
// get possible team positions
import { possiblePositions } from '../helper/positions.js';

function IntranetApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/applications`);
                setApplications(response.data);
            } catch (error) {
                console.error('Error feetching applications: ', error);
            }
        }
        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API}/delete/application/${id}`);
            const updatedApplications = applications.filter(application => application.id !== id);
            setApplications(updatedApplications);
        } catch (error) {
            console.error('Error deleting application: ', error);
        }
    }

    // converts to DD/MM/YYYY from date format ISO8601
    const convertDateFormat = (date) => {
        const dateObject = new Date(date);
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="intranet">
            <IntranetNavbar />
            <div className="mainContent">
                <h1>Applications</h1>
                <Table responsive bordered striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Uni-Abbr</th>
                            <th>Course of Study</th>
                            <th>Seminar Group</th>
                            <th>Desired Position</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Get Data from Database and Iterate Through */}
                        {applications.length > 0 ? (
                            applications.map((application, index) => (
                                <tr key={application.id}>
                                    <td>{index + 1}</td>
                                    <td>{application.name}</td>
                                    <td>{convertDateFormat(application.birthdate)}</td>
                                    <td>{application.phonenumber}</td>
                                    <td>{application.address}</td>
                                    <td>{application.abbr}</td>
                                    <td>{application.course}</td>
                                    <td>{application.seminargroup}</td>
                                    <td>{possiblePositions[application.position]}</td>
                                    <td>
                                       <i onClick={() => handleDelete(application.id)}
                                            className="fa-solid fa-user-minus"></i>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10">
                                    No applications found.
                                </td>
                            </tr>
                        )} 
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default IntranetApplications