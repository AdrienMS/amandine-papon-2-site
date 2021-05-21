import React, { FC } from 'react';
import {  useSelector } from 'react-redux';
import './style.scss';

import { RootState } from '../../../../store';

import Service from './Service/service';

import LoadingElement from '../../../../features/LoadingElement/LoadingElement';

const Services: FC = () => {
    const { services } = useSelector((state: RootState) => state.services);

    const servicesMap = services?.items.map((service, index) => {
        return (
            <Service service={service} keyId={index} key={`service-${index}`} />
        );
    });

    if (services) {
        return (
            <section className='services'>
                <h2 className="title">{services.title}</h2>
                <p className="text">{services.subTitle}</p>
                <div className="services-list">{servicesMap}</div>
            </section>
        );
    } else {
        return (
            <section className='services'>
                <h2 className="title"><LoadingElement width='350px' height='49px' rounded={true} /></h2>
                <div className="text">
                    <LoadingElement width='70%' height='1em' rounded={true} />
                    <LoadingElement width='70%' height='1em' rounded={true} />
                    <LoadingElement width='70%' height='1em' rounded={true} />
                    <LoadingElement width='70%' height='1em' rounded={true} />
                </div>
                <div className="services-list">
                    <LoadingElement width='250px' height='250px' rounded={true} />
                    <LoadingElement width='250px' height='250px' rounded={true} />
                    <LoadingElement width='250px' height='250px' rounded={true} />
                    <LoadingElement width='250px' height='250px' rounded={true} />
                </div>
            </section>
        );
    }
}

export default Services;