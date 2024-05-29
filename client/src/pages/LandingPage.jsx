import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function LandingPage() {
    return (
        <header>
            <img 
                alt=""
                src="/images/logo-red_white.png"
                height="320px"
                width="580px"
            />
            <h1>Technikum Mittweida <br/>Motorsport</h1>
            
            <Button variant='primary'>
                <Link className="link" to='application'>Get Involved</Link>
            </Button>
        </header>
    );
}

export default LandingPage