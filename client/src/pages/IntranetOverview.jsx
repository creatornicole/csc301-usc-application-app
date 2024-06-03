import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

// Pages/Components
import IntranetNavbar from './IntranetNavbar'

/*

"Landing Page" of internal web page view (here: Intranet)

*/

function IntranetOverview() {
    // content of component: "landing page" of internal web page view
    return (
        <div className="intranet">
            <IntranetNavbar />
            <div className="mainContent">
                <h1>You are logged in as Admin</h1>
                <p>[Under Construction]</p>   
            </div>
        </div>
    );
}

export default IntranetOverview

