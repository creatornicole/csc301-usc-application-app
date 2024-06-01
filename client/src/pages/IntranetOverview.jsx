import { Link } from 'react-router-dom'

function IntranetOverview() {
    return (
        <div className="mainContent">
            <h1>You are logged in as Admin</h1>
            
            <Link to="applications">Applications</Link>
        </div>
    );
}

export default IntranetOverview