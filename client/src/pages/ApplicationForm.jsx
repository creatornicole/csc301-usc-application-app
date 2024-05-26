import { Link } from 'react-router-dom'

function ApplicationForm() {
    return (
        <div>
            <h1>Apply for a Membership</h1>
            <Link to="/intranet">Login</Link>
        </div>
        /* maybe useNavigate to handle form submission */
    );
}

export default ApplicationForm