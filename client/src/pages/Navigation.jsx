import { Navbar, Nav, Container } from 'react-bootstrap'

function Navigation() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                    <img 
                        alt=""
                        src="/images/logo-red_white.png"
                        width="150px"
                        height="80px"
                    />
                </Navbar.Brand>
                <Nav.Link>Login</Nav.Link> {/* TODO: either Login/Logout */}
            </Container>
        </Navbar>  
    );
}

export default Navigation