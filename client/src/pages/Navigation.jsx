import { Link} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import LoginModal from './LoginModal';
import { useState } from 'react';

function Navigation() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
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
                    <Nav.Link className="link" onClick={handleShow}>
                        Login
                    </Nav.Link>            
                </Container>
            </Navbar> 

            <LoginModal show={show} handleClose={handleClose} />
        </div>
    );
}

export default Navigation

{/*

<Nav.Link as={Link} className="link" to="/intranet">
    Login {/* TODO: either Login/Logout 
</Nav.Link>

*/}