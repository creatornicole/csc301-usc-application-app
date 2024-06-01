import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Helps to change colors depending on the url
const BackgroundChanger = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        const body = document.body;
        const footer = document.getElementsByTagName('footer')[0];
        const footerLogo = document.getElementsByClassName('footer-logo')[0];

        if (location.pathname === '/') {
            body.className = 'dark-bg-color';
            if (footer) footer.className = 'light-bg-color';
            if (footerLogo) footerLogo.src = '/images/logo-red_grey.png';
        } else if (location.pathname === '/application') {
            body.className = 'light-bg-color';
            if (footer) footer.className = 'dark-bg-color';
            if (footerLogo) footerLogo.src = '/images/logo-red_white.png';
        } else if (location.pathname === '/intranet') {
            body.className = 'light-bg-color';
            if (footer) footer.className = 'dark-bg-color';
            if (footerLogo) footerLogo.src = '/images/logo-red_white.png';
        } else if (location.pathname === '/intranet/applications') {
            body.className = 'light-bg-color';
            if (footer) footer.className = 'dark-bg-color';
            if (footerLogo) footerLogo.src = '/images/logo-red_white.png';
        } else {

        }
    }, [location]);

    return <>{children}</>;
};

export default BackgroundChanger;