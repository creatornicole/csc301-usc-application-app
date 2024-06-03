// Pages/Components
import IntranetNavbar from './IntranetNavbar'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { useEffect, useState } from 'react';
// get possible team positions
import { possiblePositions } from '../helper/positions.js';
import { convertDateFormat } from '../helper/converter.js';

/*

Displays received applications in table

*/
function IntranetApplications() {
    const [applications, setApplications] = useState([]);

    // get applications from server/database
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

    // delete application on button click and update table accordingly
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API}/delete/application/${id}`);
            const updatedApplications = applications.filter(application => application.id !== id);
            setApplications(updatedApplications);
        } catch (error) {
            console.error('Error deleting application: ', error);
        }
    }

    // content of component: display received applications
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