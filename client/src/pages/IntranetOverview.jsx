import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

// Pages/Components
import IntranetNavbar from './IntranetNavbar'

function IntranetOverview() {
    return (
        <div className="intranet">
            <IntranetNavbar />
            <div className="mainContent">
                <h1>You are logged in as Admin</h1>      
            </div>
        </div>
    );
}

export default IntranetOverview

