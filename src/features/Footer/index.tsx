import React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import logo from '../../assets/images/logo.png';
import logoPixelized from '../../assets/images/logo-pixelized.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <Link to='/'>
                    <LazyLoadImage
                        alt='Amandine Papon - logo'
                        height='70'
                        placeholderSrc={logoPixelized}
                        src={logo}
                        effect='blur'
                    />
                </Link>
            </div>
            <div className="footer-bottom">
                <p className="text author">Site créé par : <a href="https://adrienmusserotte.fr" className="link-white" target='_blank' rel="noreferrer">Adrien Musserotte</a></p>
                <p className="text copyright">Copyright 2021 - Amandine Papon</p>
            </div>
        </footer>
    );
}

export default Footer;