import { Button, Navbar, Nav, Container } from 'react-bootstrap'

function Header() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                    <img 
                        alt=""
                        src="/images/logo-red_white.png"
                        width="230px"
                        height="120px"
                    />
                </Navbar.Brand>
                <Nav.Link>Login</Nav.Link> {/* TODO: either Login/Logout */}
            </Container>
        </Navbar>  
    );
}

export default Header