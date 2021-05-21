import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import {
    FaTachometerAlt, FaSignOutAlt, FaPhotoVideo,
    FaUser, FaEnvelope, FaMapMarkerAlt, FaTh,
    FaBuilding, FaFlag, FaChevronCircleRight,
    FaChevronCircleLeft
} from 'react-icons/fa';

import * as ROUTES from '../../../constants/routes';

import { logout } from '../../../../store/actions/authAction';

import logo from '../../../../assets/images/logo.png';
import logoSingle from '../../../../assets/images/logo_single.png';
import { useDispatch } from 'react-redux';

interface HeaderProps {
    isClose: boolean;
    onClick: () => void;
}

const HeaderAdmin: FC<HeaderProps> = (props: HeaderProps) => {
    const dispatch = useDispatch();
    
    return (
        <div className={`header${props.isClose ? ' close' : ''}`}>
            <div className="header-head">
                <Link to={ROUTES.HOME}>
                    <img src={props.isClose ? logoSingle : logo} alt="logo" className="header-head-logo"/>
                </Link>
            </div>
            <ul className='header-content'>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN} className='link-white header-content-link'>
                        <FaTachometerAlt />
                        <span>Tableau de bord</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_MEDIA} className='link-white header-content-link'>
                        <FaPhotoVideo />
                        <span>Médias</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_ABOUT} className='link-white header-content-link'>
                        <FaUser />
                        <span>À propos</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_BANNER} className='link-white header-content-link'>
                        <FaFlag />
                        <span>Bannière</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_COMPANIES} className='link-white header-content-link'>
                        <FaBuilding />
                        <span>Entreprises</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_LOCATION} className='link-white header-content-link'>
                        <FaMapMarkerAlt />
                        <span>Localisation</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_SERVICES} className='link-white header-content-link'>
                        <FaTh />
                        <span>Services</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <Link to={ROUTES.ADMIN_CONTACT} className='link-white header-content-link'>
                        <FaEnvelope />
                        <span>Contact</span>
                    </Link>
                </li>
                <li className='header-content-item'>
                    <button className="link link-white header-content-link" onClick={() => dispatch(logout())}>
                        <FaSignOutAlt />
                        <span>Déconnexion</span>
                    </button>
                </li>
            </ul>
            <div className="header-footer">
                <button className="link link-white" onClick={props.onClick}>
                    {props.isClose ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
                    <span>Réduire le menu</span>
                </button>
            </div>
        </div>
    );
}

export default HeaderAdmin;