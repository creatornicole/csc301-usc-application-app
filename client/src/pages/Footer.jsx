function Footer() {
    // navigate to social media web pages
    const handleButtonClick = (event) => {
        const btnClass = event.target.className;

        let url;
        switch (btnClass) {
            case 'fb':
                url = 'https://www.facebook.com/Technikum.Mittweida.Motorsport/';
                break;
            case 'insta':
                url = 'https://www.instagram.com/technikum.mittweida.motorsport/';
                break;
            case 'yt':
                url = 'https://www.youtube.com/@motorsportmw';
                break;
            case 'linkedin':
                url = 'https://de.linkedin.com/company/technikum-mittweida-motorsport';
                break;
            default:
                url = '#';
                break;
        }
        window.location.href = url;
    }

    return (
        <footer>
            <a href="/">
                <img 
                    alt=""
                    src="/images/logo-red_grey.png"
                    className="footer-logo"
                    width="140px"
                    height="75px"
                />
            </a>
            <button className="fb" onClick={handleButtonClick}>
                <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button className="insta" onClick={handleButtonClick}>
                <i className="fa-brands fa-instagram"></i>
            </button>
            <button className="yt" onClick={handleButtonClick}>
                <i className="fa-brands fa-youtube"></i>
            </button>
            <button className="linkedin" onClick={handleButtonClick}>
                <i className="fa-brands fa-linkedin-in"></i>
            </button>
        </footer>
    );
}

export default Footer