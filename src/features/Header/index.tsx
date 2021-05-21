import React from 'react';
import './style.scss';

import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import { AuthUserContext } from '../Firebase'

import Burger from '../Burger';

import logo from '../../assets/images/logo.png';
import logoPixelized from '../../assets/images/logo-pixelized.png';

interface HeaderState {
    limit: boolean;
    fixed: boolean;
    mobile: boolean;
    open: boolean;
}

class Header extends React.Component<{isFixed?: boolean}, HeaderState> {
    constructor(props: {isFixed?: boolean} | Readonly<{}>) {
        super(props);
        this.isOverLimit();
        this.state = {
            limit: false,
            fixed: false,
            mobile: false,
            open: false,
        };
    }

    componentDidMount() {
        if (window.location.href.includes('/services')) {
            this.setState({fixed: true});
        }
        window.addEventListener('resize', this.handleSizes);
        this.handleSizes();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleSizes);
    }

    handleSizes = () => {
        if (window.innerWidth <= 768) {
            this.setState({mobile: true});
        } else {
            this.setState({mobile: false});
        }
    }

    isOverLimit() {
        window.onscroll = () => {
            const limit = this.state.limit;
            let value = null;
            if (window.pageYOffset >= 20) {
                value = true;
            } else if (window.pageYOffset < 20) {
                value = false;
            }
            if (value !== null && value !== limit) {
                this.setState({limit: value});
            }
        }
    }

    onClickLink(param: string) {
        switch (param) {
            default :
                this.setState({fixed: false});
                document.getElementById(param)?.scrollIntoView();
                break;
        }
    }

    handleSetOpenMobile = (open: boolean) => {
        this.setState({open: open});
    }

    renderHamburgerButton() {
        if (this.state.mobile) {
            return (
                <Burger open={this.state.open} setOpen={this.handleSetOpenMobile}/>
            );
        }
        return ;
    }

    renderMobileIcon() {
        if (this.state.mobile) {
            return (
                <li className='menu-mobile-logo'>
                    <Link to='/' onClick={() => this.onClickLink('/')}>
                        <LazyLoadImage
                            alt='Amandine Papon - logo'
                            placeholderSrc={logoPixelized}
                            src={logo}
                            effect='blur'
                        />
                    </Link>
                </li>
            );
        } else {
            return ;
        }
    }

    render() {
        return (
            <header
                className={
                    `menu
                    ${this.state.limit || this.state.fixed ? ' menu-fix' : ''}
                    ${this.state.mobile ? ' menu-mobile' : ''}
                    ${this.props.isFixed ? ' menu-fix': ''}
                    `
                }
            >
                {this.renderHamburgerButton()}
                <ul className={`items left${this.state.open ? ' menu-mobile-open' : ''}`} onClick={() => this.handleSetOpenMobile(!this.state.open)}>
                    {this.renderMobileIcon()}
                    <li>
                        <Link to='/services' className='link-white'>Services</Link>
                    </li>
                    <li>
                        <Link to='/#about' className='link-white' onClick={() => this.onClickLink('about')}>À propos</Link>
                    </li>
                    <li>
                        <Link to='/#contact' className='link-white' onClick={() => this.onClickLink('contact')}>Contact</Link>
                    </li>
                    <li>
                        <div className="social">
                            <a href="https://www.facebook.com/Amandine-Papon-Conseil-en-sant%C3%A9-et-s%C3%A9curit%C3%A9-104483988388037" target='_blank' rel="noreferrer" className="link-white"><FaFacebookF/></a>
                            <a href="https://www.linkedin.com/in/amandine-papon-043087166" target='_blank' rel="noreferrer" className="link-white"><FaLinkedinIn/></a>
                        </div>
                    </li>
                </ul>
                <div className='items right'>
                    <Link to='/' onClick={() => this.onClickLink('/')}>
                        <LazyLoadImage
                            alt='Amandine Papon - logo'
                            placeholderSrc={logoPixelized}
                            src={logo}
                            effect='blur'
                        />
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;
