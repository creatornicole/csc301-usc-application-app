import { Link} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Navigation() {
    return (
        <Navbar className="dark-bg-color">
            <Container>
                <Navbar.Brand href="/">
                    <img 
                        alt=""
                        src="/images/logo-red_white.png"
                        width="150px"
                        height="80px"
                    />
                </Navbar.Brand>
                <Nav.Link as={Link} className="link" to="/intranet">
                    Login {/* TODO: either Login/Logout */}
                </Nav.Link> 
            </Container>
        </Navbar>  
    );
}

export default Navigation