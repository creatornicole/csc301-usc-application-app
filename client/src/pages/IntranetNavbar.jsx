import { Link} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

function IntranetNavbar() {
    return (
            <Navbar>
                <Container>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} className="link" to="applications">
                            <i className="fa-solid fa-address-card"></i> Applications
                        </Nav.Link>
                        <Nav.Link as={Link} className="link" to="/intranet">
                            <i className="fa-solid fa-user"></i> Login Data
                    </Nav.Link>
                    </Nav>
                </Container>
            </Navbar> 
    );
}

export default IntranetNavbar