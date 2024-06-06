import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

/*

Entry Point to login into internal web page view

*/

function LoginModal({ show, handleClose }) {
    // state variables
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    // empty out any error message if user changes username or password state
    useEffect(() => {
        setErrMsg('');
    }, [username, pwd])

    // compare entered credentials with .env entries
    const handleLogin = async (e) => {
        // handles login credentials via .env
        if (username !== import.meta.env.VITE_ADMIN_LOGIN && 
            pwd !== import.meta.env.VITE_ADMIN_PWD) {
            setErrMsg('Wrong Username and Password');
        } else if (username !== import.meta.env.VITE_ADMIN_LOGIN) {
            setErrMsg('Wrong Username');
        } else if (pwd !== import.meta.env.VITE_ADMIN_PWD) {
            setErrMsg('Wrong Password');
        } else {
            emptyInputs();
            // close login modal
            handleClose();
            // credentials correct, navigate to /intranet
            navigate('/intranet');
        }
    };

    // empty input and close when modal is hidden or closed
    const handleCloseOfModal = () => {
        emptyInputs()
        handleClose();  
    };

    // empty inputs of login form
    const emptyInputs = () => {
        setUsername('');
        setPwd('');
    }

    // content of component: modal with form to log into web page
    return (
        <Modal size="lg" show={show} onHide={handleCloseOfModal} className="light-bg-color">
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* login form is body of modal */}
                <Form id="loginForm">
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control 
                            type="email"
                            name="username"
                            id="username"
                            placeholder="name@hs-mittweida.de"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="pwd">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="pwd"
                            id="pwd"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </Form.Group>
                </Form>
                {/* display error message */}
                {errMsg && <p className="error" dangerouslySetInnerHTML={{ __html: `<i class="fa-solid fa-xmark"></i> ${errMsg}` }}></p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOfModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                    {/* navigate to intranet on success (with react router) */}
                    Sign In
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal