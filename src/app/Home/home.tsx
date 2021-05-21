import React from 'react';
import './style.scss';

import { About, Banner, Companies, Contact, Location, Services} from './hooks';

class Home extends React.Component {
    componentDidMount() {
        if (window.location.href.includes('#contact')) {
            document.getElementById('contact')?.scrollIntoView();
        } else if (window.location.href.includes('#about')) {
            document.getElementById('about')?.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return (
            <div className="home">
                <Banner />
                <Services />
                <About />
                <Companies />
                <div className="contact-and-location" id="contact">
                    <Contact />
                    <Location />
                </div>
            </div>
        );
    }
}

export default Home;
